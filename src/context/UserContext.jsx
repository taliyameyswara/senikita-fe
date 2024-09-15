// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');
        const profile_picture = localStorage.getItem('profile_picture');
        const email = localStorage.getItem('email');
        if (token && role) {
            setUser({ token, role, name, profile_picture });
        }
        if (email) {
            setEmail(email);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('profile_picture', userData.profile_picture);
        setUser({ token: userData.token, role: userData.role, name: userData.name, profile_picture: userData.profile_picture });

    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        localStorage.removeItem('profile_picture');
    };

    const setEmailOTP = (email) => {
        localStorage.setItem('email', email);
        setEmail(email);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading, setEmailOTP, email }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
