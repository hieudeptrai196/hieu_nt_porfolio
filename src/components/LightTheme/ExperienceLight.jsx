import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { content } from '../../data';
import { FaBriefcase, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

const ExperienceLight = () => {
  const { lang } = useLanguage();
  const t = content[lang].experience;

  return (
    <div id="light-experience" style={styles.container}>
       <div style={styles.wrapper}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <h2 style={styles.title}>{t.title}</h2>
                <div style={styles.underline}></div>
            </motion.div>

            <div style={styles.timeline}>
                {/* Center Line */}
                <div style={styles.line}></div>

                {t.items.map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        style={{
                            ...styles.itemRow,
                            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                        }}
                    >
                        {/* Content Side */}
                        <div style={styles.contentCol}>
                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <h3 style={styles.role}>{item.role}</h3>
                                    <span style={{ 
                                        padding: '4px 10px', 
                                        borderRadius: '15px', 
                                        background: '#e3f2fd', 
                                        color: '#0072ff', 
                                        fontSize: '0.8rem',
                                        fontWeight: '600'
                                    }}>
                                        {item.period}
                                    </span>
                                </div>
                                
                                <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.company}>
                                    <FaBuilding style={{ marginRight: '6px' }} /> {item.company}
                                </a>
                                
                                <p style={styles.desc}>{item.description}</p>
                            </div>
                        </div>

                        {/* Dot on Line */}
                        <div style={styles.dotCol}>
                            <div style={styles.dot}>
                                <FaBriefcase size={12} color="#fff" />
                            </div>
                        </div>

                        {/* Empty Space for Balance */}
                        <div style={styles.emptyCol}></div>
                    </motion.div>
                ))}
            </div>
       </div>
    </div>
  );
};

const styles = {
    container: {
        background: '#F8F9FA',
        padding: '100px 5vw',
    },
    wrapper: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    title: {
        fontSize: '2.5rem',
        color: '#2d3436',
        marginBottom: '10px',
        fontWeight: '800'
    },
    underline: {
        width: '60px',
        height: '4px',
        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
        margin: '0 auto',
        borderRadius: '2px'
    },
    timeline: {
        position: 'relative',
        padding: '20px 0'
    },
    line: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '2px',
        background: '#e0e0e0',
        transform: 'translateX(-50%)',
        zIndex: 0
    },
    itemRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '60px',
        position: 'relative',
        zIndex: 1
    },
    contentCol: {
        flex: 1,
        padding: '0 40px',
        textAlign: 'left' // Will override for reversed rows if needed, but card internal align is key
    },
    emptyCol: {
        flex: 1
    },
    dotCol: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px'
    },
    dot: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        boxShadow: '0 0 0 6px #fff, 0 5px 15px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    card: {
        background: '#fff',
        padding: '25px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid #fff',
        transition: 'transform 0.3s',
        cursor: 'default',
        textAlign: 'left'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '10px'
    },
    role: {
        fontSize: '1.2rem',
        fontWeight: '700',
        color: '#2d3436',
        margin: 0
    },
    company: {
        display: 'flex',
        alignItems: 'center',
        color: '#0072ff',
        textDecoration: 'none',
        fontWeight: '600',
        marginBottom: '10px',
        fontSize: '0.95rem'
    },
    desc: {
        color: '#636e72',
        lineHeight: '1.6',
        margin: 0
    }
};

export default ExperienceLight;
