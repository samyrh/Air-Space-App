
import React from 'react';
import Navbar from "../components/Navbar.jsx";

import Footer from "../components/Footer.jsx";
import BookingCard from "../components/BookingCard.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";
import Pics from "../components/Pics.jsx";
import About from "../components/About.jsx";



const AboutSection = () => {
    return (
        <div>
            <Navbar />
            <About/>
            <ScrollToTopButton/>
            <Footer />
        </div>
    );
};

export default AboutSection;
