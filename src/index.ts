import express, {Request, Response} from 'express';
import {productsRouter} from "./routers/products-router";

const app = express();
const PORT = process.env.PORT || 5001;

const parserMiddleware = express.json()
app.use(parserMiddleware)

app.get('/',(req:Request, res:Response)=>{
    res.status(200).send('Hello World')
})

app.use('/products', productsRouter)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
