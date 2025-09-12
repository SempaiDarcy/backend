import {ProductType} from "../models/product";

let products: ProductType[] = [
    {id: '1', title: "tomato"},
    {id: '2', title: "banana"}

]
export const productsRepository = {
    getProducts(): ProductType[] {
        return products
    },
    createProduct(title: string): ProductType | null {
        if (!title.trim()) {
            return null
        }
        const newProduct: ProductType = {
            id: Date.now().toString(),
            title: 'New Product'
        }
        products.unshift(newProduct)
        return newProduct
    },
    clearAll() {
        products.length = 0;
    }
}