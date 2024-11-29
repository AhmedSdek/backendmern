import express from 'express';
import validatejwt from '../middlwear/validatejwt.js';
import { addItemToCart, clearItemInCart, deleteItemInCart, getActiveCartforUser, updateItemInCart } from '../services/cartService.js';

const router = express.Router();

router.get('/',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const cart = await getActiveCartforUser({ userId });
            res.send(cart)
        } catch (err) {
            console.log(err)
        }
    });


router.post('/',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const { productId, quantity } = req.body;
            const response = await addItemToCart({ userId, productId, quantity });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
        }
    });


router.put('/',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const { productId, quantity } = req.body;
            const response = await updateItemInCart({ userId, productId, quantity });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
        }
    });


router.delete('/:productId',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const { productId } = req.params;
            const response = await deleteItemInCart({ userId, productId });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
        }
    });

router.delete('/',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const response = await clearItemInCart({ userId });
            res.status(response.statusCode).send(response.data);
        } catch (err) {
            console.log(err)
        }
    });
export default router