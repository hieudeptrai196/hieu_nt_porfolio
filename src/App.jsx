import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { content } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Cat from './components/Cat';
import Welcome from './components/Welcome';

import FloatingContact from './components/FloatingContact';
import Protect from './components/Protect';
import WeatherNotification from './components/WeatherNotification';
import TranslateWidget from './components/TranslateWidget';
import CalculatorWidget from './components/CalculatorWidget';
import MusicWidget from './components/MusicWidget';

// Create Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const Home = () => {
    return (
      <main>
        <section id="home"><Hero /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="awards"><Awards /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
    );
};

function App() {
  const [lang, setLang] = useState('vi'); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const t = content[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <BrowserRouter>
        <Protect />
        <ScrollToTop />
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Welcome />} />
        </Routes>
        
        <WeatherNotification />
        <FloatingContact />
        <Cat isPlaying={isMusicPlaying} />
        {/* <TranslateWidget />
        <CalculatorWidget /> */}
        <MusicWidget onPlayStateChange={setIsMusicPlaying} />
        <Footer />
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}

export default App;
