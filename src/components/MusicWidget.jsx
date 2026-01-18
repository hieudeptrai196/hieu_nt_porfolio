import { useState, useEffect, useRef } from 'react';
import { FaMusic, FaTimes, FaPlay, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../App';

// Move helper components outside to avoid "created during render" error
const WaveRipple = () => (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'visible' }}>
        <motion.div
            initial={{ scale: 0.9, opacity: 0.4 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid rgba(244, 114, 182, 0.4)'
            }}
        />
        <motion.div
            initial={{ scale: 0.9, opacity: 0.3 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: [0.4, 0, 0.2, 1], delay: 1.25 }}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid rgba(244, 114, 182, 0.3)'
            }}
        />
    </div>
);

const MusicWidget = ({ onPlayStateChange }) => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef(null);

  const t = {
    en: {
        title: "Background Music",
        placeholder: "Paste YouTube Link here...",
        play: "Play Music",
        guideTitle: "How to use:",
        guide1: "1. Copy a link from YouTube (e.g. Lofi beats).",
        guide2: "2. Paste it above and hit Play.",
        guide3: "3. Enjoy the vibes while browsing!",
        error: "Invalid YouTube Link"
    },
    vi: {
        title: "Nhạc Nền",
        placeholder: "Dán link YouTube vào đây...",
        play: "Phát Nhạc",
        guideTitle: "Hướng dẫn:",
        guide1: "1. Copy link video từ YouTube (ví dụ: nhạc Lofi).",
        guide2: "2. Dán vào ô trên và ấn Phát Nhạc.",
        guide3: "3. Tận hưởng nhạc nền khi lướt web!",
        error: "Link YouTube không hợp lệ"
    }
  };

  const content = t[lang];

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  const getYoutubeId = (link) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlay = async () => {
    const videoId = getYoutubeId(url);
    if (videoId) {
        const newSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1`;
        setVideoSrc(newSrc);
        onPlayStateChange(true);
        
        try {
            const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
            const data = await response.json();
            setVideoTitle(data.title || "Unknown Track");
        } catch {
            setVideoTitle("Music Playing...");
        }
    } else {
        alert(content.error);
    }
  };

  // Attach API listener
  useEffect(() => {
    let interval;
    if (videoSrc) {
        interval = setInterval(() => {
            if (window.YT && window.YT.Player) {
                const iframes = document.getElementsByTagName('iframe');
                for (let iframe of iframes) {
                    if (iframe.src.includes(videoSrc) && !playerRef.current) {
                        playerRef.current = new window.YT.Player(iframe, {
                            events: {
                                'onStateChange': (event) => {
                                    if (event.data === window.YT.PlayerState.ENDED) {
                                        onPlayStateChange(false);
                                        setVideoSrc('');
                                        setVideoTitle('');
                                        playerRef.current = null;
                                    }
                                }
                            }
                        });
                        clearInterval(interval);
                    }
                }
            }
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [videoSrc, onPlayStateChange]);

  return (
    <>
      <div style={{ position: 'fixed', left: '20px', top: '100px', zIndex: 45 }}>
          {/* Tooltip on Hover if Playing */}
          {videoSrc && (
              <div 
                  style={{
                      position: 'absolute',
                      left: '60px',
                      top: '10px',
                      background: 'rgba(0,0,0,0.85)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      maxWidth: '250px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
              >
                  {videoTitle || "Playing Music 🎵"}
              </div>
          )}

          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="glass-card"
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: videoSrc ? '1px solid #F472B6' : '1px solid rgba(255, 255, 255, 0.1)',
                background: videoSrc ? 'rgba(244, 114, 182, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(10px)',
                color: '#F472B6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: videoSrc ? '0 0 20px rgba(244, 114, 182, 0.4)' : '0 4px 15px rgba(0,0,0,0.3)',
                overflow: 'visible'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {videoSrc && <WaveRipple />}
            <FaMusic size={20} style={{ position: 'relative', zIndex: 1 }} />
        </motion.button>
      </div>

      {/* Modal Container */}
      <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isOpen ? 'rgba(0,0,0,0.6)' : 'transparent',
          backdropFilter: isOpen ? 'blur(5px)' : 'none',
          pointerEvents: isOpen ? 'auto' : 'none',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.3s ease',
          visibility: isOpen ? 'visible' : 'hidden'
      }}>
          <div style={{ position: 'absolute', inset: 0 }} onClick={() => setIsOpen(false)} />

          <div
              className="glass-card"
              style={{
                  padding: '30px',
                  borderRadius: '20px',
                  background: 'rgba(20, 20, 35, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  position: 'relative',
                  width: '90%',
                  maxWidth: '450px',
                  transform: isOpen ? 'scale(1)' : 'scale(0.8)',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
          >
              <button 
                  onClick={() => setIsOpen(false)}
                  style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'transparent',
                      border: 'none',
                      color: '#888',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                  }}
              >
                  <FaTimes />
              </button>

              <h3 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaYoutube color="#FF0000" /> {content.title}
              </h3>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={content.placeholder}
                      className="glass-input"
                      style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '10px', 
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'white',
                          outline: 'none'
                        }}
                  />
                  <button 
                      onClick={handlePlay}
                      className="glow-btn"
                      style={{ padding: '0 20px' }}
                  >
                      <FaPlay size={14} />
                  </button>
              </div>

              {!videoSrc && (
                  <div style={{ 
                      background: 'rgba(255,255,255,0.05)', 
                      padding: '15px', 
                      borderRadius: '10px', 
                      fontSize: '0.9rem', 
                      color: '#aaa',
                      lineHeight: '1.6'
                  }}>
                      <strong style={{ color: 'white', display: 'block', marginBottom: '5px' }}>{content.guideTitle}</strong>
                      <p style={{ margin: 0 }}>{content.guide1}</p>
                      <p style={{ margin: 0 }}>{content.guide2}</p>
                      <p style={{ margin: 0 }}>{content.guide3}</p>
                  </div>
              )}

              {videoSrc && (
                  <div style={{ 
                      position: 'relative', 
                      paddingBottom: '56.25%', 
                      height: 0, 
                      borderRadius: '15px', 
                      overflow: 'hidden',
                      marginTop: '20px'
                  }}>
                      <iframe 
                          src={videoSrc}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%'
                          }}
                      ></iframe>
                  </div>
              )}
          </div>
      </div>
    </>
  );
};

export default MusicWidget;
