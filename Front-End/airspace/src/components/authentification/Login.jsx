import "../../assets/components/LoginGuest.css";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode for decoding the JWT token

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false); // State for shake animation
    const [userRole, setUserRole] = useState(null); // State for managing user role
    const [userData, setUserData] = useState(null); // State for managing decoded user data

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(""); // Clear error on input change
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username.trim() || !formData.password.trim()) {
            setError("Both fields are required to log in!");
            triggerShake(); // Trigger shake animation
            return;
        }

        try {
            // Make API call to authenticate the user
            const response = await axios.post(
                "http://localhost:5566/api/auth/authenticate", // Match with Spring Boot endpoint
                JSON.stringify({ username: formData.username, password: formData.password }), // Sending the credentials in the correct format
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Extract JWT token from response
            const token = response.data.jwt; // Access the 'jwt' key from the response

            // Log the token in the console
            console.log("JWT Token:", token);

            // Store JWT token in localStorage
            localStorage.setItem("jwt", token);

            // Decode the JWT to get user info (including role)
            const decodedToken = jwtDecode(token);
            console.log(JSON.stringify(decodedToken, null, 2));
            // Access both username and role (or any other details you added in the token)
            const username = decodedToken.sub; // `sub` typically holds the username
            const role = decodedToken.role;  // Access the role from the token

            // Update states for user data and role
            setUserRole(role);
            setUserData(decodedToken); // Store the decoded token data

            // Clear any error
            setError("");
        } catch (error) {
            // Handle error response from server
            if (error.response) {
                setError(error.response.data || "Invalid username or password.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            triggerShake(); // Trigger shake animation
        }
    };

    // Trigger shake animation on invalid form submission
    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500); // Reset shake after animation duration
    };

    // Form validation: Ensure both fields are not empty
    const isFormValid = formData.username.trim() && formData.password.trim();

    return (
        <div className="login-container">
            <div className={`login-glass ${shake ? "shake" : ""}`}>
                <div className="branding">
                    <h1>Spacebnb</h1>
                    <p>Explore your space from anywhere</p>
                </div>
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Log in to your Spacebnb account</p>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login-error">{error}</div>}
                    <div className="login-field">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="login-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={!isFormValid}
                    >
                        Log In
                    </button>
                </form>
                <p className="login-footer">
                    Don’t have an account?{" "}
                    <a href="/register" className="login-link">
                        Sign up
                    </a>
                </p>

                {/* Conditional Rendering based on user role */}
                {userRole && (
                    <div className="role-dashboard">
                        {userRole === "HOST" && (
                            <div>
                                <h2>Welcome, {userData.sub}!</h2>
                                <p>You have HOST privileges. You can manage listings, view bookings, etc.</p>
                                {/* You can add any host-specific content here */}
                            </div>
                        )}
                        {userRole === "GUEST" && (
                            <div>
                                <h2>Welcome, {userData.sub}!</h2>
                                <p>You are logged in as a GUEST. You can browse and book spaces.</p>
                                {/* You can add any guest-specific content here */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
