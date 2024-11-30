import { Container } from '@mui/material'
import React from 'react'
import Products from '../component/Products'

function HomePage() {
    return (
        <Container sx={{ mt: 2 }}>
            <Products />
        </Container>
    )
}

export default HomePage