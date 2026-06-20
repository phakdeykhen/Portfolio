import { useEffect, useRef, useState } from 'react';
import './Header.css';
import { useLanguage } from '../context/LanguageContext';
import usFlag from '../assets/us flag.png';
import khFlag from '../assets/kh flag.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef(null);

  // Close the contact dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!contactOpen) return;
    const handleClickOutside = (e) => {
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setContactOpen(false);
      }
    };
    const handleEsc = (e) => { if (e.key === 'Escape') setContactOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [contactOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Solid background once scrolled past the top
      setScrolled(currentY > 20);

      // Hide on scroll down, reveal on scroll up (ignore tiny jitters)
      if (Math.abs(currentY - lastScrollY) > 6) {
        setHidden(currentY > lastScrollY && currentY > 120);
        lastScrollY = currentY;
      }

      // Page scroll progress (0–100)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
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

          <div className="contact-dropdown" ref={contactRef}>
            <button
              type="button"
              className="btn-primary header-cta"
              onClick={() => setContactOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={contactOpen}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>{t('nav.call_us')}</span>
              <svg className={`cta-chevron ${contactOpen ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>

            <div className={`contact-menu ${contactOpen ? 'open' : ''}`} role="menu">
              <a
                href="https://t.me/KPK_developer"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-menu-item"
                role="menuitem"
                onClick={() => setContactOpen(false)}
              >
                <span className="cm-icon telegram" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 4.6a1.2 1.2 0 0 0-1.27-.18L3.3 11.55c-.9.37-.86 1.66.06 1.97l4.2 1.42 1.62 5.06c.27.83 1.34 1.04 1.9.37l2.3-2.74 4.27 3.13c.6.44 1.46.12 1.62-.61l3.1-14.2a1.2 1.2 0 0 0-.43-1.15ZM9.6 14.2l8.1-5.1c.16-.1.33.12.19.24l-6.36 5.8a.8.8 0 0 0-.25.5l-.2 2.3-1.18-3.4a.4.4 0 0 1-.3-.34Z"/></svg>
                </span>
                <span className="cm-text">
                  <span className="cm-title">Telegram</span>
                  <span className="cm-sub">@KPK_developer</span>
                </span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61551776304743"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-menu-item"
                role="menuitem"
                onClick={() => setContactOpen(false)}
              >
                <span className="cm-icon facebook" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>
                </span>
                <span className="cm-text">
                  <span className="cm-title">Facebook Page</span>
                  <span className="cm-sub">ServiceLogi</span>
                </span>
              </a>

              <a
                href="tel:0969704325"
                className="contact-menu-item"
                role="menuitem"
                onClick={() => setContactOpen(false)}
              >
                <span className="cm-icon phone" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <span className="cm-text">
                  <span className="cm-title">Call Phone</span>
                  <span className="cm-sub">096 970 4325</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress line */}
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }}></div>
    </header>
  );
}
