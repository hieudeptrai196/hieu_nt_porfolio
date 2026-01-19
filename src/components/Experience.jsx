import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="container" style={{ padding: '4rem 20px' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="section-title gradient-text"
      >
        {t.experience.title}
      </motion.h2>

      <div className="timeline">
        {t.experience.items.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="timeline-item"
          >
            <div className="timeline-dot"></div>
            <span className="timeline-date">{exp.period}</span>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{exp.role}</h3>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {exp.link ? (
                <a 
                  href={exp.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  {exp.company}
                </a>
              ) : (
                exp.company
              )}
            </h4>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
