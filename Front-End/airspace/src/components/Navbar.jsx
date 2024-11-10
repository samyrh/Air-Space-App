import React, { useState, useRef, useEffect } from 'react';
import '../assets/components/Navbar.css';

function Navbar() {
    const [activeButton, setActiveButton] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Profile");
    const dropdownRef = useRef(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setTimeout(() => setActiveButton(null), 300);
    };

    const handleProfileClick = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleSelectChange = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo"></div>
                <span className="navbar-name">AirSpace</span>
            </div>
            <div className="navbar-center">
                <a href="#" className={activeButton === "Home" ? "active" : ""} onClick={() => handleButtonClick("Home")}>Home</a>
                <a href="#" className={activeButton === "About" ? "active" : ""} onClick={() => handleButtonClick("About")}>About</a>
                <a href="#" className={activeButton === "Services" ? "active" : ""} onClick={() => handleButtonClick("Services")}>Services</a>
                <a href="#" className={activeButton === "Contact" ? "active" : ""} onClick={() => handleButtonClick("Contact")}>Contact</a>
            </div>
            <div className="navbar-right">
                <img className="navbar-user-avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User Avatar" />
                <div className="navbar-profile-button" onClick={handleProfileClick}>
                    <span>{selectedOption || "Profile"}</span>
                </div>
                <div ref={dropdownRef} className={`navbar-dropdown ${dropdownVisible ? "visible" : ""}`}>
                    <div onClick={() => handleSelectChange("Inbox")}>Inbox</div>
                    <div onClick={() => handleSelectChange("Trips")}>Trips</div>
                    <div onClick={() => handleSelectChange("Favorites")}>Favorites</div>
                    <div onClick={() => handleSelectChange("List my property")}>List my property</div>
                    <div onClick={() => handleSelectChange("Refer a host")}>Refer a host</div>
                    <div onClick={() => handleSelectChange("Account")}>Account Settings</div>
                    <div onClick={() => handleSelectChange("Logout")}>Logout</div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
