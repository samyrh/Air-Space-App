import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../layers/Home.jsx";
import Login from "../components/authentification/Login.jsx";
import GuestRegister from "../components/authentification/GuestRegister.jsx";
import ProtectedRoute from './ProtectedRoute';
import Booking from "../layers/Booking.jsx";
import Inbox from "../layers/Inbox.jsx";
import ContactsHost from "../layers/ContactsHost.jsx";
import AboutSection from "../layers/AboutLayer.jsx";
import ServicesLayer from "../layers/ServicesLayer.jsx";
import BecomeHost from "../components/BecomeHost.jsx";

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
        <Route path="/inbox" element={
            <ProtectedRoute>
                <Inbox />
            </ProtectedRoute>
        } />
        <Route path="/guest/contacts" element={
            <ProtectedRoute>
                <ContactsHost   />
            </ProtectedRoute>
        } />
        <Route path="/about" element={
            <ProtectedRoute>
                <AboutSection   />
            </ProtectedRoute>
        } />
        <Route path="/services" element={
            <ProtectedRoute>
                <ServicesLayer   />
            </ProtectedRoute>
        } />
        <Route path="/becomeHost" element={
            <ProtectedRoute>
                <BecomeHost   />
            </ProtectedRoute>
        } />
    </Routes>
);

export default AppRoutes;
