import { useContext } from "react";
import { createContext, ReactNode, useState } from "react";

type Token = string | null;
type UserId = string | number;

const AuthContext = createContext<{
    userId: UserId,
    isLoggedIn: boolean,
    login: (_: string) => void,
    logout: () => void
}>({ 
    userId: '',
    isLoggedIn: false,
    login: (_: string) => {},
    logout: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<Token>(localStorage.getItem('token'));
    const [userId, setUserId] = useState<UserId>(localStorage.getItem('userId') || '');
    const isLoggedIn = !!token;
    
    const loginHandler = (user: any) => {
        setToken(user.idToken);
        setUserId(user.localId);
        localStorage.setItem('token', user.idToken);
        localStorage.setItem('userId', user.localId);
    };

    const logoutHandler = () => {
        setToken(null);
        setUserId('');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

    }

    const contextValue = { 
        userId,
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