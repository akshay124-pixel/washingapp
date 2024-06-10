import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
import { MaterialSymbolsOutlined, MaterialSymbolsRounded } from "./Icons";

const App = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there 👋\nHow can I help you today?", type: "incoming" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const chatboxRef = useRef(null);

  const staticReplies = [
    "Hello! How can I assist you today?",
    "I'm here to help. What do you need?",
    "Thank you for your message!",
    "Can you please provide more details?",
    "I'm a chatbot, here to help you with your queries.",
    "How can I help you today?",
    "Feel free to ask me anything!",
    "I'm here to assist you. Please go ahead with your question.",
  ];

  const handleChatInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendChat = () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, { text: inputValue.trim(), type: "outgoing" }]);
    setInputValue("");

    setTimeout(() => {
      const randomReply =
        staticReplies[Math.floor(Math.random() * staticReplies.length)];
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Thinking...", type: "incoming" },
      ]);

      setTimeout(() => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages.pop();
          return [...newMessages, { text: randomReply, type: "incoming" }];
        });
      }, 600);
    }, 600);
  };

  useEffect(() => {
    chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleSendChat();
    }
  };

  return (
    <div className={`App ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        className="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <MaterialSymbolsRounded name="mode_comment" />
        <MaterialSymbolsOutlined name="close" />
      </button>
      <div className="chatbot">
        <header>
          <h2>Chatbot</h2>
          <span className="close-btn" onClick={() => setShowChatbot(false)}>
            <MaterialSymbolsOutlined name="close" />
          </span>
        </header>
        <ul className="chatbox" ref={chatboxRef}>
          {messages.map((msg, index) => (
            <li key={index} className={`chat ${msg.type}`}>
              {msg.type === "incoming" && (
                <MaterialSymbolsOutlined name="smart_toy" />
              )}
              <p>{msg.text}</p>
            </li>
          ))}
        </ul>
        <div className="chat-input">
          <textarea
            placeholder="Enter a message..."
            value={inputValue}
            onChange={handleChatInput}
            onKeyDown={handleKeyDown}
            spellCheck="false"
          />
          <span id="send-btn" onClick={handleSendChat}>
            <MaterialSymbolsRounded name="send" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
