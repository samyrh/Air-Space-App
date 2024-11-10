import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";  // Importing the search icon
import flatpickr from "flatpickr"; // Importing flatpickr
import "flatpickr/dist/flatpickr.min.css"; // Importing flatpickr's CSS
import '../assets/components/SearchBar.css';

function SearchComponent() {
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departurePlaceholder, setDeparturePlaceholder] = useState('Departure Date');
    const [isGuestDropdownVisible, setGuestDropdownVisible] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    useEffect(() => {
        // Initialize Flatpickr for the Arrival Date input
        flatpickr("#arrivalDate", {
            dateFormat: "Y-m-d", // Format: YYYY-MM-DD
            minDate: "today",    // Disable past dates
            allowInput: true,    // Allow manual input of date
            theme: "light",      // Light theme for Flatpickr
            defaultDate: arrivalDate, // Show selected arrival date inside calendar
            onChange: function (selectedDates, dateStr) {
                setArrivalDate(dateStr); // Set the Arrival Date

                // Automatically set the Departure Date to one day after the Arrival Date
                if (!departureDate || new Date(departureDate) <= new Date(dateStr)) {
                    const nextDay = new Date(selectedDates[0]);
                    nextDay.setDate(nextDay.getDate() + 1);  // Set departure to one day after arrival
                    setDepartureDate(nextDay.toISOString().split("T")[0]); // Set Departure Date to the next day
                }

                // Set the placeholder for Departure Date to indicate it's after Arrival
                setDeparturePlaceholder(`Departure (after ${dateStr})`);

                // Update the minimum date of the departure picker
                const departurePicker = flatpickr("#departureDate");
                departurePicker.set('minDate', selectedDates[0]); // Set the minDate of the departure calendar
            }
        });

        // Initialize Flatpickr for the Departure Date input
        flatpickr("#departureDate", {
            dateFormat: "Y-m-d", // Format: YYYY-MM-DD
            minDate: "today",    // Disable past dates
            allowInput: true,    // Allow manual input of date
            theme: "light",      // Light theme for Flatpickr
            defaultDate: departureDate, // Show selected departure date inside calendar
            onChange: function (selectedDates, dateStr) {
                // Ensure that the Departure Date is always after the Arrival Date
                if (new Date(dateStr) <= new Date(arrivalDate)) {
                    setDepartureDate(''); // Reset Departure Date if invalid
                } else {
                    setDepartureDate(dateStr); // Update Departure Date when selected
                }
            },
            // Disable dates that are before the arrival date
            disable: [
                function(date) {
                    // Disable all dates before the arrival date
                    return date < new Date(arrivalDate);
                }
            ]
        });
    }, [arrivalDate, departureDate]);

    const handleArrivalDateChange = (e) => {
        const arrival = e.target.value;
        setArrivalDate(arrival);

        // Automatically adjust Departure Date if it's before the Arrival Date
        if (new Date(departureDate) <= new Date(arrival)) {
            const nextDay = new Date(arrival);
            nextDay.setDate(nextDay.getDate() + 1);  // Set departure to one day after arrival
            setDepartureDate(nextDay.toISOString().split("T")[0]);
        }

        // Set the placeholder for Departure Date to indicate it's after Arrival
        setDeparturePlaceholder(`Departure (after ${arrival})`);
    };

    const handleDepartureDateChange = (e) => {
        const departure = e.target.value;

        // Ensure Departure Date is after Arrival Date
        if (new Date(departure) <= new Date(arrivalDate)) {
            setDepartureDate(''); // Reset Departure Date if invalid
        } else {
            setDepartureDate(departure); // Update Departure Date
        }
    };

    const toggleGuestDropdown = () => {
        setGuestDropdownVisible(!isGuestDropdownVisible);
    };

    const incrementGuestCount = (type) => {
        if (type === 'adults') setAdults(adults + 1);
        if (type === 'children') setChildren(children + 1);
        if (type === 'infants') setInfants(infants + 1);
    };

    const decrementGuestCount = (type) => {
        if (type === 'adults' && adults > 1) setAdults(adults - 1);
        if (type === 'children' && children > 0) setChildren(children - 1);
        if (type === 'infants' && infants > 0) setInfants(infants - 1);
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                {/* Destination Input */}
                <input
                    type="text"
                    className="search-input"
                    placeholder="Destination city?"
                />

                {/* Arrival Date Input */}
                <input
                    type="text"
                    className="search-input"
                    id="arrivalDate"
                    placeholder="Arrival Date"
                    value={arrivalDate}
                    onChange={handleArrivalDateChange}
                />

                {/* Departure Date Input */}
                <input
                    type="text"
                    className="search-input"
                    id="departureDate"
                    placeholder={departurePlaceholder}
                    value={departureDate}
                    onChange={handleDepartureDateChange}
                />

                {/* Number of People Input (Click to open guest dropdown) */}
                <div className="guest-selector" onClick={toggleGuestDropdown}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Guests"
                        readOnly
                        value={`${adults} Adults, ${children} Children, ${infants} Infants`}
                    />
                    {isGuestDropdownVisible && (
                        <div className="guest-dropdown">
                            <div className="guest-type">
                                <h4>Adults</h4>
                                <div className="counter">
                                    <button onClick={() => decrementGuestCount('adults')}>-</button>
                                    <input type="number" value={adults} readOnly />
                                    <button onClick={() => incrementGuestCount('adults')}>+</button>
                                </div>
                            </div>
                            <div className="guest-type">
                                <h4>Children</h4>
                                <div className="counter">
                                    <button onClick={() => decrementGuestCount('children')}>-</button>
                                    <input type="number" value={children} readOnly />
                                    <button onClick={() => incrementGuestCount('children')}>+</button>
                                </div>
                            </div>
                            <div className="guest-type">
                                <h4>Infants</h4>
                                <div className="counter">
                                    <button onClick={() => decrementGuestCount('infants')}>-</button>
                                    <input type="number" value={infants} readOnly />
                                    <button onClick={() => incrementGuestCount('infants')}>+</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Button with only the search icon */}
                <button className="simple-search-button">
                    <FaSearch className="simple-icon"/>
                </button>
            </div>
        </div>
    );
}

export default SearchComponent;
