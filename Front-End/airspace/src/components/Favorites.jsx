import React from 'react';
import '../assets/components/Favorites.css'; // Import custom CSS for styling

const Favorites = () => {
    const properties = [
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'Cozy Cottage',
            location: 'Paris, France',
            price: 120
        },
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'Modern Loft',
            location: 'New York, USA',
            price: 200
        },
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'Beachfront Villa',
            location: 'Malibu, USA',
            price: 350
        },
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'Mountain Cabin',
            location: 'Aspen, USA',
            price: 180
        },
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'City Apartment',
            location: 'Tokyo, Japan',
            price: 150
        },
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'Luxury Penthouse',
            location: 'London, UK',
            price: 500
        },
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'Downtown Studio',
            location: 'Berlin, Germany',
            price: 140
        },
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'Suburban Retreat',
            location: 'Sydney, Australia',
            price: 220
        },
        {
            image: require('../assets/images/pic1.jpg'),
            name: 'Countryside Villa',
            location: 'Rome, Italy',
            price: 250
        }
    ];

    return (
        <div className="favorites-container">
            {/* First Section: Favorite Properties */}
            <section className="favorites-section">
                <h2 className="favorites-title">Your Favorite Properties</h2>
                <div className="favorites-grid">
                    {properties.map((property, index) => (
                        <div key={index} className="property-card">
                            <div className="property-image-container">
                                <img
                                    src={property.image}
                                    alt={property.name}
                                    className="property-image"
                                />
                            </div>
                            <div className="property-info">
                                <h3 className="property-name">{property.name}</h3>
                                <p className="property-location">{property.location}</p>
                                <p className="property-price">${property.price} / night</p>
                            </div>
                            <div className="button-container">
                                <button className="favorite-remove-btn">Remove</button>
                                <button className="book-now-btn">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
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
                        <img src={require('../assets/images/favo.jpg')} alt="Staybnb"/>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Favorites;
