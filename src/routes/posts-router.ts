// import {Request, Response, Router} from "express";
// import {authMiddleware} from "../middlewares/auth-middleware";
// import {postsRepository} from "../repositories/posts-repository";
// import {postsValidation} from "../middlewares/validation/posts-validation";
// import {inputValidationMiddleware} from "../middlewares/validation/input-validation-middleware";
// import {blogsRepository} from "../repositories/blogs-repository";
// import {idValidation} from "../middlewares/validation/id-validation";
//
// export const postsRouter = Router({})
//
// postsRouter.get('/', (req: Request, res: Response) => {
//     const posts = postsRepository.getPosts()
//     res.send(posts)
// })
// postsRouter.get(
//     '/:id',
//     idValidation,
//     (req: Request, res: Response) => {
//         const postId = req.params.id;
//         const post = postsRepository.getPostsById(postId)
//         if (post) {
//             res.send(post)
//         } else res.sendStatus(404)
//     })
// postsRouter.post(
//     '/',
//     authMiddleware,
//     postsValidation,
//     inputValidationMiddleware,
//     (req: Request, res: Response) => {
//         const {title, shortDescription, content, blogId} = req.body;
//
//         const blog = blogsRepository.getBlocksById(blogId)!;
//
//         const newPost = postsRepository.createPosts(
//             title,
//             shortDescription,
//             content,
//             blogId,
//             blog!.name
//         )
//         res.status(201).send(newPost)
//     })
// postsRouter.put(
//     '/:id',
//     authMiddleware,
//     idValidation,
//     postsValidation,
//     inputValidationMiddleware,
//     (req: Request, res: Response) => {
//         const postId = req.params.id;
//         const {title, shortDescription, content, blogId} = req.body;
//
//         const isUpdated = postsRepository.updatePosts(
//             title,
//             shortDescription,
//             content,
//             blogId,
//             postId
//         )
//
//         if (!isUpdated) {
//             return res.sendStatus(404);
//         }
//         return res.sendStatus(204);
//     })
// postsRouter.delete(
//     '/:id',
//     authMiddleware,
//     idValidation,
//     inputValidationMiddleware,
//     (req: Request, res: Response) => {
//         const postId = req.params.id;
//         const isDeleted = postsRepository.deletePosts(postId)
//         if (!isDeleted) {
//             return res.sendStatus(404)
//         }
//         return res.sendStatus(204)
//     })