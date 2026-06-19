import { useEffect, useState } from 'react';
import './Header.css';

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
          <button onClick={() => scrollToSection('hero')} className="nav-btn">Home</button>
          <button onClick={() => scrollToSection('projects')} className="nav-btn">Portfolio</button>
          <button onClick={() => scrollToSection('contact')} className="nav-btn">Get In Touch</button>
        </nav>

        <div className="header-actions">
          <a href="tel:0969704325" className="btn-primary header-cta">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </header>
  );
}
