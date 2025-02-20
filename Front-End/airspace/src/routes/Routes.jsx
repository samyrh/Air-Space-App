import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../layers/Home.jsx";
import Login from "../components/authentification/Login.jsx";
import GuestRegister from "../components/authentification/GuestRegister.jsx";
import ProtectedRoute from './ProtectedRoute';
import Booking from "../layers/Booking.jsx";
import ContactsHost from "../layers/ContactsHost.jsx";
import AboutSection from "../layers/AboutLayer.jsx";
import ServicesLayer from "../layers/ServicesLayer.jsx";
import Chat from "../components/Chat.jsx";
import FavoritesLayer from "../layers/FavoritesLayer.jsx";
import SearchResult from "../layers/SearchResult.jsx";
import HostForm from "../components/HostForm.jsx";

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
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Chat />
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
        <Route path="/favorites" element={
            <ProtectedRoute>
                <FavoritesLayer   />
            </ProtectedRoute>
        } />
        <Route path="/results" element={
            <ProtectedRoute>
                <SearchResult  />
            </ProtectedRoute>
        } />
        <Route path="/refer-host" element={
            <ProtectedRoute>
                <HostForm  />
            </ProtectedRoute>
        } />
    </Routes>
);

export default AppRoutes;
