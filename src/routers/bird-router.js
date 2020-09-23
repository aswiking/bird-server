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
        `SELECT birds.id, birds.common, birds.scientific, groups.id AS group_id, groups.name AS group_name
            FROM birds JOIN groups ON (birds.group_id = groups.id)
            WHERE birds.common ILIKE $1
            OR birds.scientific ILIKE $1
            OR groups.name ILIKE $1`,
        [`%${req.query.query}%`]
      );
      res.status(200).json(birds.map(hydrateBird));
    } else {
      const { rows: birds } = await db.query(
        "SELECT id, group_id, common, scientific FROM birds"
      );
     
      res.status(200).json(birds);
    }
  })
);

export default router;
