import express from "express";
import validateSchema from "../validate-schema.js";
import db from "../db.js";
import wrapAsync from "../wrap-async.js";
import { birdPostSchema, birdPutSchema } from "../schema/bird-schema.js";
import {
  sightingsPostSchema,
  sightingsPutSchema,
} from "../schema/sightings-schema.js";

const router = express.Router();

router.get("/api/sightings", async (req, res) => {
  const { rows: sightings } = await db.query(
    "SELECT id, bird_id, user_id, datetime, lat, lng, notes image FROM sightings"
  );
  res.status(200).json(sightings);
});

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
      bird_id, user_id, datetime, lat, lng, notes
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
  })
);

router.put(
  "/api/birds/:id",
  validateSchema(birdPutSchema),
  wrapAsync(async (req, res) => {
    if (Number(req.params.id) !== req.validatedBody.id) {
      throw {
        status: 400,
        messages: ["ID in url must match id in body"],
      };
    }

    const { rows: birds, rowCount: updatedCount } = await db.query(
      `UPDATE birds
    SET name = ($1), scientific = ($2), location = ($3), date = ($4), image = ($5)
    WHERE id = ($6)
    RETURNING id, name, scientific, location, date, image`,
      [
        req.validatedBody.name,
        req.validatedBody.scientific,
        req.validatedBody.location,
        req.validatedBody.date,
        req.validatedBody.image,
        req.validatedBody.id,
      ]
    );

    if (updatedCount === 0) {
      throw {
        status: 404,
        messages: ["There is no bird with this ID"],
      };
    }

    res.status(200).json(serializeBird(birds[0]));
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
