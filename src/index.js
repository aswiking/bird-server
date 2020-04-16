import express from 'express';
import birdRouter from './routers/bird-router';

const app = express();

app.use(express.json());

app.use(birdRouter);

app.listen(8080, () => {
    console.log('Server is listening on port 8080')
});