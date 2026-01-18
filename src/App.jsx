import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import HeroLight from './components/LightTheme/HeroLight';
import NavbarLight from './components/LightTheme/NavbarLight';
import SkillsLight from './components/LightTheme/SkillsLight';
import ExperienceLight from './components/LightTheme/ExperienceLight';
import ProjectsLight from './components/LightTheme/ProjectsLight';
import ContactLight from './components/LightTheme/ContactLight';

import Protect from './components/Protect';
import { LanguageProvider } from './contexts/LanguageContext';

// Main Content for Light Theme
function AppContent() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Protect />
      <NavbarLight />
      
      {/* Scrollable Sections */}
      <HeroLight />
      <SkillsLight />
      <ExperienceLight />
      <ProjectsLight />
      <ContactLight />

      {/* Global Widgets */}
      <ScrollToTop />
      {isHome && <WeatherNotification />}
      <Cat isPlaying={isMusicPlaying} />
      <MusicWidget onPlayStateChange={setIsMusicPlaying} />
      <ChatWidget />
      <TetCountdownPopup />
    </>
  );
}

function App() {
  // Keep the Private Mode logic as user requested it previously
  const isPrivateMode = import.meta.env.VITE_PRIVATE_MODE === 'true';

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (!isPrivateMode) return true;
    return sessionStorage.getItem('isHieuAuthenticated') === 'true';
  });

  const handleLoginSuccess = () => {
      sessionStorage.setItem('isHieuAuthenticated', 'true');
      setIsAuthenticated(true);
  };

  if (isPrivateMode && !isAuthenticated) {
      return <LoginScreen onLogin={handleLoginSuccess} />;
  }

  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
