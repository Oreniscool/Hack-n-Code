import React, { useState } from 'react';
import "../styles/Chat.css";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Your target language is a primary language of this user, feel free to chat away", sender: "noone" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [otherPersonName, setOtherPersonName] = useState("Hitesh Ghanchi");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [...messages, { id: messages.length + 1, text: newMessage, sender: "user" }];
      setMessages(updatedMessages);
      setTimeout(() => {
        setMessages([
          ...updatedMessages,
          { id: updatedMessages.length + 1, text: "wassup", sender: "admin" }
        ]);
      }, 500); 
      setNewMessage("");
    }
  };

  return (
    <div className="full-screen-chat">
      <div className="chat-header">{otherPersonName}</div>
      <div className="chat-window">
        <div className="message-container">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender === 'user' ? 'user-message' : 'other-person-message'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
