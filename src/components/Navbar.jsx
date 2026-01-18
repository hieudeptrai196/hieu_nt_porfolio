import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import confetti from 'canvas-confetti';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa'; // Added FaSearch import
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      scrollToSection('home');
    }
    setIsOpen(false);
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    var randomInRange = (min, max) => Math.random() * (max - min) + min;

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      var particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      e.target.reset();
    }
  };

  const scrollToSection = (id) => {
    setIsOpen(false); 
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav 
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: scrolled ? '15px 40px' : '25px 40px',
            background: scrolled || isOpen ? 'rgba(10, 10, 20, 0.7)' : 'transparent',
            backdropFilter: scrolled || isOpen ? 'blur(15px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.3s ease'
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 1001 }}>
            <div 
                className="logo rgb-text" 
                style={{ fontSize: '1.8rem', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}
                onClick={handleLogoClick}
            >
                HieuNguyen
            </div>

            {/* Google Search Bar */}
            <form 
                onSubmit={handleSearch} 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '20px', 
                    padding: '5px 15px', 
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s'
                }}
            >
                <input 
                    name="search" 
                    placeholder="Search Google..." 
                    autoComplete="off"
                    style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: 'white', 
                        outline: 'none', 
                        width: '180px',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                    }} 
                />
                <button 
                    type="submit" 
                    style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: '#ccc', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        padding: '0'
                    }}
                >
                    <FaSearch />
                </button>
            </form>
        </div>

        {/* Language Switcher - Always Visible */}
        <div style={{ 
            display: 'flex', 
            gap: '15px', 
            alignItems: 'center',
            marginLeft: 'auto', // Push to right
            marginRight: '20px' // Space before Hamburger on mobile
        }}>
            <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '4px',
                borderRadius: '20px',
                display: 'flex',
                gap: '4px'
            }}>
                <button 
                    onClick={() => setLang('vi')}
                    style={{
                        background: lang === 'vi' ? 'var(--primary)' : 'transparent',
                        color: 'white',
                        border: 'none',
                        padding: '5px 12px',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: lang === 'vi' ? 'bold' : 'normal',
                        transition: 'all 0.3s'
                    }}
                >
                    VN
                </button>
                <button 
                    onClick={() => setLang('en')}
                    style={{
                        background: lang === 'en' ? 'var(--secondary)' : 'transparent',
                        color: 'white',
                        border: 'none',
                        padding: '5px 12px',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: lang === 'en' ? 'bold' : 'normal',
                        transition: 'all 0.3s'
                    }}
                >
                    EN
                </button>
            </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="mobile-toggle" style={{ zIndex: 1001, display: 'none' }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={28} color="white" /> : <FiMenu size={28} color="white" />}
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${isOpen ? 'open' : ''}`} style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <ul style={{ 
                display: 'flex', 
                gap: '25px', 
                listStyle: 'none', 
                margin: 0, 
                padding: 0,
                flexDirection: 'row'
            }}>
                {['home', 'skills', 'experience', 'awards', 'projects', 'contact'].map((item) => (
                    <li key={item}>
                        <button 
                            onClick={() => scrollToSection(item)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                fontWeight: 500,
                                opacity: 0.9,
                                transition: 'color 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseOut={(e) => e.target.style.color = 'white'}
                        >
                            {t.nav[item]}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
  );
};

export default Navbar;
