import React, { useState } from 'react';
import {
    Box, Card, CardMedia, CardContent, Typography, Pagination,
    FormControl, InputLabel, Select, MenuItem, Slider, Checkbox, FormGroup, FormControlLabel
} from '@mui/material';
import houseImage from '../assets/images/house.jpg';
import '../assets/components/TravelIdeas.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; // For arrows
import numeral from 'numeral';
const TravelIdeas = () => {
    const places = [
        { id: 1, name: 'Modern Apartment in Paris', type: 'Apartment', price: 150, rating: 4.5, location: 'Paris', amenities: ['Wi-Fi', 'Parking'], image: houseImage },
        { id: 2, name: 'Luxury House in New York', type: 'House', price: 300, rating: 4.7, location: 'New York', amenities: ['Wi-Fi', 'Pool'], image: houseImage },
        { id: 3, name: 'Cozy Studio in Tokyo', type: 'Apartment', price: 80, rating: 4.2, location: 'Tokyo', amenities: ['Wi-Fi'], image: houseImage },
        { id: 4, name: 'Family House in Berlin', type: 'House', price: 220, rating: 4.6, location: 'Berlin', amenities: ['Parking', 'Wi-Fi'], image: houseImage },
        { id: 5, name: 'Downtown Hotel in New York', type: 'Hotel', price: 180, rating: 4.3, location: 'New York', amenities: ['Pool', 'Wi-Fi'], image: houseImage },
        { id: 6, name: 'Mountain Retreat in Paris', type: 'House', price: 400, rating: 5, location: 'Paris', amenities: ['Parking', 'Wi-Fi'], image: houseImage },
        { id: 7, name: 'Beach House in Tokyo', type: 'House', price: 350, rating: 4.8, location: 'Tokyo', amenities: ['Pool', 'Wi-Fi'], image: houseImage },
        { id: 8, name: 'Cozy Apartment in Berlin', type: 'Apartment', price: 120, rating: 3.9, location: 'Berlin', amenities: ['Wi-Fi'], image: houseImage },
        { id: 9, name: 'Luxury Villa in New York', type: 'House', price: 500, rating: 4.9, location: 'New York', amenities: ['Pool', 'Wi-Fi', 'Parking'], image: houseImage },
        { id: 10, name: 'Penthouse in Tokyo', type: 'Apartment', price: 250, rating: 4.6, location: 'Tokyo', amenities: ['Wi-Fi', 'Parking'], image: houseImage },
    ];

    const [filters, setFilters] = useState({
        type: '',
        maxPrice: 500,
        minPrice: 50,
        location: '',
        rating: [1, 5],
        amenities: []
    });
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
        setPage(1);
    };

    const handlePriceChange = (event, newValue) => {
        setFilters({
            ...filters,
            minPrice: newValue[0],
            maxPrice: newValue[1],
        });
        setPage(1);
    };

    const handleRatingChange = (event, newValue) => {
        setFilters({
            ...filters,
            rating: newValue,
        });
        setPage(1);
    };

    const handleAmenitiesChange = (e) => {
        const value = e.target.name;
        setFilters({
            ...filters,
            amenities: filters.amenities.includes(value)
                ? filters.amenities.filter((amenity) => amenity !== value)
                : [...filters.amenities, value],
        });
        setPage(1);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredPlaces = places.filter((place) => {
        return (
            (filters.type ? place.type === filters.type : true) &&
            (filters.location ? place.location === filters.location : true) &&
            place.price >= filters.minPrice &&
            place.price <= filters.maxPrice &&
            place.rating >= filters.rating[0] &&
            place.rating <= filters.rating[1] &&
            (filters.amenities.length === 0 || filters.amenities.every((amenity) => place.amenities.includes(amenity)))
        );
    });

    const paginatedPlaces = filteredPlaces.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const pageCount = Math.ceil(filteredPlaces.length / itemsPerPage);

    return (
        <Box className="ios-style-container">
            <Box className="ios-style-layout">
                {/* Left Sidebar for Filters */}
                <Box className="filter-section">
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            label="Type"
                            className="filter-select"
                        >
                            <MenuItem value="">All Types</MenuItem>
                            <MenuItem value="Apartment">Apartment</MenuItem>
                            <MenuItem value="House">House</MenuItem>
                            <MenuItem value="Hotel">Hotel</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Location</InputLabel>
                        <Select
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            label="Location"
                            className="filter-select"
                        >
                            <MenuItem value="">All Locations</MenuItem>
                            <MenuItem value="Paris">Paris</MenuItem>
                            <MenuItem value="New York">New York</MenuItem>
                            <MenuItem value="Tokyo">Tokyo</MenuItem>
                            <MenuItem value="Berlin">Berlin</MenuItem>
                        </Select>
                    </FormControl>

                    <Box marginY={2}>
                        <Typography variant="body1">Price Range</Typography>
                        <Slider
                            value={[filters.minPrice, filters.maxPrice]}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={500}
                            className="price-slider"
                        />
                    </Box>

                    <Box marginY={2}>
                        <Typography variant="body1">Rating</Typography>
                        <Slider
                            value={filters.rating}
                            onChange={handleRatingChange}
                            valueLabelDisplay="auto"
                            min={1}
                            max={5}
                            step={0.5}
                            className="price-slider"
                        />
                    </Box>

                    <FormControl component="fieldset">
                        <Typography variant="body1">Amenities</Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filters.amenities.includes('Wi-Fi')}
                                        onChange={handleAmenitiesChange}
                                        name="Wi-Fi"
                                    />
                                }
                                label="Wi-Fi"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filters.amenities.includes('Pool')}
                                        onChange={handleAmenitiesChange}
                                        name="Pool"
                                    />
                                }
                                label="Pool"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filters.amenities.includes('Parking')}
                                        onChange={handleAmenitiesChange}
                                        name="Parking"
                                    />
                                }
                                label="Parking"
                            />
                        </FormGroup>
                    </FormControl>
                </Box>

                {/* Main Content Section for Results */}
                <Box className="results-section">
                    {paginatedPlaces.length === 0 ? (
                        <Typography variant="h6" color="textSecondary" align="center" className="no-results-message">
                            No results found for the selected filters.
                        </Typography>
                    ) : (
                        paginatedPlaces.map((place) => (
                            <Card
                                key={place.id}
                                className="ios-place-card"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: 'linear-gradient(145deg, #f3f4f6, #e2e8f0)', // Default gradient
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    borderRadius: 12,
                                    marginBottom: 2,
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease, background 0.3s ease', // Smooth hover transition
                                    '&:hover': {
                                        transform: 'scale(1.05)', // Slight scaling on hover
                                        background: 'linear-gradient(145deg, #A7C7E7, #D0E7F0)', // Light blue gradient on hover
                                        boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)', // More prominent shadow on hover
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={place.image}
                                    alt={place.name}
                                    sx={{
                                        objectFit: 'cover',
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                    }}
                                />
                                <CardContent
                                    sx={{
                                        padding: 2,
                                        background: 'linear-gradient(145deg, #ffffff, #f7fafc)',
                                        borderBottomLeftRadius: 12,
                                        borderBottomRightRadius: 12,
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                                        {place.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#777', marginTop: 1 }}>
                                        {place.type}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(0, 0, 0, 0.7)',
                                            fontSize: '0.9rem',
                                            marginTop: 1,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {place.location}
                                    </Typography>

                                    {/* Price Section */}
                                    <Typography
                                        variant="h6" // Larger text size
                                        sx={{
                                            marginTop: 1,
                                            color: place.price > 300 ? '#d32f2f' : '#388e3c', // Red for expensive, green for cheap
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            fontSize: '1.4rem', // Larger font size for price
                                            transition: 'color 0.3s, transform 0.3s', // Smooth transition
                                            '&:hover': {
                                                transform: 'scale(1.1)', // Slight zoom effect on hover
                                                color: place.price > 300 ? '#b71c1c' : '#1b5e20', // Darker red/green on hover
                                            },
                                        }}
                                    >
                                        ${numeral(place.price).format('0,0')} {/* Price formatted with thousands separator */}
                                        {place.price > 300 ? (
                                            <FaArrowUp style={{ color: '#d32f2f', marginLeft: 8 }} /> // Up arrow for expensive
                                        ) : (
                                            <FaArrowDown style={{ color: '#388e3c', marginLeft: 8 }} /> // Down arrow for cheap
                                        )}
                                    </Typography>

                                    {/* Rating Section */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
                                        {/* Loop through to show the appropriate number of full, half, and empty stars */}
                                        {Array.from({ length: 5 }, (_, index) => {
                                            if (place.rating >= index + 1) {
                                                return <FaStar key={index} style={{ color: '#f8d210', fontSize: '1.2rem' }} />;
                                            } else if (place.rating > index && place.rating < index + 1) {
                                                return <FaStarHalfAlt key={index} style={{ color: '#f8d210', fontSize: '1.2rem' }} />;
                                            } else {
                                                return <FaRegStar key={index} style={{ color: '#f8d210', fontSize: '1.2rem' }} />;
                                            }
                                        })}
                                        <span style={{ marginLeft: 8, fontSize: '1rem', color: '#777', fontWeight: 'bold' }}>
                {place.rating} / 5
            </span>
                                    </div>
                                </CardContent>
                            </Card>

                        ))
                    )}
                </Box>
            </Box>

            {/* Pagination Footer */}
            {pageCount > 1 && (
                <Box className="pagination-section">
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </Box>
            )}
        </Box>
    );
};

export default TravelIdeas;
