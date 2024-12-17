// src/App.js
import React from 'react';
import './App.css';  // Global styles for the app
import Navbar from './components/Navbar.jsx';  // Import Navbar component
import SearchComponent from './components/SearchBar.jsx';  // Import SearchComponent
import CategoryBar from './components/CategoryBar..jsx';  // Corrected import for CategoryBar
import CardContainer from './components/CardContainer.jsx'; // Import CardContainer component
import Footer from './components/Footer.jsx';  // Import Footer component
import TravelIdeas from './components/TravelIdeas.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import StaybnbGallery from './components/Pics.jsx'
import BookingCard from "./components/BookingCard.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/authentification/Login.jsx"; // Adjust the path as needed
import Register from "./components/authentification/GuestRegister.jsx"; // Adjust the path as needed

function App() {
    return (
        <div className="App">
            {
                /*
                <Navbar />

            <div className="container">
                <StaybnbGallery/>

            </div>
            <div className="container">
                <BookingCard/>
            </div>
            <ScrollToTopButton />
            <Footer />
                 */
            }

            <Router>
                <Routes>
                    {/* Route to render Login component */}
                    <Route path="/login" element={<Login />} />

                    {/* Route to render Register component */}
                    <Route path="/register" element={<Register />} />

                    {/* Optionally, you can redirect to login or a home page */}
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>

        </div>
    );
}

export default App;  // Export App component as default
