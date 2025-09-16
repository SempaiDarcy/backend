import {Request, Response, Router} from "express";
import {db} from "../db/db";
import {authMiddleware} from "../middlewares/auth-middleware";
import {PostsType} from "../models/posts";

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    res.send(db.posts)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const postId = req.params.id;
    const post = db.posts.find(el => el.id === postId);
    if (post) {
        res.send(post)
    } else res.sendStatus(404)
})
postsRouter.post('/', authMiddleware, (req: Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body;
    const errorsMessages: { message: string, field: string }[] = []

    if (!title?.trim()) {
        errorsMessages.push({message: "Invalid title", field: "title"});
    } else if (title?.trim().length > 30) {
        errorsMessages.push({message: "title is too long", field: "title"});
    }

    if (!shortDescription?.trim()) {
        errorsMessages.push({message: "Invalid shortDescription", field: "shortDescription"});
    } else if (shortDescription?.trim().length > 100) {
        errorsMessages.push({message: "shortDescription is too long", field: "shortDescription"});
    }

    if (!content?.trim()) {
        errorsMessages.push({message: "Invalid content", field: "content"});
    } else if (content?.trim().length > 1000) {
        errorsMessages.push({message: "content is too long", field: "content"});
    }
    const blog = db.blogs.find(el => el.id === blogId)
    if (!blog) {
        errorsMessages.push({message: "Blog not found", field: "blogId"});
    }

    if (errorsMessages.length) {
        return res.status(400).send({errorsMessages})
    }

    const newPost: PostsType = {
        id: (db.posts.length + 1).toString(),
        title,
        shortDescription,
        content,
        blogId,
        blogName: blog!.name
    }

    db.posts.push(newPost)
    return res.status(201).send(newPost)
})
postsRouter.put('/:id', authMiddleware, (req: Request, res: Response) => {
    const postId = req.params.id;
    const errorsMessages: { message: string, field: string }[] = []
    const {title, shortDescription, content, blogId} = req.body;

    if (!title?.trim()) {
        errorsMessages.push({message: "Invalid title", field: "title"});
    } else if (title?.trim().length > 30) {
        errorsMessages.push({message: "title is too long", field: "title"});
    }

    if (!shortDescription?.trim()) {
        errorsMessages.push({message: "Invalid shortDescription", field: "shortDescription"});
    } else if (shortDescription?.trim().length > 100) {
        errorsMessages.push({message: "shortDescription is too long", field: "shortDescription"});
    }

    if (!content?.trim()) {
        errorsMessages.push({message: "Invalid content", field: "content"});
    } else if (content?.trim().length > 1000) {
        errorsMessages.push({message: "content is too long", field: "content"});
    }
    const blog = db.blogs.find(el => el.id === blogId)
    if (!blog) {
        errorsMessages.push({message: "Blog not found", field: "blogId"});
    }

    if (errorsMessages.length) {
        return res.status(400).send({errorsMessages})
    }
    let post = db.posts.find(el => el.id === postId)
    if (!post) {
        return res.sendStatus(404);
    }
    post.title = title;
    post.shortDescription = shortDescription;
    post.content = content;
    post.blogId = blogId;
    // post.blogName = blog!.name;

    return res.sendStatus(204);
})
postsRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
    const postId = req.params.id;
    const originalLength = db.posts.length;
    db.posts = db.posts.filter(el => el.id !== postId);
    if (db.posts.length === originalLength) {
        return res.sendStatus(404)
    }
    return res.sendStatus(204)
})