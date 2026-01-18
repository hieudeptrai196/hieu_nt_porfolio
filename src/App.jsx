import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import NuoiHieu from './components/NuoiHieu';
import { LanguageProvider } from './contexts/LanguageContext';

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

function AppContent() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Protect />
      <ScrollToTop />
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/nuoi-hieu" element={<NuoiHieu />} />
      </Routes>
      
      {isHome && <WeatherNotification />}
      <FloatingContact />
      <Cat isPlaying={isMusicPlaying} />
      {/* <TranslateWidget />
      <CalculatorWidget /> */}
      <MusicWidget onPlayStateChange={setIsMusicPlaying} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
