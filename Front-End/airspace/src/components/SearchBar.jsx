import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import '../assets/components/SearchBar.css';

function SearchComponent() {
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departurePlaceholder, setDeparturePlaceholder] = useState('Departure Date');
    const [isGuestDropdownVisible, setGuestDropdownVisible] = useState(false);
    const [guests, setGuests] = useState({ adults: 1, children: 0, babies: 0 }); // Grouped guest state
    const dropdownRef = useRef(null); // Reference for dropdown

    useEffect(() => {
        // Initialize Flatpickr for Arrival and Departure Date inputs
        flatpickr("#arrivalDate", {
            dateFormat: "Y-m-d",
            minDate: "today",
            allowInput: true,
            theme: "light",
            defaultDate: arrivalDate,
            onChange: function (selectedDates, dateStr) {
                setArrivalDate(dateStr);
                if (!departureDate || new Date(departureDate) <= new Date(dateStr)) {
                    const nextDay = new Date(selectedDates[0]);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setDepartureDate(nextDay.toISOString().split("T")[0]);
                }
                setDeparturePlaceholder(`Departure (after ${dateStr})`);
                const departurePicker = flatpickr("#departureDate");
                departurePicker.set('minDate', selectedDates[0]);
            }
        });

        flatpickr("#departureDate", {
            dateFormat: "Y-m-d",
            minDate: "today",
            allowInput: true,
            theme: "light",
            defaultDate: departureDate,
            onChange: function (selectedDates, dateStr) {
                if (new Date(dateStr) <= new Date(arrivalDate)) {
                    setDepartureDate('');
                } else {
                    setDepartureDate(dateStr);
                }
            },
            disable: [date => date < new Date(arrivalDate)]
        });
    }, [arrivalDate, departureDate]);

    useEffect(() => {
        // Close dropdown on outside click
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setGuestDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const toggleGuestDropdown = () => {
        setGuestDropdownVisible(!isGuestDropdownVisible);
    };

    const incrementGuestCount = (type) => {
        setGuests((prevGuests) => {
            if (type === 'adults' && prevGuests.adults < 6) {
                return { ...prevGuests, adults: prevGuests.adults + 1 };
            }
            if (type === 'children' && prevGuests.children < 6) {
                return { ...prevGuests, children: prevGuests.children + 1 };
            }
            if (type === 'babies' && prevGuests.babies < 2) {
                return { ...prevGuests, babies: prevGuests.babies + 1 };
            }
            return prevGuests;
        });
    };

    const decrementGuestCount = (type) => {
        setGuests((prevGuests) => {
            if (type === 'adults' && prevGuests.adults > 1) {
                return { ...prevGuests, adults: prevGuests.adults - 1 };
            }
            if (type === 'children' && prevGuests.children > 0) {
                return { ...prevGuests, children: prevGuests.children - 1 };
            }
            if (type === 'babies' && prevGuests.babies > 0) {
                return { ...prevGuests, babies: prevGuests.babies - 1 };
            }
            return prevGuests;
        });
    };

    const handleGuestButtonClick = (event) => {
        // Prevent the dropdown from closing when clicking the "+" or "-" buttons
        event.stopPropagation();
    };

    return (
        <div className="search-container">
            <div className="search-bar">

                <input
                    type="text"
                    className="search-input"
                    placeholder="Destination city?"
                    aria-label="Destination city"
                />

                <input
                    type="text"
                    className="search-input"
                    id="arrivalDate"
                    placeholder="Arrival Date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    aria-label="Arrival Date"
                />

                <input
                    type="text"
                    className="search-input"
                    id="departureDate"
                    placeholder={departurePlaceholder}
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    aria-label="Departure Date"
                />

                <div className="guest-selector" onClick={toggleGuestDropdown} ref={dropdownRef} >
                    <input
                        type="text"
                        className="search-inputG"
                        placeholder="Guests"
                        readOnly
                        value={`${guests.adults  + guests.children} Guests, ${guests.babies} Babies`}
                        aria-label="Guests"
                        style={{ border: 'none' }}
                    />
                    {isGuestDropdownVisible && (
                        <div className="guest-dropdown">
                            <div className="guest-type">
                                <h4>Adults</h4>
                                <p>13 ans et plus</p>
                                <div className="counter">
                                    <button
                                        onClick={(e) => { decrementGuestCount('adults'); handleGuestButtonClick(e); }}
                                        className={guests.adults <= 1 ? 'disabled-btn' : ''}
                                    >
                                        -
                                    </button>
                                    <input type="number" value={guests.adults} readOnly />
                                    <button
                                        onClick={(e) => { incrementGuestCount('adults'); handleGuestButtonClick(e); }}
                                        className={guests.adults >= 6 ? 'disabled-btn' : ''}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="guest-type">
                                <h4>Enfants</h4>
                                <p>De 2 à 12 ans</p>
                                <div className="counter">
                                    <button
                                        onClick={(e) => { decrementGuestCount('children'); handleGuestButtonClick(e); }}
                                        className={guests.children <= 0 ? 'disabled-btn' : ''}
                                    >
                                        -
                                    </button>
                                    <input type="number" value={guests.children} readOnly />
                                    <button
                                        onClick={(e) => { incrementGuestCount('children'); handleGuestButtonClick(e); }}
                                        className={guests.children >= 6 ? 'disabled-btn' : ''}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="guest-type">
                                <h4>Bébés</h4>
                                <p>- de 2 ans</p>
                                <div className="counter">
                                    <button
                                        onClick={(e) => { decrementGuestCount('babies'); handleGuestButtonClick(e); }}
                                        className={guests.babies <= 0 ? 'disabled-btn' : ''}
                                    >
                                        -
                                    </button>
                                    <input type="number" value={guests.babies} readOnly />
                                    <button
                                        onClick={(e) => { incrementGuestCount('babies'); handleGuestButtonClick(e); }}
                                        className={guests.babies >= 2 ? 'disabled-btn' : ''}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button className="simple-search-button" aria-label="Search">
                    <FaSearch className="simple-icon" />
                </button>
            </div>
        </div>
    );
}

export default SearchComponent;
