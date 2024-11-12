// src/App.js
import React from 'react';
import './App.css';  // Global styles for the app
import Navbar from './components/Navbar.jsx';  // Import Navbar component
import SearchComponent from './components/SearchBar.jsx';  // Import SearchComponent
import CategoryBar from './components/CategoryBar..jsx';  // Corrected import for CategoryBar
import Card from './components/Card.jsx';
function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <SearchComponent />
                <CategoryBar />
                <div className="card-container">

                <Card

                    title="Beautiful Beach House"
                    description="A lovely beachfront house with great views and modern amenities."
                    price="$199 / night"
                    location="Malibu, CA"
                    rating={4.8}
                />
                <Card

                    title="Beautiful Beach House"
                    description="A lovely beachfront house with great views and modern amenities."
                    price="$199 / night"
                    location="Malibu, CA"
                    rating={4.8}
                />  <Card

                title="Beautiful Beach House"
                description="A lovely beachfront house with great views and modern amenities."
                price="$199 / night"
                location="Malibu, CA"
                rating={4.8}
            />  <Card

                title="Beautiful Beach House"
                description="A lovely beachfront house with great views and modern amenities."
                price="$199 / night"
                location="Malibu, CA"
                rating={4.8}
            />  <Card

                title="Beautiful Beach House"
                description="A lovely beachfront house with great views and modern amenities."
                price="$199 / night"
                location="Malibu, CA"
                rating={4.8}
            />  <Card

                title="Beautiful Beach House"
                description="A lovely beachfront house with great views and modern amenities."
                price="$199 / night"
                location="Malibu, CA"
                rating={4.8}
            />  <Card

                title="Beautiful Beach House"
                description="A lovely beachfront house with great views and modern amenities."
                price="$199 / night"
                location="Malibu, CA"
                rating={4.8}
            />

                </div>
            </div>
        </div>
    );
}

export default App;  // Export App component as default
