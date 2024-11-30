import React, { useEffect } from 'react'
import { useAuth } from '../context/auth/AuthContext'
import { Container, Stack, Typography } from '@mui/material';

function MyOrdersPage() {
    const { getMyOrders, orders } = useAuth();
    useEffect(() => {
        getMyOrders()
    }, []);
    return (
        <Container>
            <Typography>
                MyOrdersPage
            </Typography>
            {orders.map((item, index) => {
                return (
                    <Stack key={index}>
                        {item.orderItems.map((order, index2) => {
                            return (
                                <Stack sx={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }} key={index2}>
                                    <img src={order.productImage} alt="" width={150} />
                                    <Typography>
                                        {order.productTitle}
                                    </Typography>
                                    <Typography>
                                        {order.quantity} x {order.unitPrice} EGP
                                    </Typography>
                                </Stack>
                            )
                        })}
                        <Typography>
                            My Address :{item.address}
                        </Typography>
                        <Typography>
                            Total Amount :{item.total.toFixed(2)}
                        </Typography>
                    </Stack>
                )
            })}
        </Container>
    )
}

export default MyOrdersPage