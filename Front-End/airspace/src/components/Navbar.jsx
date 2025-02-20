import React, { useState, useEffect, useRef } from 'react';
import '../assets/components/Navbar.css';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Home");
    const [navbarShrink, setNavbarShrink] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [guestId, setGuestId] = useState(null);
    const [userType, setUserType] = useState('guest');
    const [userName, setUserName] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/guest/contacts") {
            setSelectedOption("Inbox");
        } else if (location.pathname === "/favorites") {
            setSelectedOption("Favorites");
        }
    }, [location.pathname]);

    const linkMap = {
        "/": "Home",
        "/about": "About",
        "/services": "Services",
        "/guest/contacts": "Contact",
        "http://localhost:8080/": "Chatbot",
    };

    const activeButton = linkMap[location.pathname] || null;

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const guestId = decodedToken.guestId;
                setGuestId(guestId);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const handleButtonClick = (link) => {
        switch (link) {
            case "Home":
                navigate("/");
                break;
            case "About":
                navigate("/about");
                break;
            case "Services":
                navigate("/services");
                break;
            case "Contact":
                navigate("/guest/contacts");
                break;
            case "Chatbot":
                window.location.href = "http://localhost:8080/";
                break;
            default:
                navigate("/");
        }
    };

    const handleProfileClick = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleSelectChange = async (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);

        if (option === "Inbox") {
            navigate("/guest/contacts");
        } else if (option === "Favorites") {
            navigate("/favorites");
        } else if (option === "Logout") {
            // Clear storage to effectively log out
            localStorage.removeItem("jwt");
            sessionStorage.removeItem("jwt");

            // Redirect to login page using React Router's navigate
            navigate("/login", { replace: true });
        } else if (option === "Refer a host" && userType === 'guest') {
            navigate("/refer-host");
        }
    };

    useEffect(() => {
        const fetchGuestData = async () => {
            if (guestId) {
                try {
                    const response = await axios.get(`http://localhost:2424/api/clients/${guestId}`);
                    if (response.status === 200) {
                        const userIsHost = response.data.host;
                        setUserType(userIsHost ? 'host' : 'guest');
                        setUserName(response.data.name);  // Assuming `name` field for the guest/host
                    } else {
                        console.error("Guest not found");
                    }
                } catch (error) {
                    console.error("Error fetching guest data:", error);
                    alert("There was an error fetching your profile data.");
                }
            }
        };

        fetchGuestData();
    }, [guestId]);

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
                            e.preventDefault();
                            handleButtonClick(linkName);
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
                    {userType === 'guest' && (
                        <div onClick={() => handleSelectChange("Refer a host")}>Refer a host</div>
                    )}
                    <div onClick={() => handleSelectChange("Account")}>Account Settings</div>
                    <div onClick={() => handleSelectChange("Logout")}>Logout</div>
                </div>

                {/* Stylish Welcome Message */}
                <div className="welcome-message">
                    {userName && (
                        <span>
                            Welcome, <strong>{userType === 'host' ? 'Host' : 'Guest'} {userName}</strong>
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
