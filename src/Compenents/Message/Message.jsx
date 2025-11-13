import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Message.css";
const Message = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    // user message
    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error connecting to server" }]);
    }
  };
  const handleBack = () => {
    navigate("/"); // Back to home
  };

  return (
    <div> <button className="back-btn" onClick={handleBack}>
      {/* <FaArrowLeft /> Back */} back
    </button>
      <div className="chat-container">

        <h2 className="chat-header">Simple Chatbot</h2>
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;

// import axios from "axios";
// import { useEffect, useState } from "react";

// const API = `${process.env.REACT_APP_API_BASE}/api/messages`;

// const Message = ({ hostId, userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get(`${API}/conversation/${hostId}/${userId}`, {
//         withCredentials: true,
//       });
//       if (res.data.success) setMessages(res.data.messages);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 3000);
//     return () => clearInterval(interval);
//   }, [hostId, userId]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     try {
//       const res = await axios.post(
//         `${API}/`,
//         { hostId, userId, text: input, sender: "User" },
//         { withCredentials: true }
//       );
//       if (res.data.success) setMessages((prev) => [...prev, res.data.message]);
//       setInput("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <h2>User Chat</h2>
//       <div className="chat-box">
//         {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={`chat-message ${msg.sender === "User" ? "user" : "host"}`}
//           >
//             {msg.text}
//             <span className="timestamp">{new Date(msg.createdAt).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Message;
