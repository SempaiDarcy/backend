import {ProductType} from "../models/product";
import {db} from "../db/db";

export const productsRepository = {
    getProducts(): ProductType[] {
        return db.products
    },
    createProduct(title: string): ProductType | null {
        if (!title.trim()) {
            return null
        }
        const newProduct: ProductType = {
            id: Date.now().toString(),
            title: title.trim()
        }
        db.products.unshift(newProduct)
        return newProduct
    },
    clearAll() {
        db.products.length = 0;
    }
}