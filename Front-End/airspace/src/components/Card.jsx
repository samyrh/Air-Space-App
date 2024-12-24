import React, { useState } from 'react';
import '../assets/components/Card.css';

const Card = ({ property }) => {
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
                <div className="card-rl">
                    {/* Location */}
                    <div className="card-location">
                        <p>{property.city}</p>
                    </div>
                    <div className="card-rating">
                        <span className="stars">★</span>
                        <span className="rating-text">{property.rating}/5</span>
                    </div>
                </div>
                {/* Type */}
                <div className="card-type">
                    <span>{property.type}</span>
                </div>
                {/* Price */}
                <div className="card-details">
                    <div className="card-price">
                        <span>${property.price} / night</span>
                    </div>
                </div>

                {/* More Details Button */}
                <button className="more-details-btn">More Details</button>

            </div>
        </div>
    );
};

const CardContainer = ({ properties, onLoadMore, onShowLess }) => {
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
