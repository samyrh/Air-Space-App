import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HostForm = () => {
    const [formData, setFormData] = useState({
        bio: "",
        profileImage: "",
        highlights: "",
        hostDetails: "",
        years: 2,  // Initialize with a default value
    });
    const [guestData, setGuestData] = useState(null);
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(null); // Manage image preview
    const navigate = useNavigate();

    // Fetch guest data on mount
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token
            setGuestData(decodedToken);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image upload and set the profile image URL for preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a local object URL for preview
            setImagePreview(imageUrl); // Update the preview
            setFormData((prev) => ({ ...prev, profileImage: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!guestData) {
            setError("User data not found.");
            return;
        }

        try {
            const postData = {
                guestId: guestData?.guestId,
                bio: formData.bio || "",
                profileImage: formData.profileImage || "default.jpg", // Handle default image if not selected
                highlights: formData.highlights.split(",").map((highlight) => highlight.trim()),
                hostDetails: formData.hostDetails.split(",").map((detail) => detail.trim()),
                years: formData.years, // Use years from formData
                months: 6,
            };

            // Log the object before sending the request
            console.log("POST Data:", postData);

            const response = await axios.post(
                "http://localhost:2424/api/auth/converttohost",
                postData
            );

            console.log("Response Status:", response.status);
            console.log("Response Data:", response.data);

            if (response.status === 201) {
                // Redirect to home page after successful submission
                navigate("/");
            }
        } catch (error) {
            console.error("Error converting to host:", error.response?.data || error.message);
            setError("Failed to convert to host. Please try again.");
        }
    };

    const styles = {
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            background: "linear-gradient(to bottom, #dce0d9, #ead7c3)",
        },
        glass: {
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "30px",
            boxShadow: "0 10px 50px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            padding: "50px",
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
            color: "#333",
        },
        field: {
            marginBottom: "20px",
            textAlign: "left",
        },
        label: {
            display: "block",
            marginBottom: "8px",
            fontSize: "1.1rem",
            fontWeight: "500",
            color: "#333",
        },
        input: {
            width: "calc(100% - 36px)", // Ensures equal left & right padding inside container
            padding: "15px 18px", // Even left & right padding
            border: "none",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.2)",
            color: "#333",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "center", // Centers the button horizontally
            marginTop: "15px",
            gap: "10px", // Adds spacing between the two buttons
        },
        button: {
            padding: "12px 36px", // Increased width
            fontSize: "1rem", // Adjusted font size
            fontWeight: "bold",
            color: "#333",
            background: "#ead7c3",
            border: "1px solid #292929",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
        goHomeButton: {
            padding: "12px 36px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff", // White text color
            background: "#333", // Dark grey background
            border: "1px solid #292929", // Slightly lighter border for contrast
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
        error: {
            background: "rgba(255, 0, 0, 0.2)",
            color: "#ff6b6b",
            padding: "12px",
            borderRadius: "10px",
            borderLeft: "5px solid #ff6b6b",
            marginBottom: "20px",
            textAlign: "left",
            fontWeight: "500",
        },
        imagePreview: {
            marginTop: "10px",
            maxWidth: "200px",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.glass}>
                <h1>Become a Host Now</h1>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    {[{ name: "bio", type: "textarea", placeholder: "Tell us about yourself" },
                        { name: "highlights", type: "text", placeholder: "Enter highlights (comma separated)" },
                        { name: "hostDetails", type: "text", placeholder: "Enter host details (comma separated)" }].map(({ name, type, placeholder }) => (
                        <div style={styles.field} key={name}>
                            <label style={styles.label} htmlFor={name}>
                                {name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1")}
                            </label>
                            {type === "textarea" ? (
                                <textarea
                                    id={name}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder={placeholder}
                                />
                            ) : (
                                <input
                                    id={name}
                                    name={name}
                                    type={type}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder={placeholder}
                                />
                            )}
                        </div>
                    ))}

                    {/* Profile Image */}
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="profileImage">
                            Profile Image (Enter Path)
                        </label>
                        <input
                            id="profileImage"
                            name="profileImage"
                            type="text" // Changed to text input for path
                            value={formData.profileImage} // Bind value to formData
                            onChange={handleChange} // Handle input changes
                            style={styles.input}
                            placeholder="Enter image file path"
                        />
                    </div>


                    {/* Years Input */}
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="years">
                            Years of Hosting Experience
                        </label>
                        <input
                            id="years"
                            name="years"
                            type="number"
                            value={formData.years}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter years"
                        />
                    </div>

                    <div style={styles.buttonContainer}>
                        <button
                            type="submit"
                            style={styles.button}
                            disabled={!formData.bio || !formData.highlights || !formData.hostDetails || formData.years <= 0}
                        >
                            Submit
                        </button>

                        {/* Go Home Button */}
                        <button
                            type="button"
                            style={styles.goHomeButton}
                            onClick={() => navigate("/")}
                        >
                            Go Home
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HostForm;
