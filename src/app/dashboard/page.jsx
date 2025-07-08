"use client";

import React, { useEffect, useRef, useState } from "react";
import "../style.css";


const Dashboard = () => {
  const textareaRef = useRef(null);
  const sendBtnRef = useRef(null);
  const chatAreaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const addMessage = (content, isUser = false) => {
    const chatArea = chatAreaRef.current;
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : ""}`;

    const avatar = document.createElement("div");
    avatar.className = `message-avatar ${isUser ? "user-avatar" : "ai-avatar"}`;
    avatar.textContent = isUser ? "U" : "CQ";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.innerHTML = content;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  };

  const addTypingIndicator = () => {
    const chatArea = chatAreaRef.current;
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.id = "typingIndicator";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar ai-avatar";
    avatar.textContent = "CQ";

    const typingDiv = document.createElement("div");
    typingDiv.className = "message-content typing-indicator";
    typingDiv.innerHTML =
      '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(typingDiv);
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  };

  const removeTypingIndicator = () => {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) typingIndicator.remove();
  };

  const simulateAIResponse = (userMessage) => {
    const responses = [
      "I'm analyzing your request. Based on the data from your connected sources, here are the key insights you're looking for...",
      "Let me pull the latest information from your systems. I can see some interesting patterns in your data that might be relevant...",
      "I've processed your query and found several important points to highlight. Here's what the data shows...",
      "Based on my analysis of your recent activity across all platforms, I can provide you with the following insights...",
      "I've reviewed your latest data and identified some key trends. Let me break this down for you..."
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    addTypingIndicator();
    setIsTyping(true);

    setTimeout(() => {
      removeTypingIndicator();
      addMessage(randomResponse);
      setIsTyping(false);
      if (sendBtnRef.current) sendBtnRef.current.disabled = false;
    }, Math.random() * 2000 + 2000);
  };

  const sendMessage = () => {
    const textarea = textareaRef.current;
    const sendBtn = sendBtnRef.current;
    const input = textarea.value.trim();
    if (input && !isTyping) {
      addMessage(input, true);
      textarea.value = "";
      textarea.style.height = "auto";
      sendBtn.disabled = true;
      simulateAIResponse(input);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.className = !isDark ? "dark" : "light";
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    });

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }, [isTyping]);

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="logo">
            <div className="logo-icon">CQ</div>
            <div className="logo-text">CiViQ</div>
          </div>
          <div className="sidebar-section">
            <div className="section-title">Quick Actions</div>
            <div className="quick-actions">
              {["📊 Summarize Data", "🚨 Show Alerts", "📋 Draft Plan", "📈 Generate Report"].map((action, i) => (
                <button key={i} className="action-btn" onClick={() => {
                  textareaRef.current.value = `Please ${action.split(" ")[1].toLowerCase()}`;
                  textareaRef.current.focus();
                }}>{action}</button>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <div className="section-title">Recent Reports</div>
            {[
              ["Q4 Performance Summary", "2 hours ago • Google Sheets"],
              ["Risk Assessment Alert", "5 hours ago • Slack Integration"],
              ["Weekly Team Insights", "1 day ago • Notion"],
              ["Budget Analysis", "2 days ago • Google Drive"]
            ].map(([title, meta], i) => (
              <div className="report-item" key={i}>
                <div className="report-title">{title}</div>
                <div className="report-meta">{meta}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          <div className="header">
            <div className="header-left">
              <div className="status-indicator">
                <div className="status-dot"></div>
                All Systems Online
              </div>
            </div>
            <div className="header-right">
              <button className="theme-toggle" onClick={toggleTheme}>{isDark ? "☀️" : "🌙"}</button>
            </div>
          </div>

          <div className="chat-area" ref={chatAreaRef} id="chatArea">
            <div className="floating-info">Connected: Google Drive, Slack, Notion, Sheets</div>
            <div className="message">
              <div className="message-avatar ai-avatar">CQ</div>
              <div className="message-content">
                Welcome to CiVic Copilot! I'm your AI business assistant, ready to help you with operational insights, risk monitoring, and data analysis.
                <br />
                I've detected 3 new alerts that require your attention and have fresh data from your connected sources. How can I assist you today?
              </div>
            </div>
          </div>

          <div className="input-area">
            <div className="input-container">
              <div className="suggestions">
                {["📊 Weekly summary", "🚨 Check alerts", "📈 Revenue analysis", "📋 Create action plan"].map((sug, i) => (
                  <button key={i} className="suggestion-chip" onClick={() => {
                    textareaRef.current.value = sug.slice(2);
                    textareaRef.current.focus();
                  }}>{sug}</button>
                ))}
              </div>
              <div className="input-wrapper">
                <textarea
                  className="message-input"
                  id="messageInput"
                  placeholder="Ask me about your business data, request insights, or create reports..."
                  rows={1}
                  ref={textareaRef}
                ></textarea>
                <button className="send-btn" id="sendBtn" ref={sendBtnRef} onClick={sendMessage}>↗</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;