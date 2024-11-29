import mongoose, { Schema } from "mongoose";


const productScema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
});

export const productModel = mongoose.model('Product', productScema)
