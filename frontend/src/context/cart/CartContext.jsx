import { createContext, useContext } from "react";

export const CartContext = createContext({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => { },
    updateItemInCart: () => { },
    removeItemfromCart: () => { },
    clearCart: () => { }
});

export const useCart = () => useContext(CartContext);
