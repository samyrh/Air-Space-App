// BecomeHost.jsx
import React from "react";
import "../assets/components/BecomeHost.css";


const HostAndProperty = () => {
    return (
        <div className="host-property-container">
            <div className="left-section">
                <h2>Become a Host</h2>
                <form className="host-form">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" />

                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />

                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" name="phone" placeholder="Enter your phone number" />

                    <label htmlFor="description">Why do you want to become a host?</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        placeholder="Tell us about yourself"
                    ></textarea>

                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
            <div className="right-section">
                <h2>Register Your Property</h2>
                <p>
                    Showcase your property to millions of travelers around the world. Register now and start
                    hosting!
                </p>
                <button className="cta-button">Register Property</button>
            </div>
        </div>
    );
};

export default HostAndProperty;
