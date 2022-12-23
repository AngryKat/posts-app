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
    };

    const logoutHandler = () => {
        setToken(null);
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
}