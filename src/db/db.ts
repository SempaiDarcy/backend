import {ProductType} from '../models/product'
import {VideosType} from '../models/video'
import {BlogsType} from "../models/blogs";
import {PostsType} from "../models/posts";
import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";

dotenv.config()

export const db = {
    products: [] as ProductType[],
    videos: [] as VideosType[],
    blogs: [] as BlogsType[],
    posts: [] as PostsType[]
}

const url = process.env.MONGO_URL
console.log('url :', url);
if (!url) {
    throw new Error('❗URL doesn\'t found')
}
const client = new MongoClient(`${url}`);
const dbName = 'shop-dev';

export const dbInstance = client.db(dbName);

export const productCollection = dbInstance.collection<ProductType>('products');
export const blogsCollection = dbInstance.collection<BlogsType>('blogs')
export const postsCollection = dbInstance.collection<PostsType>('posts')


export const runDb = async () => {
    try {
        await client.connect();
        console.log(' ✅ Connected successfully to server');
    } catch (e) {
        console.log('❗Don\'t connected successfully to server');
        await client.close()
    }
}