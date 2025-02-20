// src/components/ScrollToTopButton.jsx

import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { AiOutlineArrowUp } from "react-icons/ai"; // Importing the up arrow icon

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    // Show/hide the button based on the scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true); // Show the button when scrolled down 300px
            } else {
                setShowButton(false); // Hide the button when near the top
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll the page to the top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scroll to the top
        });
    };

    return (
        showButton && (
            <IconButton
                onClick={scrollToTop}
                sx={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    background: "linear-gradient(135deg, #6e6e6e, #a1a1a1)", // Grey gradient (dark to light)
                    color: "white",
                    borderRadius: "50%",
                    padding: "15px",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)", // Subtle shadow
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.3s ease", // Smooth transition for hover and appearance
                    "&:hover": {
                        background: "linear-gradient(135deg, #5c5c5c, #909090)", // Slightly darker grey on hover
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)", // More pronounced shadow on hover
                    },
                }}
            >
                <AiOutlineArrowUp size={28} />
            </IconButton>
        )
    );
};

export default ScrollToTopButton;
