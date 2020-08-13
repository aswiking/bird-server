import express from "express";
import validateSchema from "../validate-schema.js";
import db from "../db.js";
import wrapAsync from "../wrap-async.js";
import { birdPostSchema, birdPutSchema } from "../schema/bird-schema.js";

const router = express.Router();

function serializeBird(bird) {
  return {
    ...bird,
    date: bird.date.toISOString().slice(0,10)
  }
}

router.get("/api/birds", async (req, res) => {
  const { rows: birds } = await db.query(
    "SELECT id, name, scientific, location, date, image FROM birds"
  );
  res.status(200).json(birds.map(serializeBird));
});

router.post(
  "/api/birds",
  validateSchema(birdPostSchema),
  wrapAsync(async (req, res) => {
    const { rows: birds } = await db.query(
      `INSERT INTO birds (
      name, scientific, location, date, image
    ) VALUES (
      $1, $2, $3, $4, $5
    ) RETURNING
      id, name, scientific, location, date, image
    `,
      [
        req.validatedBody.name,
        req.validatedBody.scientific,
        req.validatedBody.location,
        req.validatedBody.date,
        req.validatedBody.image,
      ]
    );

    res.status(201).json(serializeBird(birds[0]));
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
  "/api/birds/:id",
  wrapAsync(async (req, res) => {
    const { rowCount: deleted } = await db.query(
      `DELETE FROM birds 
    WHERE id = ($1)`,
      [Number(req.params.id)]
    );

    if (deleted === 0) {
      throw {
        status: 404,
        messages: ["There is no bird with this ID"],
      };
    }

    res.status(204).send();
  })
);

export default router;
