import express from "express";
import validateSchema from "../validate-schema.js";
import db from "../db.js";
import wrapAsync from "../wrap-async.js";
import {
  sightingsPostSchema,
  sightingsPutSchema,
} from "../schema/sightings-schema.js";
import pg from "pg";
import format from "pg-format";

const router = express.Router();

router.get(
  "/api/sightings",
  wrapAsync(async (req, res) => {
    const { rows: sightings } = await db.query(
      `SELECT sightings.id, sightings.bird_id, birds.common, birds.scientific, sightings.user_id, sightings.datetime, sightings.lat, sightings.lng, photos.id as photo_id, photos.instagram_media_id, sightings.notes 
      FROM sightings 
      JOIN birds ON (sightings.bird_id = birds.id) 
      LEFT JOIN photos ON (photos.sighting_id = sightings.id)
      ORDER BY sightings.datetime DESC 
      LIMIT 5`
    );
    const sightingsWithPhotos = [];
    sightings.forEach((sighting) => {
      const duplicate = sightingsWithPhotos.find(({id})=> id === sighting.id);
      if (!duplicate) {
        sightingsWithPhotos.push({
          id: sighting.id,
          bird_id: sighting.bird_id,
          common: sighting.common,
          scientific: sighting.scientific,
          user_id: sighting.user_id,
          datetime: sighting.datetime,
          lat: sighting.lat,
          lng: sighting.lng,
          notes: sighting.notes,
          photos: [
            {photo_id: sighting.photo_id,
              instagram_media_id: sighting.instagram_media_id}
          ]
        })
      }
      else {
        duplicate.photos.push({
          photo_id: sighting.photo_id,
          instagram_media_id: sighting.instagram_media_id
        })
      }
    });
    
    res.status(200).json(sightingsWithPhotos);
  })
);

router.get(
  "/api/sightings/:sightingID",
  wrapAsync(async (req, res) => {
    const { rows: sightingDetails } = await db.query(
      `SELECT sightings.bird_id, birds.common, birds.scientific, birds.uk_status, groups.name, groups.scientific, sightings.datetime, sightings.lat, sightings.lng, photos.id as photo_id, photos.instagram_media_id, sightings.notes 
      FROM sightings
      JOIN birds ON (sightings.bird_id = birds.id) 
      JOIN groups ON (birds.group_id = groups.id)
      LEFT JOIN photos ON (photos.sighting_id = sightings.id)
      WHERE sightings.id = $1`,
      [req.params.sightingID]
    );

    res.status(200).json(sightingDetails[0]);

    console.log(sightingDetails);
  })
);

router.post(
  "/api/sightings",
  validateSchema(sightingsPostSchema),
  wrapAsync(async (req, res) => {
    const { rows: sightings } = await db.query(
      `WITH sighting as 
        (INSERT INTO sightings (bird_id, user_id, datetime, lat, lng, notes) 
          VALUES ( $1, $2, $3, $4, $5, $6) 
          RETURNING bird_id, user_id, datetime, lat, lng, notes, id)
      SELECT sighting.id, sighting.bird_id, birds.common, birds.scientific, sighting.user_id, sighting.datetime, sighting.lat, sighting.lng, sighting.notes
      FROM sighting
      JOIN birds ON (sighting.bird_id = birds.id)`,
      [
        req.validatedBody.bird_id,
        req.validatedBody.user_id,
        req.validatedBody.datetime,
        req.validatedBody.lat,
        req.validatedBody.lng,
        req.validatedBody.notes,
      ]
    );

    const sightingID = sightings[0].id;

    if (req.validatedBody.images.length !== 0) {
      const images = req.validatedBody.images.map((image) => {
        return [sightingID, image.imageID, image.permalink];
      });

      const query1 = format(
        `INSERT INTO photos (sighting_id, instagram_media_id, permalink
      ) VALUES %L RETURNING sighting_id, instagram_media_id, permalink`,
        images
      );

      let { rows: photos } = await db.query(query1);

      let sightingsObject = sightings[0];

      sightingsObject.photos = photos;

      res.status(201).json(sightings[0]);
    }
  })
);

router.put(
  "/api/sightings/:sighting_id",
  validateSchema(sightingsPutSchema),
  wrapAsync(async (req, res) => {
    if (Number(req.params.sighting_id) !== req.validatedBody.id) {
      throw {
        status: 400,
        messages: ["ID in url must match id in body"],
      };
    }

    const { rows: sightings, rowCount: updatedCount } = await db.query(
      `UPDATE sightings
    SET bird_id = ($1), datetime = ($2), lat = ($3), lng = ($4), notes = ($5)
    WHERE id = ($6)
    RETURNING bird_id, datetime, lat, lng, notes`,
      [
        req.validatedBody.bird_id,
        req.validatedBody.datetime,
        req.validatedBody.lat,
        req.validatedBody.lng,
        req.validatedBody.notes,
        req.validatedBody.id,
      ]
    );

    if (updatedCount === 0) {
      throw {
        status: 404,
        messages: ["There is no bird with this ID"],
      };
    }

    res.status(200).json(sightings[0]);
  })
);

router.delete(
  "/api/sightings/:sighting_id",
  wrapAsync(async (req, res) => {
    const { rowCount: deleted } = await db.query(
      `DELETE FROM sightings 
    WHERE id = ($1)`,
      [Number(req.params.sighting_id)]
    );

    if (deleted === 0) {
      throw {
        status: 404,
        messages: ["There is no sighting with this ID"],
      };
    }

    res.status(204).send();
  })
);

export default router;
