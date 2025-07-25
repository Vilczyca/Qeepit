import { createContext, useContext, useEffect, useState } from 'react';
import api from '@shared/api/api';
import { saveToken, getToken, removeToken } from '@platform/tokenStorage';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await getToken();
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsAuthenticated(true);
            }
        })();
    }, []);

    const login = async (token) => {
        await saveToken(token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await removeToken();
        delete api.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
    };

    return (
        <LoginContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
