import { useState } from 'react';
import { FaTimes, FaExchangeAlt, FaCopy, FaLanguage } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TranslateWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'ru', name: 'Russian' }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=vi|${targetLang}`);
      const data = await response.json();
      if (data.responseData) {
        setTranslatedText(data.responseData.translatedText);
      }
    } catch (error) {
      console.error('Translation failed', error);
      setTranslatedText('Error: Could not translate.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="glass-card"
        style={{
           position: 'fixed',
           left: '20px',
           top: '100px',
           zIndex: 45,
           width: '50px',
           height: '50px',
           borderRadius: '50%',
           border: '1px solid rgba(255, 255, 255, 0.1)',
           background: 'rgba(15, 23, 42, 0.6)',
           backdropFilter: 'blur(10px)',
           color: 'white',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           cursor: 'pointer',
           boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
        whileHover={{ scale: 1.1, backgroundColor: 'var(--primary)' }}
        whileTap={{ scale: 0.9 }}
      >
        <FaLanguage size={24} />
      </motion.button>

      {/* Modal */}
      {isOpen && (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            padding: '20px'
        }}>
           <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={{
                width: '100%',
                maxWidth: '600px',
                background: '#1a1a2e',
                borderRadius: '20px',
                padding: '30px',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
           >
                <button 
                    onClick={() => setIsOpen(false)}
                    style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                    <FaTimes />
                </button>

                <h3 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', color: 'white' }}>
                    <FaLanguage color="var(--primary)" /> Quick Translate
                </h3>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
                    <span style={{ color: '#ccc', fontWeight: 'bold' }}>Vietnamese</span>
                    <FaExchangeAlt color="#666" />
                    <select 
                        value={targetLang} 
                        onChange={(e) => setTargetLang(e.target.value)}
                        style={{
                            padding: '8px 15px',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code} style={{color: 'black'}}>{lang.name}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="translate-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Nhập nội dung tiếng Việt..."
                            style={{
                                width: '100%',
                                height: '150px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '15px',
                                padding: '15px',
                                color: 'white',
                                resize: 'none',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
                         <textarea
                            readOnly
                            value={translatedText}
                            placeholder="Translation..."
                            style={{
                                width: '100%',
                                height: '150px',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '15px',
                                padding: '15px',
                                color: 'var(--accent)',
                                resize: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}
                        />
                        {translatedText && (
                            <button 
                                onClick={() => copyToClipboard(translatedText)}
                                style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'transpaent', border: 'none', color: '#888', cursor: 'pointer' }}
                                title="Copy"
                            >
                                <FaCopy />
                            </button>
                        )}
                    </div>
                </div>

                <button 
                    onClick={handleTranslate}
                    disabled={isLoading}
                    className="glow-btn"
                    style={{ marginTop: '20px', width: '100%', opacity: isLoading ? 0.7 : 1 }}
                >
                    {isLoading ? 'Translating...' : 'Translate Now'}
                </button>

           </motion.div>
        </div>
      )}
    </>
  );
};

export default TranslateWidget;
