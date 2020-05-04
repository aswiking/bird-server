import express from "express";
import cuid from "cuid";
import validateSchema from "../validate-schema.js";
import {birdPostSchema, birdPutSchema} from '../schema/bird-schema.js';

const router = express.Router();

let birds = [
  {
    id: 1,
    name: "blackbird",
    scientific: "Turdus merula",
    location: "Leicester",
    date: "13 April 2020",
    image: "https://twootz.com/assets/images/bird/Blackbird.jpg",
  },
  {
    id: 2,
    name: "robin",
    scientific: "Erithacus rubecula",
    location: "Leicester",
    date: "10 January 2020",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/23/2014/12/GettyImages-511380252-08b8a2e.jpg",
  },
];

router.get("/api/birds", (req, res) => {
  res.status(200).json(birds);
});

router.post("/api/birds", validateSchema(birdPostSchema), (req, res) => {

  const bird = {
    id: cuid(),
    name: req.validatedBody.name,
    scientific: req.validatedBody.scientific,
    location: req.validatedBody.location,
    date: req.validatedBody.date,
    image: req.validatedBody.image
  };

  birds.push(bird);
  res.status(201).json(bird);
});

router.put("/api/birds/:id", validateSchema(birdPutSchema), (req, res) => {
  console.log(req.params.id)
  console.log(req.validatedBody.id)

  if (Number(req.params.id) !== (req.validatedBody.id)) {
    throw {
      status: 400,
      messages: ["ID in url must match id in body"],
    };
  }

  const updatedBird = {
    id: req.validatedBody.id,
    name: req.validatedBody.name,
    scientific: req.validatedBody.scientific,
    location: req.validatedBody.location,
    date: req.validatedBody.date,
    image: req.validatedBody.image,
  };

  const index = birds.findIndex((bird) => req.body.id === bird.id);

  if (index === -1) {
    throw {
      status: 404,
      messages: ["There is no bird with this ID"],
    };
  }

  birds[index] = updatedBird;

  res.status(200).json(updatedBird);
});

router.delete("/api/birds/:id", (req, res) => {
  if (req.body.id !== Number(req.params.id)) {
    throw {
      status: 400,
      messages: ["ID in body must match ID in url"]
    }
  }
  if (!birds.find(bird => bird.id === req.body.id)) {
    throw {
      status: 404,
      messages: ["There is no bird with this ID"]
    }
  }

  birds = birds.filter(bird => bird.id !== req.body.id);

  res.status(204).send();
})

export default router;
