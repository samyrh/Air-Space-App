import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/components/HostsContacts.css";
import { jwtDecode } from "jwt-decode";

const Hosts = () => {
    const [hosts, setHosts] = useState([]);
    const [properties, setProperties] = useState([]); // For storing properties of hosts
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = hosts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(hosts.length / itemsPerPage);
    const [guestId, setGuestId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (token) {
            const decodedToken = jwtDecode(token);
            const extractedGuestId = decodedToken.guestId;
            setGuestId(extractedGuestId);
            fetchHosts(extractedGuestId);
        }
    }, []);

    const fetchHosts = async (guestId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5659/api/message/guest/${guestId}/host`);
            const data = await response.json();

            if (response.ok) {
                setHosts(data);
                fetchProperties(data);  // Fetch properties after getting hosts data
            } else {
                setError("Failed to fetch hosts data");
            }
        } catch (error) {
            setError("An error occurred while fetching the hosts");
        } finally {
            setLoading(false);
        }
    };

    const fetchProperties = async (hostsData) => {
        try {
            const hostRefHosts = hostsData.map((host) => host.refHost); // Extract the refHost (String)
            const propertiesData = await Promise.all(
                hostRefHosts.map((refHost) =>
                    fetch(`http://localhost:8989/api/properties/host/${refHost}`).then((res) => res.json())
                )
            );
            setProperties(propertiesData);
            console.log(propertiesData)// Assuming propertiesData is an array of properties for each host
        } catch (error) {
            setError("An error occurred while fetching properties");
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChatButtonClick = (hostId) => {
        navigate("/inbox", { state: { guestId, hostId } });
    };

    const renderStars = (rating) => {
        const maxStars = 5;
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array.from({ length: fullStars }, (_, i) => (
                    <i key={`full-${i}`} className="fas fa-star" style={{ color: "#FFD700" }}></i>
                ))}
                {halfStar && <i className="fas fa-star-half-alt" style={{ color: "#FFD700" }}></i>}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <i key={`empty-${i}`} className="far fa-star" style={{ color: "#FFD700" }}></i>
                ))}
            </>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
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
                            <h2>Host: {host.name}</h2>
                            <p className="host-location">{host.location}</p>
                            <div className="host-details">
                                <div className="details-item">
                                    <strong>Contact:</strong> {host.phone}
                                </div>
                                <div className="details-item">
                                    <strong>Email:</strong> {host.email}
                                </div>
                            </div>
                            <div className="host-rating">
                                <strong>Rating:</strong> {renderStars(host.ratingAverage)}
                                <span> ({host.ratingAverage.toFixed(1)})</span>
                            </div>
                            <div className="host-actions">
                                <button className="chat-btn" onClick={() => handleChatButtonClick(host.id)}>
                                    Chat
                                </button>
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
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Hosts;
