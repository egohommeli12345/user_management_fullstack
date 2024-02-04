import { ReactNode, createContext, useContext, useState } from "react";
import { AuthContextType, AuthState } from "./interfaces";

const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const userId = await response.text();
                console.log(JSON.stringify({ id: userId }));

                setAuthState({ isAuthenticated: true, user: userId, token: userId });
            } else {
                setAuthState(initialAuthState);
            }
        } catch (error) {
            console.log(error);
            setAuthState(initialAuthState);
        };
    };

    const logout = () => {
        setAuthState(initialAuthState);
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};