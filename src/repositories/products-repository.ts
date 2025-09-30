import {ProductType} from "../models/product";
import {productCollection} from "../db/db";

export const productsRepository = {
    async getProducts(): Promise<ProductType[]> {
        return productCollection.find({}).toArray()
    },
    async createProduct(title: string): Promise<ProductType | null> {
        if (!title.trim()) {
            return null
        }
        const result =  await productCollection.insertOne({title})
        return  {
            title:title,
            _id: result.insertedId
        }
    }
}

// export const productsRepository = {
//     getProducts(): ProductType[] {
//         return db.products
//     },
//     createProduct(title: string): ProductType | null {
//         if (!title.trim()) {
//             return null
//         }
//         const newProduct: ProductType = {
//             id: Date.now().toString(),
//             title: title.trim()
//         }
//         db.products.unshift(newProduct)
//         return newProduct
//     },
//     clearAll() {
//         db.products.length = 0;
//     }
// }