import React, { useState, useEffect, useRef } from "react";
import LiveTimer from './LiveTimer'; // Import the LiveTimer component
import "../assets/components/Chat.css";

const Chat = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedContact, setSelectedContact] = useState(null); // State to track selected contact
    const [messages, setMessages] = useState([]); // State to track the current conversation's messages
    const [newMessage, setNewMessage] = useState(""); // State to track new message input

    const [contacts, setContacts] = useState([ // Contacts data
        { name: "Oualid", message: "Can we confirm the check-in time?", date: "13. Monday. 2023", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
        { name: "Jalila", message: "Thanks for the quick reply!", date: "13. Monday. 2023", avatar: "https://randomuser.me/api/portraits/women/11.jpg" },
        { name: "Idriss", message: "Is the listing still available?", date: "12. Sunday. 2023", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
        // Other contacts...
    ]);

    const [conversations, setConversations] = useState({ // Conversations data
        Oualid: [
            { sender: "Guest", text: "Hi, can I confirm the check-in time?", time: "8:30 PM" },
            { sender: "Host", text: "Of course! What time are you planning to arrive?", time: "8:32 PM" },
            { sender: "Guest", text: "Around 3 PM. Will that work?", time: "8:35 PM" },
            { sender: "Host", text: "Yes, that works perfectly.", time: "8:40 PM" },
        ],
        Jalila: [
            { sender: "Guest", text: "Thanks for the quick reply!", time: "7:10 PM" },
            { sender: "Host", text: "You're welcome! Let me know if you need anything else.", time: "7:12 PM" },
            { sender: "Guest", text: "I just wanted to confirm the amenities.", time: "7:15 PM" },
            { sender: "Host", text: "Sure! We have free Wi-Fi, air conditioning, and a fully equipped kitchen.", time: "7:20 PM" },
        ],
        Idriss: [
            { sender: "Guest", text: "Is the listing still available?", time: "6:50 PM" },
            { sender: "Host", text: "Yes, it's still available! Would you like to book it?", time: "6:55 PM" },
            { sender: "Guest", text: "Great! I’ll book it today.", time: "7:00 PM" },
            { sender: "Host", text: "Perfect! Let me know if you need any help during the booking process.", time: "7:05 PM" },
        ],
        // Add more conversations if needed...
    });

    const chatEndRef = useRef(null); // Ref for auto-scrolling

    // Handle search input
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter contacts based on search query
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle contact selection
    const handleSelectContact = (contact) => {
        setSelectedContact(contact.name);
        setMessages(conversations[contact.name] || []); // Set messages for selected contact
    };

    // Set default contact and conversation when the component mounts
    useEffect(() => {
        if (contacts.length > 0) {
            setSelectedContact(contacts[0].name); // Default to first contact
            setMessages(conversations[contacts[0].name] || []); // Set conversation for first contact
        }
    }, []);

    // Scroll to the bottom of the chat when messages change
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Handle input change for new message
    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    // Handle sending a new message
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const updatedMessages = [...messages, { sender: "Guest", text: newMessage, time: new Date().toLocaleTimeString() }];
            setMessages(updatedMessages); // Add new message to conversation
            setNewMessage(""); // Clear the input field after sending

            const updatedConversations = { ...conversations, [selectedContact]: updatedMessages };
            setConversations(updatedConversations);

            const updatedContacts = contacts.map((contact) =>
                contact.name === selectedContact
                    ? { ...contact, message: newMessage, date: new Date().toLocaleDateString() }
                    : contact
            );

            const sortedContacts = [updatedContacts.find(contact => contact.name === selectedContact), ...updatedContacts.filter(contact => contact.name !== selectedContact)];
            setContacts(sortedContacts); // Update contacts state with reordered contacts
        }
    };

    return (
        <div className="chat-container">
            {/* Sidebar */}
            <div className="sidebar">
                <header className="sidebar-header">
                    <h2>Messages</h2>
                    <div className="sidebar-actions">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </header>
                <div className="contact-list">
                    {filteredContacts.map((contact, index) => (
                        <div
                            className="contact-item"
                            key={index}
                            onClick={() => handleSelectContact(contact)} // Select contact on click
                        >
                            <img src={contact.avatar} alt={contact.name} className="contact-avatar"/>
                            <div className="contact-info">
                                <div className="contact-name-date-wrapper">
                                    <h3 className="contact-name">{contact.name}</h3>
                                    <span className="contact-date">{contact.date}</span>
                                </div>
                                <p className="contact-message">{contact.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Section */}
            <div className="chat">
                <header className="chat-header">
                    <div className="chat-header-content">
                        <h2>{selectedContact ? selectedContact : "Select a Contact"}</h2>
                        <p className="chat-subtitle">Conversation about your reservation.</p>
                    </div>
                    <div className="chat-header-options">
                        <LiveTimer/> {/* Live timer showing the current date and time */}
                    </div>
                </header>
                <div className="chat-messages">
                    {selectedContact && messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.sender === "Host" ? "host" : "guest"}`}
                            >
                                <p>{msg.text}</p>
                                <span className="chat-time">{msg.time}</span>
                            </div>
                        ))
                    ) : (
                        <p>No conversation selected.</p>
                    )}
                    <div ref={chatEndRef}/>
                    {/* Empty div for auto-scrolling */}
                </div>

                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={handleInputChange}
                    />
                    <button className="send-btn" onClick={handleSendMessage}>
                        <i className="fas fa-paper-plane"></i> {/* Font Awesome icon */}
                    </button>
                </div>
            </div>

            <div className="policy-section">
                <h3><i className="fas fa-file-alt"></i> Spacebnb Policy</h3>
                <p className="policy-description">
                    By using this platform, you agree to our terms of service, privacy policy, and community guidelines.
                    Here are the key points of our policy:
                </p>
                <ul>
                    <li><i className="fas fa-check-circle"></i> Listings must comply with local regulations and zoning
                        laws.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Ensure respectful behavior towards hosts and guests at
                        all times.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Clear communication about the booking, check-in, and
                        check-out details.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Guests must provide accurate personal information and
                        booking details.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Cancellation policies vary by listing and are
                        communicated clearly before booking.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Payment for bookings is required at the time of booking
                        and must be processed through the platform.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Users are responsible for their own safety, including
                        taking precautions during the stay.
                    </li>
                    <li><i className="fas fa-check-circle"></i> All guests must adhere to the house rules set by the
                        host for a smooth and respectful stay.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Any disputes between guests and hosts should be reported
                        to Airbnb support for mediation.
                    </li>
                </ul>

                <h4><i className="fas fa-users"></i> Host Responsibility</h4>
                <p className="policy-description">
                    As a host, you are responsible for providing a safe and welcoming environment for your guests.
                    Please ensure that:
                </p>
                <ul>
                    <li><i className="fas fa-check-circle"></i> Your property is maintained and free of hazards.</li>
                    <li><i className="fas fa-check-circle"></i> The amenities listed in your profile are available and
                        functional.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Guests are provided with clear check-in and check-out
                        instructions.
                    </li>
                </ul>

                <h4><i className="fas fa-user-friends"></i> Guest Responsibility</h4>
                <p className="policy-description">
                    As a guest, you are expected to:
                </p>
                <ul>
                    <li><i className="fas fa-check-circle"></i> Respect the privacy of the host and other guests.</li>
                    <li><i className="fas fa-check-circle"></i> Leave the property in good condition, as you found it.
                    </li>
                    <li><i className="fas fa-check-circle"></i> Inform the host immediately of any damages or issues
                        during your stay.
                    </li>
                </ul>

                <h4><i className="fas fa-shield-alt"></i> Privacy and Data Protection</h4>
                <p className="policy-description">
                    We take your privacy seriously. Our platform collects and processes personal data as outlined in our
                    Privacy Policy, which you can review here.
                    We are committed to safeguarding your data and only share it with trusted parties for
                    booking-related purposes.
                </p>
                <a href="/terms" className="policy-link"><i className="fas fa-link"></i> View our full policy</a>
            </div>


        </div>
    );
};

export default Chat;
