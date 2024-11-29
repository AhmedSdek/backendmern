import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = 3001;
app.use(express.json())
mongoose
    .connect("mongodb://127.0.0.1:27017/e-commerce")
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(err));

app.use('/', userRouter);
app.use('/', productRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
