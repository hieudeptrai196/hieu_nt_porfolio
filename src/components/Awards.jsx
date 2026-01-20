import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaTrophy, FaMedal, FaTimes } from 'react-icons/fa';

const Awards = () => {
  const { t } = useLanguage();
  const [selectedAward, setSelectedAward] = useState(null);

  return (
    <section id="awards" className="container" style={{ padding: '4rem 20px' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="section-title gradient-text"
      >
        {t.awards.title}
      </motion.h2>

      <div className="awards-grid">
        {t.awards.items.map((award, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="award-card"
            onClick={() => setSelectedAward(award)}
            layoutId={`award-card-${index}`} // For shared layout animation
          >
            {/* Header: Icon + Date */}
            <div className="award-header">
                 <div className="award-icon-wrapper">
                    {index === 0 ? <FaTrophy /> : <FaMedal />}
                </div>
                <span className="award-date-badge">
                    {award.date}
                </span>
            </div>

            {/* Image (if exists) */}
            {award.image && (
                <div className="award-image-wrapper">
                    <motion.img 
                        layoutId={`award-img-${index}`}
                        src={award.image} 
                        alt={award.title}
                        className="award-image"
                    />
                </div>
            )}
            
            {/* Context */}
            <div className="award-details">
                <h3>{award.title}</h3>
                <h4>{award.issuer}</h4>
                <p>{award.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Details */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="award-modal-overlay"
            onClick={() => setSelectedAward(null)}
          >
            <motion.div
              layoutId={`award-card-${t.awards.items.indexOf(selectedAward)}`}
              className="award-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="award-modal-close" onClick={() => setSelectedAward(null)}>
                <FaTimes />
              </button>

              {selectedAward.image && (
                <div className="award-modal-image-container">
                  <motion.img
                    layoutId={`award-img-${t.awards.items.indexOf(selectedAward)}`}
                    src={selectedAward.image}
                    alt={selectedAward.title}
                    className="award-modal-image"
                  />
                </div>
              )}

              <div className="award-modal-details">
                <h3 className="award-modal-title">{selectedAward.title}</h3>
                
                <div className="award-modal-meta">
                   {/* Re-using badge style or similar logic if needed, but simple text is fine here */}
                   <span className="award-date-badge">{selectedAward.date}</span>
                   <span className="award-modal-issuer">{selectedAward.issuer}</span>
                </div>
                
                <p className="award-modal-desc">{selectedAward.desc}</p>
                {/* Could add more details if data.js supported it, like skills, link, etc. */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Awards;
