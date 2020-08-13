import express from "express";
import cuid from "cuid";
import validateSchema from "../validate-schema.js";
import db from "../db.js";
import wrapAsync from "../wrap-async.js";
import { birdPostSchema, birdPutSchema } from "../schema/bird-schema.js";

const router = express.Router();

let birds = [
  {
    id: cuid(),
    name: "blackbird",
    scientific: "Turdus merula",
    location: "Leicester",
    date: "2020-04-13",
    image: "https://twootz.com/assets/images/bird/Blackbird.jpg",
  },
  {
    id: cuid(),
    name: "robin",
    scientific: "Erithacus rubecula",
    location: "Leicester",
    date: "2020-01-10",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/23/2014/12/GettyImages-511380252-08b8a2e.jpg",
  },
];

router.get("/api/birds", async (req, res) => {
  const { rows: birds } = await db.query(
    "SELECT id, name, scientific, location, date, image FROM birds"
  );
  res.status(200).json(birds);
});

router.post("/api/birds", validateSchema(birdPostSchema), wrapAsync(async (req, res) => {
  const bird = {
    id: cuid(),
    name: req.validatedBody.name,
    scientific: req.validatedBody.scientific,
    location: req.validatedBody.location,
    date: req.validatedBody.date,
    image: req.validatedBody.image,
  };

  const {rows: birds} = await db.query(
    `INSERT INTO birds (
      name, scientific, location, date, image
    ) VALUES (
      $1, $2, $3, $4, $5
    ) RETURNING
      id, name, scientific, location, date, image
    `,
    [bird.name, bird.scientific, bird.location, bird.date, bird.image]
  );

  res.status(201).json(birds[0]);
}));

router.put("/api/birds/:id", validateSchema(birdPutSchema), wrapAsync( async (req, res) => {



  const updatedBird = {
    id: req.validatedBody.id,
    name: req.validatedBody.name,
    scientific: req.validatedBody.scientific,
    location: req.validatedBody.location,
    date: req.validatedBody.date,
    image: req.validatedBody.image,
  };

  if (req.params.id !== req.validatedBody.id) {
    throw {
      status: 400,
      messages: ["ID in url must match id in body"],
    };
  }

  const {rows: birds, rowCount: deleted} = await db.query(
    `UPDATE birds
    SET name = ($1), scientific = ($2), location = ($3), date = ($4), image = ($5)
    WHERE id = ($6)
    RETURNING id, name, scientific, location, date, image`,
    [req.validatedBody.name, req.validatedBody.scientific, req.validatedBody.location, req.validatedBody.date, req.validatedBody.image, req.validatedBody.id]
  )

  if (deleted === 0) {
    throw {
      status: 404,
      messages: ["There is no bird with this ID"],
    };
  }

  res.status(200).json(birds);
}));

router.delete("/api/birds/:id", wrapAsync(async (req, res) => {
  const {rowCount: deleted} = await db.query(
    `DELETE FROM birds 
    WHERE id = ($1)`,
    [req.params.id]
  );
  
  if (deleted === 0) {
    throw {
      status: 404,
      messages: ["There is no bird with this ID"],
    };
  }

  res.status(204).send();
}));

export default router;
