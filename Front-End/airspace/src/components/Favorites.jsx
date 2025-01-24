import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; // Import custom CSS for styling
import '../assets/components/Favorites.css';

const Favorites = () => {
    const [guestId, setGuestId] = useState(null); // State to hold the decoded guestId
    const [favorites, setFavorites] = useState([]); // State to hold the favorites for the guest
    const [notification, setNotification] = useState(""); // State for showing notification
    const [showNotification, setShowNotification] = useState(false); // State for triggering notification visibility

    useEffect(() => {
        const token = localStorage.getItem("jwt"); // Retrieve the JWT token
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const extractedGuestId = decodedToken.guestId;
                setGuestId(extractedGuestId);

                // Fetch favorites from localStorage
                const storedFavorites = JSON.parse(localStorage.getItem(extractedGuestId)) || [];
                setFavorites(storedFavorites);
                console.log(storedFavorites);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.warn('No JWT token found in localStorage.');
        }
    }, []);

    // Handle removing a property from favorites
    const removeFromFavorites = (propertyId) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== propertyId);
        setFavorites(updatedFavorites);
        if (guestId) {
            localStorage.setItem(guestId, JSON.stringify(updatedFavorites));
        }

        // Show notification with more text
        setNotification("You have successfully removed this property from your favorites. Check out other amazing places on Staybnb!");
        setShowNotification(true); // Show the notification

        // Automatically hide notification after 5 seconds
        setTimeout(() => {
            setShowNotification(false); // Hide the notification
        }, 5000); // Duration increased to 5 seconds
    };

    // Handle closing the notification
    const closeNotification = () => {
        setShowNotification(false); // Hide notification when close button (X) is clicked
    };

    return (
        <div className="favorites-container">
            {/* Notification Pop-up */}
            {showNotification && (
                <div className="notification active">
                    <button className="close-btn" onClick={closeNotification}>×</button>
                    <p>{notification}</p>
                </div>
            )}

            {/* First Section: Favorite Properties */}
            <section className="favorites-section">
                <h2 className="favorites-title">Your Favorite Properties</h2>
                <div className="favorites-grid">
                    {favorites.length === 0 ? (
                        <div className="empty-wishlist-container">
                            <i className="fa fa-bag-shopping"></i>
                            <p>Your wishlist is empty!</p>
                        </div>
                    ) : (
                        favorites.map((property) => (
                            <div key={property.id} className="property-card">
                                <div className="property-image-container">
                                    {/* Loop through the images list and display each one */}
                                    {property.images && property.images.length > 0 ? (
                                        property.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`${property.name} - Image ${index + 1}`}
                                                className="property-image"
                                            />
                                        ))
                                    ) : (
                                        <div className="empty-wishlist-container">
                                            <i className="fa fa-heart-broken"></i>
                                            <p>Wishlist is empty</p>
                                        </div>
                                    )}
                                </div>
                                <div className="property-info">
                                    <h3 className="property-name">{property.name}</h3>
                                    <p className="property-location">{property.city}</p>
                                    <p className="property-price">${property.pricePerNight} / night</p>
                                </div>
                                <div className="button-container">
                                    <button
                                        className="favorite-remove-btn"
                                        onClick={() => removeFromFavorites(property.id)}
                                    >
                                        Remove
                                    </button>

                                    <button className="book-now-btn">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* About Section */}
            <section className="bio-section">
                <h2 className="bio-title">About Staybnb</h2>
                <div className="bio-content">
                    <div className="bio-text-content">
                        <p>
                            Welcome to Staybnb, your trusted platform for discovering unique and memorable stays all
                            around the world.
                        </p>
                        <p>
                            Our mission is to connect travelers with authentic properties that offer comfort,
                            convenience, and a touch of local culture.
                        </p>
                        <p>
                            Join the Staybnb community today and explore new destinations, discover hidden gems, and
                            experience the world like never before!
                        </p>
                        <p>
                            Staybnb was created by Sami and Mehdi, two passionate individuals dedicated to providing
                            exceptional travel experiences.
                        </p>
                        <p>
                            We are students from Morocco, and our goal is to bridge the gap between travelers and the
                            best accommodations the world has to offer. Whether you're looking for a peaceful retreat or
                            an exciting urban escape, Staybnb is here to help you find your perfect stay.
                        </p>
                    </div>
                    <div className="bio-image-content">
                        <img src={require('../assets/images/favo.jpg')} alt="Staybnb" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Favorites;
