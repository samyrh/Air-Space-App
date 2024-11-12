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
                marginTop: { xs: '100px', sm: '120px', md: '150px' },
            }}
        >
            {/* Filter Bar Container with Gradient Background */}
            <Paper
                elevation={10}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: { xs: '8px', sm: '10px 20px' },
                    maxWidth: { xs: '90vw', sm: '80vw' },
                    width: '100%',
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, #b3e0ff, #ffd1dc)', // Gradient background for entire filter bar
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    position: 'absolute',
                    bottom: { xs: '10px', sm: '20px' },
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
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <Tooltip title={option.label} arrow>
                            <IconButton
                                sx={{
                                    padding: { xs: '8px', sm: '12px' },
                                    backgroundColor: selectedFilter === option.label ? '#80b3ff' : 'transparent',
                                    borderRadius: '50%',
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: selectedFilter === option.label
                                        ? '0px 0px 15px 5px rgb(128, 179, 255)' // Pure RGB for a vibrant glow effect
                                        : 'none',  // No shadow if not selected
                                    '&:hover': {
                                        backgroundColor: '#80b3ff',
                                    },
                                    '& svg': {
                                        fontSize: '1.5rem',
                                        color: selectedFilter === option.label ? '#ffffff' : '#6e7f9e',
                                    },
                                }}
                                onClick={() => handleFilterClick(option.label)}
                            >
                                {option.icon}
                            </IconButton>


                        </Tooltip>
                        <Typography
                            variant="body2"
                            sx={{
                                marginTop: '8px',
                                color: selectedFilter === option.label ? '#ffffff' : '#000',
                                fontWeight: 'bold',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                textAlign: 'center',
                                transition: 'color 0.3s ease',
                                '&:hover': {
                                    color: '#80b3ff',
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
