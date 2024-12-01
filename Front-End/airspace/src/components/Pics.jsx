import React, { useState } from "react";
import BookingCard from "./BookingCard"; // Adjust the path if necessary
import "../assets/components/StaybnbGallery.css";
import houseImage1 from "../assets/images/house.jpg";
import houseImage2 from "../assets/images/house2.jpg";
import houseImage3 from "../assets/images/house3.jpg";
import houseImage4 from "../assets/images/house4.jpg";
import houseImage5 from "../assets/images/house5.jpg";

const ProGallery = () => {
    const [selectedImage, setSelectedImage] = useState(houseImage1);
    const [isLiked, setIsLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const images = [houseImage1, houseImage2, houseImage3, houseImage4, houseImage5];

    return (
        <div className="pro-gallery-container">
            <div className="gallery-header">
                <h2 className="gallery-title">30 Loft Chic & Cosy - Proche de la Corniche</h2>
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
                    <img src={selectedImage} alt="Main property" className="main-image" />
                </div>

                <div className="thumbnail-images-container">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            srcSet={`${image} 1x, ${image}?w=400 2x`}
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
                        <h3 className="modal-title">Rooms Description</h3>
                        <div className="modal-gallery">
                            {images.map((image, index) => (
                                <div key={index} className="modal-image-item">
                                    <img src={image} alt={`Room ${index + 1}`} className="modal-image" />
                                    <p className="modal-description">Room {index + 1} Description</p>
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
