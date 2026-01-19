import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaMinus } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data';
import './ChatWidget.css';

// Direct API Call to bypass library version issues
const ChatWidget = () => {
    const { lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            role: 'model', 
            text: lang === 'vi' 
                ? "Chào bạn! Tôi là Hiếu (AI). Bạn muốn tìm hiểu gì về mình không?\n_(Đây là phiên bản mô phỏng dựa trên hồ sơ của mình)_\n_(Lưu ý: Do dùng phiên bản miễn phí nên số lượng câu trả lời có hạn)_" 
                : "Hello! I'm Hieu (AI). Want to know more about my work?\n_(I am an AI simulation based on my portfolio)_\n_(Note: Limited responses due to free tier usage)_"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
        if (!API_KEY) {
            alert("Missing API Key!");
            return;
        }

        const userMsg = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        // Prepare context
        const currentData = content[lang];
        const systemPrompt = `
            You are Hieu Nguyen (Software Engineer). 
            Context: ${JSON.stringify(currentData)}.
            Role: You are talking to a visitor. Answer as yourself ("I", "my", "me").
            Language: Answer in ${lang === 'vi' ? 'Vietnamese' : 'English'}.
            
            IMPORTANT RULES:
            - DIRECT ANSWER ONLY. DO NOT start with "Hello" or "I am Hieu" unless asked.
            - Be friendly, humble, and professional.
            - Use the context to answer about your skills, projects, and background.
            - If asked about something not in the context (like general knowledge), answer briefly if tech-related, otherwise politely bring it back to your portfolio.
        `;

        // Combine history for simple context (Limit to last 3 pairs to save tokens)
        // We only send the system prompt + current Question to ensure direct answering without confusion
        const contents = [
            {
                role: "user",
                parts: [{ text: systemPrompt + "\n\nUser Question: " + input }]
            }
        ];

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: contents
                    }),
                }
            );

            if (!response.ok) {
                // Handle Quota Limit (429)
                if (response.status === 429) {
                    throw new Error("QUOTA_EXCEEDED");
                }
                const errData = await response.json();
                throw new Error(errData.error?.message || "Unknown API Error");
            }

            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;

            setMessages(prev => [...prev, { id: Date.now() + Math.random(), role: 'model', text }]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            let errorMsg = lang === 'vi' 
                ? "Xin lỗi, đã xảy ra lỗi kết nối." 
                : "Sorry, connection error occurred.";

            if (error.message === "QUOTA_EXCEEDED") {
                errorMsg = lang === 'vi'
                    ? "Rất tiếc, mình đã hết hạn mức trả lời miễn phí trong ngày. Bạn vui lòng đợi một lát hoặc quay lại sau nhé!"
                    : "Sorry, I've reached my free usage limit for today. Please wait a bit or come back later!";
            }

            setMessages(prev => [...prev, { 
                id: Date.now() + Math.random(), 
                role: 'model', 
                text: errorMsg
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Action Button - Positioned Left */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="chat-fab-btn"
                >
                    <FaRobot size={24} />
                    <span className="chat-fab-tooltip">
                        {lang === 'vi' ? 'Trò chuyện cùng Hiếu AI' : 'Chat with Hieu AI'}
                    </span>
                </motion.button>
            )}

            {/* Chat Window - Positioned Left */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="chat-window-container"
                    >
                        {/* Header */}
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <div className="chat-avatar">
                                    <FaRobot size={18} color="#fff" />
                                </div>
                                <div className="chat-title">
                                    <h3>Hieu Nguyen</h3>
                                    <span className="chat-title-status">
                                        {lang === 'vi' ? 'Miễn phí (Beta)' : 'Free Tier (Beta)'}
                                    </span>
                                </div>
                            </div>
                            <div className="chat-controls">
                                <FaMinus 
                                    className="chat-minimize-btn"
                                    onClick={() => setIsOpen(false)} 
                                />
                            </div>
                        </div>

                        {/* Messages Body */}
                        <div className="chat-body">
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`chat-message-row ${msg.role === 'user' ? 'user' : 'model'}`}
                                >
                                    {msg.role === 'model' && (
                                        <div className="chat-msg-avatar">
                                            <FaRobot size={12} color="#fff" />
                                        </div>
                                    )}
                                    <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'model'}`}>
                                        <ReactMarkdown 
                                            components={{
                                                p: (props) => <p style={{margin: 0}} {...props} />
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chat-message-row model">
                                    <div className="chat-msg-avatar"><FaRobot size={12} /></div>
                                    <div className="chat-bubble model">
                                        <div className="typing-dot-container">
                                            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }}>•</motion.span>
                                            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>•</motion.span>
                                            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>•</motion.span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="chat-footer">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={lang === 'vi' ? "Hỏi gì đó đi..." : "Ask something..."}
                                className="chat-input"
                                rows={1}
                            />
                            <button onClick={handleSend} disabled={!input.trim() || isLoading} className="chat-send-btn">
                                <FaPaperPlane color="#fff" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
