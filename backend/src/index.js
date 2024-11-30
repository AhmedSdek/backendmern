import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json())
app.use(cors())
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(err));

// app.use('/user', userRouter);
// app.use('/product', productRouter);
// app.use('/cart', cartRouter);

app.get('/', (req, res) => {
    res.send("welcom")
})
app.listen(port, () => {
    console.log(`Server is runing at http://localhost:${port}`);
});
