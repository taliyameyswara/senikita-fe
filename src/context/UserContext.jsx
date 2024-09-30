// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Parse the user data from localStorage
        const storedEmail = localStorage.getItem('email'); // Get email separately if needed

        if (storedUser) {
            setUser(storedUser); // Set the user data directly from the parsed object
        }

        if (storedEmail) {
            setEmail(storedEmail); // Set email separately
        }

        setLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const refresh = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user object from localStorage
        localStorage.removeItem('email'); // Remove email if necessary
        localStorage.removeItem('token'); // Remove email if necessary
        localStorage.removeItem('role'); // Remove email if necessary
    };

    const setEmailOTP = (email) => {
        localStorage.setItem('email', email);
        setEmail(email);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading, setEmailOTP, email, refresh }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
