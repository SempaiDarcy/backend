import express from 'express';
import { productsRouter } from './routes/products-router';
import { videosRouter } from './routes/videos-router';
import { testingRouter } from './routes/testing-router';
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
// import {postsRouter} from "./routes/posts-router";

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.use('/products', productsRouter);
app.use('/videos', videosRouter);
app.use('/testing', testingRouter);
app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);
