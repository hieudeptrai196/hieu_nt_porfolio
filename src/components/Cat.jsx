import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCat } from 'react-icons/fa';
import { useLanguage } from '../App';

const Cat = ({ isPlaying }) => {
  const [showBubble, setShowBubble] = useState(false);
  const [noiseMessage, setNoiseMessage] = useState(false);
  const timeoutRef = useRef(null);
  const { lang } = useLanguage();

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (!showBubble) {
          setNoiseMessage(true);
          setTimeout(() => setNoiseMessage(false), 3000);
        }
      }, 8000); // Check every 8 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, showBubble]);

  const handleCatClick = () => {
    setNoiseMessage(false);
    setShowBubble(true);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 3000);
  };

  const sleepMsg = lang === 'vi' ? "Đang ngủ, đừng gọi tôi dậy!" : "Sleeping, don't wake me up!";
  const loudMsg = lang === 'vi' ? "Nhạc to quá, tắt nhạc đi! 😾" : "Music is too loud, turn it off! 😾";

  return (
    <motion.div
        key="sleeping-cat"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        whileHover={{ opacity: 1, scale: 1.1, rotate: 5 }}
        onClick={handleCatClick}
        style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 49,
            fontSize: '2rem',
            color: '#666',
            cursor: 'pointer',
            userSelect: 'none'
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
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        pointerEvents: 'none'
                    }}
                >
                    {noiseMessage ? loudMsg : sleepMsg}
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
  );
};

export default Cat;
