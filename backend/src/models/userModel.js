import mongoose, { Schema } from "mongoose";


const userScema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const userModel = mongoose.model('User', userScema)