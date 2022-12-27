import { useContext } from "react";
import { createContext, ReactNode, useState } from "react";

type Token = string | null;

const AuthContext = createContext<{
    token: Token,
    isLoggedIn: boolean,
    login: (_: string) => void,
    logout: () => void
}>({ 
    token: '',
    isLoggedIn: false,
    login: (_: string) => {},
    logout: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<Token>(null);
    const isLoggedIn = !!token;
    
    const loginHandler = (token: string) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');

    }

    const contextValue = { 
        token,
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext) || {};