import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const login = async (userName) => {
        setUserName(userName);
        localStorage.setItem('userName', userName); 
    };

    const logout = () => {
        setUserName(null);
        localStorage.removeItem('userName');
    };

    return (
        <AuthContext.Provider value={{ userName, login, logout, 
                                       loading, setLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}