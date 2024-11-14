import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Pagination, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import houseImage from '../assets/images/house.jpg';
import '../assets/components/TravelIdeas.css';

const TravelIdeas = () => {
    const places = [
        { id: 1, name: 'Paris', type: 'Apartment', price: 100, image: houseImage },
        { id: 2, name: 'New York', type: 'House', price: 250, image: houseImage },
        { id: 3, name: 'Tokyo', type: 'Apartment', price: 150, image: houseImage },
        { id: 4, name: 'Berlin', type: 'House', price: 180, image: houseImage },
        { id: 5, name: 'London', type: 'Hotel', price: 200, image: houseImage },
        { id: 6, name: 'Sydney', type: 'House', price: 220, image: houseImage },
        { id: 7, name: 'Dubai', type: 'Apartment', price: 300, image: houseImage },
        { id: 8, name: 'Rome', type: 'Hotel', price: 130, image: houseImage },
        { id: 9, name: 'Barcelona', type: 'Apartment', price: 110, image: houseImage },
        { id: 10, name: 'Amsterdam', type: 'House', price: 190, image: houseImage },
        { id: 11, name: 'Bangkok', type: 'Hotel', price: 120, image: houseImage },
        { id: 12, name: 'Lisbon', type: 'House', price: 170, image: houseImage },
        { id: 13, name: 'Cape Town', type: 'Apartment', price: 90, image: houseImage },
        { id: 14, name: 'Los Angeles', type: 'House', price: 260, image: houseImage },
    ];

    const [filters, setFilters] = useState({
        type: '',
        maxPrice: 500,
        minPrice: 50,
    });
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredPlaces = places.filter((place) => {
        return (
            (filters.type ? place.type === filters.type : true) &&
            place.price >= filters.minPrice &&
            place.price <= filters.maxPrice
        );
    });

    const paginatedPlaces = filteredPlaces.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const pageCount = Math.ceil(filteredPlaces.length / itemsPerPage);

    return (
        <Box className="ios-style-container">
            <Box className="filter-results-container">
                {/* Filter Section */}
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
                </Box>

                {/* Results Section */}
                <Box className="ios-results">
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
                                    <Typography variant="h5">{place.name}</Typography>
                                    <Typography variant="body2">{place.type}</Typography>
                                    <Typography variant="body2" className="price">
                                        ${place.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Box>
            </Box>

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
