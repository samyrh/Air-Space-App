import "../../assets/components/LoginGuest.css";
import React, { useState } from "react";


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (formData.email && formData.password) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email === "" || formData.password === "") {
            setError("Both fields are required to log in!");
        } else {
            alert(`Welcome to Spacebnb, ${formData.email}!`);
        }
    };

    const isFormValid = formData.email.trim() && formData.password.trim();

    return (
        <div className="login-container">
            <div className="login-glass">
                <div className="branding">
                    <h1>Spacebnb</h1>
                    <p>Explore your space from anywhere</p>
                </div>
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Log in to your Spacebnb account</p>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login-error">{error}</div>}
                    <div className="login-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
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
