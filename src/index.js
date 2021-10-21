import express from 'express';
import https from 'https';
import './firebase.js'
import sightingsRouter from './routers/sightings-router.js';
import birdRouter from './routers/bird-router.js';
import loginRouter from './routers/login-router.js';
import errorHandlingMW from './error-handling-mw.js';
import fs from'fs';

const app = express();

let server;

if (process.env.HTTPS) {
const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');

 server = https.createServer({key: key, cert: cert }, app);
} else { server = app;}

app.use(express.json());

app.use(loginRouter);

app.use(sightingsRouter);

app.use(birdRouter);

app.use((req, res, next) => {
    throw {
        status: 404,
        messages: ["Not found"]
    };
});

app.use(errorHandlingMW);

server.listen(8080, () => {
    console.log('Server is listening on port 8080')
});



