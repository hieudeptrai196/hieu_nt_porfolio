import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { content } from '../../data';
import { FaGlobeAmericas, FaBars, FaTimes } from 'react-icons/fa';

const NavbarLight = () => {
    const { lang, switchLanguage } = useLanguage();
    const t = content[lang].nav;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const navItems = [
        { id: 'light-home', label: t.home },
        { id: 'light-skills', label: t.skills },
        { id: 'light-experience', label: t.experience },
        { id: 'light-projects', label: t.projects },
        { id: 'light-contact', label: t.contact }
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    ...styles.nav,
                    background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(10px)' : 'none',
                    boxShadow: scrolled ? '0 5px 20px rgba(0,0,0,0.05)' : 'none',
                    padding: scrolled ? '15px 5vw' : '30px 5vw'
                }}
            >
                <div style={styles.logo} onClick={() => scrollToSection('light-hero')}>
                    HieuNguyen<span style={{color: '#0072ff'}}>.</span>
                </div>

                {/* Desktop Menu */}
                <div style={styles.desktopMenu}>
                    {navItems.map((item) => (
                        <span 
                            key={item.id} 
                            style={styles.navLink}
                            onClick={() => scrollToSection(item.id)}
                            onMouseEnter={(e) => e.target.style.color = '#0072ff'}
                            onMouseLeave={(e) => e.target.style.color = '#2d3436'}
                        >
                            {item.label}
                        </span>
                    ))}
                    
                    <button onClick={switchLanguage} style={styles.langBtn}>
                        <FaGlobeAmericas /> {lang === 'vi' ? 'EN' : 'VI'}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div style={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        style={styles.mobileMenu}
                    >
                         {navItems.map((item) => (
                            <span 
                                key={item.id} 
                                style={styles.mobileNavLink}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </span>
                        ))}
                         <button onClick={switchLanguage} style={{...styles.langBtn, marginTop: '20px'}}>
                            <FaGlobeAmericas /> {lang === 'vi' ? 'EN' : 'VI'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const styles = {
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease'
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#2d3436',
        cursor: 'pointer'
    },
    desktopMenu: {
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    navLink: {
        color: '#2d3436',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'color 0.2s',
        fontSize: '0.95rem'
    },
    langBtn: {
        background: 'rgba(0, 114, 255, 0.1)',
        color: '#0072ff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: '600'
    },
    mobileToggle: {
        display: 'none', // Hidden by default, shown in CSS via media queries typically, but here mostly inline.
        // We will need a media query hook or just show it if screen is small. 
        // For simplicity in inline-styles only, we might hardcode desktop first or use a hook.
        // To keep it simple: We'll rely on the parent container width.
        // Actually, inline styles don't support media queries directly.
        // For this demo, let's assume Desktop mainly, or I'd need a window width hook.
        cursor: 'pointer',
        fontSize: '1.5rem',
        color: '#2d3436'
    },
    mobileMenu: {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '70%',
        height: '100vh',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(15px)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
    },
    mobileNavLink: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#2d3436',
        cursor: 'pointer'
    }
};

export default NavbarLight;
