import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwt');

    // Check if the token exists and is valid
    if (!token || isTokenExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    // If the user is logged in, render the child route
    return children;
};

// Function to check if token is expired
const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const expirationDate = decoded.exp * 1000; // Expiration time is in seconds
    return expirationDate < Date.now();
};

export default ProtectedRoute;
