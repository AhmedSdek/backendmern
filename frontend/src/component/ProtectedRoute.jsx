import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth/AuthContext'

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to='/login' replace={true} />
    }
    return (
        <Outlet />
    )
}

export default ProtectedRoute