import {BlogsType} from "../models/blogs";
import {db} from "../db/db";

export const blogsRepository = {
    getBlogs(): BlogsType[] {
        return db.blogs
    },
    getBlocksById(blogId: string): BlogsType | null {
        const blog = db.blogs.find(el => el.id === blogId);
        return blog || null
    },
    createBlog(name: string, description: string, websiteUrl: string): BlogsType {
        const newBlog: BlogsType = {
            id: (db.blogs.length + 1).toString(),
            name,
            description,
            websiteUrl
        }
        db.blogs.push(newBlog);
        return newBlog;
    },
    updateBlog(blogId: string, name: string, description: string, websiteUrl: string): boolean {
        const blog = db.blogs.find(el => el.id === blogId);
        if (!blog) return false;

        blog.name = name;
        blog.description = description;
        blog.websiteUrl = websiteUrl;

        return true;
    },
    deleteBlog(blogId: string): boolean {
        const originalLength = db.blogs.length;
        db.blogs = db.blogs.filter(el => el.id !== blogId);
        return db.blogs.length !== originalLength
    }

}