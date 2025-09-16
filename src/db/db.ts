import {ProductType} from '../models/product'
import {VideosType} from '../models/video'
import {BlogsType} from "../models/blogs";
import {PostsType} from "../models/posts";

export const db = {
    products: [] as ProductType[],
    videos: [] as VideosType[],
    blogs: [] as BlogsType[],
    posts: [] as PostsType[]
}
