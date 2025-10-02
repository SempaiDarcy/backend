import {ObjectId} from "mongodb";

export type BlogsType = {
    _id?: ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMemberShip: string
}