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
      const duplicate = sightingsWithPhotos.find(
        ({ id }) => id === sighting.id
      );
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
            {
              photo_id: sighting.photo_id,
              instagram_media_id: sighting.instagram_media_id,
            },
          ],
        });
      } else {
        duplicate.photos.push({
          photo_id: sighting.photo_id,
          instagram_media_id: sighting.instagram_media_id,
        });
      }
    });

    res.status(200).json(sightingsWithPhotos);
  })
);

router.get(
  "/api/sightings/:sightingID",
  wrapAsync(async (req, res) => {
    const { rows: sightingDetails } = await db.query(
      `SELECT sightings.id, sightings.bird_id, sightings.user_id, birds.common, birds.scientific, birds.uk_status, groups.name as group_common, groups.scientific as group_scientific, sightings.datetime, sightings.lat, sightings.lng, photos.id as photo_id, photos.instagram_media_id, sightings.notes 
      FROM sightings
      JOIN birds ON (sightings.bird_id = birds.id) 
      JOIN groups ON (birds.group_id = groups.id)
      LEFT JOIN photos ON (photos.sighting_id = sightings.id)
      WHERE sightings.id = $1`,
      [req.params.sightingID]
    );

    let sightingsWithPhotos;

    sightingDetails.forEach((sightingRow, index) => {
      if (index === 0) {
        sightingsWithPhotos = {
          id: sightingRow.id,
          bird_id: sightingRow.bird_id,
          user_id: sightingRow.user_id,
          common: sightingRow.common,
          datetime: sightingRow.datetime,
          group_common: sightingRow.group_common,
          group_scientific: sightingRow.group_scientific,
          photos: [
            {
              photo_id: sightingRow.photo_id,
              instagram_media_id: sightingRow.instagram_media_id,
            },
          ],
          lat: sightingRow.lat,
          lng: sightingRow.lng,
          notes: sightingRow.notes,
          scientific: sightingRow.scientific,
          uk_status: sightingRow.uk_status,
        };
      } else {
        sightingsWithPhotos.photos.push({
          photo_id: sightingRow.photo_id,
          instagram_media_id: sightingRow.instagram_media_id,
        });
      }
    });

    res.status(200).json(sightingsWithPhotos);
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

    if (req.validatedBody.photos.length !== 0) {
      const formattedPhotos = req.validatedBody.photos.map((photo) => {
        return [sightingID, photo.instagram_media_id];
      });

      const query1 = format(
        `INSERT INTO photos (sighting_id, instagram_media_id 
      ) VALUES %L RETURNING sighting_id, instagram_media_id`,
      formattedPhotos
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

    await db.query(
      `DELETE FROM photos
      WHERE sighting_id = ($1)`,
      [Number(req.validatedBody.id)]
    );

    let sightingsObject = sightings[0];
    let photoDetails;

    if (req.validatedBody.photos.length !== 0) {
      const images = req.validatedBody.photos.map((image) => {
        return [req.validatedBody.id, image.instagram_media_id];
      });

      const query = format(
        `INSERT INTO photos (sighting_id, instagram_media_id 
          ) VALUES %L RETURNING sighting_id, instagram_media_id`,
        images
      );
      let { rows: photoRows } = await db.query(query);

      photoDetails = photoRows;
    }

    sightingsObject.photos = photoDetails;

    console.log("Sightings object", sightingsObject);

    res.status(200).json(sightingsObject);
  })
);

router.delete(
  "/api/sightings/:sighting_id",
  wrapAsync(async (req, res) => {
    const { rowCount: deleted } = await db.query(
      `DELETE FROM sightings WHERE id = ($1)`,
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
