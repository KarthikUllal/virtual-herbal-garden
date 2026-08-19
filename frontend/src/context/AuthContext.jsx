import { createContext, useContext, useState } from "react";
import {
    loginUser,
    registerUser
} from "../services/auth.service";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
        ? JSON.parse(savedUser)
        : null;
});

const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
});

    const register = async (userData) => {
        const response = await registerUser(userData);

        return response;
    };

    const login = async (userData) => {
        const response = await loginUser(userData);

        const { token, user } = response.data;

        setToken(token);
        setUser(user);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return response;
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                register,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;