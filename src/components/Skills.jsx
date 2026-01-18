import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../App';
import { FaTimes, FaPlusCircle, FaPhp, FaLaravel, FaNodeJs, FaReact, FaVuejs, FaPython, FaJava, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiMysql, SiRedis, SiPostman } from 'react-icons/si';

const baseSkillList = [
  // Original High Level Skills
  { name: 'PHP', level: 90, color: '#777BB4', icon: <FaPhp /> },
  { name: 'Laravel', level: 85, color: '#FF2D20', icon: <FaLaravel /> },
  { name: 'MySQL', level: 85, color: '#00758F', icon: <SiMysql /> },
  { name: 'Redis', level: 60, color: '#DC382D', icon: <SiRedis /> },
  { name: 'Git', level: 85, color: '#F05032', icon: <FaGitAlt /> },
  
  // Updated/New Skills at 50%
  { name: 'Node.js', level: 60, color: '#68A063', icon: <FaNodeJs /> },
  { name: 'ReactJS', level: 60, color: '#61DAFB', icon: <FaReact /> },
  { name: 'VueJS', level: 60, color: '#4FC08D', icon: <FaVuejs /> },
  { name: 'HTML', level: 90, color: '#E34F26', icon: <span style={{fontWeight:'bold'}}>HTML</span> },
  { name: 'CSS', level: 85, color: '#1572B6', icon: <span style={{fontWeight:'bold'}}>CSS</span> },
  { name: 'Java', level: 65, color: '#007396', icon: <FaJava /> },
  { name: 'Python', level: 60, color: '#3776AB', icon: <FaPython /> },
  { name: 'Docker', level: 55, color: '#2496ED', icon: <FaDocker /> },
];

const Skills = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  // Add the "More" item dynamically based on language
  const skillList = [
      ...baseSkillList,
      { 
          name: t.skills.more, 
          level: 100, 
          color: '#FFD700', 
          icon: <FaPlusCircle />, 
          isSpecial: true 
      }
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
                    width: '60px',
                    height: '60px',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
              >
                {skill.icon || skill.name.substring(0, 2)}
              </div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center' }}>{skill.name}</h3>
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
                                justifyContent: 'center',
                                fontSize: '2rem'
                            }}
                            >
                             {skill.icon || skill.name.substring(0, 2)}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textAlign: 'center' }}>{skill.name}</h3>
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
