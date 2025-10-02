import {BlogsType} from "../models/blogs";
import {blogsCollection, db} from "../db/db";
import {ObjectId} from "mongodb";

export const blogsRepository = {
    async getBlogs(): Promise<BlogsType[]> {
        return blogsCollection.find({}).toArray()
    },
    async getBlocksById(blogId: string): Promise<BlogsType | null> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(blogId)});
        return blog || null
    },
    async createBlog(name: string, description: string, websiteUrl: string, createdAt: string,
                     isMemberShip: string): Promise<BlogsType> {
        const blog = {
            name, description, websiteUrl, createdAt,
            isMemberShip
        };
        const result = await blogsCollection.insertOne(blog);

        return {
            _id: result.insertedId,
            ...blog
        };
    },
    async updateBlog(blogId: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const blog = await blogsCollection.updateOne(
            {
                _id: new ObjectId(blogId)
            },
            {
                $set: {
                    name,
                    description,
                    websiteUrl
                }
            }
        );

        return blog.matchedCount === 1;
    },
    async deleteBlog(blogId: string): Promise<boolean> {
        const deleteResult = await blogsCollection.deleteOne({
            _id: new ObjectId(blogId),
        })

        return deleteResult.deletedCount === 1;
    },
    // async deleteBlog(blogId: string): Promise<void> {
    //     const deleteResult = await blogsCollection.deleteOne({
    //         _id: new ObjectId(blogId),
    //     })
    //     if (deleteResult.deletedCount < 1) {
    //         throw new Error('Blog not exist');
    //     }
    //     return;
    // }

}