import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for `id`
import "../assets/components/StaybnbGallery.css";

const ProGallery = () => {
    const { id } = useParams(); // Get the `id` from the route
    const [property, setProperty] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://localhost:8989/api/properties/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperty(data);
                    if (data.images && data.images.length > 0) {
                        setSelectedImage(data.images[0]); // Set the first image as the default
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

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!property) {
        return <p className="loading-message">Loading...</p>;
    }

    // Show only the first 6 images in the main gallery
    const visibleImages = property.images.slice(0, 6);

    return (
        <div className="pro-gallery-container">
            <div className="gallery-header">
                <h2 className="gallery-title">{property.title}</h2>
                <button
                    className={`like-button ${isLiked ? "liked" : ""}`}
                    aria-label="Like this property"
                    onClick={handleLikeClick}
                >
                    {isLiked ? "❤️" : "🤍"}
                </button>
            </div>

            <div className="gallery-content">
                <div className="main-image-container">
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Main property"
                            className="main-image"
                        />
                    )}
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
