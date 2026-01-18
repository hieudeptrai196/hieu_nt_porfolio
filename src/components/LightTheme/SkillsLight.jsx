import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaTimes, FaPlusCircle, FaPhp, FaLaravel, FaNodeJs, FaReact, FaVuejs, FaPython, FaJava, FaDocker, FaGitAlt, FaAngular } from 'react-icons/fa';
import { SiMysql, SiRedis, SiVercel } from 'react-icons/si';

const baseSkillList = [
  { name: 'PHP', level: 90, color: '#777BB4', icon: <FaPhp />, link: 'https://www.php.net/' },
  { name: 'Laravel', level: 85, color: '#FF2D20', icon: <FaLaravel />, link: 'https://laravel.com/' },
  { name: 'MySQL', level: 85, color: '#00758F', icon: <SiMysql />, link: 'https://www.mysql.com/' },
  { name: 'Redis', level: 60, color: '#DC382D', icon: <SiRedis />, link: 'https://redis.io/' },
  { name: 'Git', level: 85, color: '#F05032', icon: <FaGitAlt />, link: 'https://git-scm.com/' },
  { name: 'Node.js', level: 60, color: '#68A063', icon: <FaNodeJs />, link: 'https://nodejs.org/' },
  { name: 'ReactJS', level: 60, color: '#61DAFB', icon: <FaReact />, link: 'https://react.dev/' },
  { name: 'VueJS', level: 60, color: '#4FC08D', icon: <FaVuejs />, link: 'https://vuejs.org/' },
  { name: 'Angular', level: 60, color: '#DD0031', icon: <FaAngular />, link: 'https://angular.io/' },
  { name: 'HTML', level: 90, color: '#E34F26', icon: <span style={{fontWeight:'bold'}}>HTML</span>, link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', level: 85, color: '#1572B6', icon: <span style={{fontWeight:'bold'}}>CSS</span>, link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'Java', level: 65, color: '#007396', icon: <FaJava />, link: 'https://www.java.com/' },
  { name: 'Python', level: 60, color: '#3776AB', icon: <FaPython />, link: 'https://www.python.org/' },
  { name: 'Docker', level: 55, color: '#2496ED', icon: <FaDocker />, link: 'https://www.docker.com/' },
  { name: 'Vercel', level: 70, color: '#000000', icon: <SiVercel />, link: 'https://vercel.com/' },
  { name: 'GMO API', level: 75, color: '#005BAA', icon: <span style={{fontWeight:'900', fontFamily:'sans-serif', fontSize: '1.5rem'}}>GMO</span>, link: 'https://www.gmo.jp/' },
];

const SkillsLight = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const displayedSkills = showAll ? baseSkillList : baseSkillList.slice(0, 10);

  return (
    <div id="light-skills" style={styles.container}>
      <div style={styles.wrapper}>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
        >
            <h2 style={styles.title}>{t.skills.title}</h2>
            <div style={styles.underline}></div>
        </motion.div>

        <div style={styles.grid}>
            {displayedSkills.map((skill, index) => (
                <motion.div 
                    key={index}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    style={styles.card}
                >
                    <a href={skill.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        <div style={{...styles.iconBox, color: skill.color, background: `${skill.color}10`}}>
                            {skill.icon}
                        </div>
                        <h3 style={styles.skillName}>{skill.name}</h3>
                        <div style={styles.progressBarBg}>
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                style={{
                                    ...styles.progressBarFill, 
                                    background: skill.color
                                }} 
                            />
                        </div>
                    </a>
                </motion.div>
            ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button onClick={() => setShowAll(!showAll)} style={styles.viewMoreBtn}>
                {showAll ? 'Show Less' : t.skills.viewAll}
            </button>
        </div>
      </div>
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
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '30px',
    },
    card: {
        background: '#fff',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid #f1f1f1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    iconBox: {
        fontSize: '3rem',
        marginBottom: '15px',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    skillName: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: '10px'
    },
    progressBarBg: {
        width: '100%',
        height: '6px',
        background: '#eee',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%',
        borderRadius: '3px'
    },
    viewMoreBtn: {
        background: 'transparent',
        border: '2px solid #0072ff',
        color: '#0072ff',
        padding: '12px 30px',
        borderRadius: '30px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
    }
};

export default SkillsLight;
