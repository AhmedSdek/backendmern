import express from 'express'
import { productModel } from '../models/productModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).send(products)
    } catch (err) {
        console.log(err)
        res.status(500).send('something wrong');
    }
});
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newProduct = await productModel.create(data);
        newProduct.save();
        res.status(201).send(newProduct)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

export default router;
