import React, { useState } from 'react';
import {
    Box,
    Typography,
    Slider,
    IconButton,
    Button,
    Divider,
} from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWifi,
    faUtensils,
    faDroplet,
    faWind,
    faSnowflake,
    faSwimmingPool,
    faThermometerHalf,
    faTv,
    faFire,
    faDumbbell,
    faPaw,
    faParking,
    faHotTub,
    faBreadSlice,
    faBacon,
    faSmoking,
    faBaby,
    faBuilding, // Added icons
    faHome,
    faHotel


} from '@fortawesome/free-solid-svg-icons';

const priceSliderMarks = [
    { value: 0, label: '0€' },
    { value: 200, label: '200€' },
    { value: 400, label: '400€' },
];

const amenitiesData = [
    { name: 'Wifi', icon: faWifi },
    { name: 'Kitchen', icon: faUtensils },
    { name: 'Washer', icon: faDroplet },
    { name: 'Dryer', icon: faWind },
    { name: 'Air conditioning', icon: faSnowflake },
    { name: 'Heating', icon: faThermometerHalf },
    { name: 'TV', icon: faTv },

];

const additionalAmenities = [
    { name: 'Indoor fireplace', icon: faFire },
    { name: 'Pet Friendly', icon: faPaw },
    { name: 'Gym', icon: faDumbbell },
    { name: 'Pool', icon: faSwimmingPool },
    {name :'Parking and facilities' , icon: faParking},
    {name :'Hot tub' , icon: faHotTub},
    { name: 'Breakfast', icon: faBreadSlice },
    { name: 'BBQ grill', icon: faBacon },
    { name: 'Smoking allowed', icon: faSmoking },
    { name: 'Crib', icon: faBaby },

];
const propertyTypeMapping = {
    Hotel: ["Room in hotel"],
    Apartment: [
        "Private room in condo",
        "Entire condo",
        "Entire serviced apartment",
        "Private room in loft",
        "Entire loft",
    ],
    House: [
        "Private room in rental unit",
        "Private room in home",
        "Private room in townhouse",
        "Private room in bed and breakfast",
        "Private room in bungalow",
        "Private room in guest suite",
        "Private room in guesthouse",
    ],
};

const FilterPanel = ({ onClose , onApplyFilters }) => {
    const [priceRange, setPriceRange] = useState([50, 300]);
    const [showMoreAmenities, setShowMoreAmenities] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [bathrooms, setBathrooms] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [beds, setBeds] = useState(1);

    const handleApplyFilters = () => {
        const filters = {
            priceRange,
            type: selectedType,
            amenities: selectedAmenities,
            bathrooms,
            bedrooms,
            beds,// All amenities (including features)
        };
        console.log("Applying filters:", filters);
        onApplyFilters(filters); // Pass the filters back to the parent
        onClose(); // Close the filter panel
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue); // Update the price range when the slider changes
    };

    const handleTypeSelection = (type) => {
        console.log("Selected type:", type);
        setSelectedType((prev) => (prev === type ? "" : type)); // Toggle type selection
    };
    const handleAmenityToggle = (amenity) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((item) => item !== amenity)
                : [...prev, amenity]
        );
    };

    const clearFilters = () => {
        console.log("Clearing filters");
        setPriceRange([50, 300]);
        setSelectedType("");
        setSelectedAmenities([]);
        setBathrooms(1);
        setBedrooms(1);
        setBeds(1);
    };
    const handleIncrement = (field) => {
        if (field === 'bathrooms') setBathrooms(bathrooms + 1);
        if (field === 'bedrooms') setBedrooms(bedrooms + 1);
        if (field === 'beds') setBeds(beds + 1);
    };

    const handleDecrement = (field) => {
        if (field === 'bathrooms' && bathrooms > 1) setBathrooms(bathrooms - 1);
        if (field === 'bedrooms' && bedrooms > 1) setBedrooms(bedrooms - 1);
        if (field === 'beds' && beds > 1) setBeds(beds - 1);
    };

    return (
        <Box
            sx={{
                width: '568px',
                height: '867px',
                bgcolor: 'white',
                borderRadius: '16px',
                boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: '1px solid #ddd',
                }}
            >
                <Button onClick={onClose} sx={{ textTransform: 'none', color: '#222' }}>
                    X
                </Button>
                <Typography variant="h6" fontWeight="bold">
                    Filters
                </Typography>
                <Box width="50px"></Box>
            </Box>

            {/* Scrollable Content */}
            <Box sx={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                {/* Property Type */}
                <Box sx={{ marginBottom: "24px" }}>
                    <Typography variant="subtitle1" fontSize="18px" fontWeight="bold" marginBottom="8px">
                        Type
                    </Typography>
                    <Box display="flex" gap="12px" flexWrap="wrap">
                        {Object.keys(propertyTypeMapping).map((type) => {
                            const icon = type === "Hotel" ? faHotel : type === "Apartment" ? faBuilding : faHome;
                            return (
                                <Button
                                    key={type}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: "20px",
                                        textTransform: "none",
                                        borderColor: selectedType === type ? "#ff385c" : "#ddd",
                                        color: selectedType === type ? "#ff385c" : "#222",
                                        "&:hover": {
                                            bgcolor: "#f7f7f7",
                                            color: selectedType === type ? "#ff385c" : "black",
                                            borderColor: selectedType === type ? "#ff385c" : "black",
                                        },
                                    }}
                                    onClick={() => handleTypeSelection(type)}
                                    startIcon={<FontAwesomeIcon icon={icon} />}
                                >
                                    {type}
                                </Button>
                            );
                        })}
                    </Box>
                    <Divider sx={{ marginTop: "16px" }} />
                </Box>

                {/* Price Range */}
                <Box sx={{ marginBottom: '24px' }}>
                    <Typography variant="subtitle1" fontSize="18px" letterSpacing="1.5px" fontWeight="bold" marginBottom="8px">
                        Price Range
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={400}
                        marks={priceSliderMarks}
                        sx={{
                            '& .MuiSlider-thumb': { bgcolor: '#ff385c' },
                            '& .MuiSlider-track': { bgcolor: '#ff385c' },
                        }}
                    />
                    <Typography variant="body2">
                        Price: {priceRange[0]}€ - {priceRange[1]}€
                    </Typography>
                    <Divider sx={{ marginTop: '16px' }} />
                </Box>

                {/* Rooms and Beds */}
                <Box sx={{ marginBottom: '24px' }}>
                    <Typography variant="subtitle1" fontSize="18px" letterSpacing="1.5px" fontWeight="bold" marginBottom="8px">
                        Rooms and Beds
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {/* Bedrooms */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight="bold" marginBottom="8px">
                                Bedrooms
                            </Typography>
                            <Box display="flex" alignItems="center" gap="12px">
                                <Button onClick={() => handleDecrement('bedrooms')}>-</Button>
                                <Typography variant="body2">{bedrooms}</Typography>
                                <Button onClick={() => handleIncrement('bedrooms')}>+</Button>
                            </Box>
                        </Box>

                        {/* Beds */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight="bold" marginBottom="8px">
                                Beds
                            </Typography>
                            <Box display="flex" alignItems="center" gap="12px">
                                <Button onClick={() => handleDecrement('beds')}>-</Button>
                                <Typography variant="body2">{beds}</Typography>
                                <Button onClick={() => handleIncrement('beds')}>+</Button>
                            </Box>
                        </Box>

                        {/* Bathrooms */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight="bold" marginBottom="8px">
                                Bathrooms
                            </Typography>
                            <Box display="flex" alignItems="center" gap="12px">
                                <Button onClick={() => handleDecrement('bathrooms')}>-</Button>
                                <Typography variant="body2">{bathrooms}</Typography>
                                <Button onClick={() => handleIncrement('bathrooms')}>+</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ marginTop: '16px' }} />
                </Box>


                {/* Amenities (Merged with Features) */}
                <Box sx={{ marginBottom: '24px' }}>
                    <Typography variant="subtitle1" fontSize="18px" letterSpacing="1.5px" fontWeight="bold" marginBottom="8px">
                        Amenities & Features
                    </Typography>
                    <Box display="flex" gap="12px" flexWrap="wrap">
                        {amenitiesData.map((amenity, index) => (
                            <Button
                                key={index}
                                startIcon={<FontAwesomeIcon icon={amenity.icon} />}
                                variant="outlined"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: '20px',
                                    textTransform: 'none',
                                    borderColor: selectedAmenities.includes(amenity.name) ? '#ff385c' : '#ddd',
                                    color: selectedAmenities.includes(amenity.name) ? '#ff385c' : '#222',
                                    '&:hover': {
                                        bgcolor: '#f7f7f7',
                                        color: selectedAmenities.includes(amenity.name) ? '#ff385c' : 'black',
                                        borderColor: selectedAmenities.includes(amenity.name) ? '#ff385c' : 'black',
                                    },
                                }}
                                onClick={() => handleAmenityToggle(amenity.name)}
                            >
                                {amenity.name}
                            </Button>
                        ))}
                    </Box>
                    {showMoreAmenities && (
                        <Box display="flex" gap="12px" flexWrap="wrap" marginTop="16px">
                            {additionalAmenities.map((amenity, index) => (
                                <Button
                                    key={index}
                                    startIcon={<FontAwesomeIcon icon={amenity.icon} />}
                                    variant="outlined"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                        textTransform: 'none',
                                        borderColor: selectedAmenities.includes(amenity.name) ? '#ff385c' : '#ddd',
                                        color: selectedAmenities.includes(amenity.name) ? '#ff385c' : '#222',
                                        '&:hover': {
                                            bgcolor: '#f7f7f7',
                                            color: selectedAmenities.includes(amenity.name) ? '#ff385c' : 'black',
                                            borderColor: selectedAmenities.includes(amenity.name) ? '#ff385c' : 'black',
                                        },
                                    }}
                                    onClick={() => handleAmenityToggle(amenity.name)}
                                >
                                    {amenity.name}
                                </Button>
                            ))}
                        </Box>
                    )}
                    <Button
                        onClick={() => setShowMoreAmenities(!showMoreAmenities)}
                        sx={{ textTransform: 'none', color: '#ff385c', marginTop: '16px' }}
                    >
                        {showMoreAmenities ? 'Show Less' : 'Show More'}
                    </Button>

                </Box>
            </Box>

            {/* Footer Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderTop: '1px solid #ddd',
                    backgroundColor: '#f7f7f7',
                }}
            >
                <Button onClick={clearFilters} sx={{ textTransform: 'none', color: '#ff385c' }}>
                    Clear All
                </Button>
                <Button onClick={handleApplyFilters} sx={{ textTransform: 'none', backgroundColor: '#ff385c', color: 'white' }}>
                    Apply Filters
                </Button>
            </Box>
        </Box>
    );
};

export default FilterPanel;
