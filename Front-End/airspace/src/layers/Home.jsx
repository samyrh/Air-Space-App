
import React from 'react';
import Navbar from "../components/Navbar.jsx";
import CategoryBar from "../components/CategoryBar..jsx";
import SearchBar from "../components/SearchBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
import TravelIdeas from "../components/TravelIdeas.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";


const Home = () => {
    return (
        <div>
            <Navbar />
            <SearchBar/>
            <CategoryBar/>
            <CardContainer/>
            <TravelIdeas/>
            <ScrollToTopButton/>
            <Footer />
        </div>
    );
};

export default Home;
