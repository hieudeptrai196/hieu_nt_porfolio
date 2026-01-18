import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../App';
import { FaTimes, FaPlusCircle } from 'react-icons/fa';

const baseSkillList = [
  // Original High Level Skills
  { name: 'PHP', level: 90, color: '#777BB4' },
  { name: 'Laravel', level: 85, color: '#FF2D20' },
  { name: 'MySQL', level: 85, color: '#00758F' },
  { name: 'Magento', level: 65, color: '#EE672F' },
  { name: 'Git', level: 85, color: '#F05032' },
  
  // Updated/New Skills at 50%
  { name: 'Node.js', level: 50, color: '#68A063' },
  { name: 'ReactJS', level: 50, color: '#61DAFB' },
  { name: 'VueJS', level: 50, color: '#4FC08D' },
  { name: 'Angular', level: 50, color: '#DD0031' },
  { name: 'HTML', level: 50, color: '#E34F26' },
  { name: 'CSS', level: 50, color: '#1572B6' },
  { name: 'Java', level: 50, color: '#007396' },
  { name: 'Python', level: 50, color: '#3776AB' },
];

const Skills = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  // Add the "More" item dynamically based on language
  const skillList = [
      ...baseSkillList,
      { name: t.skills.more, level: 100, color: '#FFD700', isSpecial: true }
  ];

  // Duplicate list to create seamless loop
  const duplicatedSkills = [...skillList, ...skillList];

  return (
    <section id="skills" className="container" style={{ padding: '4rem 20px', overflow: 'hidden' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="section-title gradient-text"
      >
        {t.skills.title}
      </motion.h2>

      <div className="marquee-container" style={{ marginBottom: '2rem' }}>
        <div className="marquee-content">
          {duplicatedSkills.map((skill, index) => (
            <div key={index} className="skill-card-compact">
              <div 
                className="skill-icon"
                style={{ 
                    backgroundColor: `${skill.color}20`, 
                    color: skill.color, 
                    border: `1px solid ${skill.color}`,
                    width: '50px',
                    height: '50px',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
              >
                {skill.isSpecial ? <FaPlusCircle /> : skill.name.substring(0, 2)}
              </div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center' }}>{skill.name}</h3>
              
              {/* Simple progress bar for compact view (hide for special item) */}
              {!skill.isSpecial && (
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '5px' }}>
                    <div style={{ width: `${skill.level}%`, height: '100%', background: skill.color, borderRadius: '2px' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            className="glow-btn"
            onClick={() => setShowAll(true)}
            style={{ fontSize: '0.9rem', padding: '10px 24px' }}
          >
              {t.skills.viewAll}
          </button>
      </div>

      <AnimatePresence>
        {showAll && (
            <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAll(false)}
            >
                <motion.div 
                    className="glass-card"
                    style={{ 
                        position: 'relative', 
                        width: '90%', 
                        maxWidth: '900px', 
                        maxHeight: '80vh', 
                        overflowY: 'auto',
                        padding: '3rem',
                        background: '#1a1a2e',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '20px'
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={() => setShowAll(false)} style={{ top: '20px', right: '20px' }}>
                        <FaTimes />
                    </button>
                    
                    <h2 className="gradient-text" style={{ textAlign: 'center', marginBottom: '2rem' }}>{t.skills.title}</h2>

                    <div className="skills-grid">
                        {skillList.map((skill, index) => (
                        <div 
                            key={index}
                            className="glass-card skill-card"
                            style={skill.isSpecial ? { border: '1px dashed #FFD700' } : {}}
                        >
                            <div 
                            className="skill-icon"
                            style={{ 
                                backgroundColor: `${skill.color}20`, 
                                color: skill.color, 
                                border: `1px solid ${skill.color}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            >
                             {skill.isSpecial ? <FaPlusCircle /> : skill.name.substring(0, 2)}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textAlign: 'center' }}>{skill.name}</h3>
                            {!skill.isSpecial && (
                                <div className="progress-bar">
                                    <div 
                                        style={{ width: `${skill.level}%`, height: '100%', backgroundColor: skill.color }}
                                    />
                                </div>
                            )}
                        </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
