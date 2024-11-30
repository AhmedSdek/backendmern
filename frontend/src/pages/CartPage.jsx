import { Box, Button, ButtonGroup, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useCart } from "../context/cart/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const { cartItems, totalAmount, updateItemInCart, removeItemfromCart, clearCart } = useCart();
    const handelQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            return;
        }
        updateItemInCart(productId, quantity)
    }
    const handelRemove = (productId) => {
        removeItemfromCart(productId);
    }
    const nav = useNavigate()
    return (
        <Container sx={{ mt: 2 }}>
            <Typography>My Cart</Typography>
            <Button variant="contained" disabled={cartItems.length <= 0} color="error" onClick={() => {
                clearCart()
            }}>
                Clear Cart
            </Button>
            {cartItems.map((i, index) => {
                return (
                    <Stack key={index} sx={{ justifyContent: "space-between", alignItems: "center", flexDirection: 'row' }}>
                        <img src={i.image} alt="" width={150} />
                        <Typography>
                            {i.title}
                        </Typography>
                        <Typography>
                            {i.quantity} x {i.unitPrice} EGP
                        </Typography>
                        <ButtonGroup variant="contained">
                            <Button onClick={() => { handelQuantity(i.productId, i.quantity + 1) }}>
                                +
                            </Button>
                            <Button disabled>
                                {i.quantity}
                            </Button>
                            <Button onClick={() => { handelQuantity(i.productId, i.quantity - 1) }}>
                                -
                            </Button>
                            <Button onClick={() => { handelRemove(i.productId) }} color="error">
                                Remove
                            </Button>
                        </ButtonGroup>
                    </Stack>
                );
            })}
            <Box>
                {cartItems.length > 0 ?
                    <Stack>
                        <Typography>
                            Total Amount :{totalAmount.toFixed(2)}
                        </Typography>
                        <Button variant="contained" onClick={() => { nav('/checkout') }}>
                            Check out
                        </Button>
                    </Stack>
                    :
                    <Typography>
                        cart is emty
                    </Typography>
                }
            </Box>
        </Container>
    );
}

export default CartPage;
