import React, { useState } from 'react';
import "../assets/components/BookingCard.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from "../App.js";





const IosWidget = () => {
    const pricePerNight = 42;

    // State for managing dates and guest count
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [babies, setBabies] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const toggleShowMore = () => {
        setShowAll(!showAll);
    };

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };
    const equipmentItems = [
        { name: "Smart TV", icon: "fa-tv" },
        { name: "Free Wi-Fi", icon: "fa-wifi" },
        { name: "Air Conditioning", icon: "fa-snowflake" },
        { name: "Kitchen", icon: "fa-utensils" },
        { name: "Washing Machine", icon: "fa-sync" }, // Use a different icon for washing machine
        { name: "Dishwasher", icon: "fa-glass-cheers" },
        { name: "Heater", icon: "fa-fire" },
        { name: "Iron", icon: "fa-tshirt" }, // Correct icon for Iron
        { name: "Shampoo", icon: "fa-shower" },
        { name: "Hair Dryer", icon: "fa-hand-sparkles" }, // Use appropriate Hair Dryer icon
        { name: "Fridge", icon: "fa-cogs" }, // Fridge icon can use "fa-snowman" (represents cool)
        { name: "Free Parking", icon: "fa-car" },
        { name: "Elevator", icon: "fa-arrow-up" }, // Use "fa-arrow-up" for Elevator (or alternative)
        { name: "Pets Allowed", icon: "fa-paw" },
        { name: "Smoke Detector", icon: "fa-bell" }, // Use "fa-smoke" for Smoke Detector
        { name: "First Aid Kit", icon: "fa-kit-medical" }, // Correct icon for First Aid Kit
        { name: "Fire Extinguisher", icon: "fa-fire-extinguisher" },
        { name: "Hot Tub", icon: "fa-hot-tub" },
        { name: "Balcony", icon: "fa-couch" }, // "fa-tree" is a good option for Balcony (represents open space)
        { name: "Workspace", icon: "fa-laptop" }
    ];

    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Handle date change
    const handleDateChange = (e) => {
        if (e.target.name === "arrival") {
            setArrivalDate(e.target.value);
            if (departureDate && e.target.value >= departureDate) {
                setDepartureDate("");
            }
        } else if (e.target.name === "departure") {
            setDepartureDate(e.target.value);
        }
    };

    // Handle select change
    const handleSelectChange = (e) => {
        if (e.target.name === "adults") {
            setAdults(Number(e.target.value));
        } else if (e.target.name === "children") {
            setChildren(Number(e.target.value));
        } else if (e.target.name === "babies") {
            setBabies(Number(e.target.value));
        }
    };

    // Calculate nights dynamically based on arrival and departure dates
    const calculateNights = () => {
        if (arrivalDate && departureDate) {
            const arrival = new Date(arrivalDate);
            const departure = new Date(departureDate);
            const diffTime = departure - arrival;
            return Math.ceil(diffTime / (1000 * 3600 * 24)); // Convert time difference to days
        }
        return 0;
    };

    // Calculate base price
    const nights = calculateNights();
    const basePrice = pricePerNight * nights;

    // Dynamic service fee (e.g., 10% of the base price)
    const serviceFeePercentage = 0.1;  // 10%
    const serviceFee = basePrice * serviceFeePercentage;

    // Additional fees based on guests
    const cleaningFee = adults > 2 ? 30 : 20; // Cleaning fee logic
    const securityDeposit = adults > 4 ? 50 : 30;  // Security deposit logic

    // Tax logic
    const adultsTax = adults > 4 ? (adults - 4) * 0.05 * basePrice : 0;  // 5% tax for adults above 4
    const childrenTax = children > 3 ? (children - 3) * 0.03 * basePrice : 0;  // 3% tax for children above 3

    // Total price calculation
    const totalBeforeTax = basePrice + serviceFee + cleaningFee + securityDeposit + adultsTax + childrenTax;

    // Disable the button if there are no nights
    const isButtonDisabled = nights === 0;

    return (
        <div className="page-container">
            <div className="main-content">
                {/* Title Row */}
                <div className="title-row">
                    <h1>Minneapolis, Minnesota, United States</h1>
                    <div className="rating">
                        <div className="stars">
                            {[...Array(5)].map((_, index) => (
                                <i
                                    key={index}
                                    className={`fas fa-star ${index < 4 ? "filled" : ""}`}
                                ></i>
                            ))}
                        </div>


                        <p className="review-count">(45 reviews)</p>
                    </div>
                </div>

                {/* Property Info */}
                <div className="property-info">
                    <div className="info-item">
                        <i className="fas fa-bed"></i>
                        <p>Total of 3 Beds</p>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-door-open"></i>
                        <p>Total of 5 Rooms</p>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-bath"></i>
                        <p>1 Bathroom</p>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-ruler-combined"></i>
                        <p>Area: 120 m²</p>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="separator-line"></div>

                {/* Host Section */}
                <div className="host-info">
                    <div className="host-avatar">
                        <img
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            alt="Host Avatar"
                        />
                    </div>
                    <h2>Host: Hicham</h2>
                    <p><strong>New Host</strong></p>
                    <p><strong>Languages:</strong> English, French</p>
                    <p><strong>Joined:</strong> January 2024</p>
                    <p><strong>Response Time:</strong> 2 hours</p>
                    <p><strong>Response Rate:</strong> 98%</p>
                </div>

                {/* Separator Line */}
                <div className="separator-line"></div>

                {/* Equipments Section */}
                <div className="equipments-info">
                    <h3>Equipments</h3>
                    <div className="equipments-grid">
                        {equipmentItems.slice(0, showAll ? equipmentItems.length : 10).map((item, index) => (
                            <div className="info-item" key={index}>
                                <i className={`fas ${item.icon}`}></i>
                                <p>{item.name}</p>
                            </div>
                        ))}

                    </div>
                    <button className="show-more-btn" onClick={toggleShowMore}>
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                </div>
                {/* Separator Line */}
                <div className="separator-line"></div>
                {/* Description Section */}
                <div className="description-section">
                    <h3 className="section-title">Description</h3>
                    <p className="description-text">
                        This charming property in the heart of Minneapolis is perfect for a comfortable and stylish stay. Whether you're visiting for business or leisure, enjoy the ideal location, beautiful design, and modern amenities.
                    </p>
                    <button
                        className="read-more-btn"
                        onClick={() => setShowDescription(!showDescription)}>
                        {showDescription ? "Show Less" : "Read More"}
                    </button>
                    {showDescription && (
                        <p className="extra-description">
                            The apartment offers a spacious living area with a fully equipped kitchen, making it perfect for both short and extended stays. Located close to local attractions, restaurants, and public transport, you’ll be able to explore everything the city has to offer.
                        </p>
                    )}
                </div>
                {/* Separator Line */}
                <div className="separator-line"></div>
            </div>
            {/* Widget */}
            <div className="widget-container">
                <div className="ios-widget">
                    <div className="ios-header">
                        <h3>
                            <span>{pricePerNight} €</span> <small>per night</small>
                        </h3>
                    </div>
                    <div className="ios-body">
                        <div className="ios-dates">
                            <div className="ios-input-group">
                                <label>Arrival</label>
                                <input
                                    type="date"
                                    name="arrival"
                                    value={arrivalDate}
                                    onChange={handleDateChange}
                                    min={today}
                                    placeholder="Select Arrival Date"
                                />
                            </div>
                            <div className="ios-input-group">
                                <label>Departure</label>
                                <input
                                    type="date"
                                    name="departure"
                                    value={departureDate}
                                    onChange={handleDateChange}
                                    min={arrivalDate ? new Date(arrivalDate).toISOString().split('T')[0] : today}
                                    placeholder="Select Departure Date"
                                />
                            </div>
                        </div>
                        <div className="ios-select-group">
                            <label>Adults</label>
                            <select
                                name="adults"
                                value={adults}
                                onChange={handleSelectChange}
                            >
                                {[...Array(7)].map((_, i) => (
                                    <option key={i} value={i}>
                                        {i} {i === 1 ? 'adult' : 'adults'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="ios-select-group">
                            <label>Children</label>
                            <select
                                name="children"
                                value={children}
                                onChange={handleSelectChange}
                            >
                                {[...Array(6)].map((_, i) => (
                                    <option key={i} value={i}>
                                        {i} {i === 1 ? 'child' : 'children'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="ios-select-group">
                            <label>Babies</label>
                            <select
                                name="babies"
                                value={babies}
                                onChange={handleSelectChange}
                            >
                                {[...Array(3)].map((_, i) => (
                                    <option key={i} value={i}>
                                        {i} {i === 1 ? 'baby' : 'babies'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="ios-footer">
                        <div className="ios-pricing">
                            <p>
                                {pricePerNight} € x {nights} nights <span>{basePrice} €</span>
                            </p>
                            <p>
                                Service Fee <span>{serviceFee.toFixed(2)} €</span>
                            </p>
                            <p>
                                Cleaning Fee <span>{cleaningFee} €</span>
                            </p>
                            <p>
                                Security Deposit <span>{securityDeposit} €</span>
                            </p>
                            <p>
                                Adults Tax <span>{adultsTax.toFixed(2)} €</span>
                            </p>
                            <p>
                                Children Tax <span>{childrenTax.toFixed(2)} €</span>
                            </p>
                            <hr/>
                            <p className="ios-total">
                                Total <span>{totalBeforeTax.toFixed(2)} €</span>
                            </p>
                        </div>
                        <button
                            className={`ios-button ${isButtonDisabled ? 'disabled' : ''}`}
                            disabled={isButtonDisabled}
                        >
                            Book Now
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default IosWidget;