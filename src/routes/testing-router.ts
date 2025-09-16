import {Router} from 'express';
import {videosRepository} from "../repositories/videos-repository";
import { productsRepository} from "../repositories/products-repository";
import {db} from "../db/db";

export const testingRouter = Router({});

testingRouter.delete('/all-data', (req, res) => {
    videosRepository.clearAll();
    productsRepository.clearAll()
    db.posts = []
    res.sendStatus(204);
});
