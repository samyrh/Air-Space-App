import React, { useState, useRef, useEffect } from 'react';
import '../assets/components/Navbar.css';
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Profile");
    const [navbarShrink, setNavbarShrink] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    // Map paths to button names
    const linkMap = {
        "/": "Home",
        "/about": "About",
        "/services": "Services",
        "/contact": "Contact",
    };

    const activeButton = linkMap[location.pathname] || null; // Determine active button or set to null if no match

    const handleButtonClick = (link) => {
        switch (link) {
            case "Home":
                navigate("/"); // Navigate to Home route
                break;
            case "About":
                navigate("/about"); // Navigate to About route
                break;
            case "Services":
                navigate("/services"); // Navigate to Services route
                break;
            case "Contact":
                navigate("/contact"); // Navigate to Contact route
                break;
            default:
                navigate("/"); // Default to Home
        }
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

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setNavbarShrink(true);
        } else {
            setNavbarShrink(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchIconClick = () => {
        if (searchQuery.trim()) {
            alert('Searching for: ' + searchQuery);
        } else {
            alert('Please enter a search query.');
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${navbarShrink ? 'navbar-shrink' : ''}`}>
            <div className="navbar-left">
                <div className="navbar-logo"></div>
                <span className="navbar-name">Staybnb</span>
            </div>
            <div className="navbar-center">
                {Object.entries(linkMap).map(([path, linkName]) => (
                    <a
                        key={path}
                        href="#"
                        className={`navbar-link ${activeButton === linkName ? "selected" : ""}`}
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            handleButtonClick(linkName); // Navigate programmatically
                        }}
                    >
                        {linkName}
                    </a>
                ))}
            </div>
            <div className="navbar-right">
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="search-icon-button" onClick={handleSearchIconClick}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>

                <img
                    className="navbar-user-avatar"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="User Avatar"
                />
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
