import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {postsRepository} from "../repositories/posts-repository";
import {postsValidation} from "../middlewares/validation/posts-validation";
import {inputValidationMiddleware} from "../middlewares/validation/input-validation-middleware";
import {idValidation} from "../middlewares/validation/id-validation";

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const posts = await postsRepository.getPosts()
    res.send(posts)
})
postsRouter.get(
    '/:id',
    idValidation,
    async (req: Request, res: Response) => {
        const postId = req.params.id;
        const post = await postsRepository.getPostsById(postId)
        if (post) {
            res.send(post)
        } else res.sendStatus(404)
    })
postsRouter.post(
    '/',
    authMiddleware,
    postsValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const {
            title,
            shortDescription,
            content,
            blogId,
        } = req.body;

        const newPost = await postsRepository.createPosts(
            title,
            shortDescription,
            content,
            blogId,

        )
        if (!newPost) return res.sendStatus(400);

        return res.status(201).send(newPost)
    })
postsRouter.put(
    '/:id',
    authMiddleware,
    idValidation,
    postsValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const postId = req.params.id;
        const {
            title,
            shortDescription,
            content,
            blogId,
        } = req.body;

        const isUpdated = await postsRepository.updatePosts(
            postId,
            title,
            shortDescription,
            content,
            blogId,
        )

        if (!isUpdated) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    })
postsRouter.delete(
    '/:id',
    authMiddleware,
    idValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const postId = req.params.id;
        const isDeleted = await postsRepository.deletePosts(postId)
        if (!isDeleted) {
            return res.sendStatus(404)
        }
        return res.sendStatus(204)
    })