import express from "express";
import requireLogin from '../require-login.js'; 
import db from "../db.js";
import wrapAsync from "../wrap-async.js";
import Treeize from "treeize";

const router = express.Router();

router.get(
  "/api/birds",
  requireLogin,
  wrapAsync(async (req, res) => {

    if (req.query.query) {
      const { rows: birds } = await db.query(
        `SELECT birds.id, birds.common, birds.scientific, birds.uk_status, 
        groups.id AS "group:id", groups.name AS "group:name", groups.scientific AS "group:scientific", 
        sightings.id AS "sightings:id", sightings.datetime AS "sightings:datetime", sightings.lat AS "sightings:lat", sightings.lng AS "sightings:lng", sightings.notes AS "sightings:notes",
        photos.id AS "sightings:photos:id", photos.instagram_media_id AS "sightings:photos:instagram_media_id" 
        FROM birds 
        JOIN groups ON (birds.group_id = groups.id) 
        LEFT JOIN sightings ON ((birds.id = sightings.bird_id) AND (sightings.user_id = $2)) 
        LEFT JOIN photos ON (photos.sighting_id = sightings.id)
        WHERE birds.common ILIKE $1
        OR birds.scientific ILIKE $1
        OR groups.name ILIKE $1
        ORDER BY groups.id ASC`,
        [req.query.query, req.user.id]
      );

      const hydratedBirds = new Treeize();

      hydratedBirds.grow(birds);
      
      const fullBirds = hydratedBirds.getData().map((bird) => {
        if (!('sightings' in bird)) {
          bird.sightings = [];
          return bird;
        } else  {
          bird.sightings.forEach((sighting) => {
            if (!('photos' in sighting)) {
              sighting.photos = [];
              return sighting;
            } else {
              return sighting;
            }
          })
          return bird;
        } 
      })

      res.status(200).json(fullBirds);

    } else {
      const { rows: birds } = await db.query(
        `SELECT birds.id, birds.common, birds.scientific, birds.uk_status, 
        groups.id AS "group:id", groups.name AS "group:name", groups.scientific AS "group:scientific", 
        sightings.id AS "sightings:id", sightings.user_id AS "sightings:user_id", sightings.datetime AS "sightings:datetime", sightings.lat AS "sightings:lat", sightings.lng AS "sightings:lng", sightings.notes AS "sightings:notes",
        photos.id AS "sightings:photos:id", photos.instagram_media_id AS "sightings:photos:instagram_media_id" 
        FROM birds 
        JOIN groups ON (birds.group_id = groups.id) 
        LEFT JOIN sightings ON ((birds.id = sightings.bird_id) AND (sightings.user_id = $1)) 
        LEFT JOIN photos ON (photos.sighting_id = sightings.id)
        ORDER BY groups.id ASC`, [req.user.id]
      );
      const hydratedBirds = new Treeize();

      hydratedBirds.grow(birds);
      
      const fullBirds = hydratedBirds.getData().map((bird) => {
        if (!('sightings' in bird)) {
          bird.sightings = [];
          return bird;
        } else  {
          bird.sightings.forEach((sighting) => {
            if (!('photos' in sighting)) {
              sighting.photos = [];
              return sighting;
            } else {
              return sighting;
            }
          })
          return bird;
        } 
      })

      res.status(200).json(fullBirds);
    }
  })
);

router.get(
  "/api/birds/:birdID",
  requireLogin,
  wrapAsync(async (req, res) => {
    const { rows: birdDetails } = await db.query(
      `SELECT birds.id, birds.common, birds.scientific, birds.uk_status, 
      groups.id AS "group:id", groups.name AS "group:name", groups.scientific AS "group:scientific", 
      sightings.id AS "sightings:id", sightings.user_id AS "sightings:user_id", sightings.datetime AS "sightings:datetime", sightings.lat AS "sightings:lat", sightings.lng AS "sightings:lng", sightings.notes AS "sightings:notes",
      photos.id AS "sightings:photos:id", photos.instagram_media_id AS "sightings:photos:instagram_media_id" 
      FROM birds 
      JOIN groups ON (birds.group_id = groups.id) 
      LEFT JOIN sightings ON ((birds.id = sightings.bird_id) AND (sightings.user_id = $2)) 
      LEFT JOIN photos ON (photos.sighting_id = sightings.id)
      WHERE (birds.id = $1)`,
        [req.params.birdID, req.user.id]
     )

     const hydratedBirds = new Treeize();

     hydratedBirds.grow(birds);
     
     const fullBirds = hydratedBirds.getData().map((bird) => {
       if (!('sightings' in bird)) {
         bird.sightings = [];
         return bird;
       } else  {
         bird.sightings.forEach((sighting) => {
           if (!('photos' in sighting)) {
             sighting.photos = [];
             return sighting;
           } else {
             return sighting;
           }
         })
         return bird;
       } 
     })

res.status(200).json(fullBirds)
  })
)

export default router;
