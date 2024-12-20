import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useAuth } from '../context/auth/AuthContext';
import { baseUrl } from '../constans/baseUrl';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [err, seterr] = useState("")
    const emailref = useRef()
    const passwordref = useRef()
    const { login } = useAuth();
    const nav = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault()
        const email = emailref.current.value;
        const password = passwordref.current.value;
        try {
            const res = await fetch(`${baseUrl}/user/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
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
                Login Page
            </Typography>
            <Stack component='form' onSubmit={(e) => {
                onSubmit(e)
            }} gap={2} mt={2}>
                <TextField inputRef={emailref} label="Email" type='email' name='email' />
                <TextField inputRef={passwordref} label="Password" type='Password' name='password' />
                {err && <Typography variant='caption' color='error'>{err}</Typography>}
                <Button variant='contained' type='submit'>
                    LOgin
                </Button>
            </Stack>
        </Container >
    )
}

export default LoginPage