import React, { useState, useEffect } from 'react';

// LiveTimer Component
const LiveTimer = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    return (
        <div className="live-timer">
            {currentDate.toLocaleDateString('en-US', options)}
        </div>
    );
};

export default LiveTimer;
