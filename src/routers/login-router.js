import express from "express";
import simpleOauth2 from "simple-oauth2";
import fetch from "node-fetch";
import admin from "firebase-admin";

import wrapAsync from "../wrap-async.js";

const router = express.Router();



router.get(
  "/instagram-callback",
  wrapAsync(async (req, res) => {
    const response = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `client_id=1440877326102459&client_secret=599c26ffa600287d78052c4bd9528b51&code=${req.query.code}&grant_type=authorization_code&redirect_uri=https://localhost:8080/instagram-callback`,
      }
    );
    const result = await response.json();
    console.log(result);
    const accessToken = result.access_token;
    const instagramUserID = String(result.user_id);

    const customToken = await admin.auth().createCustomToken(instagramUserID);

    res.send(signInFirebaseTemplate(customToken));
  })
);

router.post(
  "/api/login/instagram",

  wrapAsync(async (req, res) => {
    const code = req.body.code;
    const responseA = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `client_id=1440877326102459&client_secret=599c26ffa600287d78052c4bd9528b51&code=${code}&grant_type=authorization_code&redirect_uri=https://localhost:3000/`,
      }
    );
    const resultA = await responseA.json();
    const shortAccessToken = resultA.access_token;

    // exchange for long-lived token

    const responseB = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=599c26ffa600287d78052c4bd9528b51&access_token=${shortAccessToken}`
    );
    const resultB = await responseB.json();
    const longAccessToken = resultB.access_token;

    const instagramUserID = String(resultA.user_id);
    const customToken = await admin.auth().createCustomToken(instagramUserID);

    res
      .status(201)
      .json({
        firebaseToken: customToken,
        instagramToken: longAccessToken,
        instagramUserID,
      });
  })
);

export default router;

//duck
