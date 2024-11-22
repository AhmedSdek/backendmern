import { userModel } from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
export const Register = async ({ firstName, lastName, email, password }) => {
    const findUser = await userModel.findOne({ email: email });
    if (findUser) {
        return { data: 'user already exist', statusCode: 400 }
    };
    const hashdPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({ firstName, lastName, email, password: hashdPassword });
    await newUser.save();
    return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

export const Login = async ({ email, password }) => {
    const findUser = await userModel.findOne({ email: email });
    if (!findUser) {
        return { data: 'Incorrect email or password', statusCode: 400 }
    };
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
        return { data: generateJWT({ email, firstName: findUser.firstName, lastName: findUser.lastName }), statusCode: 200 };
    }
    return { data: 'Incorrect email or password', statusCode: 400 }
}

const generateJWT = (data) => {
    return jwt.sign(data, '20bxdglpUHQ4omU7vRBXGytz5rmQdYH1')
}