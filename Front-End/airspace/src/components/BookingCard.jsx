import React, {useEffect, useState} from 'react';
import "../assets/components/BookingCard.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useParams} from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';

const IosWidget = () => {

    const { id } = useParams(); // Get the `id` from the route
    // State for managing dates and guest count
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [babies, setBabies] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [property, setProperty] = useState(null);
    const [host,setHost] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isPropertyValid = property && property.latitude && property.longitude;
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    // Ensure that property and latitude/longitude are available

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://localhost:8989/api/properties/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperty(data);
                } else {
                    setError("Property not found");
                }
            } catch (err) {
                setError("An error occurred while fetching property details");
            }
        };
        fetchProperty();
    }, [id]);

    useEffect(() => {
        const fetchHost = async () => {
            if (!property?.hostId) {
                setError("Host ID is missing");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5566/api/hosts/fetch/${property.hostId}`);
                if (response.ok) {
                    const data = await response.json();
                    setHost(data);
                } else {
                    setError("Host not found");
                }
            } catch (err) {
                setError("An error occurred while fetching host details");
            }
        };

        fetchHost();
    }, [property?.hostId]);


    const toggleShowMore = () => {
        setShowAll(!showAll);
    };

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };


    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Handle date change
    const handleDateChange = (e) => {
        if (e.target.name === "arrival") {
            setArrivalDate(e.target.value);
            if (departureDate && e.target.value >= departureDate) {
                setDepartureDate("");
            }
        } else if (e.target.name === "departure") {
            setDepartureDate(e.target.value);
        }
    };

    // Handle select change
    const handleSelectChange = (e) => {
        if (e.target.name === "adults") {
            setAdults(Number(e.target.value));
        } else if (e.target.name === "children") {
            setChildren(Number(e.target.value));
        } else if (e.target.name === "babies") {
            setBabies(Number(e.target.value));
        }
    };

    // Calculate nights dynamically based on arrival and departure dates
    const calculateNights = () => {
        if (arrivalDate && departureDate) {
            const arrival = new Date(arrivalDate);
            const departure = new Date(departureDate);
            const diffTime = departure - arrival;
            return Math.ceil(diffTime / (1000 * 3600 * 24)); // Convert time difference to days
        }
        return 0;
    };

    // Calculate base price
    const nights = calculateNights();
    const basePrice = property?.pricePerNight ? property.pricePerNight * nights : 0;

    // Dynamic service fee (e.g., 10% of the base price)
    const serviceFeePercentage = 0.1;  // 10%
    const serviceFee = basePrice * serviceFeePercentage;

    // Additional fees based on guests
    const cleaningFee = adults > 2 ? 30 : 20; // Cleaning fee logic
    const securityDeposit = adults > 4 ? 50 : 30;  // Security deposit logic

    // Tax logic
    const adultsTax = adults > 4 ? (adults - 4) * 0.05 * basePrice : 0;  // 5% tax for adults above 4
    const childrenTax = children > 3 ? (children - 3) * 0.03 * basePrice : 0;  // 3% tax for children above 3

    // Total price calculation
    const totalBeforeTax = basePrice + serviceFee + cleaningFee + securityDeposit + adultsTax + childrenTax;

    // Disable the button if there are no nights
    const isButtonDisabled = nights === 0;

    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([
        {
            id: 1,
            username: "John Doe",
            date: "2 hours ago",
            text: "This property looks amazing! Can’t wait to visit.",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            id: 2,
            username: "Jane Smith",
            date: "5 hours ago",
            text: "Booked my stay already, so excited!",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
            id: 3,
            username: "Lucas Green",
            date: "1 day ago",
            text: "I love the location. Definitely adding this to my wishlist.",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
    ]);

    const handleCommentChange = (e) => setNewComment(e.target.value);

    const handleSubmitComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: comments.length + 1,
                username: "You",
                date: "Just now",
                text: newComment.trim(),
                avatar: "https://randomuser.me/api/portraits/men/4.jpg",
            };

            setComments([newCommentObj, ...comments]);
            setNewComment("");
        }
    };

    return (
        <div className="page-container">
            <div className="main-content">
                <div className="title-row">
                    <h1 onClick={openModal} style={{cursor: 'pointer'}}>
                        {property ? `${property.city}, ${property.location}` : "Loading property..."}
                    </h1>

                    {/* Rating Section */}
                    <div className="rating">
                        <div className="stars">
                            {[...Array(5)].map((_, index) => (
                                <i key={index} className={`fas fa-star ${index < 4 ? 'filled' : ''}`}></i>
                            ))}
                        </div>
                        <p className="review-count">(45 reviews)</p>
                    </div>
                </div>
                {/* Property Info */}
                <div className="property-info">
                    <div className="info-item">
                        <i className="fas fa-bed"></i>
                        <p>
                            Total
                            of {property?.beds !== undefined ? `${property.beds} ${property.beds === 1 ? "bed" : "beds"}` : "no beds available"}
                        </p>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-door-open"></i>
                        <p>
                            Total
                            of {property?.bedrooms !== undefined ? property.bedrooms : "no"} {property?.bedrooms === 1 ? "Room" : "Rooms"}
                        </p>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-bath"></i>
                        <p>
                            {property?.bathrooms !== undefined
                                ? `${property.bathrooms} ${property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}`
                                : "No bathrooms available"}
                        </p>

                    </div>
                    <div className="info-item">
                        <i className="fas fa-ruler-combined"></i>
                        <p>
                            Area: {property?.area !== undefined ? `${property.area} m²` : "N/A"}
                        </p>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="separator-line"></div>

                <div className="host-info">
                    <div className="host-avatar-container">
                        <img
                            src={host?.profileImage || "https://randomuser.me/api/portraits/men/1.jpg"}
                            alt={`${host?.name || "Unknown"}'s Avatar`}
                            className="host-avatar"
                        />
                        {host?.verified && <span className="verified-badge"></span>}
                    </div>
                    {host ? (
                        <div className="host-details">
                            <h2 className="host-name">{host?.name || "Unknown Name"}</h2>
                            <div className="info-group">
                                <div className="info-item">
                                    <p>
                                        <strong>Rating Count:</strong> {host?.ratingCount || 0}
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p>
                                        <strong>Rating Average:</strong> {host?.ratingAverage?.toFixed(1) || "N/A"}
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p>
                                        <strong>Highlights:</strong>
                                        <ul className="highlight-list">
                                            {host?.highlights?.length ? (
                                                host.highlights.map((highlight, index) => (
                                                    <li key={index}>{highlight}</li>
                                                ))
                                            ) : (
                                                <li>No highlights available</li>
                                            )}
                                        </ul>
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p>
                                        <strong>Host
                                            Details:</strong> {host?.hostDetails?.join(", ") || "No details provided"}
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p>
                                        <strong>Time as
                                            Host:</strong> {host?.timeAsHost ? `${host.timeAsHost.years} years, ${host.timeAsHost.months} months` : "N/A"}
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p>
                                        <strong>Super Host:</strong> {host?.superHost ? "Yes" : "No"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <p>Loading host information...</p>
                    )}
                </div>

                {/* Separator Line */}
                <div className="separator-line"></div>

                <div className="equipments-info">
                    <h3>Equipments</h3>
                    <div className="equipments-grid">
                        {property?.amenities && property.amenities.length > 0 ? (
                            property.amenities.slice(0, showAll ? property.amenities.length : 10).map((amenity, index) => {
                                // Log the raw amenity and its normalized version for debugging
                                console.log("Raw Amenity:", property.host);
                                const normalizedAmenity = amenity.trim().replace(/\s+/g, ' ').toLowerCase(); // Normalize spaces and case
                                console.log("Normalized Amenity:", normalizedAmenity);
                                // L8 MUST DO INCONS
                                // Define the direct mapping of amenities to icons
                                const amenityIcons = {
                                    "TV": "fa-television",
                                    "free wi-fi": "fa-wifi",
                                    "air conditioning": "fa-snowflake",
                                    "kitchen": "fa-utensils",
                                    "washing machine": "fa-sync",
                                    "dishwasher": "fa-glass-cheers",
                                    "heater": "fa-fire",
                                    "iron": "fa-tshirt",
                                    "shampoo": "fa-shower",
                                    "hair dryer": "fa-hand-sparkles",
                                    "fridge": "fa-cogs",
                                    "free parking": "fa-car",
                                    "elevator": "fa-arrow-up",
                                    "pets allowed": "fa-paw",
                                    "smoke detector": "fa-bell",
                                    "first aid kit": "fa-kit-medical",
                                    "fire extinguisher": "fa-fire-extinguisher",
                                    "hot tub": "fa-hot-tub",
                                    "balcony": "fa-couch",
                                    "workspace": "fa-laptop",
                                };

                                // Lookup the icon for the current amenity with normalized case and spacing
                                const iconClass = amenityIcons[normalizedAmenity] || "fa-check-circle"; // Default to "fa-check-circle" if not found

                                return (
                                    <div className="info-item" key={index}>
                                        <i className={`fas ${iconClass}`}></i> {/* Icon based on the mapping */}
                                        <p>{amenity}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No amenities available</p>
                        )}
                    </div>
                    {property?.amenities && property.amenities.length > 10 && (
                        <button className="show-more-btn" onClick={toggleShowMore}>
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    )}
                </div>


                {/* Separator Line */}
                <div className="separator-line"></div>
                {/* Description Section */}
                <div className="description-section">
                    <h3 className="section-title">Description</h3>
                    <p className="description-text">
                        {property && property.description && property.description.length > 0
                            ? (showDescription
                                ? property.description
                                : `${property.description.slice(0, 150)}...`)
                            : "No description available."}
                        {property && property.description && property.description.length > 150 && !showDescription && (
                            <span
                                className="read-more-ellipsis"
                                onClick={() => setShowDescription(true)}
                            >
                ... Read More
            </span>
                        )}
                    </p>
                    {showDescription && property && property.description && property.description.length > 150 && (
                        <p className="extra-description">
                            {property.description}
                            <span
                                className="read-less"
                                onClick={() => setShowDescription(false)}
                            >
                Show Less
            </span>
                        </p>
                    )}
                </div>
                {/* Separator Line */}
                <div className="separator-line"></div>
                <div className="property-rules-section">
                    <h3 className="section-title">Property Rules</h3>
                    <div className="rules-container">
                        <div className="valid-rules">
                            {property?.rules
                                ?.filter((rule) => !rule.toLowerCase().startsWith('no')) // Valid rules
                                .map((rule, index) => (
                                    <div key={index} className="rule-item">
                                        <span className="rule-icon check-icon">✔️</span>
                                        {rule}
                                    </div>
                                ))}
                        </div>

                        <div className="invalid-rules">
                            {property?.rules
                                ?.filter((rule) => rule.toLowerCase().startsWith('no')) // Negative rules
                                .map((rule, index) => (
                                    <div key={index} className="rule-item">
                                        <span className="rule-icon x-icon">❌</span>
                                        {rule}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>


                {/* Separator Line */}
                <div className="separator-line"></div>

                <div className="comment-section">
                    <div className="comments-list">
                        {comments.map((comment) => (
                            <div className="comment-item" key={comment.id}>
                                <div className="avatar">
                                    <img src={comment.avatar} alt={comment.username}/>
                                </div>
                                <div className="comment-content">
                                    <div className="comment-header">
                                        <span className="username">{comment.username}</span>
                                        <span className="date">{comment.date}</span>
                                    </div>
                                    <p className="comment-text">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="comment-input-section">
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={handleCommentChange}
                        />
                        <button
                            className="submit-comment-btn"
                            onClick={handleSubmitComment}
                            disabled={!newComment.trim()}
                        >
                            Post
                        </button>
                    </div>
                </div>
                {/* Separator Line */}
                <div className="separator-line"></div>

                <div className="contact-host-container">
                    <div className="host-info">
                        <h2>Contact Your Host</h2>
                        <ul>
                            <li><strong>Host:</strong> Sarah Connor</li>
                            <li><strong>Phone:</strong> +1 555 987 654</li>
                            <li><strong>Email:</strong> host@vacay.com</li>
                            <li><strong>Location:</strong> New York, NY</li>
                        </ul>
                    </div>

                    <div className="message-input">
                        <p className="info-text">
                            Have any questions or special requests? Feel free to contact Sarah, and she’ll ensure you
                            have the best stay.
                        </p>
                        <textarea placeholder="Type your message for the host here..."></textarea>
                        <button type="button">Send Message</button>
                    </div>
                </div>

                <div className="separator-line"></div>
                <div className="map-display">
                    {isPropertyValid ? (
                        <div className="ios-map-container-wider">
                            <iframe
                                title="Property Location"
                                className="ios-map-frame"
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01}%2C${property.latitude - 0.01}%2C${property.longitude + 0.01}%2C${property.latitude + 0.01}&layer=mapnik&marker=${property.latitude}%2C${property.longitude}`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <p className="map-unavailable">Map data is currently unavailable for this location.</p>
                    )}
                </div>

            </div>
            {/* Widget */}
            <div className="widget-container">
                <div className="ios-widget">
                    <div className="ios-header">
                        <h3>
                            <span>{property?.pricePerNight} €</span> <small>per night</small>
                        </h3>
                    </div>
                    <div className="ios-body">
                        <div className="ios-dates">
                            <div className="ios-input-group">
                                <label>Arrival</label>
                                <input
                                    type="date"
                                    name="arrival"
                                    value={arrivalDate}
                                    onChange={handleDateChange}
                                    min={today}
                                    placeholder="Select Arrival Date"
                                />
                            </div>
                            <div className="ios-input-group">
                                <label>Departure</label>
                                <input
                                    type="date"
                                    name="departure"
                                    value={departureDate}
                                    onChange={handleDateChange}
                                    min={arrivalDate ? new Date(arrivalDate).toISOString().split('T')[0] : today}
                                    placeholder="Select Departure Date"
                                />
                            </div>
                        </div>
                        <div className="ios-select-group">
                            <label>Adults</label>
                            <select
                                name="adults"
                                value={adults}
                                onChange={handleSelectChange}
                            >
                                {/* Check if property is not null or undefined and property.persons exists */}
                                {property && property.persons > 0 ? (
                                    [...Array(property.persons).keys()].map(i => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1} {i + 1 === 1 ? 'adult' : 'adults'}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No adults available</option> // Optional: Display a message when property.persons is not available
                                )}
                            </select>
                        </div>


                        <div className="ios-select-group">
                            <label>Children</label>
                            <select
                                name="children"
                                value={children}
                                onChange={handleSelectChange}
                            >
                                {[...Array(6)].map((_, i) => (
                                    <option key={i} value={i}>
                                        {i} {i === 1 ? 'child' : 'children'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="ios-select-group">
                            <label>Babies</label>
                            <select
                                name="babies"
                                value={babies}
                                onChange={handleSelectChange}
                            >
                                {[...Array(3)].map((_, i) => (
                                    <option key={i} value={i}>
                                        {i} {i === 1 ? 'baby' : 'babies'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="ios-footer">
                        <div className="ios-pricing">
                            <p>
                                {property?.pricePerNight
                                    ? `${property.pricePerNight} € x ${nights} nights`
                                    : "Price not available"}
                                <span>{basePrice} €</span>
                            </p>
                            <p>
                                Service
                                Fee <span>{property?.serviceFee !== null && property?.serviceFee !== undefined ? property.serviceFee.toFixed(2) : 'N/A'} €</span>
                            </p>
                            <p>
                                Cleaning
                                Fee <span>{property?.cleaningFee !== null && property?.cleaningFee !== undefined ? property.cleaningFee : 'N/A'} €</span>
                            </p>
                            <p>
                                Adults
                                Tax <span>{adultsTax !== null && adultsTax !== undefined ? adultsTax.toFixed(2) : 'N/A'} €</span>
                            </p>
                            <p>
                                Children
                                Tax <span>{childrenTax !== null && childrenTax !== undefined ? childrenTax.toFixed(2) : 'N/A'} €</span>
                            </p>

                            <hr/>
                            <p className="ios-total">
                                Total <span>{arrivalDate && departureDate ? `${totalBeforeTax?.toFixed(2)} €` : 'N/A'}</span>
                            </p>

                        </div>
                        <button
                            className={`ios-button ${isButtonDisabled ? 'disabled' : ''}`}
                            disabled={isButtonDisabled}
                        >
                            Book Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default IosWidget;