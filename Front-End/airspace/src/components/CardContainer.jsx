import React, { useState, useRef } from 'react';
import Card from './Card.jsx'; // Import the Card component

const CardContainer = () => {
    const [visibleCards, setVisibleCards] = useState(10); // Initially show 10 cards
    const totalCards = 24; // Total number of cards
    const cardRefs = useRef([]); // Array of refs for each card

    // Function to handle loading more cards
    const loadMoreCards = () => {
        setVisibleCards((prevVisibleCards) => Math.min(prevVisibleCards + 10, totalCards));
    };

    // Function to handle loading less cards and scrolling to the correct position
    const loadLessCards = () => {
        const newVisibleCards = Math.max(visibleCards - 10, 10);

        // Scroll to the first card of the new set (i.e., the first card of the current set minus 10)
        const scrollToIndex = newVisibleCards - 10; // Index of the card to scroll to
        if (cardRefs.current[scrollToIndex]) {
            cardRefs.current[scrollToIndex].scrollIntoView({ behavior: 'smooth' });
        }

        setVisibleCards(newVisibleCards);
    };

    // Create an array of Card components with refs
    const allCards = Array.from({ length: totalCards }, (_, index) => (
        <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)} // Assign refs to each card
        >
            <Card />
        </div>
    ));

    return (
        <div>
            <div className="card-container-wrapper">
                {allCards.slice(0, visibleCards)} {/* Show only the visible cards */}
            </div>
            <div className="button-container">
                {visibleCards < totalCards && (
                    <button className="load-more-button" onClick={loadMoreCards}>
                        View More
                    </button>
                )}
                {visibleCards > 10 && (
                    <button className="load-more-button" onClick={loadLessCards}>
                        View Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardContainer;
/* fake it */