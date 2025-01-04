import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import LiveTimer from './LiveTimer'; // Import the LiveTimer component
import "../assets/components/Chat.css"; // Import custom CSS styles

const Chat = () => {
    const location = useLocation();
    const [hostId, setHostId] = useState(location.state?.hostId || null); // Dynamic hostId
    const [guestId, setGuestId] = useState(location.state?.guestId || null);
    const [guestMessages, setGuestMessages] = useState([]); // Guest messages state
    const [hostMessages, setHostMessages] = useState([]); // Host messages state
    const [contacts, setContacts] = useState([]); // Contacts state (for sidebar)
    const [newMessage, setNewMessage] = useState(""); // New message input state
    const chatEndRef = useRef(null); // Reference for auto-scrolling
    const chatContainerRef = useRef(null); // Reference for the chat container
    const navigate = useNavigate();  // Initialize useNavigate

    // Fetch guest's messages when guestId or hostId changes
    useEffect(() => {
        if (guestId && hostId) {
            axios
                .get(`http://localhost:5659/api/message/messages/guest/${guestId}/host/${hostId}`)
                .then((response) => {
                    setGuestMessages(Array.isArray(response.data) ? response.data : []);
                })
                .catch((error) => console.error("Error fetching guest messages:", error));
        }
    }, [guestId, hostId,guestMessages]);

    // Fetch host's messages when hostId or guestId changes
    useEffect(() => {
        if (hostId && guestId) {
            axios
                .get(`http://localhost:5659/api/message/messages/host/${hostId}/guest/${guestId}`)
                .then((response) => {
                    setHostMessages(Array.isArray(response.data) ? response.data : []);
                })
                .catch((error) => console.error("Error fetching host messages:", error));
        }
    }, [hostId, guestId,hostMessages]);

    // Fetch contacts list (hosts) for the sidebar
    useEffect(() => {
        if (hostId) {
            axios
                .get(`http://localhost:2424/api/hosts/fetch/host/${hostId}`)
                .then((response) => {
                    if (response.data && response.data.host) {
                        setContacts([response.data.host]); // Wrap the host object in an array to keep the map logic intact
                    }
                })
                .catch((error) => {
                    console.error("Error fetching host:", error);
                });
        }
    }, [hostId]);

    // Scroll to the bottom when messages change
    const scrollToBottom = () => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    // Automatically scroll to the bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [guestMessages, hostMessages]); // Trigger whenever messages change

    // Handle new message input change
    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    // Send new message
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                message: newMessage,
                hostId: hostId,
                guestId: guestId,
            };

            const params = new URLSearchParams();
            params.append("message", messageData.message);
            params.append("hostId", messageData.hostId);
            params.append("guestId", messageData.guestId);

            axios
                .post(`http://localhost:5659/api/message/guest/host/add?${params.toString()}`)
                .then((response) => {
                    const newMessageData = {
                        ...response.data,
                        sender: 'guest', // Mark this as a guest message
                    };
                    setGuestMessages((prevMessages) => [...prevMessages, newMessageData]); // Add new message to guest messages
                    setNewMessage(""); // Clear the input field
                })
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
        }
    };

    // Sidebar contact selection
    const handleSelectContact = (contactId) => {
        setHostId(contactId); // Set the selected contact's ID as the hostId
    };

    // Combine and sort messages by sendDate
    const allMessages = [
        ...guestMessages.map(msg => ({ ...msg, sender: 'guest' })),
        ...hostMessages.map(msg => ({ ...msg, sender: 'host' }))
    ];

    // Sort all messages by sendDate
    const sortedMessages = allMessages.sort((a, b) => new Date(a.sendDate) - new Date(b.sendDate));

    // Get the last message for each contact
    const getLastMessage = (hostId) => {
        const contactMessages = [
            ...guestMessages.filter((msg) => msg.hostId === hostId),
            ...hostMessages.filter((msg) => msg.hostId === hostId)
        ];
        return contactMessages.length > 0 ? contactMessages[contactMessages.length - 1] : null;
    };

    const handleReturnClick = () => {
        navigate("/guest/contacts");  // Navigate to /guest/contacts when the button is clicked
    };
    return (
        <div className="chat-container">
            {/* Sidebar with hosts */}
            <div className="sidebar">
                <header className="sidebar-header">
                    <h2>Messages</h2>
                    <button className="ios-return-btn" onClick={handleReturnClick}>
                        <i className="fas fa-chevron-left"></i> Return to All Contacts
                    </button>
                </header>


                {contacts.length > 0 ? (
                    contacts.map((contact) => {
                        const lastMessage = getLastMessage(contact.id);
                        return (
                            <div
                                key={contact.id}
                                className={`contact-item ${hostId === contact.id ? 'selected' : ''}`}
                                onClick={() => handleSelectContact(contact.id)}
                                style={{borderBottom: '1px solid #ddd'}} // Add a separator between contacts
                            >
                                <div className="contact-avatar-container">
                                    <img
                                        src={contact.profileImage} // Ensure this path is correct
                                        alt={contact.name}
                                        className="contact-avatar"
                                    />
                                </div>

                                <div className="contact-info">
                                    <h3 className="contact-name">Host: {contact.name}</h3>

                                    <p className="contact-email">
                                        <strong>Email:</strong> {contact.email || "Not provided"}
                                    </p>

                                    <p className="contact-about">
                                        <strong>About:</strong> {contact.about || "No description available"}
                                    </p>

                                    <p className="contact-phone">
                                        <strong>Phone:</strong> {contact.phone || "Not available"}
                                    </p>

                                    <div className="contact-rating">
                                        <span className="rating-average">{contact.ratingAverage} ★</span>
                                        <span className="rating-count">({contact.ratingCount} reviews)</span>
                                    </div>

                                    <p className="time-as-host">
                                        <strong>Time as
                                            Host:</strong> {contact.timeAsHost.years} years, {contact.timeAsHost.months} months
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No hosts available</p>
                )}
            </div>

            <div className="chat">
                <header className="chat-header">
                    <div className="chat-header-content">
                        <h2>{hostId ? `Chat with Host: ${contacts.find(contact => contact.id === hostId)?.name || "Host Not Found"}` : "Select a Host"}</h2>
                        <p className="chat-subtitle">Conversation about your reservation.</p>
                    </div>

                    <div className="chat-header-options">
                        <LiveTimer />
                    </div>
                </header>

                <div className="chat-messages" ref={chatContainerRef}>
                    {/* Render sorted messages */}
                    {sortedMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.sender}`} // Dynamically set sender class
                        >
                            <p>{msg.content}</p>
                            <span className="chat-time">
                                {new Date(msg.sendDate).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}

                    <div ref={chatEndRef} />
                </div>

                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={handleInputChange}
                    />
                    <button className="send-btn" onClick={handleSendMessage}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
