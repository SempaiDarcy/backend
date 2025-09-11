import {Router} from 'express';
import {videosRepository} from "../repositories/videos-repository";
import { productsRepository} from "../repositories/products-repository";

export const testingRouter = Router({});

testingRouter.delete('/all-data', (req, res) => {
    videosRepository.clearAll();
    productsRepository.clearAll()
    res.sendStatus(204);
});
