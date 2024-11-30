import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useCart } from "../context/cart/CartContext";
import { baseUrl } from "../constans/baseUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
function CheckOutPage() {
    const { cartItems, totalAmount } = useCart();
    const [err, seterr] = useState(false);
    const addressRef = useRef(null)
    const { token } = useAuth()
    const nav = useNavigate()
    const handelConfirm = async (e) => {
        e.preventDefault()
        const address = addressRef.current.value;
        if (!address) {
            // seterr(true);
            return;
        }
        try {
            const res = await fetch(`${baseUrl}/cart/checkout`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    address,
                })
            });
            if (!res.ok) {
                // seterr('email or password wrong please try another')
                return;
            }
            nav('/success')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container sx={{ mt: 2 }}>
            <Typography>Check Out</Typography>

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

                    </Stack>
                );
            })}
            <Box>

                <Stack>
                    <Typography>
                        Total Amount :{totalAmount.toFixed(2)}
                    </Typography>
                    <Stack component='form' onSubmit={(e) => handelConfirm(e)} gap={2}>
                        <TextField inputRef={addressRef} name='address' label="delivery Address" />
                        <Button type="submit" variant="contained" disabled={err} >
                            Confirm
                        </Button>
                    </Stack>
                </Stack>

            </Box>
        </Container>
    );
}

export default CheckOutPage