import { motion } from 'framer-motion';
import { FaGithub, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="hero-section">
      <div className="background-animation"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h2 className="hero-subtitle">{t.hero.greeting}</h2>
        <h1 className="hero-title">
          <span className="gradient-text">Nguyễn Thọ Hiếu</span>
        </h1>
        <p className="hero-description">
          {t.hero.role}
        </p>
        
        <motion.p 
          className="hero-about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ maxWidth: '800px', margin: '20px auto', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}
        >
          {t.hero.about}
        </motion.p>

        <div className="social-links">
            <a href="mailto:hieulatoi1962@gmail.com" className="glass-card social-icon">
                <FaEnvelope color="#EA4335" />
            </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
