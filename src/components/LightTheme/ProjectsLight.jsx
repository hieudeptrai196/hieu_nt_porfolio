import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { content } from '../../data';
import { FaExternalLinkAlt, FaCode, FaBuilding, FaArrowRight, FaTimes } from 'react-icons/fa';

const ProjectsLight = () => {
  const { lang } = useLanguage();
  const t = content[lang].projects;
  const tCommon = content[lang].hero; // Using generic texts if needed
  
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (proj) => setSelectedProject(proj);
  const closeModal = () => setSelectedProject(null);

  return (
    <div id="light-projects" style={styles.container}>
      <div style={styles.wrapper}>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
        >
            <h2 style={styles.title}>{t.title}</h2>
            <div style={styles.underline}></div>
        </motion.div>

        {t.groups.map((group, gIndex) => (
            <div key={gIndex} style={{ marginBottom: '60px' }}>
                <div style={styles.companyHeader}>
                    <FaBuilding style={{ marginRight: '10px' }} /> {group.company}
                </div>
                
                <div style={styles.grid}>
                    {group.items.map((project, pIndex) => (
                        <motion.div 
                            key={pIndex}
                            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            style={styles.card}
                            onClick={() => openModal(project)}
                        >
                            <div style={styles.cardBody}>
                                <h3 style={styles.projTitle}>{project.title}</h3>
                                <p style={styles.projDesc}>{project.desc}</p>
                                
                                <div style={styles.techStack}>
                                    {project.tech.map((tech, i) => (
                                        <span key={i} style={styles.techTag}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={styles.cardFooter}>
                                <span style={styles.detailsComp}>{t.viewDetails} <FaArrowRight style={{ marginLeft: '5px', fontSize: '0.8rem' }} /></span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
             <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                style={styles.modalOverlay}
            >
                 <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    style={styles.modalCard}
                 >
                    <button onClick={closeModal} style={styles.closeBtn}><FaTimes /></button>
                    
                    <h2 style={{...styles.projTitle, fontSize: '1.8rem', marginBottom: '20px'}}>{selectedProject.title}</h2>
                    
                    <div style={styles.modalScroll}>
                        <p style={{...styles.projDesc, fontSize: '1.1rem', marginBottom: '20px'}}>
                            {selectedProject.desc}
                        </p>

                        <h4 style={styles.modalSectionTitle}>{t.detailTitle}</h4>
                        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                            {selectedProject.details.split('\n').map((line, idx) => (
                                line.trim() && <li key={idx} style={styles.projDesc}>{line.replace('-', '').trim()}</li>
                            ))}
                        </ul>

                        <h4 style={styles.modalSectionTitle}>Technologies used</h4>
                        <div style={styles.techStack}>
                             {selectedProject.tech.map((tech, i) => (
                                <span key={i} style={{...styles.techTag, background: '#0072ff', color: '#fff'}}>{tech}</span>
                             ))}
                        </div>
                    </div>
                 </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
    container: {
        background: '#fff',
        padding: '100px 5vw',
        position: 'relative',
    },
    wrapper: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        fontSize: '2.5rem',
        color: '#2d3436',
        marginBottom: '10px',
        fontWeight: '800'
    },
    underline: {
        width: '60px',
        height: '4px',
        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
        margin: '0 auto',
        borderRadius: '2px'
    },
    companyHeader: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#636e72',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        borderLeft: '5px solid #0072ff'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px'
    },
    card: {
        background: '#F8F9FA',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    cardBody: {
        padding: '25px',
        flex: 1
    },
    projTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#2d3436',
        marginTop: 0,
        marginBottom: '10px'
    },
    projDesc: {
        color: '#636e72',
        fontSize: '0.95rem',
        lineHeight: '1.6',
        marginBottom: '20px'
    },
    techStack: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
    },
    techTag: {
        background: '#fff',
        border: '1px solid #dfe6e9',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        color: '#2d3436',
        fontWeight: '500'
    },
    cardFooter: {
        padding: '15px 25px',
        background: '#fff',
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    detailsComp: {
        color: '#0072ff',
        fontWeight: '600',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center'
    },
    // Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(5px)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    modalCard: {
        background: '#fff',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '85vh',
        borderRadius: '20px',
        padding: '40px',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column'
    },
    closeBtn: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: '#f1f1f1',
        border: 'none',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1rem',
        color: '#2d3436'
    },
    modalScroll: {
        overflowY: 'auto',
        flex: 1,
        marginTop: '10px'
    },
    modalSectionTitle: {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: '#2d3436',
        marginTop: '30px',
        marginBottom: '15px',
        borderBottom: '2px solid #f1f1f1',
        paddingBottom: '5px'
    }
};

export default ProjectsLight;
