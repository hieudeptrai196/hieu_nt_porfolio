import { motion } from 'framer-motion';
import { useLanguage } from '../App';

const Projects = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="container" style={{ padding: '4rem 20px' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="section-title gradient-text"
      >
        {t.projects.title}
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {t.projects.groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              style={{ 
                fontSize: '2rem', 
                marginBottom: '2rem', 
                color: 'white', 
                borderLeft: '4px solid var(--primary)', 
                paddingLeft: '1rem' 
              }}
            >
              {group.company}
            </motion.h3>

            <div className="projects-grid">
              {group.items.map((project, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card project-card"
                >
                  <div style={{ flex: 1 }}>
                    <h3 className="project-title">{project.title}</h3>
                    <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '1rem' }}>{project.desc}</p>
                  </div>
                  
                  <div className="project-tech">
                    {project.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
