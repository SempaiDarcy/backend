import {PostsType} from "../models/posts";
import {blogsCollection, postsCollection} from "../db/db";
import {ObjectId} from "mongodb";

export const postsRepository = {
    async getPosts(): Promise<PostsType[]> {
        const posts = await postsCollection.find({}).toArray()

        return posts.map(p => ({
            id: p._id.toString(),
            title: p.title,
            shortDescription: p.shortDescription,
            content: p.content,
            blogId: p.blogId,
            blogName: p.blogName,
            createdAt: p.createdAt,
        }))
    },
    async getPostsById(postId: string): Promise<PostsType | null> {
        const post = await postsCollection.findOne({_id: new ObjectId(postId)});
        if (!post) return null;

        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
        };
    }
    ,
    async createPosts(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsType | null> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(blogId)});
        if (!blog) return null;

        const createdAt = new Date().toISOString();
        const postToInsert = {title, shortDescription, content, blogId, blogName: blog.name, createdAt};
        const result = await postsCollection.insertOne(postToInsert);
        return {
            id: result.insertedId.toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
            createdAt,
        };
    },
    async updatePosts(
        postId: string,
        title: string,
        shortDescription: string,
        content: string,
        blogId: string,
    ) {
        const result = await postsCollection.updateOne({
                _id: new ObjectId(postId)
            },
            {
                $set: {
                    title,
                    shortDescription,
                    content,
                    blogId
                }
            })

        return result.matchedCount === 1;
    },
    async deletePosts(postId: string): Promise<boolean> {
        const deletedResult = await postsCollection.deleteOne({
            _id: new ObjectId(postId),
        })
        return deletedResult.deletedCount === 1
    }
}