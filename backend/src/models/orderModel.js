import mongoose, { Schema } from "mongoose";


const orderItemScema = new Schema({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
const orderScema = new Schema({
    orderItems: [orderItemScema],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true, default: 0 },
});

export const orderModel = mongoose.model('order', orderScema)
