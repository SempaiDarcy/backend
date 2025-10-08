import {Router, Response, Request} from 'express';
import {blogsCollection, postsCollection} from "../db/db";

export const testingRouter = Router({});

// testingRouter.delete('/all-data', (req, res) => {
//     // videosRepository.clearAll();
//     // productsRepository.clearAll()
//     db.posts = []
//     res.sendStatus(204);
// });

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    try {
        await Promise.all([
            blogsCollection.deleteMany({}),
            postsCollection.deleteMany({})
        ])
        res.sendStatus(204)
    } catch (e) {
        console.error('Ошибка при очистке данных:', e);
        res.sendStatus(500);
    }
})
