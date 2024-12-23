import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Use Routes instead of Router
import Home from "../layers/Home.jsx";
import Login from "../components/authentification/Login.jsx";
import GuestRegister from "../components/authentification/GuestRegister.jsx";
import ProtectedRoute from './ProtectedRoute';  // Import ProtectedRoute

const AppRoutes = () => (
    <Routes>
        {/* Always show the Login page first if the user is not logged in */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<GuestRegister />} />

        {/* Protect the Home route */}
        <Route path="/" element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        } />
    </Routes>
);

export default AppRoutes;
