import React, { useState } from 'react';
import { Box, IconButton, Paper, Tooltip, Typography, Button, Modal } from '@mui/material';
import { AiOutlineHome, AiOutlineApartment, AiOutlineCoffee, AiOutlineRocket, AiOutlineEnvironment, AiOutlineFire } from 'react-icons/ai';
import FilterPanel from './FilterPanel';

// Filter options with icons
const filterOptions = [
    { icon: <AiOutlineHome />, label: 'Maisons perchées' },
    { icon: <AiOutlineRocket />, label: 'Maisons cycladiques' },
    { icon: <AiOutlineApartment />, label: 'Tiny houses' },
    { icon: <AiOutlineEnvironment />, label: 'Fermes' },
    { icon: <AiOutlineFire />, label: 'Moulins à vent' },
    { icon: <AiOutlineCoffee />, label: "Chambres d'hôtes" }
];

const CategoryBar = ({ onApplyFilters }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [showFilterPanel, setShowFilterPanel] = useState(false);

    // Handle filter selection
    const handleFilterClick = (label) => {
        setSelectedFilter(label);
    };

    // Toggle Filter Panel visibility
    const toggleFilterPanel = () => {
        setShowFilterPanel(!showFilterPanel);
    };

    const handleApplyFilters = (filters) => {
        // Pass the selected filters back to the parent component (Home)
        onApplyFilters(filters);
        setShowFilterPanel(false); // Close the filter panel
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
                    background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    position: 'absolute',
                    bottom: { xs: '10px', sm: '20px' },
                }}
            >
                {/* Existing Filter Options */}
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
                                        ? '0px 0px 15px 5px rgb(128, 179, 255)'
                                        : 'none',
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

                {/* Filter Button */}
                <Button
                    variant="contained"
                    onClick={toggleFilterPanel}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        color: '#232323',
                        padding: { xs: '8px 12px', sm: '10px 16px' },
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        '&:hover': {
                            backgroundColor: '#6e9fcc',
                            border: '1px solid #232323',
                        },
                    }}
                >
                    Filtres
                </Button>
            </Paper>

            {/* Filter Panel Modal */}
            <Modal open={showFilterPanel} onClose={toggleFilterPanel}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <FilterPanel onClose={toggleFilterPanel} onApplyFilters={handleApplyFilters} />
                </Box>
            </Modal>
        </Box>
    );
};

export default CategoryBar;
