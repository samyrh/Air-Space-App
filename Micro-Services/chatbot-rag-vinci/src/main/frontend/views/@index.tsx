import React, { useState, useEffect } from 'react';
import '../styles/style.css';

export default function Index() {
    const [bubblesPaused, setBubblesPaused] = useState(false);
    const [rotationEnabled, setRotationEnabled] = useState(true);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0 });

    const toggleBubbles = () => {
        setBubblesPaused(!bubblesPaused);
    };

    const toggleRotation = () => {
        setRotationEnabled(!rotationEnabled);
    };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (rotationEnabled) {
                const x = (event.clientX / window.innerWidth) - 0.5;
                const newAngle = x * 360;
                setRotationAngle(newAngle);
                setMousePosition({ x });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [rotationEnabled]);

    return (
        <div className="page-container">
            <div className={`bubbles ${bubblesPaused ? 'paused' : ''}`}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <div
                        key={index}
                        className={`bubble animal-bubble`} // Added class for animal shapes
                        style={{
                            transform: `translate3d(${mousePosition.x * 100}px, 0, 0)`,
                        }}
                    />
                ))}
            </div>
            <div
                className="content-container"
                style={{
                    transform: `rotateY(${rotationAngle}deg)`,
                    transition: 'transform 0.1s',
                }}
            >
                <h1 className="main-title">Staybnb AI Booking Assistant</h1>
                <div className="ai-description">
                    <p className="description-text">
                        Powered by cutting-edge AI technology, Staybnb Chat AI utilizes Llama 3, RAG
                        (Retrieval-Augmented Generation),
                        and smart data processing to assist you in finding the perfect stay with accuracy and speed.
                    </p>
                    <p className="description-text">
                        Whether you're searching for a cozy retreat, luxury accommodation, or last-minute deals, this AI
                        provides
                        instant, human-like responses and real-time availability insights. Experience seamless travel
                        planning with
                        intelligent booking assistance.
                    </p>
                </div>
                <div className="button-container">
                    <button className="toggle-button" onClick={toggleBubbles}>
                        {bubblesPaused ? 'Play Bubbles' : 'Pause Bubbles'}
                    </button>
                    <button className="toggle-button" onClick={toggleRotation}>
                        {rotationEnabled ? 'Disable 360° Rotation' : 'Enable 360° Rotation'}
                    </button>
                </div>

            </div>
        </div>
    );
}
