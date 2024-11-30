import express from 'express';
import validatejwt from '../middlwear/validatejwt.js';
import { addItemToCart, checkout, clearCart, deleteItemInCart, getActiveCartforUser, updateItemInCart } from '../services/cartService.js';

const router = express.Router();

router.get('/',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const cart = await getActiveCartforUser({ userId, productDetails: true });
            res.send(cart)
        } catch (err) {
            console.log(err);
            res.status(500).send(err)
        }
    });

router.post('/items',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const { productId, quantity } = req.body;
            const response = await addItemToCart({ userId, productId, quantity });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    });

router.put('/items',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const { productId, quantity } = req.body;
            const response = await updateItemInCart({ userId, productId, quantity });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    });

router.delete('/items/:productId',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const { productId } = req.params;
            const response = await deleteItemInCart({ userId, productId });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    });

router.delete('/',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const response = await clearCart({ userId });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    });

router.post('/checkout',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const { address } = req.body;
            const response = await checkout({ userId, address });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    });
export default router