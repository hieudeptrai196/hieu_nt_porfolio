import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCode, FaPaintBrush, FaLayerGroup } from 'react-icons/fa';

const HeroLight = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('light-projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="light-hero" style={styles.container}>
      {/* Background Shapes */}
      <div style={styles.bgShape1} />
      <div style={styles.bgShape2} />
      <div style={styles.bgOverlay} />

      <div style={styles.contentWrapper}>
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.leftCol}
        >
          <div style={styles.tagline}>
            <span style={styles.taglineText}>Creative Developer</span>
          </div>
          
          <h1 style={styles.heading}>
            <span style={styles.gradientText}>Hieu</span><br />
            <span style={{color: '#2d3436'}}>Nguyen</span>
          </h1>

          <p style={styles.description}>
            Crafting digital experiences with a touch of magic. 
            Merging technical expertise with creative design.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 114, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            style={styles.ctaButton}
          >
            View Projects <FaArrowRight style={{marginLeft: '8px'}} />
          </motion.button>
        </motion.div>

        {/* Right Content - 3D Elements */}
        <div style={styles.rightCol}>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={styles.glassCardMain}
          >
            <div style={styles.cardIconBox}>
              <FaLayerGroup size={40} color="#fff" />
            </div>
            <h3 style={styles.cardTitle}>Full Stack</h3>
            <div style={styles.fakeLines}></div>
            <div style={{...styles.fakeLines, width: '60%'}}></div>
          </motion.div>

          {/* Floating Small Cards */}
          <motion.div 
            animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{...styles.glassCardSmall, top: '20%', left: '-10%'}}
          >
             <FaCode size={20} color="#0072ff" />
             <span style={styles.smallCardText}>Frontend</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{...styles.glassCardSmall, bottom: '25%', right: '-15%'}}
          >
             <FaPaintBrush size={20} color="#ff007a" />
             <span style={styles.smallCardText}>UI/UX Design</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    background: '#F8F9FA',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Inter", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center vertically since nav is gone
    paddingTop: '60px' // Space for navbar
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(80px)',
    zIndex: 1
  },
  bgShape1: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '60vw',
    height: '60vw',
    background: 'radial-gradient(circle, rgba(255,200,221,0.6) 0%, rgba(169,223,255,0.4) 100%)',
    borderRadius: '50%',
    filter: 'blur(50px)',
    zIndex: 0
  },
  bgShape2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '50vw',
    height: '50vw',
    background: 'radial-gradient(circle, rgba(199,206,255,0.6) 0%, rgba(246,255,224,0.4) 100%)',
    borderRadius: '50%',
    filter: 'blur(50px)',
    zIndex: 0
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '0 5vw',
    gap: '50px',
    flexWrap: 'wrap'
  },
  leftCol: {
    flex: 1,
    minWidth: '300px'
  },
  rightCol: {
    flex: 1,
    minWidth: '300px',
    height: '500px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagline: {
    marginBottom: '15px'
  },
  taglineText: {
    background: 'rgba(0, 114, 255, 0.1)',
    color: '#0072ff',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  heading: {
    fontSize: '5rem',
    lineHeight: '1.1',
    marginBottom: '25px',
    fontWeight: '800',
    letterSpacing: '-2px'
  },
  gradientText: {
    background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    fontSize: '1.1rem',
    color: '#636e72',
    lineHeight: '1.6',
    maxWidth: '500px',
    marginBottom: '40px'
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
    color: 'white',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 5px 15px rgba(9, 132, 227, 0.4)'
  },
  glassCardMain: {
    width: '320px',
    height: '380px',
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '30px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    position: 'relative',
    zIndex: 2
  },
  cardIconBox: {
    width: '80px',
    height: '80px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    boxShadow: '0 10px 20px rgba(168, 237, 234, 0.4)'
  },
  cardTitle: {
    color: '#2d3436',
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '20px'
  },
  fakeLines: {
    width: '80%',
    height: '10px',
    background: 'rgba(45, 52, 54, 0.05)',
    borderRadius: '5px',
    marginBottom: '10px'
  },
  glassCardSmall: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.05)',
    zIndex: 3,
    minWidth: '150px'
  },
  smallCardText: {
    fontWeight: '600',
    color: '#2d3436',
    fontSize: '0.9rem'
  }
};

export default HeroLight;
