import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { lang } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const t = {
    en: {
        title: "Get In Touch",
        subtitle: "Let’s Collaborate",
        desc: "", // Removed text
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        address: "Hanoi, Vietnam"
    },
    vi: {
        title: "Liên Hệ",
        subtitle: "Hãy liên hệ tôi ngay nhé",
        desc: "", // Removed text
        name: "Tên của bạn",
        email: "Email liên hệ",
        subject: "Tiêu đề",
        message: "Nội dung tin nhắn",
        send: "Gửi Tin Nhắn",
        address: "Hà Nội, Việt Nam"
    }
  };

  const content = t[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:hieulatoi1962@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <h2 className="section-title" data-text={content.title}>{content.title}</h2>
      
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* Contact Info */}
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '30px' }}
        >
            <h3 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{content.subtitle}</h3>
            <p style={{ color: '#ccc', marginBottom: '30px', lineHeight: '1.6' }}>
                {content.desc}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white' }}>
                    <div className="icon-box" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                        <FaEnvelope />
                    </div>
                    <span>hieulatoi1962@gmail.com</span>
                </div>

                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white' }}>
                    <div className="icon-box" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                        <FaMapMarkerAlt />
                    </div>
                    <span>{content.address}</span>
                </div>
            </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card" 
            style={{ padding: '30px' }}
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <input name="name" onChange={handleChange} required type="text" placeholder={content.name} className="glass-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} />
                    <input name="email" onChange={handleChange} required type="email" placeholder={content.email} className="glass-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} />
                </div>
                <input name="subject" onChange={handleChange} required type="text" placeholder={content.subject} className="glass-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} />
                <textarea name="message" onChange={handleChange} required placeholder={content.message} rows="5" className="glass-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', resize: 'none' }}></textarea>
                
                <button type="submit" className="glow-btn" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {content.send} <FaPaperPlane />
                </button>
            </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
