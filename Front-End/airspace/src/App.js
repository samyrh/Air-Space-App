// src/App.js
import React from 'react';
import './App.css';  // Global styles for the app
import Navbar from './components/Navbar.jsx';  // Import Navbar component
import SearchComponent from './components/SearchBar.jsx';  // Import SearchComponent
import CategoryBar from './components/CategoryBar..jsx';  // Corrected import for CategoryBar
import CardContainer from './components/CardContainer.jsx';
function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <SearchComponent />
                <CategoryBar />
                <CardContainer />
            </div>
        </div>
    );
}

export default App;  // Export App component as default
