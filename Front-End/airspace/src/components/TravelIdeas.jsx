import React, { useState } from 'react';
import {
    Box, Card, CardMedia, CardContent, Typography, Pagination,
    FormControl, InputLabel, Select, MenuItem, Slider, Checkbox, FormGroup, FormControlLabel
} from '@mui/material';
import houseImage from '../assets/images/house.jpg';
import '../assets/components/TravelIdeas.css';

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
                            <Card className="ios-place-card" key={place.id}>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={place.image}
                                    alt={place.name}
                                    className="place-image"
                                />
                                <CardContent className="place-info">
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{place.name}</Typography>
                                    <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>{place.type}</Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                                        {place.location}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.9rem', marginTop: 1 }}>
                                        <span style={{
                                            background: 'linear-gradient(90deg, #6a1b9a, #8e24aa)',
                                            WebkitBackgroundClip: 'text',
                                            color: 'transparent'
                                        }}>
                                            ${place.price}
                                        </span>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#f8d210', marginTop: 1 }}>
                                        Rating: {place.rating} ★
                                    </Typography>
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
