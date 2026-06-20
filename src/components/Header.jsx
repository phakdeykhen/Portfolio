import { useEffect, useState } from 'react';
import './Header.css';
import { useLanguage } from '../context/LanguageContext';
import usFlag from '../assets/us flag.png';
import khFlag from '../assets/kh flag.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="brand" onClick={() => scrollToSection('hero')}>
          <img src="/servicelogi_mark.png" alt="ServiceLogi Logo" className="brand-logo" />
          <span className="brand-name">
            Service<span className="accent-name">Logi</span>
          </span>
        </div>
        
        <nav className="nav-links">
          <button onClick={() => scrollToSection('hero')} className="nav-btn">{t('nav.home')}</button>
          <button onClick={() => scrollToSection('projects')} className="nav-btn">{t('nav.portfolio')}</button>
          <button onClick={() => scrollToSection('contact')} className="nav-btn">{t('nav.contact')}</button>
        </nav>

        <div className="header-actions">
          <div className="lang-switcher">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              title="English"
            >
              <img src={usFlag} alt="" className="lang-flag" />
              EN
            </button>
            <button
              className={`lang-btn ${language === 'km' ? 'active' : ''}`}
              onClick={() => setLanguage('km')}
              title="ភាសាខ្មែរ"
            >
              <img src={khFlag} alt="" className="lang-flag" />
              KM
            </button>
          </div>

          <a href="tel:0969704325" className="btn-primary header-cta">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>{t('nav.call_us')}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
