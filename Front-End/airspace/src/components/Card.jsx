import React, { useState } from 'react';
import '../assets/components/Card.css';
import { useNavigate } from 'react-router-dom';
const Card = ({ property }) => {
    console.log(property);
    const navigate = useNavigate();
    const handleMoreDetails = () => {
        // Navigate to the booking layer with the property ID
        navigate(`/booking/property/${property.id}`);
    };
    return (
        <div className="card">
            {/* Image */}

            <div className="card-image">
                <img
                    className="card-img"
                    src={property.images[0]} // Assuming the first image in the list is to be displayed
                    alt={property.title}
                />
            </div>

            {/* Card Content */}
            <div className="card-content">
                <h2 className="card-name">{property.title}</h2>
                {/* Location */}
                <div className="card-location">
                    <p>{property.city}</p>
                </div>

                {/* Type, Rating */}
                <div className="card-details-row">
                    {/* Type */}
                    <div className="card-type">
                        <span>{property.type}</span>
                    </div>
                    {/* Rating */}
                    <div className="card-rating">
                        <span className="stars">★</span>
                        <span className="rating-text">{property.rating}/5</span>
                    </div>
                </div>

                {/* Price */}
                <div className="card-price">
                    <span>${property.pricePerNight} / night</span>
                </div>


                <button className="more-details-btn" onClick={handleMoreDetails}>
                    More Details
                </button>
            </div>
        </div>
    );
};

const CardContainer = ({properties, onLoadMore, onShowLess}) => {
    const [showAll, setShowAll] = useState(false);

    const handleShowMore = () => {
        setShowAll(true);
        onLoadMore();
    };

    const handleShowLess = () => {
        setShowAll(false);
        onShowLess();
    };

    return (
        <div className="card-container-wrapper">
            {properties.map((property, index) => (
                <Card key={index} property={property} />
            ))}
            {!showAll ? (
                <button className="load-more-button" onClick={handleShowMore}>Show More</button>
            ) : (
                <button className="load-less-button" onClick={handleShowLess}>Show Less</button>
            )}
        </div>
    );
};

export { Card, CardContainer };
