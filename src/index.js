import express from 'express';
import birdRouter from './routers/bird-router.js';
import errorHandlingMW from './error-handling-mw.js';

const app = express();

app.use(express.json());

app.use(birdRouter);

app.use(errorHandlingMW);

app.listen(8080, () => {
    console.log('Server is listening on port 8080')
});