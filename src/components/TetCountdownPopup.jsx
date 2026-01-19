import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import banhChungImg from '../assets/banh_chung.png';
import './TetCountdownPopup.css';

const TetCountdownPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const [daysLeft] = useState(() => {
    const tetDate = new Date('2026-02-17T00:00:00');
    const now = new Date();
    const diffTime = tetDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays : 0;
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="tet-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="tet-popup-card"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
          >
            <button onClick={() => setIsVisible(false)} className="tet-close-btn">×</button>
            
            <motion.h2 
              className="tet-title"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🌸 Sắp Đến Tết Rồi! 🌸
            </motion.h2>
            
            <motion.div 
              className="tet-image-container"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <img src={banhChungImg} alt="Bánh Chưng" className="tet-image" />
            </motion.div>

            <p className="tet-content">
                Còn <span className="tet-highlight">{daysLeft}</span> ngày nữa là Tết,<br/>
                bạn đã sắm sửa được gì chưa?
            </p>

            {/* <div className="tet-cta-container">
                <Link to="/nuoi-hieu" onClick={() => setIsVisible(false)} style={{ textDecoration: 'none' }}>
                  <motion.div 
                    className="tet-link-btn"
                    whileHover={{ scale: 1.05, backgroundColor: "#fff5cc" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: ["0 4px 6px rgba(0,0,0,0.2)", "0 6px 12px rgba(255, 204, 0, 0.4)", "0 4px 6px rgba(0,0,0,0.2)"] }}
                    transition={{ boxShadow: { duration: 1.5, repeat: Infinity } }}
                  >
                      🧧 Lì xì
                  </motion.div>
                </Link>
            </div> */}

            <div className="tet-decor">
              🧧 ✨ 🏮 ✨ 🧧
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TetCountdownPopup;
