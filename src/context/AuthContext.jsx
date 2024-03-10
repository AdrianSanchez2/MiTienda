import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    const login = (name, email) => {
        let role = "user";
        if (email.includes("@admin")) {
            role = "admin";
        }
        const userData = {name, email, role};
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, setIsAddProductModalOpen, setIsLoggedIn, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}