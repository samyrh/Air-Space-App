import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import FilterBar from "../components/CategoryBar..jsx"; // Updated import
import SearchBar from "../components/SearchBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";
import axios from "axios";

const Home = () => {
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8989/api/properties/fetchApifyProperties");
                setAllProperties(response.data);
                setFilteredProperties(response.data); // Default: show all properties

                // Log the property types to confirm
                const types = response.data.map((property) => property.type);
                console.log("Property Types from Backend:", types);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);


    const applyFilters = (filters) => {
        console.log("Filters applied:", filters);

        // Filter based on price range
        const filteredByPrice = allProperties.filter((property) => {
            const matchesPrice =
                property.pricePerNight >= filters.priceRange[0] &&
                property.pricePerNight <= filters.priceRange[1];
            return matchesPrice;
        });

        console.log("Filtered by price:", filteredByPrice);

        // Filter by type (Hotel, Apartment, House)
        let filteredByType = filteredByPrice;

        if (filters.type) {
            console.log(`Filtering by type: ${filters.type}...`);

            // Map selected type to its corresponding backend property type
            const typesMap = {
                Hotel: "Room in hotel",
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

            // Get the corresponding backend types for the selected category
            const selectedTypes = typesMap[filters.type];

            filteredByType = filteredByPrice.filter((property) =>
                selectedTypes.includes(property.type)
            );
        }

        console.log("Filtered by type:", filteredByType);

        // Filter by amenities (this assumes that amenities are an array and we're checking if the property has all selected amenities)
        const filteredByAmenities = filteredByType.filter((property) =>
            filters.amenities.every((amenity) => property.amenities.includes(amenity))
        );

        console.log("Filtered by amenities:", filteredByAmenities);

        // Filter by number of bathrooms, bedrooms, and beds
        let filteredByRooms = filteredByAmenities;

        if (filters.bathrooms) {
            filteredByRooms = filteredByAmenities.filter((property) =>
                property.bathrooms >= filters.bathrooms
            );
            console.log("Filtered by bathrooms:", filteredByRooms);
        }

        if (filters.bedrooms) {
            filteredByRooms = filteredByRooms.filter((property) =>
                property.bedrooms >= filters.bedrooms
            );
            console.log("Filtered by bedrooms:", filteredByRooms);
        }

        if (filters.beds) {
            filteredByRooms = filteredByRooms.filter((property) =>
                property.beds >= filters.beds
            );
            console.log("Filtered by beds:", filteredByRooms);
        }

        // Update the state with the filtered properties
        setFilteredProperties(filteredByRooms);
    };




    return (
        <div>
            <Navbar />
            <SearchBar />
            <FilterBar onApplyFilters={applyFilters} /> {/* Pass the applyFilters function */}
            <CardContainer properties={filteredProperties} />
            <ScrollToTopButton />
            <Footer />
        </div>
    );
};

export default Home;
