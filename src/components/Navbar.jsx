import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import confetti from 'canvas-confetti';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
      navigate(`/search?q=${encodeURIComponent(query)}`);
      e.target.reset();
      setIsOpen(false);
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
        <div className="navbar-logo-container">
            <div 
                className="logo rgb-text navbar-logo" 
                onClick={handleLogoClick}
            >
                HieuNguyen
            </div>

            {/* Google Search Bar */}
            <form onSubmit={handleSearch} className="navbar-search-form">
                <input 
                    name="search" 
                    placeholder="Search Google..." 
                    autoComplete="off"
                    className="navbar-search-input"
                />
                <button type="submit" className="navbar-search-btn">
                    <FaSearch />
                </button>
            </form>
        </div>

        {/* Theme & Language Switcher */}
        <div className="navbar-lang-container">
            <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                title="Toggle Dark/Light Mode"
            >
                {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            <div className="navbar-lang-switch">
                <button 
                    onClick={() => setLang('vi')}
                    className={`lang-btn vi ${lang === 'vi' ? 'active' : ''}`}
                >
                    VN
                </button>
                <button 
                    onClick={() => setLang('en')}
                    className={`lang-btn en ${lang === 'en' ? 'active' : ''}`}
                >
                    EN
                </button>
            </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={28} color="white" /> : <FiMenu size={28} color="white" />}
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
            <ul className="nav-menu">
                {['home', 'skills', 'experience', 'awards', 'projects', 'contact'].map((item) => (
                    <li key={item}>
                        <button 
                            onClick={() => scrollToSection(item)}
                            className="nav-item-btn"
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
