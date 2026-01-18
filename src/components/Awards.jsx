import { motion } from 'framer-motion';
import { useLanguage } from '../App';
import { FaTrophy, FaMedal } from 'react-icons/fa';

const Awards = () => {
  const { t } = useLanguage();

  return (
    <section id="awards" className="container" style={{ padding: '4rem 20px' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="section-title gradient-text"
      >
        {t.awards.title}
      </motion.h2>

      <div className="awards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {t.awards.items.map((award, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="glass-card"
            style={{ 
                padding: '2rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                border: '1px solid rgba(255, 215, 0, 0.2)', // Golden border
                background: 'linear-gradient(145deg, rgba(255,215,0,0.05) 0%, rgba(0,0,0,0) 100%)'
            }}
          >
            <div style={{ 
                fontSize: '2.5rem', 
                color: '#FFD700', 
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' 
            }}>
                {index === 0 ? <FaTrophy /> : <FaMedal />}
            </div>
            
            <div>
                <span style={{ color: '#FFD700', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>{award.date}</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>{award.title}</h3>
                <h4 style={{ color: '#ccc', marginBottom: '0.5rem' }}>{award.issuer}</h4>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{award.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
