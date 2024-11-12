import React, { useState } from 'react';
import houseImage from '../assets/images/house.jpg'; // Importing local image
import '../assets/components/Card.css';

const AirbnbCard = () => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="card-container">
            <div className="card">
                {/* Image */}
                <div className="card-image">
                    <img
                        className="card-img"
                        src={houseImage} // Using the imported local image
                        alt="Luxury Beach House"
                    />
                </div>

                {/* Card Content */}
                <div className="card-content">
                    <h2 className="card-title">Luxury Beach House</h2>
                    <p className="card-description">
                        Enjoy a beautiful getaway at this stunning beach house. Located right on the beach with amazing views and modern amenities.
                    </p>

                    {/* Price, Rating, and Location Row */}
                    <div className="card-details">
                        <div className="card-price">
                            <span>$350 / night</span>
                        </div>
                        <div className="card-rating">
                            <span className="stars">★★★★☆</span> {/* Star rating */}
                            <span className="rating-text">4.8/5</span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="card-location">
                        <p><strong>Location:</strong> Malibu, California</p>
                    </div>

                    {/* More Details Button */}
                    <button className="more-details-btn" onClick={toggleDetails}>
                        {showDetails ? 'Less Details' : 'More Details'}
                    </button>

                    {/* Show additional details if `showDetails` is true */}
                    {showDetails && (
                        <div className="additional-details">
                            <p>Located at the heart of the beach, this property offers stunning ocean views and all the amenities you need for a perfect vacation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AirbnbCard;
