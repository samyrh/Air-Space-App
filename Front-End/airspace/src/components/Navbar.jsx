import React, { useState, useRef, useEffect } from 'react';
import '../assets/components/Navbar.css';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Home");
    const [navbarShrink, setNavbarShrink] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    useEffect(() => {
        if (location.pathname === "/guest/contacts") {
            setSelectedOption("Inbox");
        } else if (location.pathname === "/favorites") {
            setSelectedOption("Favorites");
        }
    }, [location.pathname]);

    // Map paths to button names
    const linkMap = {
        "/": "Home",
        "/about": "About",
        "/services": "Services",
        "/guest/contacts": "Contact",
        "http://localhost:8080/": "Chatbot", // Absolute URL for the chatbot
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
                navigate("/guest/contacts"); // Navigate to Contact route
                break;
            case "Chatbot":
                window.location.href = "http://localhost:8080/"; // Navigate to external site
                break;
            default:
                navigate("/"); // Default to Home
        }
    };

    const handleProfileClick = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleSelectChange = async (option) => { // Marking the function as async
        setSelectedOption(option);
        setDropdownVisible(false);

        if (option === "Inbox") {
            navigate("/guest/contacts"); // Navigate to /guest/contacts when "Inbox" is selected
        }
        else if (option === "Favorites") {
            navigate("/favorites");
        }
        else if (option === "Logout") {
            // Remove JWT token from localStorage or sessionStorage
            localStorage.removeItem("jwtToken");  // Assuming the token is stored in localStorage
            sessionStorage.removeItem("jwtToken"); // If it's stored in sessionStorage, remove it too

            // Optionally, you can clear other sensitive data as well
            alert('You have been logged out successfully.');

            // Redirect to the login page
            navigate("/login");
        }
        else if (option === "Refer a host") {
            try {
                const token = localStorage.getItem("jwt");
                if (!token) {
                    throw new Error("User not logged in");
                }

                // Decode the JWT token to get the username
                const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
                const username = decodedToken.sub; // Assuming 'sub' contains the username

                const response = await axios.put(
                    `http://localhost:2424/api/clients/become-host/${username}`, // Correct string interpolation
                    {}, // Empty body, can be omitted if not needed
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Correctly interpolate the token
                        },
                    }
                );

                alert(response.data); // Show success message
                navigate("/refer-host"); // Navigate to the host registration form
            } catch (error) {
                console.error("Error referring to host:", error);
                alert("Failed to update to host. Please try again.");
            }
        }
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
            // Navigate to SearchResults page with the search query
            navigate(`/results?query=${searchQuery.trim()}`);
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
                    <span>{selectedOption || "Home"}</span>
                </div>
                <div ref={dropdownRef} className={`navbar-dropdown ${dropdownVisible ? "visible" : ""}`}>
                    <div
                        className={selectedOption === "Inbox" ? "selected" : ""}
                        onClick={() => handleSelectChange("Inbox")}
                    >
                        Inbox
                    </div>
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
