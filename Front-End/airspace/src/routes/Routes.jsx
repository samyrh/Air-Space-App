import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../layers/Home.jsx";
import Login from "../components/authentification/Login.jsx";
import GuestRegister from "../components/authentification/GuestRegister.jsx";
import ProtectedRoute from './ProtectedRoute';
import Booking from "../layers/Booking.jsx";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<GuestRegister />} />
        <Route path="/" element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        } />
        {/* Dynamic property ID */}
        <Route path="/booking/property/:id" element={
            <ProtectedRoute>
                <Booking />
            </ProtectedRoute>
        } />

    </Routes>
);

export default AppRoutes;
