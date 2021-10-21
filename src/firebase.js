import { readFileSync } from "fs";
import path from "path";
import admin from "firebase-admin";

const __dirname = path.resolve();

let serviceAccount;

if (process.env.SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
} else {
  serviceAccount = JSON.parse(
    readFileSync(
      __dirname + "/src/fledgling-10da4-firebase-adminsdk-63wmt-9f93c036d0.json"
    )
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fledgling-10da4.firebaseio.com",
});
