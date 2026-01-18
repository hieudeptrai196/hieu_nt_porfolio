import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCat, FaUtensils } from 'react-icons/fa';
import { useLanguage } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';

const Cat = ({ isPlaying }) => {
  const [showBubble, setShowBubble] = useState(false);
  const [noiseMessage, setNoiseMessage] = useState(false);
  const [currentLoudMsg, setCurrentLoudMsg] = useState('');
  const timeoutRef = useRef(null);
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const isNuoiHieuPage = location.pathname === '/nuoi-hieu';

  const sleepMsg = lang === 'vi' ? "Đang ngủ, đừng gọi tôi dậy! 😴" : "Sleeping, don't wake me up! 😴";
  const feedMsg = lang === 'vi' ? "Cho mèo ăn" : "Feed the cat";
  
  const loudMessages = useRef({
    vi: [
        "Nhạc to quá, tắt nhạc đi! 😾",
        "Tôi không ngủ được! 🙀",
        "Ai bật nhạc thế? 😿",
        "Đau đầu quá đi... 😿",
        "Tắt loa giùm cái! 🚫🔊",
        "Chill vừa thôi sếp ơi! 🎵😡"
    ],
    en: [
        "Music is too loud, turn it off! 😾",
        "I can't sleep! 🙀",
        "Who turned this on? 😿",
        "My head hurts... 😿",
        "Turn off the speakers! 🚫🔊",
        "Too much chill, boss! 🎵😡"
    ]
  });

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (!showBubble) {
          const msgs = loudMessages.current[lang];
          const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
          setCurrentLoudMsg(randomMsg);
          setNoiseMessage(true);
          setTimeout(() => setNoiseMessage(false), 3000);
        }
      }, 7000); 
    } else {
      // Clear message immediately if music stops and it was showing
      setNoiseMessage(prev => prev ? false : prev);
      setCurrentLoudMsg('');
    }
    return () => {
        clearInterval(interval);
        setNoiseMessage(false);
    }
  }, [isPlaying, showBubble, lang]);

  const handleCatClick = () => {
    setNoiseMessage(false);
    setShowBubble(true);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 3000);
  };

  const currentMsg = noiseMessage ? currentLoudMsg : sleepMsg;

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 49, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Feed Button Above Cat - Hidden on Nuoi Hieu page */}
        {!isNuoiHieuPage && (
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                whileHover={{ opacity: 1, scale: 1.1, backgroundColor: 'var(--primary)' }}
                onClick={() => navigate('/nuoi-hieu')}
                style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    backdropFilter: 'blur(5px)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                }}
            >
                <FaUtensils size={10} /> {feedMsg}
            </motion.button>
        )}

        <motion.div
            key="sleeping-cat"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            whileHover={{ opacity: 1, scale: 1.1, rotate: 5 }}
            onClick={handleCatClick}
            style={{
                fontSize: '2rem',
                color: '#666',
                cursor: 'pointer',
                userSelect: 'none',
                position: 'relative'
            }}
        >
            <AnimatePresence>
                {(showBubble || (isPlaying && noiseMessage)) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: '0',
                            marginBottom: '10px',
                            background: 'white',
                            color: 'black',
                            padding: '8px 12px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            width: 'max-content',
                            maxWidth: '200px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            pointerEvents: 'none'
                        }}
                    >
                        {currentMsg}
                        <div style={{
                            position: 'absolute',
                            bottom: '-6px',
                            left: '15px',
                            width: '0',
                            height: '0',
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid white'
                        }}></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <FaCat style={{ transform: 'rotate(5deg)' }} />
            <motion.span 
            animate={{ opacity: [0, 1, 0], y: -15, x: 5 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
                position: 'absolute', 
                top: '-15px', 
                right: '-10px', 
                fontSize: '1rem',
                color: 'var(--primary)',
                fontWeight: 'bold'
            }}
            >
            Zzz
            </motion.span>
        </motion.div>
    </div>
  );
};

export default Cat;
