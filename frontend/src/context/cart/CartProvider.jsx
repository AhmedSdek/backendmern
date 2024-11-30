import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { baseUrl } from "../../constans/baseUrl";
import { useAuth } from "../auth/AuthContext";
const CartProvider = ({ children }) => {
    const { token } = useAuth()
    const [cartItems, setCartItems] = useState([]);
    const [err, setErr] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCart = async () => {
            const res = await fetch(`${baseUrl}/cart`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                setErr('faild to fetch ')
            }
            const cart = await res.json();
            const cartItemsMaped = cart.items.map(({ product, quantity, unitPrice }) => ({ productId: product._id, title: product.title, image: product.image, quantity, unitPrice }))
            setCartItems(cartItemsMaped);
            setTotalAmount(cart.totalAmount)
        }
        fetchCart()
    }, [token]);

    const addItemToCart = async (productId) => {
        try {
            const res = await fetch(`${baseUrl}/cart/items`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1
                })
            });
            if (!res.ok) {
                setErr("faild to add product to cart")
            }
            const cart = await res.json();
            if (!cart) {
                setErr("faield to parse cart")
            }
            const cartItemsMaped = cart.items.map(({ product, quantity }) => ({ productId: product._id, title: product.title, image: product.image, quantity, unitPrice: product.unitPrice }))
            setCartItems([...cartItemsMaped]);
            setTotalAmount(cart.totalAmount)
        } catch (err) {
            console.log(err)
        }
        console.log(productId)
    }
    const updateItemInCart = async (productId, quantity) => {
        try {
            const res = await fetch(`${baseUrl}/cart/items`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity
                })
            });
            if (!res.ok) {
                setErr("faild to update product to cart")
            }
            const cart = await res.json();
            if (!cart) {
                setErr("faield to parse cart")
            }
            const cartItemsMaped = cart.items.map(({ product, quantity, unitPrice }) => ({ productId: product._id, title: product.title, image: product.image, quantity, unitPrice }))
            setCartItems([...cartItemsMaped]);
            setTotalAmount(cart.totalAmount)
        } catch (err) {
            console.log(err)
        }
    }
    const removeItemfromCart = async (productId) => {
        try {
            const res = await fetch(`${baseUrl}/cart/items/${productId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                setErr("faild to delete product from cart")
            }
            const cart = await res.json();
            if (!cart) {
                setErr("faield to parse cart")
            }
            const cartItemsMaped = cart.items.map(({ product, quantity, unitPrice }) => ({ productId: product._id, title: product.title, image: product.image, quantity, unitPrice }))
            setCartItems([...cartItemsMaped]);
            setTotalAmount(cart.totalAmount)
        } catch (err) {
            console.log(err)
        }
    }
    const clearCart = async () => {
        try {
            const res = await fetch(`${baseUrl}/cart`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                setErr("faild to clear products from cart")
            }
            const cart = await res.json();
            if (!cart) {
                setErr("faield to parse cart")
            }

            setCartItems([]);
            setTotalAmount(0)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <CartContext.Provider
            value={{ cartItems, totalAmount, addItemToCart, updateItemInCart, removeItemfromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
export default CartProvider;
