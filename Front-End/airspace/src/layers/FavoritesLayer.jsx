
import React from 'react';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Favorites from "../components/Favorites.jsx";

const FavoritesLayer = () => {
    return (
        <div>
            <Navbar />
            <Favorites/>
            <Footer/>
        </div>
    );
};

export default FavoritesLayer;
