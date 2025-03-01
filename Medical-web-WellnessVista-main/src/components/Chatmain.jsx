import ChartForm from "./ChatForm";
import Chatboticon from "./Chatboticon";
import ChatMessage from "./ChatMessage";
import { useState } from "react";
import { RiRobotFill } from "react-icons/ri";  // ✅ Correct replacement
import { TbRobotOff } from "react-icons/tb";
import { IoCloseCircle } from "react-icons/io5";

export const Chatmain = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);
  
    const generateBotResponse = (history) => {
      const lastUserMessage = history[history.length - 1]?.message;
      
      if (!lastUserMessage) return;
  
      let botReply = "I'm not sure how to respond to that. 🤔";
  
      if (lastUserMessage.toLowerCase().includes("hello")) {
        botReply = "Hello! How can I assist you today? 😊";
      } else if (lastUserMessage.toLowerCase().includes("help")) {
        botReply = "Sure! What do you need help with? 💡";
      }
  
      const botResponse = { sender: "bot", message: botReply };
      setChatHistory([...history, botResponse]);
    };

    return (
      <div className="ct">
        <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
          <button id="chatbot-toggler" onClick={() => setShowChatbot((prev) => !prev)}>
            <span className="material-symbols-rounded">
              {showChatbot ? <TbRobotOff /> : <RiRobotFill />} {/* ✅ Fixed */}
            </span>
          </button>

          {showChatbot && (
            <div className="chatbot-popup">
              {/* Chatbot Header */}
              <div className="chat-header">
                <div className="header-info">
                  <Chatboticon />
                  <h2 className="logo-text">Chatbot</h2>
                </div>
              </div>

              {/* Chatbot Body */}
              <div className="chat-body">
                <div className="message bot-message">
                  <Chatboticon />
                  <p className="message-text">
                    Hey there 👋<br />How can I help you today?
                  </p>
                </div>

                {chatHistory.map((chat, index) => (
                  <ChatMessage key={index} chat={chat} />
                ))}
              </div>

              {/* Chat Footer */}
              <div className="chat-footer">
                <ChartForm setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} chatHistory={chatHistory} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
};
