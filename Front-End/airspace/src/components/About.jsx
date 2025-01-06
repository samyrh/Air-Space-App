import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../assets/components/AboutPage.css'; // Import the styles

const AboutSection = () => {
    const { ref: introRef, inView: introInView } = useInView({
        triggerOnce: false,
        threshold: 0.2, // Trigger when 20% of the section is visible
    });

    const { ref: servicesRef, inView: servicesInView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    const { ref: bioRef, inView: bioInView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    const { ref: featuresRef, inView: featuresInView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    const { ref: teamRef, inView: teamInView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    const { ref: contactRef, inView: contactInView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    return (
        <div className="about-page">
            {/* Introduction Section */}
            <section
                className={`intro-section section ${introInView ? 'fade-in scale-up' : ''}`}
                ref={introRef}
            >
                <div className="intro-content">
                    <h1 className="services-title">Welcome to Staybnb</h1>
                    <p className="services-description">
                        At Staybnb, we believe that every journey is unique. Whether you're planning a getaway to a
                        beach house
                        or looking for a hidden gem in a city, we make your stay an unforgettable experience. Find your
                        perfect
                        space with us!
                    </p>
                    <button className="cta-button">Explore Our Stays</button>
                </div>
                <div className="intro-image">
                    <img
                        src={require('../assets/images/about.jpg')}
                        alt="Staybnb Overview"
                        className="intro-img"
                    />
                </div>
            </section>

            {/* Services Section */}
            <section
                className={`services-section section ${servicesInView ? 'fade-in slide-up' : ''}`}
                ref={servicesRef}
            >
                <h2 className="section-title">Our Services</h2>
                <div className="services-container">
                    <div className="service-item">
                        <i className="fa fa-globe service-icon"></i>
                        <h3>Luxurious Stays</h3>
                        <p>Choose from a wide range of luxurious properties in the most sought-after destinations around the world. Whether you desire an oceanfront villa, a mountaintop retreat, or a cozy city apartment, we have something for every taste. Every property is carefully selected and tailored to your preferences, offering unmatched comfort, style, and service.</p>
                    </div>
                    <div className="service-item">
                        <i className="fa fa-university service-icon"></i>
                        <h3>Global Reach</h3>
                        <p>With properties in over 100 countries across all continents, you can book stunning getaways in both popular cities and hidden gems. From urban sophistication to remote retreats, we ensure that wherever your journey takes you, you’ll find the perfect stay. Our global network offers seamless travel experiences that cater to your every need, no matter where you are.</p>
                    </div>
                    <div className="service-item">
                        <i className="fa fa-lock service-icon"></i>
                        <h3>Secure Booking</h3>
                        <p>Our platform ensures safe, secure, and smooth booking. With robust encryption and privacy measures, you can reserve your dream getaway with confidence. From instant booking confirmations to flexible cancellation policies, we aim to make your booking experience effortless and stress-free. Your data and peace of mind are our top priorities.</p>
                    </div>
                    <div className="service-item">
                        <i className="fa fa-home service-icon"></i>
                        <h3>Exclusive Homes</h3>
                        <p>Step into a world of unique homes designed to offer comfort, elegance, and unforgettable experiences. Whether you're looking for a lavish penthouse, a secluded beach house, or a cozy mountain cabin, each property is selected for its exclusivity and charm. With attention to every detail, your stay will feel like home—only more extraordinary.</p>
                    </div>
                    <div className="service-item">
                        <i className="fa fa-briefcase service-icon"></i>
                        <h3>Business Travel</h3>
                        <p>We understand the importance of blending work and relaxation. That's why we offer properties equipped with state-of-the-art workspaces and business-friendly amenities. Whether you’re attending a conference, meeting clients, or simply working remotely, our business travel properties are designed to keep you productive while ensuring comfort and convenience during your stay.</p>
                    </div>
                    <div className="service-item">
                        <i className="fa fa-rocket service-icon"></i>
                        <h3>Space Travel</h3>
                        <p>For the ultimate adventure, explore the final frontier with our space travel options. Experience the thrill of staying in a space station, orbiting Earth, or on a lunar base—where no vacation has gone before! Our space travel offerings are the epitome of luxury and excitement for thrill-seekers and pioneers. If you dream of stargazing from above or living like an astronaut, this is the adventure you’ve been waiting for.</p>
                    </div>
                </div>
            </section>

            {/* Bio Section */}
            <section
                className={`bio-section section ${bioInView ? 'fade-in scale-up' : ''}`}
                ref={bioRef}
            >
                <h2 className="section-title">Our Story</h2>
                <div className="bio-content">
                    <p className="bio-text">
                        Founded in 2025, Spacebnb started with a vision to revolutionize the travel industry. We believe
                        in providing unique, one-of-a-kind experiences for our guests. From cutting-edge spaces on Earth
                        to futuristic getaways in outer space, our mission is to make travel extraordinary.
                    </p>
                    <p className="bio-text">
                        Our team of experts is dedicated to creating seamless, high-quality travel experiences that
                        combine comfort, innovation, and luxury. We work tirelessly to offer exclusive experiences that
                        make every trip unforgettable.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section
                className={`features-section section ${featuresInView ? 'fade-in slide-up' : ''}`}
                ref={featuresRef}
            >
                <h2 className="section-title">Why Spacebnb?</h2>
                <div className="features-container">
                    <div className="feature-item">
                        <h3>Curated Stays</h3>
                        <p>Our properties are handpicked to offer the best experiences, no matter your travel
                            preferences.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Luxury & Comfort</h3>
                        <p>Enjoy luxury accommodations with world-class amenities to ensure maximum comfort during your
                            stay.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Endless Options</h3>
                        <p>Whether you're looking for a cozy apartment, a grand villa, or even a spaceship, we've got
                            you covered with endless possibilities.</p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section
                className={`team-section section ${teamInView ? 'fade-in scale-up' : ''}`}
                ref={teamRef}
            >
                <h2 className="section-title">Meet the Team</h2>
                <div className="team-container">
                    <div className="team-member">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Sami Rhalim"/>
                        <h3>Sami Rhalim</h3>
                        <p>Co-Founder & CEO</p>
                    </div>
                    <div className="team-member">
                        <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Mehdi L8"/>
                        <h3>Mehdi L8</h3>
                        <p>Chief Technical Officer</p>
                    </div>
                    <div className="team-member">
                        <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Sarah Lee"/>
                        <h3>Sarah Lee</h3>
                        <p>Chief Marketing Officer</p>
                    </div>
                    <div className="team-member">
                        <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Daniel Smith"/>
                        <h3>Daniel Smith</h3>
                        <p>Lead Designer</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section
                className={`contact-section section ${contactInView ? 'fade-in scale-up' : ''}`}
                ref={contactRef}
            >
                <h2 className="section-title">Contact Us</h2>
                <p>If you have any questions or inquiries, feel free to reach out to us. Our team is here to assist you
                    with all your travel needs, from finding the perfect accommodation to making the booking process
                    smooth and easy. We are committed to providing exceptional customer service and ensuring that your
                    experience with Spacebnb exceeds your expectations.</p>
                <button className="cta-button">Get in Touch</button>
            </section>
        </div>
    );
};

export default AboutSection;
