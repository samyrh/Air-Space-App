// src/components/FilterBar.jsx

import React, { useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { AiOutlineHome, AiOutlineApartment, AiOutlineCoffee, AiOutlineRocket, AiOutlineEnvironment, AiOutlineFire } from 'react-icons/ai';

// Filter options with icons
const filterOptions = [
    { icon: <AiOutlineHome />, label: 'Maisons perchées' },
    { icon: <AiOutlineRocket />, label: 'Maisons cycladiques' },
    { icon: <AiOutlineApartment />, label: 'Tiny houses' },
    { icon: <AiOutlineEnvironment />, label: 'Fermes' },
    { icon: <AiOutlineFire />, label: 'Moulins à vent' },
    { icon: <AiOutlineCoffee />, label: "Chambres d'hôtes" }
];

const FilterBar = () => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    // Handle filter selection
    const handleFilterClick = (label) => {
        setSelectedFilter(label);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            padding={1}
            width="100%"
            sx={{
                boxSizing: 'border-box',
                position: 'relative',
                marginTop: '150px',  // Increased space above the FilterBar to move it further down
            }}
        >
            {/* Filter Bar Container */}
            <Paper
                elevation={10}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '10px 20px',
                    maxWidth: '80vw',
                    width: '100%',
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', // Smooth gradient for light colors
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    position: 'absolute',
                    bottom: '20px',  // Position the bar 20px above the bottom of the screen
                }}
            >
                {filterOptions.map((option, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Tooltip title={option.label} arrow>
                            <IconButton
                                sx={{
                                    padding: '12px',
                                    backgroundColor: selectedFilter === option.label ? '#80b3ff' : 'transparent',
                                    borderRadius: '50%',
                                    transition: 'background-color 0.3s ease',  // Simple hover effect
                                    '&:hover': {
                                        backgroundColor: '#80b3ff',  // Simple color change on hover
                                    },
                                }}
                                onClick={() => handleFilterClick(option.label)}
                            >
                                {option.icon}
                            </IconButton>
                        </Tooltip>
                        {/* Title text below icon */}
                        <Typography
                            variant="body2"
                            sx={{
                                marginTop: '8px',  // Space between icon and text
                                color: selectedFilter === option.label ? '#ffffff' : '#000',  // Text color white when selected
                                fontWeight: 'bold',
                                textAlign: 'center',
                                transition: 'color 0.3s ease',
                                '&:hover': {
                                    color: '#80b3ff',  // Change text color on hover
                                },
                            }}
                        >
                            {option.label}
                        </Typography>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};

export default FilterBar;
