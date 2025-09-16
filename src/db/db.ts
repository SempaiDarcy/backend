
import { ProductType } from '../models/product'
import { VideosType } from '../models/video'
import {BlogsType} from "../models/blogs";

export const db = {
    products: [] as ProductType[],
    videos: [] as VideosType[],
    blogs: [] as BlogsType[]
}
