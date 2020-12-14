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
            ORDER BY groups.id ASC`,
        [`%${req.query.query}%`]
      );
      res.status(200).json(birds.map(hydrateBird));
    } else {
      const { rows: birds } = await db.query(
        `SELECT birds.id, birds.common, birds.scientific, birds.uk_status, groups.id AS group_id, groups.name AS group_name, groups.scientific AS group_scientific, sightings.id AS sighting_ids
        FROM birds JOIN groups ON (birds.group_id = groups.id) LEFT JOIN sightings ON (birds.id = sightings.bird_id)
        ORDER BY groups.id ASC`
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

router.get(
  "/api/birds/:birdID",
  requireLogin,
  wrapAsync(async (req, res) => {
    const { rows: birdDetails } = await db.query(
      `SELECT birds.id, birds.common, birds.scientific, birds.uk_status, 
        groups.id AS group_id, groups.name AS group_name, groups.scientific AS group_scientific, 
        sightings.id AS sighting_id,sightings.datetime, sightings.lat, sightings.lng,  sightings.notes,
        photos.id as photo_id, photos.instagram_media_id
        FROM birds JOIN groups ON (birds.group_id = groups.id) LEFT JOIN sightings ON (birds.id = sightings.bird_id) LEFT JOIN photos ON (photos.sighting_id = sightings.id)
        WHERE birds.id = $1`,
        [req.params.birdID]
     )


     const birdObject = {
       id: birdDetails[0].id,
       common: birdDetails[0].common,
       scientific: birdDetails[0].scientific,
       uk_status: birdDetails[0].uk_status,
       group_name: birdDetails[0].group_name,
       group_scientific: birdDetails[0].group_scientific
     }


     let sightingsObject = {};

     birdDetails.forEach((sightingRow, index) => {

      if (!(sightingRow.sighting_id in sightingsObject)) {

        sightingsObject[sightingRow.sighting_id] = {
          id: sightingRow.sighting_id,
          user_id: sightingRow.user_id,
          datetime: sightingRow.datetime,
          lat: sightingRow.lat,
          lng: sightingRow.lng,
          notes: sightingRow.notes,
          photos: [
            {
              photo_id: sightingRow.photo_id,
              instagram_media_id: sightingRow.instagram_media_id,
            },
          ],
        }
      } else {
        sightingsObject[sightingRow.sighting_id].photos.push({
          photo_id: sightingRow.photo_id,
          instagram_media_id: sightingRow.instagram_media_id,
        })
      }

     })



res.status(200).json(sightingsObject)
  })
)

export default router;
