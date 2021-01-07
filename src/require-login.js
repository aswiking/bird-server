import admin from 'firebase-admin';
import wrapAsync from "./wrap-async.js";

export default wrapAsync(async function(req, res, next) {

    const authHeader = req.get('Authorization');

    if(!(authHeader)) {
      throw {
        status: 401,
        messages: ['Request does not contain Authorization header']
      }
    }

    const splitAuthHeader = authHeader.split(" ");

    if((splitAuthHeader[0]) !== 'Bearer') {
      throw {
        status: 401,
        messages: ['Only Bearer tokens are accepted']
      }
    }
    
    if (splitAuthHeader.length < 2) {
      throw {
        status: 401,
        messages: ['Authorisation failed: token missing']
      }
    }

    const token = splitAuthHeader[1];

    // Token could be invalid
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log(decodedToken)
      req.user = {
        id: decodedToken.uid,
        name: decodedToken.name,
        email: decodedToken.email
      };
    }
    catch (e) {
      console.error(e);
      throw {
        status: 401,
        messages: ["Invalid authorization token"]
      };
    }
    next();
});