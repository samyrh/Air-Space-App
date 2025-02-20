import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HostForm = () => {
    const [formData, setFormData] = useState({
        bio: "",
        hostingExperience: "",
        profileImage: "",
        highlights: "",
        hostDetails: "",
    });
    const [guestData, setGuestData] = useState(null);
    const [error, setError] = useState("");
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
                profileImage: formData.profileImage || "default.jpg",
                highlights: formData.highlights.split(",").map((highlight) => highlight.trim()),
                hostDetails: formData.hostDetails.split(",").map((detail) => detail.trim()),
                years: 2,
                months: 6,
            };

            // Log the object before sending the request
            console.log("POST Data:", postData);

            const response = await axios.post(
                "http://localhost:2424/api/auth/converttohost",
                postData
            );

            console.log("Response Data:", response.data);

            if (response.status === 200) {
                alert("Successfully converted to host!");
                navigate("/"); // Redirect to another page after successful submission
            }
        } catch (error) {
            console.error("Error converting to host:", error.response?.data || error.message);
            setError("Failed to convert to host. Please try again.");
        }
    };

    // Styles embedded directly
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
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.2)",
            color: "#333",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
        },
        inputFocus: {
            background: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 6px 40px rgba(0, 0, 0, 0.3)",
        },
        button: {
            width: "100%",
            padding: "15px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#333",
            background: "#ead7c3",
            border: "1px solid #292929",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 30px rgba(0, 0, 0, 0.3)",
        },
        buttonHover: {
            background: "#b19b88",
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.4)",
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
    };

    return (
        <div style={styles.container}>
            <div style={styles.glass}>
                <h1>Become a Host</h1>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    {[
                        { name: "bio", type: "textarea", placeholder: "Tell us about yourself" },
                        { name: "hostingExperience", type: "text", placeholder: "e.g., 2 years of hosting" },
                        { name: "profileImage", type: "text", placeholder: "Enter a URL for your profile image" },
                        { name: "highlights", type: "text", placeholder: "Enter highlights (comma separated)" },
                        { name: "hostDetails", type: "text", placeholder: "Enter host details (comma separated)" },
                    ].map(({ name, type, placeholder }) => (
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
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
                        onMouseOut={(e) => (e.target.style.background = styles.button.background)}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HostForm;
