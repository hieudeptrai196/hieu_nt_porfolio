import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { content } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Projects from './components/Projects';
import ScrollToTop from './components/ScrollToTop';
import Cat from './components/Cat';
import Welcome from './components/Welcome';
import FloatingContact from './components/FloatingContact';
import Protect from './components/Protect';

// Create Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const Home = () => {
    return (
      <>
        <Hero />
        <Skills />
        <Experience />
        <Awards />
        <Projects />
      </>
    );
};

function App() {
  const [lang, setLang] = useState('vi'); // Default to Vietnamese
  const t = content[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <BrowserRouter>
        <main>
            <Protect />
            <Navbar />
            <ScrollToTop />
            <FloatingContact />
            <Cat />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
            
            <footer style={{ padding: '2rem', textAlign: 'center', color: '#666', marginTop: '4rem', borderTop: '1px solid var(--glass-border)' }}>
              <p>{t.footer}</p>
            </footer>
        </main>
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}

export default App;
