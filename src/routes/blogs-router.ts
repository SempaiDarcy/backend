import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {BlogsType} from "../models/blogs";

export const blogsRouter = Router({});

blogsRouter.get('/', (req: Request, res: Response) => {
    res.send(db.blogs)
})
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const blogId = req.params.id
    const blog = db.blogs.find(el => el.id === blogId);
    if (blog) {
        res.status(200).send(blog)
    } else res.sendStatus(404)
})

blogsRouter.post('/', (req: Request, res: Response) => {
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

    const newBlog: BlogsType = {
        id: (db.blogs.length + 1).toString(),
        name,
        description,
        websiteUrl
    }
    db.blogs.push(newBlog);
    return res.status(201).send(newBlog)
})
blogsRouter.put('/:id', (req: Request, res: Response) => {
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
    const blog = db.blogs.find(el => el.id === blogId);

    if (!blog) {
        return res.sendStatus(404)
    }

    blog.name = name;
    blog.description = description;
    blog.websiteUrl = websiteUrl;

    return res.sendStatus(204);
})
blogsRouter.delete('/:id', (req: Request, res: Response) => {
    const blogId = req.params.id;
    const originalLength = db.blogs.length;

    db.blogs = db.blogs.filter(el => el.id !== blogId);

    if (db.blogs.length === originalLength) {
        return res.sendStatus(404);
    }

    return res.sendStatus(204);

    // const blogId = req.params.id;
    // const index = db.blogs.findIndex(el => el.id === blogId);
    //
    // if (index === -1) {
    //     return res.sendStatus(404);
    // }
    //
    // db.blogs.splice(index, 1); // удалить 1 элемент по индексу
    // return res.sendStatus(204); // тело ответа не нужно
})