import React, { useState } from "react";
import "../assets/components/AddProperty.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: "",
        name: "",
        bathrooms: 0,
        bedrooms: 0,
        beds: 0,
        metaDescription: "",
        description: "",
        latitude: 0,
        longitude: 0,
        persons: 0,
        rating: 0,
        city: "",
        pricePerNight: 0,
        cleaningFee: 0,
        serviceFee: 0,
        type: "",
        images: [],
        availability: [],
        rules: "",
        amenities: "",
        status: "",
        hostId: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (Object.values(formData).some((field) => !field)) {
            setError("All fields are required!");
        } else {
            setError("");
        }
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Ensure all required fields are filled
        const requiredFields = ["title", "name", "description", "city", "hostId"];
        const hasEmptyFields = requiredFields.some((field) => !formData[field]);

        if (hasEmptyFields) {
            setError("All required fields must be completed!");
            setLoading(false);
            return;
        }

        try {
            const propertyData = {
                ...formData,
                amenities: formData.amenities.split(","),
                rules: formData.rules.split(","),
                availability: formData.availability.map((date) => new Date(date)),
            };

            const response = await axios.post("http://localhost:2424/api/properties", propertyData);

            if (response.status === 201) {
                navigate("/properties");
            } else {
                setError("Failed to add property. Please try again.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error adding property:", error);
            setError("Failed to add property. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="add-property-container">
            <div className="add-property-glass">
                <h1 className="add-property-title">Add New Property</h1>
                <form onSubmit={handleSubmit} className="add-property-form">
                    {error && <div className="add-property-error">{error}</div>}

                    <div className="add-property-field">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter property title"
                        />
                    </div>

                    <div className="add-property-field">
                        <label htmlFor="name">Host Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter host name"
                        />
                    </div>

                    <div className="add-property-row">
                        <div className="add-property-field">
                            <label htmlFor="bathrooms">Bathrooms</label>
                            <input
                                type="number"
                                id="bathrooms"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="add-property-field">
                            <label htmlFor="bedrooms">Bedrooms</label>
                            <input
                                type="number"
                                id="bedrooms"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="add-property-field">
                            <label htmlFor="beds">Beds</label>
                            <input
                                type="number"
                                id="beds"
                                name="beds"
                                value={formData.beds}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="add-property-field">
                        <label htmlFor="metaDescription">Meta Description</label>
                        <input
                            type="text"
                            id="metaDescription"
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleChange}
                            placeholder="Short description"
                        />
                    </div>

                    <div className="add-property-field">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Detailed property description"
                        ></textarea>
                    </div>

                    <div className="add-property-field">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City where the property is located"
                        />
                    </div>

                    <div className="add-property-field">
                        <label htmlFor="pricePerNight">Price per Night</label>
                        <input
                            type="number"
                            id="pricePerNight"
                            name="pricePerNight"
                            value={formData.pricePerNight}
                            onChange={handleChange}
                            placeholder="Price per night"
                        />
                    </div>

                    <div className="add-property-field">
                        <label htmlFor="images">Photos</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />
                        {formData.images.length > 0 && (
                            <div className="photo-preview">
                                {formData.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="add-property-button" disabled={loading}>
                        {loading ? "Adding Property..." : "Add Property"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
