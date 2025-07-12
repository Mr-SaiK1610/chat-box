import React, { useState } from "react";
import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openai";

function App() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]); // Store chat history

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent empty messages

    const userMessage = { role: "user", content: input };
    setChats([...chats, userMessage]); // Add user message to chat

    setInput(""); // Clear input field

    try {
      const botResponse = await sendMsgToOpenAI(input);
      setChats([...chats, userMessage, { role: "assistant", content: botResponse }]); // Add bot response
    } catch (error) {
      console.error(error);
      setChats([...chats, userMessage, { role: "assistant", content: "Error fetching response." }]);
    }
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="ChatGPT Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="New Chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideButton">
            <button className="query">
              <img src={msgIcon} alt="Query" />
              What is programming?
            </button>
            <button className="query">
              <img src={msgIcon} alt="Query" />
              How does AI work?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Saved" className="listItemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade to Pro" className="listItemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {chats.map((chat, index) => (
            <div key={index} className={`chat ${chat.role === "assistant" ? "bot" : ""}`}>
              <img
                className="chatImg"
                src={chat.role === "user" ? userIcon : gptImgLogo}
                alt={chat.role}
              />
              <p className="txt">{chat.content}</p>
            </div>
          ))}
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
