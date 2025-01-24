import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../assets/components/StaybnbGallery.css";

const ProGallery = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [guestId, setGuestId] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const guestIdFromToken = decodedToken.guestId;
                setGuestId(guestIdFromToken);
            } catch (err) {
                console.error('Error decoding token:', err);
            }
        }

        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://localhost:8989/api/properties/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperty(data);
                    if (data.images && data.images.length > 0) {
                        setSelectedImage(data.images[0]);
                    }
                } else {
                    setError("Property not found");
                }
            } catch (err) {
                setError("An error occurred while fetching property details");
            }
        };

        fetchProperty();
    }, [id]);

    useEffect(() => {
        if (guestId) {
            const storedFavorites = JSON.parse(localStorage.getItem(guestId)) || [];
            setFavorites(storedFavorites);
            // Check if this property is liked
            setIsLiked(storedFavorites.some(fav => fav.id === property?.id));
        }
    }, [guestId, property]);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };
    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleLikeClick = () => {
        if (!guestId) return;

        setIsLiked(!isLiked);

        if (!isLiked) {
            const updatedFavorites = [...favorites, property];
            setFavorites(updatedFavorites);
            localStorage.setItem(guestId, JSON.stringify(updatedFavorites));
        } else {
            const updatedFavorites = favorites.filter(fav => fav.id !== property.id);
            setFavorites(updatedFavorites);
            localStorage.setItem(guestId, JSON.stringify(updatedFavorites));
        }
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!property) {
        return <p className="loading-message">Loading...</p>;
    }

    const visibleImages = property.images.slice(0, 6);

    return (
        <div className="pro-gallery-container">
            <div className="gallery-header">
                <h2 className="gallery-title">{property.title}</h2>
                <button
                    className={`like-button ${isLiked ? "liked" : ""}`}
                    onClick={handleLikeClick}
                >
                    {isLiked ? "❤️" : "🤍"}
                </button>
            </div>

            <div className="gallery-content">
                <div className="main-image-container">
                    {selectedImage && <img src={selectedImage} alt="Main property" className="main-image"/>}
                </div>

                <div className="thumbnail-images-container">
                    {visibleImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="thumbnail-image"
                            onClick={() => handleThumbnailClick(image)}
                        />
                    ))}
                </div>
            </div>

            <button className="view-more-button" onClick={handleModalToggle}>
                View All Photos
            </button>
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleModalToggle}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Rooms Pictures</h3>
                        <div className="modal-gallery">
                            {property.images.map((image, index) => (
                                <div key={index} className="modal-image-item">
                                    <img
                                        src={image}
                                        alt={`Room ${index + 1}`}
                                        className="modal-image"
                                    />
                                    <p className="modal-description">
                                        Room {index + 1} Description
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProGallery;
