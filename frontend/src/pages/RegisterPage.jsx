import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { baseUrl } from '../constans/baseUrl'
import { useAuth } from '../context/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const [err, seterr] = useState("")
    const firstNameref = useRef()
    const lastNameref = useRef()
    const emailref = useRef()
    const passwordref = useRef()
    const { login } = useAuth();
    const nav = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault()
        const firstName = firstNameref.current.value;
        const lastName = lastNameref.current.value;
        const email = emailref.current.value;
        const password = passwordref.current.value;
        try {
            const res = await fetch(`${baseUrl}/user/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });
            if (!res.ok) {
                seterr('email or password wrong please try another')
                return;
            }
            const token = await res.json();
            if (!token) {
                seterr('invalid token')
                return;
            }
            login(email, token);
            console.log(token)
            nav('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Typography>
                RegisterPage
            </Typography>
            <Stack component='form' onSubmit={(e) => {
                onSubmit(e)
            }} gap={2} mt={2}>
                <TextField inputRef={firstNameref} label="First Name" type='text' name='firstName' />
                <TextField inputRef={lastNameref} label="Last Name" type='text' name='LastName' />
                <TextField inputRef={emailref} label="Email" type='email' name='email' />
                <TextField inputRef={passwordref} label="Password" type='Password' name='password' />
                {err && <Typography variant='caption' color='error'>{err}</Typography>}
                <Button variant='contained' type='submit'>
                    Register
                </Button>
            </Stack>
        </Container >
    )
}

export default RegisterPage