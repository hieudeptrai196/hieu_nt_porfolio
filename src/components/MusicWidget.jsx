import { useState, useEffect, useRef } from 'react';
import { FaMusic, FaTimes, FaPlay, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './MusicWidget.css';

// Move helper components outside to avoid "created during render" error
const WaveRipple = () => (
    <div className="wave-ripple-container">
        <motion.div
            initial={{ scale: 0.9, opacity: 0.4 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
            className="wave-ripple-circle wave-ripple-circle-1"
        />
        <motion.div
            initial={{ scale: 0.9, opacity: 0.3 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: [0.4, 0, 0.2, 1], delay: 1.25 }}
            className="wave-ripple-circle wave-ripple-circle-2"
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
      <div className="music-widget-container">
          {/* Tooltip on Hover if Playing */}
          {videoSrc && (
              <div className={`music-tooltip ${isHovered ? 'visible' : ''}`}>
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
            className={`music-trigger-btn glass-card ${videoSrc ? 'active' : 'inactive'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {videoSrc && <WaveRipple />}
            <FaMusic size={20} className="music-icon" />
        </motion.button>
      </div>

      {/* Modal Container */}
      <div className={`music-modal-overlay ${isOpen ? 'open' : ''}`}>
          <div className="music-modal-backdrop" onClick={() => setIsOpen(false)} />

          <div className="music-modal-card glass-card">
              <button 
                  onClick={() => setIsOpen(false)}
                  className="music-close-btn"
              >
                  <FaTimes />
              </button>

              <h3 className="gradient-text music-modal-title">
                  <FaYoutube color="#FF0000" /> {content.title}
              </h3>

              <div className="music-input-group">
                  <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={content.placeholder}
                      className="glass-input music-url-input"
                  />
                  <button 
                      onClick={handlePlay}
                      className="glow-btn music-play-btn"
                  >
                      <FaPlay size={14} />
                  </button>
              </div>

              {!videoSrc && (
                  <div className="music-guide">
                      <strong>{content.guideTitle}</strong>
                      <p>{content.guide1}</p>
                      <p>{content.guide2}</p>
                      <p>{content.guide3}</p>
                  </div>
              )}

              {videoSrc && (
                  <div className="music-video-wrapper">
                      <iframe 
                          src={videoSrc}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="music-video-iframe"
                      ></iframe>
                  </div>
              )}
          </div>
      </div>
    </>
  );
};

export default MusicWidget;
