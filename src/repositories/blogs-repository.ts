import { BlogsType } from "../models/blogs";
import { blogsCollection } from "../db/db";
import { ObjectId } from "mongodb";

export const blogsRepository = {
    async getBlogs(): Promise<BlogsType[]> {
        const blogs = await blogsCollection.find({}).toArray();
        return blogs.map(b => ({
            id: b._id.toString(),
            name: b.name,
            description: b.description,
            websiteUrl: b.websiteUrl,
            createdAt: b.createdAt,
            isMembership: b.isMembership
        }));
    },

    async getBlocksById(blogId: string): Promise<BlogsType | null> {
        const blog = await blogsCollection.findOne({ _id: new ObjectId(blogId) });
        if (!blog) return null;

        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        };
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType> {
        const newBlog = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        };

        const result = await blogsCollection.insertOne(newBlog);

        // достаём только нужные поля — без _id
        const createdBlog: BlogsType = {
            id: result.insertedId.toString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: newBlog.createdAt,
            isMembership: newBlog.isMembership
        };

        return createdBlog;
    },

    async updateBlog(blogId: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne(
            { _id: new ObjectId(blogId) },
            { $set: { name, description, websiteUrl } }
        );

        return result.matchedCount === 1;
    },

    async deleteBlog(blogId: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({ _id: new ObjectId(blogId) });
        return result.deletedCount === 1;
    }
};
