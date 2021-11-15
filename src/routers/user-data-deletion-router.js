import express from "express";
import wrapAsync from "../wrap-async.js";
import db from "../db.js";
import qs from "qs";

const router = express.Router();

router.post(
  "/api/instagram-data-delete-callback",
  wrapAsync(async (req, res) => {
console.log("req.body is",req.body)
console.log("req.query is",req.query)
console.log("req.user_id is", req.user_id)

    //const jsonQuery = qs.parse(req)



    /*const {
      rowCount: deleted,
    } = await db.query(`DELETE FROM sightings WHERE user_id = ($1)`, [
      Number(jsonQuery.user_id)
    ]);

    if (deleted === 0) {
      throw {
        status: 404,
        messages: ["There is no user with this ID"],
      };
    }
*/
    res.status(204).send();
  })
);

export default router;