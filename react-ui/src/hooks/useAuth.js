import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const {userName, login, logout, 
           loading, setLoading
        } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const BASE_URL = "http://localhost:5003/api"
    
    const loginWithUserName = async (userName, password) => {
        setError(null);
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/Usuario/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            });
            console.log(response)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al iniciar sesión');
            }
            console.log(response)
            const result = await response.json();
            login(result.username);

        } catch (error) {
            setError(error.message);
        }
        finally { 
            setLoading(false)
        }
    }
    
    const logOut = async () => {
        logout() 
    }

    return {userName, error, loading, 
            loginWithUserName, logOut
    }
}