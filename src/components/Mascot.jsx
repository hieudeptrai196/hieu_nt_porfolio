import { motion } from 'framer-motion';
import { FaUserAstronaut } from 'react-icons/fa';

const Mascot = () => {
  return (
    <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
        }}
        transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        style={{
            position: 'fixed',
            bottom: '100px',
            left: '30px',
            zIndex: 50,
            cursor: 'grab',
            fontSize: '3rem',
            color: 'white',
            filter: 'drop-shadow(0 0 10px #00ccff)'
        }}
        whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.8 } }}
        whileTap={{ scale: 0.9, cursor: 'grabbing' }}
    >
        <FaUserAstronaut />
    </motion.div>
  );
};

export default Mascot;
