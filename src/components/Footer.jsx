import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ 
        marginTop: '80px', 
        padding: '40px 20px', 
        borderTop: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
    }}>
      <div className="container">
        
        {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <a href="#" className="social-icon" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', transition: 'color 0.3s' }}><FaGithub /></a>
            <a href="#" className="social-icon" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', transition: 'color 0.3s' }}><FaLinkedin /></a>
            <a href="#" className="social-icon" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', transition: 'color 0.3s' }}><FaFacebook /></a>
            <a href="#" className="social-icon" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', transition: 'color 0.3s' }}><FaTwitter /></a>
        </div> */}

        <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>
            &copy; {new Date().getFullYear()} <span className="gradient-text">HieuNguyen</span>. All rights reserved.
        </p>
        


      </div>
    </footer>
  );
};

export default Footer;
