import express from 'express';

const app = express();

const PORT = process.env.PORT || 5001;
app.get('/',(req,res)=>{
    res.status(200).send('Hello World')
})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
