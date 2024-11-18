import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import '../assets/components/SearchBar.css';

function SearchComponent() {
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departurePlaceholder, setDeparturePlaceholder] = useState('Departure Date');
    const [isGuestDropdownVisible, setGuestDropdownVisible] = useState(false);
    const [guests, setGuests] = useState({ adults: 1, children: 0, babies: 0 });
    const dropdownRef = useRef(null);
    const arrivalDateRef = useRef(null);
    const departureDateRef = useRef(null);
    const guestInputRef = useRef(null); // Ref for guest input
    const searchBarRef = useRef(null); // Ref for the search bar

    const handleArrivalDateChange = (e) => {
        const dateStr = e.target.value;
        setArrivalDate(dateStr);
        if (!departureDate || new Date(departureDate) <= new Date(dateStr)) {
            const nextDay = new Date(dateStr);
            nextDay.setDate(nextDay.getDate() + 1);
            setDepartureDate(nextDay.toISOString().split("T")[0]);
        }
        setDeparturePlaceholder(`Departure (after ${dateStr})`);
    };

    const handleDepartureDateChange = (e) => {
        const dateStr = e.target.value;
        if (new Date(dateStr) <= new Date(arrivalDate)) {
            setDepartureDate('');
        } else {
            setDepartureDate(dateStr);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !guestInputRef.current.contains(event.target)) {
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
        event.stopPropagation();
    };

    const triggerCalendar = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.showPicker();
        }
    };

    // Helper function to determine if the button should be disabled (red)
    const isButtonDisabled = (type, action) => {
        if (action === 'increment') {
            if (type === 'adults' && guests.adults >= 6) return true;
            if (type === 'children' && guests.children >= 6) return true;
            if (type === 'babies' && guests.babies >= 2) return true;
        } else if (action === 'decrement') {
            if (type === 'adults' && guests.adults <= 1) return true;
            if (type === 'children' && guests.children <= 0) return true;
            if (type === 'babies' && guests.babies <= 0) return true;
        }
        return false;
    };

    return (
        <div className="search-container">
            <div className="search-bar" ref={searchBarRef}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Destination"
                />

                <div className="vertical-divider"></div>

                <input
                    type="date"
                    id="arrivalDate"
                    ref={arrivalDateRef}
                    className="search-input"
                    placeholder="Arrival Date"
                    value={arrivalDate}
                    onChange={handleArrivalDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    onClick={() => triggerCalendar(arrivalDateRef)}
                />

                <div className="vertical-divider"></div>

                <input
                    type="date"
                    id="departureDate"
                    ref={departureDateRef}
                    className="search-input"
                    placeholder={departurePlaceholder}
                    value={departureDate}
                    onChange={handleDepartureDateChange}
                    min={arrivalDate}
                    onClick={() => triggerCalendar(departureDateRef)}
                />

                <div className="vertical-divider"></div>

                <div
                    ref={guestInputRef}
                    className="search-input"
                    onClick={toggleGuestDropdown}
                >
                    {guests.adults} Adults, {guests.children} Children, {guests.babies} Babies
                </div>
            </div>

            {/* Dropdown is now outside the search bar */}
            {isGuestDropdownVisible && (
                <div
                    className="guest-dropdown"
                    ref={dropdownRef}
                    onClick={handleGuestButtonClick}
                    style={{
                        position: "absolute",
                        top: searchBarRef.current ? searchBarRef.current.offsetTop + searchBarRef.current.offsetHeight : 0,
                        left: guestInputRef.current ? guestInputRef.current.offsetLeft : 0,
                        width: guestInputRef.current ? guestInputRef.current.offsetWidth : "auto"
                    }}
                >
                    <div className="guest-item">
                        <span>Adults</span>
                        <button
                            onClick={() => decrementGuestCount('adults')}
                            disabled={isButtonDisabled('adults', 'decrement')}
                            className={`guest-btn ${isButtonDisabled('adults', 'decrement') ? 'disabled' : ''}`}
                        >
                            -
                        </button>
                        <span>{guests.adults}</span>
                        <button
                            onClick={() => incrementGuestCount('adults')}
                            disabled={isButtonDisabled('adults', 'increment')}
                            className={`guest-btn ${isButtonDisabled('adults', 'increment') ? 'disabled' : ''}`}
                        >
                            +
                        </button>
                    </div>
                    <div className="guest-item">
                        <span>Children</span>
                        <button
                            onClick={() => decrementGuestCount('children')}
                            disabled={isButtonDisabled('children', 'decrement')}
                            className={`guest-btn ${isButtonDisabled('children', 'decrement') ? 'disabled' : ''}`}
                        >
                            -
                        </button>
                        <span>{guests.children}</span>
                        <button
                            onClick={() => incrementGuestCount('children')}
                            disabled={isButtonDisabled('children', 'increment')}
                            className={`guest-btn ${isButtonDisabled('children', 'increment') ? 'disabled' : ''}`}
                        >
                            +
                        </button>
                    </div>
                    <div className="guest-item">
                        <span>Babies</span>
                        <button
                            onClick={() => decrementGuestCount('babies')}
                            disabled={isButtonDisabled('babies', 'decrement')}
                            className={`guest-btn ${isButtonDisabled('babies', 'decrement') ? 'disabled' : ''}`}
                        >
                            -
                        </button>
                        <span>{guests.babies}</span>
                        <button
                            onClick={() => incrementGuestCount('babies')}
                            disabled={isButtonDisabled('babies', 'increment')}
                            className={`guest-btn ${isButtonDisabled('babies', 'increment') ? 'disabled' : ''}`}
                        >
                            +
                        </button>
                    </div>
                </div>
            )}

            <button className="search-button">
                <FaSearch className="search-icon" />
            </button>
        </div>
    );
}

export default SearchComponent;
