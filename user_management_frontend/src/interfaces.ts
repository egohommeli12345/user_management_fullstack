export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface RegisterUser {
    username: string;
    email: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
}

export interface AuthContextType {
    authState: AuthState;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}
