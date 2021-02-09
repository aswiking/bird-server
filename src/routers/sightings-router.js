import express from "express";
import validateSchema from "../validate-schema.js";
import requireLogin from "../require-login.js";
import db from "../db.js";
import wrapAsync from "../wrap-async.js";
import {
  sightingsPostSchema,
  sightingsPutSchema,
} from "../schema/sightings-schema.js";
import format from "pg-format";
import Treeize from "treeize";

const router = express.Router();

router.get(
  "/api/sightings",
  requireLogin,
  wrapAsync(async (req, res) => {
    const { rows: sightings } = await db.query(
      `SELECT sightings.id AS "id*", sightings.user_id, sightings.datetime, sightings.lat, sightings.lng, sightings.notes,
      photos.id AS "photos:id", photos.instagram_media_id AS "photos:instagram_media_id",
      birds.id AS "bird:id", birds.common AS "bird:common", birds.scientific AS "bird:scientific",
      groups.id AS "bird:group:id", groups.name AS "bird:group:name", groups.scientific AS "bird:group:scientific"
      FROM (
        SELECT id FROM sightings WHERE (sightings.user_id = $1)
        ORDER BY sightings.datetime DESC 
        LIMIT 6
      ) as s
      JOIN sightings on sightings.id = s.id
      JOIN birds ON (sightings.bird_id = birds.id) 
      JOIN groups ON (birds.group_id = groups.id) 
      LEFT JOIN photos ON (photos.sighting_id = sightings.id)
      ORDER BY sightings.datetime DESC`,
      [req.user.id]
    );

    const hydratedSightings = new Treeize();

    hydratedSightings.grow(sightings);

    const fullSightings = hydratedSightings.getData().map((sighting) => {
      if (!("photos" in sighting)) {
        sighting.photos = [];
        return sighting;
      } else {
        return sighting;
      }
    });

    res.status(200).json(fullSightings);
  })
);

router.get(
  "/api/sightings/:sightingID",
  requireLogin,
  wrapAsync(async (req, res) => {
    const { rows: sightingDetails, rowCount: updatedCount } = await db.query(
      `SELECT sightings.id AS "id*", 
      sightings.user_id, sightings.datetime, sightings.lat, sightings.lng, sightings.notes,
      photos.id AS "photos:id", photos.instagram_media_id AS "photos:instagram_media_id",
      birds.id AS "bird:id", birds.common AS "bird:common", birds.scientific AS "bird:scientific",
      groups.id AS "bird:group:id", groups.name AS "bird:group:name", groups.scientific AS "bird:group:scientific"
      FROM sightings 
      JOIN birds ON (sightings.bird_id = birds.id) 
      JOIN groups ON (birds.group_id = groups.id) 
      LEFT JOIN photos ON (photos.sighting_id = sightings.id)
      WHERE (sightings.id = $1) AND (sightings.user_id = $2)`,
      [req.params.sightingID, req.user.id]
    );

    if (updatedCount === 0) {
      throw {
        status: 404,
        messages: ["There is no sighting with this ID"],
      };
    }

    const hydratedSighting = new Treeize();

    hydratedSighting.grow(sightingDetails);


    const fullSighting = hydratedSighting.getData()[0];

    if (!("photos" in fullSighting)) {
      console.log('no photos')
      fullSighting.photos = [];
    }

    res.status(200).json(fullSighting);
   
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
      SELECT sighting.id, sighting.bird_id, sighting.user_id, sighting.datetime, sighting.lat, sighting.lng, sighting.notes,
      birds.common, birds.scientific
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

    if (req.validatedBody.photos.length) {
      const formattedPhotos = req.validatedBody.photos.map((photo) => {
        return [sightingID, photo];
      });

      const query1 = format(
        `INSERT INTO photos (sighting_id, instagram_media_id 
      ) VALUES %L RETURNING sighting_id, instagram_media_id`,
        formattedPhotos
      );

      let { rows: photos } = await db.query(query1);

      const sightingsObject = {
        id: sightings[0].id,
        user_id: sightings[0].user_id,
        datetime: sightings[0].datetime,
        lat: sightings[0].lat,
        lng: sightings[0].lng,
        notes: sightings[0].notes,
        photos: photos,
        bird: {
          id: sightings[0].bird_id,
          common: sightings[0].common,
          scientific: sightings[0].scientific
        }
      };

      res.status(201).json(sightingsObject);
    } else {

      const sightingsObject = {
        id: sightings[0].id,
        user_id: sightings[0].user_id,
        datetime: sightings[0].datetime,
        lat: sightings[0].lat,
        lng: sightings[0].lng,
        notes: sightings[0].notes,
        photos: [],
        bird: {
          id: sightings[0].bird_id,
          common: sightings[0].common,
          scientific: sightings[0].scientific
        }
      };

      res.status(201).json(sightingsObject)
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


    if (req.validatedBody.photos.length !== 0) { //if there are images
      const images = req.validatedBody.photos.map((image) => {
        return [req.validatedBody.id, image];
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

    console.log("sightingsObject", sightingsObject);

    res.status(200).json(sightingsObject);
  })
);

router.delete(
  "/api/sightings/:sighting_id",
  wrapAsync(async (req, res) => {
    const {
      rowCount: deleted,
    } = await db.query(`DELETE FROM sightings WHERE id = ($1)`, [
      Number(req.params.sighting_id),
    ]);

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
