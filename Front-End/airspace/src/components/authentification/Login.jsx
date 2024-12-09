import "../../assets/components/LoginGuest.css";
import React, { useState } from "react";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import {jwtDecode} from "jwt-decode";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false); // State for shake animation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(""); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username.trim() || !formData.password.trim()) {
            setError("Both fields are required to log in!");
            triggerShake(); // Trigger shake animation
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:7090/api/auth/authenticate",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const { jwt, role } = response.data;
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("role", role);

            const decodedToken = jwtDecode(jwt);
            const username = decodedToken.username;
            const userId = decodedToken.userId;
            const userRole = decodedToken.role;
            console.log("Decoded Token:", decodedToken);

            setError(""); // Clear any previous error
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            triggerShake(); // Trigger shake animation
        }
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500); // Reset shake after animation duration
    };

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
            </div>
        </div>
    );
};

export default Login;
