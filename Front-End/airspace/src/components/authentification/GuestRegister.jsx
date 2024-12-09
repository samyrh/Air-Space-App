import React, { useState } from "react";
import axios from "axios";  // Import axios
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../assets/components/RegisterForm.css";

const Register = () => {
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target || {};
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (
            formData.FirstName &&
            formData.LastName &&
            formData.phone &&
            formData.email &&
            formData.password &&
            formData.confirmPassword
        )
            setError("");
    };

    const handlePhoneChange = (value) => {
        setFormData((prev) => ({ ...prev, phone: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields or password mismatch
        if (
            !formData.FirstName ||
            !formData.LastName ||
            !formData.phone ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("All fields are required to register!");
        } else if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
        } else {
            try {
                // Send POST request to backend
                const response = await axios.post("http://localhost:7090/api/auth/register/guest", formData);

                if (response.status === 201) {
                    alert(`Registration successful, welcome ${formData.FirstName} ${formData.LastName}!`);
                } else {
                    setError("Registration failed. Please try again.");
                }
            } catch (error) {
                console.error("Error during registration:", error);
                if (error.response && error.response.data) {
                    setError(error.response.data); // Show backend error message
                } else {
                    setError("Registration failed. Please try again.");
                }
            }
        }
    };


    const isFormValid =
        formData.FirstName.trim() &&
        formData.LastName.trim() &&
        formData.phone.trim() &&
        formData.email.trim() &&
        formData.password.trim() &&
        formData.confirmPassword.trim() &&
        formData.password === formData.confirmPassword;

    return (
        <div className="register-container">
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
                            <label htmlFor="FirstName">First Name</label>
                            <input
                                type="text"
                                id="FirstName"
                                name="FirstName"
                                value={formData.FirstName}
                                onChange={handleChange}
                                placeholder="Enter your First Name"
                            />
                        </div>
                        <div className="register-field">
                            <label htmlFor="LastName">Last Name</label>
                            <input
                                type="text"
                                id="LastName"
                                name="LastName"
                                value={formData.LastName}
                                onChange={handleChange}
                                placeholder="Enter your Last Name"
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
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="register-button"
                        disabled={!isFormValid}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
