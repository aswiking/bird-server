import express from "express";
import requireLogin from '../require-login.js'; 
import db from "../db.js";
import wrapAsync from "../wrap-async.js";
import hydrateBird from "../hydrate-bird.js";

const router = express.Router();

router.get(
  "/api/birds",
  requireLogin,
  wrapAsync(async (req, res) => {

    if (req.query.query) {
      const { rows: birds } = await db.query(
        `SELECT birds.id, birds.common, birds.scientific, birds.uk_status, groups.id AS group_id, groups.name AS group_name, groups.scientific AS group_scientific, sightings.id AS sighting_ids
            FROM birds JOIN groups ON (birds.group_id = groups.id) LEFT JOIN sightings ON (birds.id = sightings.bird_id)
            WHERE birds.common ILIKE $1
            OR birds.scientific ILIKE $1
            OR groups.name ILIKE $1
            ORDER BY groups.id DESC`,
        [`%${req.query.query}%`]
      );
      res.status(200).json(birds.map(hydrateBird));
    } else {
      const { rows: birds } = await db.query(
        `SELECT birds.id, birds.common, birds.scientific, birds.uk_status, groups.id AS group_id, groups.name AS group_name, groups.scientific AS group_scientific, sightings.id AS sighting_ids
        FROM birds JOIN groups ON (birds.group_id = groups.id) LEFT JOIN sightings ON (birds.id = sightings.bird_id)
        ORDER BY groups.id DESC`
      );


      let mergedBirds = [];

      birds.forEach((bird) => {
        const duplicate = mergedBirds.find(({ id }) => {
          return id === bird.id})

        if (!duplicate) {
          mergedBirds.push(
            {id: bird.id,
            common: bird.common,
            scientific: bird.scientific,
            uk_status: bird.uk_status,
            group: {
              id: bird.group_id,
              name: bird.group_name,
              scientific: bird.group_scientific
            },
            sighting_ids: bird.sighting_ids ? [bird.sighting_ids] : []}
          )
        } else {
          duplicate.sighting_ids.push(bird.sighting_ids)
        }
      })
     
      res.status(200).json(mergedBirds);
    }
  })
);

export default router;
