import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if user is logged in by checking if JWT exists in localStorage
    const token = localStorage.getItem('jwt');

    // If the token doesn't exist, redirect to login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If the user is logged in, render the child route
    return children;
};

export default ProtectedRoute;
