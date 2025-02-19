import '../assets/components/SearchResults.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardContainer from "../components/CardContainer.jsx";
import axios from "axios";

const SearchResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        amenities: [],
        priceRange: [0, 1000],
        rating: 0,
        bathrooms: 0,
        bedrooms: 0,
        beds: 0,
    });

    const searchQuery = new URLSearchParams(location.search).get('query');

    // Fetch properties from the API
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8989/api/properties/fetchApifyProperties");
                setAllProperties(response.data);
                setFilteredProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
                setError("Failed to fetch properties");
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    // Apply filters based on search query and selected filters
    useEffect(() => {
        const filtered = allProperties.filter((property) => {
            // Split the search query into individual words
            const queryWords = searchQuery ? searchQuery.toLowerCase().split(' ') : [];

            // Check if the search query matches location, name, or any amenity
            const locationMatch = property.city && property.city.toLowerCase().includes(searchQuery.toLowerCase());
            const nameMatch = property.name && property.name.toLowerCase().includes(searchQuery.toLowerCase());

            // Normalize amenities (trim spaces and convert to lowercase)
            const normalizedAmenities = property.amenities ? property.amenities.map(amenity => amenity.toLowerCase().trim()) : [];

            // Check if the property has all selected amenities (case-insensitive comparison)
            const amenitiesMatch = filters.amenities.every(amenity =>
                normalizedAmenities.includes(amenity.toLowerCase().trim())
            );

            // Filter by amenities (each property must have all selected amenities)
            const amenitiesFilterMatch = filters.amenities.length === 0 || amenitiesMatch;

            // Filter by price
            const priceMatch = property.pricePerNight >= filters.priceRange[0] && property.pricePerNight <= filters.priceRange[1];

            // Filter by rating
            const ratingMatch = property.rating >= filters.rating;

            // Filter by number of bathrooms, bedrooms, and beds
            const bathroomsMatch = property.bathrooms >= filters.bathrooms;
            const bedroomsMatch = property.bedrooms >= filters.bedrooms;
            const bedsMatch = property.beds >= filters.beds;

            return (locationMatch || nameMatch) && amenitiesFilterMatch && priceMatch && ratingMatch && bathroomsMatch && bedroomsMatch && bedsMatch;
        });

        setFilteredProperties(filtered);
    }, [searchQuery, allProperties, filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const truncatedQuery = searchQuery && searchQuery.split(' ').length > 2
        ? searchQuery.split(' ').slice(0, 2).join(' ') + '...'
        : searchQuery;

    return (
        <div className="search-results-page">
            <div className="results-header-page">
                <h1>
                    {searchQuery
                        ? `Find your perfect stay with this search "${truncatedQuery.charAt(0).toUpperCase() + truncatedQuery.slice(1)}"`
                        : "Find your perfect stay"}
                </h1>
                <p className="home-link-text" onClick={() => navigate('/')}>Go to Home</p>
            </div>
            <hr className="separator-line-search" />

            {/* Filters Section */}
            <div className="filters-section">
                <div className="filter-row">
                    {/* Price and Rating Filter */}
                    <div className="filter-category">
                        <h3>Price</h3>
                        <div className="filter-item price-range">
                            <label>
                                Range: <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="10"
                                value={filters.priceRange[0]}
                                onChange={(e) =>
                                    handleFilterChange("priceRange", [
                                        parseInt(e.target.value),
                                        filters.priceRange[1],
                                    ])
                                }
                                className="range-slider"
                            />
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="10"
                                value={filters.priceRange[1]}
                                onChange={(e) =>
                                    handleFilterChange("priceRange", [
                                        filters.priceRange[0],
                                        parseInt(e.target.value),
                                    ])
                                }
                                className="range-slider"
                            />
                        </div>

                        <h3>Rating</h3>
                        <div className="filter-item">
                            <label>Minimum Rating:</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= filters.rating ? "filled" : ""}`}
                                        onClick={() => handleFilterChange("rating", star)}
                                    >
          ★
        </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="filter-category">
                        <h3>Property Details</h3>
                        <div className="filter-item">
                            <label>Bedrooms:</label>
                            <input
                                type="number"
                                min="0"
                                value={filters.bedrooms}
                                onChange={(e) => handleFilterChange("bedrooms", parseInt(e.target.value))}
                                className="modern-input"
                            />
                        </div>
                        <div className="filter-item">
                            <label>Bathrooms:</label>
                            <input
                                type="number"
                                min="0"
                                value={filters.bathrooms}
                                onChange={(e) => handleFilterChange("bathrooms", parseInt(e.target.value))}
                                className="modern-input"
                            />
                        </div>
                        <div className="filter-item">
                            <label>Beds:</label>
                            <input
                                type="number"
                                min="0"
                                value={filters.beds}
                                onChange={(e) => handleFilterChange("beds", parseInt(e.target.value))}
                                className="modern-input"
                            />
                        </div>
                    </div>

                    {/* Amenities Filter */}
                    <div className="filter-category">
                        <h3>Amenities</h3>
                        <div className="checkbox-group">
                            {[
                                "WiFi",
                                "Air Conditioning",
                                "Kitchen",
                                "Pool",
                                "Parking",
                                "Washer",
                                "Dryer",
                                "Heating",
                                "Workspace",
                                "TV",
                                "Balcony",
                                "Elevator",
                                "Gym",
                                "BBQ Grill",
                                "Fireplace",
                                "Hot Tub",
                                "Pet-Friendly",
                                "Child-Friendly",
                            ].map((amenity) => (
                                <div key={amenity} className="checkbox-item modern-checkbox">
                                    <input
                                        type="checkbox"
                                        id={amenity}
                                        value={amenity}
                                        checked={filters.amenities.includes(amenity)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const newAmenities = e.target.checked
                                                ? [...filters.amenities, value]
                                                : filters.amenities.filter((item) => item !== value);
                                            handleFilterChange("amenities", newAmenities);
                                        }}
                                    />
                                    <label htmlFor={amenity}>{amenity}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <CardContainer properties={filteredProperties}/>
            {filteredProperties.length === 0 && (
                <div className="no-results">
                    <h2>Oops! No results found 😢</h2>
                    <p>Try changing your filters or searching for something else.</p>
                    <a href="/">Return to Homepage</a>
                </div>
            )}

        </div>
    );
};

export default SearchResults;
