import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaMinus, FaCommentDots } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data';

// Direct API Call to bypass library version issues
const ChatWidget = () => {
    const { lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            role: 'model', 
            text: lang === 'vi' 
                ? "Chào bạn! Tôi là trợ lý AI của Hiếu. Bạn có muốn hỏi gì không?\n_(Lưu ý: Do dùng phiên bản miễn phí nên số lượng câu trả lời có hạn)_" 
                : "Hello! I'm Hieu's AI assistant. Any questions?\n_(Note: Limited responses due to free tier usage)_"
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
            You are "Hieu AI", a portfolio assistant. 
            Role: Answer questions about Hieu Nguyen based on this context: ${JSON.stringify(currentData)}.
            Language: Answer in ${lang === 'vi' ? 'Vietnamese' : 'English'}.
            
            IMPORTANT RULES:
            - DIRECT ANSWER ONLY. DO NOT greet (Hello, Hi) or introduce yourself again.
            - Keep it short, concise, and friendly.
            - If asked about contact/skills/projects, summarise from context.
            - If the question is strictly not related to Hieu/Tech, politely refuse.
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
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
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
                    style={styles.fab}
                >
                    <FaRobot size={24} />
                    <span style={styles.fabTooltip}>
                        {lang === 'vi' ? 'Hỏi Hieu AI' : 'Ask Hieu AI'}
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
                        style={styles.chatWindow}
                    >
                        {/* Header */}
                        <div style={styles.header}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={styles.avatar}>
                                    <FaRobot size={18} color="#fff" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>Hieu AI</h3>
                                    <span style={{ fontSize: '0.7rem', color: '#00ff88' }}>
                                        {lang === 'vi' ? 'Miễn phí (Beta)' : 'Free Tier (Beta)'}
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <FaMinus 
                                    style={{ cursor: 'pointer', color: '#ccc' }} 
                                    onClick={() => setIsOpen(false)} 
                                />
                            </div>
                        </div>

                        {/* Messages Body */}
                        <div style={styles.body}>
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    style={{ 
                                        ...styles.messageRow, 
                                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' 
                                    }}
                                >
                                    {msg.role === 'model' && (
                                        <div style={styles.msgAvatar}>
                                            <FaRobot size={12} color="#fff" />
                                        </div>
                                    )}
                                    <div style={{
                                        ...styles.bubble,
                                        background: msg.role === 'user' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: msg.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0'
                                    }}>
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
                                <div style={styles.messageRow}>
                                    <div style={styles.msgAvatar}><FaRobot size={12} /></div>
                                    <div style={{ ...styles.bubble, background: 'rgba(255, 255, 255, 0.1)' }}>
                                        <div className="typing-dot" style={{ display: 'flex', gap: '4px' }}>
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
                        <div style={styles.footer}>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={lang === 'vi' ? "Hỏi gì đó đi..." : "Ask something..."}
                                style={styles.input}
                                rows={1}
                            />
                            <button onClick={handleSend} disabled={!input.trim() || isLoading} style={styles.sendBtn}>
                                <FaPaperPlane color="#fff" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const styles = {
    fab: {
        position: 'fixed',
        bottom: '100px', // 30px (ScrollBtn) + 50px (Size) + 20px (Gap) = 100px
        right: '30px',   // Aligned perfectly with ScrollToTop
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        color: '#fff',
        border: 'none',
        boxShadow: '0 4px 15px rgba(0, 114, 255, 0.5)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'all 0.3s'
    },
    chatWindow: {
        position: 'fixed',
        bottom: '160px', // 100px (FAB) + 50px (Size) + 10px (Gap)
        right: '30px',   // Aligned perfectly
        width: '320px',
        height: '450px',
        background: 'rgba(20, 20, 35, 0.95)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        overflow: 'hidden'
    },
    header: {
        padding: '10px 15px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 1,
        padding: '15px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    messageRow: {
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end'
    },
    msgAvatar: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5px'
    },
    bubble: {
        padding: '8px 12px',
        maxWidth: '85%',
        color: '#fff',
        fontSize: '0.85rem',
        lineHeight: '1.4',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    footer: {
        padding: '10px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        background: 'rgba(255, 255, 255, 0.05)',
        border: 'none',
        borderRadius: '15px',
        padding: '8px 12px',
        color: '#fff',
        outline: 'none',
        fontSize: '0.85rem',
        resize: 'none'
    },
    sendBtn: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fabTooltip: {
        position: 'absolute',
        right: '65px', // Adjusted again
        background: '#333',
        color: '#fff',
        padding: '5px 8px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
    }
};

export default ChatWidget;
