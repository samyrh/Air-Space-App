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
                // Fetch properties from both APIs
                const [api1Response, api2Response] = await Promise.all([
                    axios.get("http://localhost:8989/api/properties/fetch"),
                    axios.get("http://localhost:8989/api/properties/fetchApifyProperties"),
                ]);

                // Combine results from both APIs
                const combinedProperties = [
                    ...api1Response.data,
                    ...api2Response.data,
                ];

                // Shuffle the properties
                const shuffledProperties = combinedProperties.sort(() => Math.random() - 0.5);

                setProperties(shuffledProperties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    const loadMoreCards = () => {
        setVisibleCards((prevVisibleCards) => Math.min(prevVisibleCards + 10, totalCards));
    };

    const loadLessCards = () => {
        const newVisibleCards = Math.max(visibleCards - 10, 16);

        const scrollToIndex = newVisibleCards - 10;
        if (cardRefs.current[scrollToIndex]) {
            cardRefs.current[scrollToIndex].scrollIntoView({ behavior: "smooth" });
        }

        setVisibleCards(newVisibleCards);
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
