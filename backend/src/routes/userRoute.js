import express from "express";
import { Login, Register, getMyOrders } from "../services/userService.js"
import validatejwt from "../middlwear/validatejwt.js";
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const { statusCode, data } = await Register({ firstName, lastName, email, password }); 
        res.status(statusCode).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const { statusCode, data } = await Login({ email, password });
        res.status(statusCode).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/my-orders',
    validatejwt
    , async (req, res) => {
        try {
            const userId = req.user._id;
            const { data, statusCode } = await getMyOrders({ userId });
            res.status(statusCode).send(data)
        } catch (err) {
            console.log(err);
            res.status(500).send(err)
        }
    });
export default router;