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
      "SELECT sightings.id, sightings.bird_id, birds.common, birds.scientific, sightings.user_id, sightings.datetime, sightings.lat, sightings.lng, sightings.notes FROM sightings JOIN birds ON (sightings.bird_id = birds.id) ORDER BY sightings.datetime DESC LIMIT 5"
    );
    res.status(200).json(sightings);
  })
);

router.post(
  "/api/sightings",
  validateSchema(sightingsPostSchema),
  wrapAsync(async (req, res) => {
    const { rows: sightings } = await db.query(
      `INSERT INTO sightings (
        bird_id, user_id, datetime, lat, lng, notes
    ) VALUES (
      $1, $2, $3, $4, $5, $6
    ) RETURNING
      bird_id, user_id, datetime, lat, lng, notes, id
    `,
      [
        req.validatedBody.bird_id,
        req.validatedBody.user_id,
        req.validatedBody.datetime,
        req.validatedBody.lat,
        req.validatedBody.lng,
        req.validatedBody.notes,
      ]
    );

    res.status(201).json(sightings[0]);

    const sightingID = sightings[0].id;

    if (req.validatedBody.imageIDs.length !== 0) {
      const images = req.validatedBody.imageIDs.map((image) => {
        [sightingID, req.validatedBody.imageIDs];
      });

      const query1 = format(`INSERT INTO photos (sighting_id, instagram_media_id
      ) VALUES %L RETURNING sighting_id, instagram_media_id`);

      async function run() {
        let client;
        try {
          client = new pg.Client({
            connectionString: 'postgresql://localhost/node_example'
          });
          await client.connect();
          let {rows} = await client.query(query1);
          console.log(rows);
        } catch (e) {
          console.error(e);
        } finally {
          client.end();
        }
      }
      
      run();

      // req.validatedBody.imageIDs.map((image) => {
      //   const { rows: images } = await db.query(
      //     `INSERT INTO photos (
      //       sighting_id, instagram_media_id
      //     ) VALUES (
      //       $1, $2
      //     ) RETURNING id, sighting_id, instagram_media_id
      //     `, [sightingID, req.validatedBody.imageIDs]
      //   )
      // })
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
