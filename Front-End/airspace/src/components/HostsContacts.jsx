import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../assets/components/HostsContacts.css";
import { jwtDecode } from "jwt-decode";

const Hosts = () => {
    const [hosts, setHosts] = useState([]);  // State to store fetched hosts
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state for handling API errors

    const itemsPerPage = 5;  // Update this to 5
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = hosts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(hosts.length / itemsPerPage);
    const [guestId, setGuestId] = useState(null);  // State to store guestId

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem("jwt");

        if (token) {
            // Decode the JWT token to extract user information
            const decodedToken = jwtDecode(token);
            const extractedGuestId = decodedToken.guestId;  // Adjust based on your token structure
            setGuestId(extractedGuestId); // Set the guestId in state

            // Fetch hosts data from the API
            fetchHosts(extractedGuestId);
        }
    }, []);  // Empty dependency array ensures this effect runs once on mount

    const fetchHosts = async (guestId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5659/api/message/guest/${guestId}/host`);
            const data = await response.json();

            if (response.ok) {
                setHosts(data); // Set the fetched hosts data to state
                console.log(data);
            } else {
                setError("Failed to fetch hosts data");
            }
        } catch (error) {
            setError("An error occurred while fetching the hosts");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChatButtonClick = (hostId) => {
        navigate("/inbox", { state: { guestId, hostId } }); // Pass guestId and hostId to /inbox
    };

    if (loading) {
        return <div>Loading...</div>;  // Display loading message
    }

    if (error) {
        return <div>{error}</div>;  // Display error message
    }

    return (
        <div className="hosts-component">
            <header className="hosts-header">
                <h1>Our Hosts</h1>
                <p>Discover professional hosts and their offerings.</p>
            </header>
            <div className="hosts-grid">
                {currentItems.map((host, index) => (
                    <div key={index} className="host-card">
                        <div className="host-avatar-wrapper">
                            <img src={host.profileImage} alt={host.name} className="host-avatar" />
                        </div>
                        <div className="host-info">
                            <h2>{host.name}</h2>
                            <p className="host-location">{host.location}</p>
                            <div className="host-details">
                                <div className="details-item">
                                    <strong>Contact:</strong> {host.phone}
                                </div>
                                <div className="details-item">
                                    <strong>Email:</strong> {host.email}
                                </div>
                            </div>
                            <div className="host-actions">
                                <button className="chat-btn" onClick={() => handleChatButtonClick(host.id)}>
                                    Chat
                                </button>
                                <a href={host.propertyLink} className="view-property-btn">View Property</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}  // Optionally disable the active page
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Hosts;
