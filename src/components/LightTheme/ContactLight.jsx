import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { content } from '../../data';
import { FaEnvelope, FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';

const ContactLight = () => {
    const { lang } = useLanguage();
    // Using generic text if specific contact text is minimal in data.js
    // data.js contact section is missing in the snippet I saw, so I'll create a generic nice footer
    
    return (
        <footer id="light-contact" style={styles.container}>
            <div style={styles.ctaBox}>
                <h2 style={styles.title}>{lang === 'vi' ? 'Sẵn sàng hợp tác?' : 'Ready to work together?'}</h2>
                <p style={styles.subtitle}>
                    {lang === 'vi' 
                        ? 'Liên hệ với tôi để trao đổi về dự án của bạn.' 
                        : 'Get in touch to discuss your project.'}
                </p>
                <motion.a 
                    href="mailto:hieulatoi1962@gmail.com" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={styles.mailBtn}
                >
                    <FaEnvelope style={{ marginRight: '10px' }} /> hieulatoi1962@gmail.com
                </motion.a>
            </div>

            <div style={styles.bottomBar}>
                <div style={styles.socials}>
                    <a href="https://github.com/hieudeptrai196" target="_blank" rel="noreferrer" style={styles.iconLink}><FaGithub /></a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.iconLink}><FaFacebook /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.iconLink}><FaLinkedin /></a>
                </div>
                <p style={styles.copyright}>© 2026 Hieu Nguyen. Built with ❤️ and React.</p>
            </div>
        </footer>
    );
};

const styles = {
    container: {
        background: '#fff',
        padding: '80px 5vw 30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    ctaBox: {
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        borderRadius: '30px',
        padding: '60px 40px',
        width: '100%',
        maxWidth: '800px',
        textAlign: 'center',
        color: '#fff',
        boxShadow: '0 20px 40px rgba(0, 114, 255, 0.3)',
        marginBottom: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '15px'
    },
    subtitle: {
        fontSize: '1.2rem',
        opacity: 0.9,
        marginBottom: '30px',
        maxWidth: '500px'
    },
    mailBtn: {
        background: '#fff',
        color: '#0072ff',
        padding: '15px 30px',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: '700',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    },
    bottomBar: {
        width: '100%',
        borderTop: '1px solid #f1f1f1',
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    },
    socials: {
        display: 'flex',
        gap: '20px'
    },
    iconLink: {
        color: '#2d3436',
        fontSize: '1.5rem',
        transition: 'color 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: '#f8f9fa'
    },
    copyright: {
        color: '#b2bec3',
        fontSize: '0.9rem'
    }
};

export default ContactLight;
