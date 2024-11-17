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
                    <h2 className="card-name">Luxury Beach House</h2>
                    <div className="card-rl">
                    {/* Location */}
                    <div className="card-location">
                        <p>Malibu, California</p>
                    </div>
                    <div className="card-rating">
                        <span className="stars">★</span> {/* Star rating */}
                        <span className="rating-text">4.8/5</span>
                    </div>
                </div>
                    {/* Price, Rating, and Location Row */}
                    <div className="card-details">
                        <div className="card-price">
                            <span>$350 / night</span>
                        </div>

                    </div>


                    {/* More Details Button */}

                </div>
            </div>
        </div>
    );
};

export default AirbnbCard;
