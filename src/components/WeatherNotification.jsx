
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaSmog, FaTimes, FaQuoteLeft, FaClock } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const defaultLocation = { lat: 21.0285, lon: 105.8542, name: 'Hanoi' };

import { quotesData } from './quotesData';

const WeatherNotification = () => {
  const [weather, setWeather] = useState(null);
  const [quote] = useState(() => quotesData[Math.floor(Math.random() * quotesData.length)]);
  const [showWeather, setShowWeather] = useState(true);
  const [showClock, setShowClock] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const { lang } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchWeather = async (lat, lon, locationName) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await response.json();
        
        if (data.current_weather) {
          setWeather({
            temp: data.current_weather.temperature,
            code: data.current_weather.weathercode,
            location: locationName
          });
        }
      } catch (error) {
        console.error("Weather fetch failed", error);
      }
    };

    // Always use Default Location (Hanoi)
    fetchWeather(
        defaultLocation.lat, 
        defaultLocation.lon, 
        lang === 'vi' ? 'Hà Nội' : 'Hanoi'
    );
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
        // Close widgets immediately on scroll
        if (window.scrollY > 10) {
            setShowWeather(false);
            setShowClock(false);
            setShowQuote(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
        clearInterval(timer);
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formatDate = (date) => {
    if (lang === 'vi') {
      return `Thứ ${date.getDay() + 1 === 1 ? 'CN' : date.getDay() + 1}, ${date.getDate()} Th${date.getMonth() + 1} ${date.getFullYear()}`;
    }
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  // Map WMO codes to Icons, Text, and Advice
  const getWeatherInfo = (code) => {
    // 0: Clear sky
    if (code === 0) return { 
        icon: <FaSun color="#FDB813" />, 
        text: lang === 'vi' ? 'Trời quang' : 'Clear Sky',
        advice: lang === 'vi' ? 'Trời đẹp, ra ngoài chạm cỏ đi! 🌱' : 'Go touch some grass! 🌱'
    };
    // 1, 2, 3: Cloudy
    if ([1, 2, 3].includes(code)) return { 
        icon: <FaCloud color="#A4B0BE" />, 
        text: lang === 'vi' ? 'Có mây' : 'Cloudy',
        advice: lang === 'vi' ? 'Thời tiết mát mẻ, đi ngủ đi 😴' : 'Go to sleep 😴'
    };
    // 45, 48: Fog
    if ([45, 48].includes(code)) return { 
        icon: <FaSmog color="#747D8C" />, 
        text: lang === 'vi' ? 'Sương mù' : 'Foggy',
        advice: lang === 'vi' ? 'Lái xe cẩn thận, tầm nhìn hạn chế 🚗' : 'Drive carefully, low visibility 🚗'
    };
    // Rain: 51-67, 80-82
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { 
        icon: <FaCloudRain color="#3498DB" />, 
        text: lang === 'vi' ? 'Mưa' : 'Raining',
        advice: lang === 'vi' ? 'Nhớ mang theo ô hoặc áo mưa nhé! ☔' : 'Don\'t forget your umbrella! ☔'
    };
    // Snow: 71-77, 85-86
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { 
        icon: <FaSnowflake color="#00D2D3" />, 
        text: lang === 'vi' ? 'Tuyết' : 'Snow',
        advice: lang === 'vi' ? 'Trời lạnh lắm, nhớ mặc ấm vào đó! 🧣' : 'Remember to stay warm! 🧣'
    };
    // Thunderstorm: 95-99
    if (code >= 95) return { 
        icon: <FaBolt color="#F9CA24" />, 
        text: lang === 'vi' ? 'Giông bão' : 'Thunderstorm',
        advice: lang === 'vi' ? 'Nguy hiểm, nên ở trong nhà! ⚡' : 'Stay safe indoors! ⚡'
    };

    return { 
        icon: <FaSun />, 
        text: '---',
        advice: lang === 'vi' ? 'Chúc một ngày tốt lành!' : 'Have a nice day!'
    };
  };

  const info = weather ? getWeatherInfo(weather.code) : null;

  return (
    <div style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'flex-end',
        pointerEvents: 'none'
    }}>
      
      {/* Weather Widget */}
      {weather && (
        <motion.div
            initial={{ width: '280px', opacity: 0 }}
            animate={{ 
                width: showWeather ? '280px' : '50px',
                height: showWeather ? 'auto' : '50px',
                opacity: 1, 
                borderRadius: showWeather ? '15px' : '50%',
                backgroundColor: showWeather ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0.6)'
            }}
            transition={{ duration: 0 }}
            className="glass-card"
            style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden', // Critical for hiding content without squashing
                position: 'relative',
                pointerEvents: 'auto',
                cursor: showWeather ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={() => !showWeather && setShowWeather(true)}
        >
            {showWeather ? (
                <div style={{ padding: '20px', width: '280px', minWidth: '280px' }}>
                    <button 
                    onClick={(e) => { e.stopPropagation(); setShowWeather(false); }}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        color: '#aaa',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        zIndex: 2
                    }}
                    >
                    <FaTimes />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ fontSize: '3rem' }}>
                        {info.icon}
                        </div>
                        
                        <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '1px' }}>{weather.location}</h4>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                            {Math.round(weather.temp)}°
                            </span>
                            <span style={{ fontSize: '1rem', color: '#ccc' }}>
                            {info.text}
                            </span>
                        </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '10px' }}>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#eee', fontStyle: 'italic' }}>
                            "{info.advice}"
                        </p>
                    </div>
                </div>
            ) : (
                <div style={{ fontSize: '1.5rem', color: '#FDB813' }}>
                    {info.icon}
                </div>
            )}
        </motion.div>
      )}

      {/* Digital Clock Widget */}
      <motion.div
            initial={{ width: '280px', opacity: 0 }}
            animate={{ 
                width: showClock ? '280px' : '50px',
                height: showClock ? 'auto' : '50px',
                opacity: 1,
                borderRadius: showClock ? '15px' : '50%',
                backgroundColor: showClock ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0.6)'
            }}
            transition={{ duration: 0 }}
            className="glass-card"
            style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                pointerEvents: 'auto',
                cursor: showClock ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={() => !showClock && setShowClock(true)}
      >
          {showClock ? (
            <div style={{ padding: '15px 25px', width: '280px', minWidth: '280px', textAlign: 'center' }}>
                 <button 
                    onClick={(e) => { e.stopPropagation(); setShowClock(false); }}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '8px',
                        background: 'transparent',
                        border: 'none',
                        color: '#aaa',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        zIndex: 2
                    }}
                    >
                    <FaTimes />
                </button>

                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00C6FF', fontFamily: 'monospace', lineHeight: 1 }}>
                    {formatTime(currentTime)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'capitalize', marginTop: '5px' }}>
                    {formatDate(currentTime)}
                </div>
                
                {/* Mini Calendar */}
                {(() => {
                    const year = currentTime.getFullYear();
                    const month = currentTime.getMonth();
                    const today = currentTime.getDate();
                    const totalDays = new Date(year, month + 1, 0).getDate();
                    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday

                    const weekDaysVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
                    const weekDaysEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                    const currentWeekDays = lang === 'vi' ? weekDaysVi : weekDaysEn;
                    
                    const days = [];
                    // Empty slots
                    for (let i = 0; i < firstDay; i++) {
                        days.push(<div key={`empty-${i}`} />);
                    }
                    // Days
                    for (let i = 1; i <= totalDays; i++) {
                        const isToday = i === today;
                        days.push(
                            <div key={i} style={{ 
                                width: '24px', 
                                height: '24px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                background: isToday ? '#00C6FF' : 'transparent',
                                color: isToday ? '#000' : '#ccc',
                                borderRadius: '50%',
                                fontSize: '0.75rem',
                                fontWeight: isToday ? 'bold' : 'normal',
                                margin: '0 auto',
                                cursor: 'default'
                            }}>
                                {i}
                            </div>
                        );
                    }

                    return (
                        <div style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '5px' }}>
                                {currentWeekDays.map((d, index) => (
                                    <div key={index} style={{ fontSize: '0.7rem', color: '#666', fontWeight: 'bold' }}>
                                        {d}
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '5px' }}>
                                {days}
                            </div>
                        </div>
                    );
                })()}
            </div>
          ) : (
            <div style={{ fontSize: '1.2rem', color: '#00C6FF' }}>
                <FaClock />
            </div>
          )}
      </motion.div>

      {/* Quote of the Day Widget */}
      {quote && (
        <motion.div
            initial={{ width: '280px', opacity: 0 }}
            animate={{ 
                width: showQuote ? '280px' : '50px',
                height: showQuote ? 'auto' : '50px',
                opacity: 1, 
                borderRadius: showQuote ? '15px' : '50%',
                backgroundColor: showQuote ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0.6)'
            }}
            transition={{ duration: 0 }}
            className="glass-card"
            style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                pointerEvents: 'auto',
                cursor: showQuote ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={() => !showQuote && setShowQuote(true)}
        >
            {showQuote ? (
                <div style={{ padding: '20px', width: '280px', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <button 
                        onClick={(e) => { e.stopPropagation(); setShowQuote(false); }}
                        style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#aaa',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            zIndex: 2
                        }}
                        >
                        <FaTimes />
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <FaQuoteLeft style={{ color: '#F9CA24', fontSize: '1.2rem' }} />
                        <span style={{ fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {lang === 'vi' ? 'Câu nói hôm nay' : 'Daily Quote'}
                        </span>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#eee', fontStyle: 'italic', lineHeight: '1.4' }}>
                        "{lang === 'vi' ? quote.vi.text : quote.en.text}"
                    </p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', textAlign: 'right', marginTop: '5px' }}>
                        - {lang === 'vi' ? quote.vi.author : quote.en.author}
                    </p>
                </div>
             ) : (
                <div style={{ fontSize: '1.2rem', color: '#F9CA24' }}>
                    <FaQuoteLeft />
                </div>
             )}
        </motion.div>
      )}

    </div>
  );
};

export default WeatherNotification;
