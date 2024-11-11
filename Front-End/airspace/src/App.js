// src/App.js
import React from 'react';
import './App.css';  // Global styles for the app
import Navbar from './components/Navbar.jsx';  // Import Navbar component
import SearchComponent from './components/SearchBar.jsx';  // Import SearchComponent

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <SearchComponent />
            </div>
        </div>
    );
}

export default App;  // Export App component as default
