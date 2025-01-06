import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../assets/components/RegisterForm.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [loaderProgress, setLoaderProgress] = useState(0); // Track loader progress
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target || {};
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (
            formData.name &&
            formData.username &&
            formData.phone &&
            formData.email &&
            formData.password &&
            formData.confirmPassword
        )
            setError("");

        if (formData.password && formData.confirmPassword) {
            setPasswordMatch(formData.password === formData.confirmPassword);
        }
    };

    const handlePhoneChange = (value) => {
        setFormData((prev) => ({ ...prev, phone: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTransitioning(true); // Start transition
        setLoaderProgress(0); // Reset loader progress

        if (
            !formData.name ||
            !formData.username ||
            !formData.phone ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("All fields are required to register!");
            setLoading(false);
            setTransitioning(false);
        } else if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            setTransitioning(false);
        } else {
            try {
                const response = await axios.post("http://localhost:2424/api/auth/register", formData);

                if (response.status === 201) {
                    // Simulate loader progress and then redirect
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 10;
                        setLoaderProgress(progress);
                        if (progress >= 100) {
                            clearInterval(interval);
                            setTimeout(() => {
                                navigate("/login"); // Redirect to login after loading animation completes
                            }, 500); // Delay navigation by 500ms for smooth transition
                        }
                    }, 200); // Simulate loader progress every 200ms
                } else {
                    setError("Registration failed. Please try again.");
                    setLoading(false);
                    setTransitioning(false);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Registration failed. Please try again.");
                }
                setLoading(false);
                setTransitioning(false);
            }
        }
    };

    const isFormValid =
        formData.name.trim() &&
        formData.username.trim() &&
        formData.phone.trim() &&
        formData.email.trim() &&
        formData.password.trim() &&
        formData.confirmPassword.trim() &&
        formData.password === formData.confirmPassword;

    return (
        <div className={`register-container ${transitioning ? "transitioning" : ""}`}>
            <div className="register-glass">
                <div className="branding">
                    <h1>Spacebnb</h1>
                    <p>Explore your space from anywhere</p>
                </div>
                <h1 className="register-title">Create Account</h1>
                <form onSubmit={handleSubmit} className="register-form">
                    {error && <div className="register-error">{error}</div>}
                    <div className="register-row">
                        <div className="register-field">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="register-field">
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
                    </div>
                    <div className="register-row">
                        <div className="register-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your Email"
                            />
                        </div>
                        <div className="register-field">
                            <label htmlFor="phone">Phone</label>
                            <PhoneInput
                                country="ma"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                inputStyle={{
                                    width: "100%",
                                    height: "50px",
                                    borderRadius: "15px",
                                    fontSize: "1.1rem",
                                    padding: "10px 20px",
                                    border: "none",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                                }}
                                buttonStyle={{
                                    backgroundColor: "#f3f0e9",
                                    border: "none",
                                }}
                                dropdownStyle={{
                                    backgroundColor: "#ffffff",
                                    color: "#333",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>
                    </div>
                    <div className="register-row">
                        <div className="register-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your Password"
                            />
                        </div>
                        <div className="register-field">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your Password"
                                style={{
                                    borderColor: passwordMatch ? "green" : "red",
                                }}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="register-button"
                        disabled={!isFormValid || loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {loading && (
                    <div className="loading-bar">
                        <div
                            className="loading-progress"
                            style={{ width: `${loaderProgress}%` }}
                        ></div>
                    </div>
                )}

                <div className="register-footer">
                    <p>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
