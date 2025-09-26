import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {blogsRepository} from "../repositories/blogs-repository";
import {idValidation} from "../middlewares/validation/id-validation";
import {inputValidationMiddleware} from "../middlewares/validation/input-validation-middleware";
import {blogsValidation} from "../middlewares/validation/blogs-validation";

export const blogsRouter = Router({});

blogsRouter.get('/', (req: Request, res: Response) => {
    const blogs = blogsRepository.getBlogs()
    res.send(blogs)
})
blogsRouter.get(
    '/:id',
    idValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const blogId = req.params.id
        const blog = blogsRepository.getBlocksById(blogId);
        if (blog) {
            res.status(200).send(blog)
        } else res.sendStatus(404)
    })

blogsRouter.post(
    '/',
    authMiddleware,
    blogsValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const {name, description, websiteUrl} = req.body;
        const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
        res.status(201).send(newBlog)
    })
blogsRouter.put(
    '/:id',
    authMiddleware,
    idValidation,
    blogsValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const blogId = req.params.id;

        const {name, description, websiteUrl} = req.body;

        const isUpdated = blogsRepository.updateBlog(blogId, name, description, websiteUrl);

        if (!isUpdated) {
            return res.sendStatus(404)
        }

        return res.sendStatus(204);
    })
blogsRouter.delete(
    '/:id',
    authMiddleware,
    idValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const blogId = req.params.id;

        const isDeleted = blogsRepository.deleteBlog(blogId)
        if (!isDeleted) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);

    })