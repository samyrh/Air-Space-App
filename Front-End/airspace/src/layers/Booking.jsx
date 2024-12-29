
import React from 'react';
import Navbar from "../components/Navbar.jsx";

import Footer from "../components/Footer.jsx";
import BookingCard from "../components/BookingCard.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";
import Pics from "../components/Pics.jsx";



const Booking = () => {
    return (
        <div>
            <Navbar />
            <Pics/>
            <BookingCard/>
            <ScrollToTopButton/>
            <Footer />
        </div>
    );
};

export default Booking;
