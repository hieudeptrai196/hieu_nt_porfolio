import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import banhChungImg from '../assets/banh_chung.png';

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
          style={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            style={styles.popup}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
          >
            <button onClick={() => setIsVisible(false)} style={styles.closeBtn}>×</button>
            
            <motion.h2 
              style={styles.title}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🌸 Sắp Đến Tết Rồi! 🌸
            </motion.h2>
            
            <motion.div 
              style={styles.imageContainer}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <img src={banhChungImg} alt="Bánh Chưng" style={styles.image} />
            </motion.div>

            <p style={styles.content}>
                Còn <span style={styles.highlight}>{daysLeft}</span> ngày nữa là Tết,<br/>
                bạn đã sắm sửa được gì chưa?
            </p>

            {/* <div style={styles.ctaContainer}>
                <Link to="/nuoi-hieu" onClick={() => setIsVisible(false)} style={{ textDecoration: 'none' }}>
                  <motion.div 
                    style={styles.link}
                    whileHover={{ scale: 1.05, backgroundColor: "#fff5cc" }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: ["0 4px 6px rgba(0,0,0,0.2)", "0 6px 12px rgba(255, 204, 0, 0.4)", "0 4px 6px rgba(0,0,0,0.2)"] }}
                    transition={{ boxShadow: { duration: 1.5, repeat: Infinity } }}
                  >
                      🧧 Lì xì
                  </motion.div>
                </Link>
            </div> */}

            <div style={styles.decor}>
              🧧 ✨ 🏮 ✨ 🧧
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  popup: {
    backgroundColor: '#b30000',
    color: '#ffcc00',
    padding: '40px',
    borderRadius: '20px',
    textAlign: 'center',
    position: 'relative',
    maxWidth: '700px',
    width: '90%',
    boxShadow: '0 0 30px rgba(255, 204, 0, 0.6)',
    border: '3px solid #ffcc00',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    color: '#ffcc00',
    fontSize: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    zIndex: 10,
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    fontFamily: '"Dancing Script", cursive, sans-serif',
    textTransform: 'uppercase',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    display: 'inline-block' 
  },
  imageContainer: {
    marginBottom: '20px',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '2px solid #ffcc00',
    backgroundColor: '#fff',
    padding: '5px'
  },
  image: {
    width: '100%',
    maxWidth: '250px',
    height: 'auto',
    display: 'block'
  },
  content: {
    fontSize: '20px',
    lineHeight: '1.6',
    marginBottom: '20px',
    color: '#fff',
    fontWeight: '500'
  },
  highlight: {
    color: '#ffcc00',
    fontWeight: 'bold',
    fontSize: '28px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  },
  ctaContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
    width: '100%',
    alignItems: 'center'
  },
  link: {
    display: 'block',
    backgroundColor: '#ffcc00',
    color: '#b30000',
    padding: '12px 40px',
    borderRadius: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 'fit-content'
  },
  decor: {
    fontSize: '36px',
    marginTop: '10px'
  }
};

export default TetCountdownPopup;
