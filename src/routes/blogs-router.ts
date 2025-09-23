import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {blogsRepository} from "../repositories/blogs-repository";

export const blogsRouter = Router({});

blogsRouter.get('/', (req: Request, res: Response) => {
    const blogs = blogsRepository.getBlogs()
    res.send(blogs)
})
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const blogId = req.params.id
    const blog = blogsRepository.getBlocksById(blogId);
    if (blog) {
        res.status(200).send(blog)
    } else res.sendStatus(404)
})

blogsRouter.post('/', authMiddleware, (req: Request, res: Response) => {
    const {name, description, websiteUrl} = req.body;
    const errorsMessages: { message: string; field: string }[] = [];

    if (!name?.trim()) {
        errorsMessages.push({message: "Invalid name", field: "name"});
    } else if (name?.trim().length > 15) {
        errorsMessages.push({message: "name is too long", field: "name"});
    }

    if (!description?.trim()) {
        errorsMessages.push({message: "Invalid description", field: "description"});
    } else if (description?.trim().length > 500) {
        errorsMessages.push({message: "description is too long", field: "description"});
    }

    if (!websiteUrl?.trim()) {
        errorsMessages.push({message: "Invalid websiteUrl", field: "websiteUrl"});
    } else if (websiteUrl.trim().length > 100) {
        errorsMessages.push({message: "websiteUrl is too long", field: "websiteUrl"});
    } else {
        const regex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
        if (!regex.test(websiteUrl.trim())) {
            errorsMessages.push({message: "website url does not match the template", field: "websiteUrl"});
        }
    }
    if (errorsMessages.length) {
        return res.status(400).send({errorsMessages})
    }

    const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
    return res.status(201).send(newBlog)
})
blogsRouter.put('/:id', authMiddleware, (req: Request, res: Response) => {
    const blogId = req.params.id;
    const errorsMessages: { message: string; field: string }[] = [];

    const {name, description, websiteUrl} = req.body;

    if (!name?.trim()) {
        errorsMessages.push({message: "Invalid name", field: "name"});
    } else if (name?.trim().length > 15) {
        errorsMessages.push({message: "name is too long", field: "name"});
    }

    if (!description?.trim()) {
        errorsMessages.push({message: "Invalid description", field: "description"});
    } else if (description?.trim().length > 500) {
        errorsMessages.push({message: "description is too long", field: "description"});
    }

    if (!websiteUrl?.trim()) {
        errorsMessages.push({message: "Invalid websiteUrl", field: "websiteUrl"});
    } else if (websiteUrl.trim().length > 100) {
        errorsMessages.push({message: "websiteUrl is too long", field: "websiteUrl"});
    } else {
        const regex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
        if (!regex.test(websiteUrl.trim())) {
            errorsMessages.push({message: "website url does not match the template", field: "websiteUrl"});
        }
    }

    if (errorsMessages.length > 0) {
        return res.status(400).send({errorsMessages})
    }
    const isUpdated = blogsRepository.updateBlog(blogId, name, description, websiteUrl);

    if (!isUpdated) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204);
})
blogsRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
    const blogId = req.params.id;

    const isDeleted = blogsRepository.deleteBlog(blogId)
    if (!isDeleted) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);

})