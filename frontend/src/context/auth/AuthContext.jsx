import { createContext, useContext } from "react";

export const AuthContext = createContext({
    userName: null,
    toke: null,
    Login: () => { },
    isAuthenticated: false,
    logout: () => { },
    getMyOrders: () => { },
    orders: []
});

export const useAuth = () => useContext(AuthContext);
