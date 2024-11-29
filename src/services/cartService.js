import { cartModel } from "../models/cartModel.js"
import { productModel } from "../models/productModel.js";

const creatCartforUser = async ({ userId }) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 });
    await cart.save();
    return cart;
};

export const getActiveCartforUser = async ({ userId }) => {
    let cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) {
        try {
            cart = await creatCartforUser({ userId });
        } catch (err) {
            console.log(err)
        }
    }
    return cart;
};

export const addItemToCart = async ({ userId, productId, quantity }) => {
    const cart = await getActiveCartforUser({ userId });
    const existInCArt = cart.items.find((p) => p.product.toString() === productId);
    if (existInCArt) {
        return { data: "Item already exist in cart", statusCode: 200 }
    };
    const product = await productModel.findById(productId);
    if (!product) {
        return { data: "product not found", statusCode: 400 }
    };
    if (product.stock < quantity) {
        return { data: "low stock", statusCode: 400 }
    }
    cart.items.push({ product: productId, unitPrice: product.price, quantity });
    cart.totalAmount += product.price * quantity;
    const updatetCart = await cart.save();
    return { data: updatetCart, statusCode: 200 }
}

export const updateItemInCart = async ({ userId, productId, quantity }) => {
    const cart = await getActiveCartforUser({ userId });
    const existInCArt = cart.items.find((p) => p.product.toString() === productId);
    if (!existInCArt) {
        return { data: "item does not exist in cart", statusCode: 400 }
    }
    const product = await productModel.findById(productId);
    if (!product) {
        return { data: "product not found", statusCode: 400 }
    };
    if (product.stock < quantity) {
        return { data: "low stock", statusCode: 400 }
    }
    const othercartitem = cart.items.filter((p) => p.product.toString() !== productId);
    let total = othercartitem.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum
    }, 0);
    existInCArt.quantity = quantity;
    total += existInCArt.quantity * existInCArt.unitPrice;
    cart.totalAmount = total;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 }
}


export const deleteItemInCart = async ({ userId, productId }) => {
    const cart = await getActiveCartforUser({ userId });
    const existInCArt = cart.items.find((p) => p.product.toString() === productId);
    if (!existInCArt) {
        return { data: "item does not exist in cart", statusCode: 400 }
    }
    const othercartitem = cart.items.filter((p) => p.product.toString() !== productId);
    const total = othercartitem.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum
    }, 0);
    cart.items = othercartitem;
    cart.totalAmount = total;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 }
}

export const clearItemInCart = async ({ userId }) => {
    const cart = await getActiveCartforUser({ userId });
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 }
}