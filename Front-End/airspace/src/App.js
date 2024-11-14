// src/App.js
import React from 'react';
import './App.css';  // Global styles for the app
import Navbar from './components/Navbar.jsx';  // Import Navbar component
import SearchComponent from './components/SearchBar.jsx';  // Import SearchComponent
import CategoryBar from './components/CategoryBar..jsx';  // Corrected import for CategoryBar
import CardContainer from './components/CardContainer.jsx'; // Import CardContainer component
import Footer from './components/Footer.jsx';  // Import Footer component
import TravelIdeas from './components/TravelIdeas.jsx';
function App() {
    return (
        <div className="App">
            <Navbar />
            <div>
                {/* Any additional content can go here */}
            </div>
            <div className="container">
                <SearchComponent />
                <CategoryBar />
                <CardContainer />
                <TravelIdeas/>
            </div>

                <Footer />

        </div>
    );
}

export default App;  // Export App component as default
