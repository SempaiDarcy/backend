import {PostsType} from "../models/posts";
import {db} from "../db/db";

export const postsRepository = {
    getPosts(): PostsType[] {
        return db.posts
    },
    getPostsById(postId: string): PostsType | null {
        const post = db.posts.find(el => el.id === postId);
        return post || null;
    },
    createPosts(
        title: string,
        shortDescription: string,
        content: string,
        blogId: string,
        blogName: string
    ): PostsType {
        const newPost: PostsType = {
            id: (db.posts.length + 1).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName
        }
        db.posts.push(newPost)
        return newPost
    },
    updatePosts(
        title: string,
        shortDescription: string,
        content: string,
        blogId: string,
        postId: string
    ) {
        let post = db.posts.find(el => el.id === postId);
        if (!post) {
            return false
        }
        post.title = title;
        post.shortDescription = shortDescription;
        post.content = content;
        post.blogId = blogId;
        // post.blogName = blog!.name;

        return true
    },
    deletePosts(postId: string): boolean {
        const originalLength = db.posts.length;
        db.posts = db.posts.filter(el => el.id !== postId);
        return db.posts.length !== originalLength
    }
}