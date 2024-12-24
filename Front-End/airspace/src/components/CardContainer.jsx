import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import { Card } from "./Card.jsx"; // Import the Card component

const CardContainer = () => {
    const [properties, setProperties] = useState([]);
    const [visibleCards, setVisibleCards] = useState(16); // Show 16 items by default
    const cardRefs = useRef([]);

    const totalCards = properties.length;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Fetch properties from the second API
                const api2Response = await axios.get("http://localhost:8989/api/properties/fetchApifyProperties");

                // Set the fetched properties
                setProperties(api2Response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    const loadMoreCards = () => {
        setVisibleCards((prevVisibleCards) => Math.min(prevVisibleCards + 16, totalCards)); // Load 16 more cards
    };

    const loadLessCards = () => {
        setVisibleCards((prevVisibleCards) => Math.max(prevVisibleCards - 16, 16)); // Load 16 less cards, but not below 16
    };

    return (
        <div>
            <div className="card-container-wrapper">
                {properties.slice(0, visibleCards).map((property, index) => (
                    <div key={index} ref={(el) => (cardRefs.current[index] = el)}>
                        <Card property={property} />
                    </div>
                ))}
            </div>
            <div className="button-container">
                {visibleCards < totalCards && (
                    <button className="load-more-button" onClick={loadMoreCards}>
                        View More
                    </button>
                )}
                {visibleCards > 16 && (
                    <button className="load-more-button" onClick={loadLessCards}>
                        View Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardContainer;
