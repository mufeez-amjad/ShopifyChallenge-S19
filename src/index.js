import express from 'express';
import mongoose from 'mongoose';
import schema from './schema';
const app = express();
const PORT = 3000;

//set default route
app.get('/', (req, res) => {
    return res.json({
        msg: 'Shopify Backend Challenge'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
})