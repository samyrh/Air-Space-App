import React, { useState, useEffect, useRef } from 'react';
import '../assets/components/Services.css';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ServicesPage = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [topRatedProperties, setTopRatedProperties] = useState([]); // State to hold fetched properties
    const [loading, setLoading] = useState(true); // Loading state
    const { ref: introRef, inView: introInView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });
    const navigate = useNavigate();
    const { ref: servicesRef, inView: servicesInView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    const { ref: contactRef, inView: contactInView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    const testimonials = [
        { name: "John Doe", location: "New York, USA", text: "“Spacebnb made my dream vacation come true! The moon retreat was unlike anything I’ve ever experienced!”", imgSrc: require('../assets/images/service.jpg') },
        { name: "Jane Smith", location: "London, UK", text: "“Bora Bora was stunning, and the service was exceptional. I felt like royalty throughout the entire stay!”", imgSrc: require('../assets/images/service.jpg') },
        { name: "Carlos Martinez", location: "Madrid, Spain", text: "“Tokyo was amazing, and the entire experience was smooth thanks to the Spacebnb team. Highly recommend!”", imgSrc: require('../assets/images/service.jpg') },
        { name: "Emily Johnson", location: "Toronto, Canada", text: "“Staying in a space station was beyond anything I could’ve imagined. This experience is once in a lifetime!”", imgSrc: require('../assets/images/service.jpg') },
        { name: "Michael Lee", location: "Sydney, Australia", text: "“The Galapagos Islands were an absolute dream. The eco-lodges made it feel like paradise.”", imgSrc: require('../assets/images/service.jpg') },
        { name: "Sophia Adams", location: "Paris, France", text: "“Paris was a beautiful destination, and the luxurious stays made it even more special. Can’t wait to return!”", imgSrc: require('../assets/images/service.jpg') }
    ];

    // Fetch the top-rated properties from the API
    useEffect(() => {
        const fetchTopRatedProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8989/api/properties/top-rated');
                // Slice the response to show only the first 15 items
                setTopRatedProperties(response.data.slice(0, 15));
                setLoading(false); // Set loading to false once the data is fetched
            } catch (error) {
                console.error('Error fetching top-rated properties:', error);
                setLoading(false);
            }
        };

        fetchTopRatedProperties();
    }, []); // Empty dependency array to run once when the component mounts

    // Mouse Dragging Logic for Testimonials
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const testimonialContainerRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - testimonialContainerRef.current.offsetLeft);
        setScrollLeft(testimonialContainerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        const x = e.pageX - testimonialContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll sensitivity
        testimonialContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const images = [
        require('../assets/images/pic1.jpg'),
        require('../assets/images/pic2.jpg'),
        require('../assets/images/pic3.jpg'),
        require('../assets/images/pic4.jpg'),
        require('../assets/images/pic5.jpg'),
        require('../assets/images/pic6.jpg')
    ];

    // Auto slide effect for Image Slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);
    const handleMoreDetails = (propertyId) => {
        // Navigate to the booking layer with the property ID
        navigate(`/booking/property/${propertyId}`);
    };

    return (
        <div className="services-page">

            {/* Introduction Section */}
            <section className={`intro-section section ${introInView ? 'fade-in scale-up' : ''}`} ref={introRef}>
                <div className="intro-content">
                    <h1 className="services-title">“Explore Beyond the Ordinary”</h1>
                    <p className="services-description">
                        At Spacebnb, we believe that travel is about more than just a destination. It's about creating
                        unforgettable experiences—whether on Earth or in the far reaches of space!
                    </p>
                    <button className="cta-button">Explore Our Services</button>
                </div>
                <div className="intro-image">
                    <img src={require('../assets/images/service.jpg')} alt="Spacebnb Services" className="intro-img"/>
                </div>
            </section>

            {/* Image Slider Section */}
            <section className="image-slider-section">
                <h2 className="section-title">Explore Our Destinations</h2>
                <div className="image-slider">
                    <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {images.map((image, index) => (
                            <div key={index} className="slider-item">
                                <img src={image} alt={`Slider ${index}`} className="slider-image"/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={`services-section section ${servicesInView ? 'fade-in slide-up' : ''}`} ref={servicesRef}>
                <h2 className="section-title">Most Visited Places</h2>
                <div className="services-container">
                    {/* Loading state */}
                    {loading ? (
                        <p>Loading top-rated properties...</p>
                    ) : (
                        topRatedProperties.map((property, index) => (
                            <div key={index} className="service-item">
                                <img src={property.images[0]} alt={`Service ${index}`} className="service-image"/>
                                <h3 className="service-name">{property.title}</h3>
                                <p className="service-description">{property.metaDescription}</p>
                                <button
                                    className="cta-button"
                                    onClick={() => handleMoreDetails(property.id)} // Pass the property ID here
                                >
                                    Check Now
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="testimonial-section">
                <h2 className="section-title">What Our Clients Say</h2>
                <div
                    className="testimonial-wrapper"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    ref={testimonialContainerRef}
                >
                    <div className="testimonial-container">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-item">
                                <img src={testimonial.imgSrc} alt={`Customer ${index + 1}`} className="testimonial-image"/>
                                <p className="testimonial-text">{testimonial.text}</p>
                                <h3 className="testimonial-name">{testimonial.name}</h3>
                                <p className="testimonial-location">{testimonial.location}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={`contact-section section ${contactInView ? 'fade-in scale-up' : ''}`} ref={contactRef}>
                <h2 className="section-title">Need Assistance with Your Next Journey?</h2>
                <p>If you have questions or need personalized assistance for booking a unique stay—be it a tropical
                    island, the Moon, or an exclusive penthouse—our team is ready to help you plan every detail.</p>
                <button className="cta-button">Get in Touch</button>
            </section>
        </div>
    );
};

export default ServicesPage;
