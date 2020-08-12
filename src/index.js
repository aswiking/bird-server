import express from 'express';
import birdRouter from './routers/bird-router.js';
import errorHandlingMW from './error-handling-mw.js';

const app = express();

app.use(express.json());

app.use(birdRouter);

app.use((req, res, next) => {
    throw {
        status: 404,
        messages: ["Not found"]
    };
});

app.use(errorHandlingMW);

app.listen(8080, () => {
    console.log('Server is listening on port 8080')
});