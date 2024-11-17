import React, { useState } from 'react';
import Card from './Card.jsx'; // Import the Card component

const CardContainer = () => {
    const [visibleCards, setVisibleCards] = useState(10); // Initially show 10 cards

    const loadMoreCards = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 10); // Increase by 10
    };

    // Array of 24 cards (or however many you have)
    const allCards = Array.from({ length: 24 }, (_, index) => <Card key={index} />);

    return (
        <div>
            <div className="card-container-wrapper">
                {allCards.slice(0, visibleCards)} {/* Show only the visible cards */}
            </div>
            {visibleCards < allCards.length && (
                <button className="load-more-button" onClick={loadMoreCards}>
                    View More
                </button>
            )}
        </div>
    );
};

export default CardContainer;
