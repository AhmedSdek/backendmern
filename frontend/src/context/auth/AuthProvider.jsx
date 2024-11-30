import React, { useState } from 'react'
import { AuthContext } from './AuthContext';
import { baseUrl } from '../../constans/baseUrl';
const AuthProvider = ({ children }) => {
    const USERNAME_KEY = 'userName';
    const TOKEN_KEY = 'token';
    const [userName, setUserName] = useState(localStorage.getItem(USERNAME_KEY));
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const [orders, setOrders] = useState([]);
    const login = (userName, token) => {
        setUserName(userName);
        setToken(token);
        localStorage.setItem(USERNAME_KEY, userName);
        localStorage.setItem("token", token)
    }
    const logout = () => {
        localStorage.removeItem(USERNAME_KEY)
        localStorage.removeItem(TOKEN_KEY)
        setUserName(null)
        setToken(null)
    }
    const getMyOrders = async () => {
        try {
            const res = await fetch(`${baseUrl}/user/my-orders`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                // seterr('email or password wrong please try another')
                return;
            }
            const data = await res.json();
            // console.log(data)
            setOrders([data])
        } catch (err) {
            console.log(err)
        }
    }
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={{ userName, token, login, isAuthenticated, logout, getMyOrders, orders }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;