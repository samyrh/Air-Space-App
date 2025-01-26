import React, { useState } from "react";
import "../assets/components/Chatbot.css";
import aiIcon from "../assets/images/ai.png"; // Import the AI icon

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hey there! How can I assist you today?" },
    ]);
    const [input, setInput] = useState("");

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { sender: "user", text: input }]);
            setInput("");
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "I'm here to assist you!" },
                ]);
            }, 1000);
        }
    };

    return (
        <div className="chatbot-container">
            {/* Toggle Button with Image Icon */}
            <button onClick={toggleChat} className="chatbot-toggle">
                <img src={aiIcon} alt="AI Chatbot" className="chatbot-icon" />
            </button>

            {/* Chat Interface */}
            {isOpen && (
                <div className="chat-interface">
                    {/* Header */}
                    <div className="chat-header">
                        <img src={aiIcon} alt="AI" className="header-icon" />
                        <h2>Hamid Chatbot</h2>
                        <button onClick={toggleChat} className="close-btn">
                            ✕
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`chat-message ${
                                    msg.sender === "bot" ? "bot" : "user"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="input-box"
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSend} className="send-button">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
