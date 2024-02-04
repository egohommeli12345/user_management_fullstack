import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { authState } = useAuth();
    const location = useLocation();

    if (!authState.isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};
