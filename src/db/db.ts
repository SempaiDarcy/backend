import {ProductType} from '../models/product'
import {VideosType} from '../models/video'
import {BlogsType} from "../models/blogs";
import {PostsType} from "../models/posts";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config()

export const db = {
    products: [] as ProductType[],
    videos: [] as VideosType[],
    blogs: [] as BlogsType[],
    posts: [] as PostsType[]
}

const url = process.env.MONGO_URL
console.log('url :', url);
const client = new MongoClient(`${url}`);

export const productCollection = client.db().collection<ProductType>('products');

export const runDb = async () => {
    try {
        await client.connect();
        console.log(' ✅ Connected successfully to server');
    } catch (e) {
        console.log('❗Don\'t connected successfully to server');
        await client.close()
    }
}