import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.pageYOffset > 300;
      setIsVisible(shouldBeVisible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div style={{ position: 'fixed', bottom: '90px', right: '30px', zIndex: 999 }}>
            <motion.a
            href="mailto:hieulatoi1962@gmail.com"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="floating-contact"
            style={{
                background: 'linear-gradient(135deg, #00C6FF, #0072FF)', // Blue gradient
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                color: 'white',
                fontSize: '1.2rem',
                textDecoration: 'none'
            }}
            whileHover={{ 
                y: -5, 
                boxShadow: '0 6px 20px rgba(0, 114, 255, 0.6)' 
            }}
            whileTap={{ scale: 0.9 }}
            >
            <FaEnvelope />
            </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContact;
