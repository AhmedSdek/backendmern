import { CheckCircleOutline } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SuccessPage() {
    const nav = useNavigate()
    return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)', gap: 2 }}>
            <CheckCircleOutline color='success' sx={{ fontSize: '100px' }} />
            <Typography variant='h3'>
                Success Order
            </Typography>
            <Button variant='contained' onClick={() => nav('/')}>
                Go To Home
            </Button>
        </Stack>
    )
}

export default SuccessPage