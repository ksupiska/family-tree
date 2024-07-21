import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../database/firebase'; // Импортируйте auth из вашего файла конфигурации

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const isAuthenticated = !!auth.currentUser;
    const location = useLocation();

    return isAuthenticated ? (
        element
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
