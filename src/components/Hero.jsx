import { useEffect, useState, useRef } from 'react';
import SplitText from './SplitText';
import { animate } from 'animejs';
import './Hero.css';
import { useLanguage } from '../context/LanguageContext';
import abaLogo from '../assets/payments/aba.png';
import khqrLogo from '../assets/payments/khqr.png';
import visaLogo from '../assets/payments/visa.png';
import mastercardLogo from '../assets/payments/mastercard.png';
import unionpayLogo from '../assets/payments/unionpay.png';
import jcbLogo from '../assets/payments/jcb.png';
import alipayLogo from '../assets/payments/alipay.png';
import wechatLogo from '../assets/payments/wechat.png';

const heroPayments = [
  { src: abaLogo, name: 'ABA Bank' },
  { src: khqrLogo, name: 'KHQR' },
  { src: visaLogo, name: 'Visa' },
  { src: mastercardLogo, name: 'Mastercard' },
  { src: unionpayLogo, name: 'UnionPay' },
  { src: jcbLogo, name: 'JCB' },
  { src: alipayLogo, name: 'Alipay' },
  { src: wechatLogo, name: 'WeChat Pay' },
];

const terminalLines = [
  "systemctl start servicelogi.service",
  "Initializing digital core framework...",
  "Loading portfolio projects database... [14 FOUND]",
  "Establishing secure API tunnels... DONE",
  "Optimizing responsive layouts... OK",
  "GSAP & Anime.js engines running... ACTIVE",
  "Ready to assemble digital experiences."
];

export default function Hero() {
  const { t } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [metricCount, setMetricCount] = useState(0);
  const terminalBodyRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Print terminal lines sequentially
    let currentLineIndex = 0;
    const interval = setInterval(() => {
      if (currentLineIndex < terminalLines.length) {
        setLogs((prev) => [...prev, terminalLines[currentLineIndex]]);
        currentLineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1200);

    // Auto-scroll terminal to bottom when new logs print
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }

    // Anime.js count-up animation for performance metric (V4 syntax)
    const counterObj = { value: 0 };
    const countAnim = animate(counterObj, {
      value: 100,
      round: 1,
      easing: 'easeOutExpo',
      duration: 3500,
      delay: 500,
      update: () => {
        setMetricCount(counterObj.value);
      }
    });

    return () => {
      clearInterval(interval);
      countAnim.pause();
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="ambient-glow hero-glow-1"></div>
      <div className="ambient-glow hero-glow-2"></div>

      {/* Large faint brand logo watermark */}
      <img
        src="/servicelogi_mark.png"
        alt=""
        aria-hidden="true"
        className="hero-bg-logo"
      />

      {/* Background Floating Blurred Technical Logos */}
      <div className="hero-tech-background">
        {/* React */}
        <div className="floating-logo" style={{ left: '8%', top: '15%', animationDuration: '24s' }}>
          <svg viewBox="-11.5 -10.23174 23 20.46348" width="100%" height="100%" fill="none" stroke="currentColor">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        </div>
        {/* JS */}
        <div className="floating-logo" style={{ left: '3%', top: '55%', animationDuration: '28s', animationDelay: '-5s' }}>
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M3 3h18v18H3V3zm11.525 10.985c-.097-.624-.516-1.127-1.425-1.127-.723 0-1.192.352-1.192.934 0 .58.455.836 1.22.1.13.1.722.392 1.348.647 1.637.665 2.193 1.348 2.193 2.684 0 1.954-1.528 2.92-3.79 2.92-2.585 0-3.666-1.272-3.805-2.731h1.968c.113.722.58 1.134 1.777 1.134.992 0 1.67-.428 1.67-1.192 0-.825-.563-1.07-1.595-1.512-.876-.37-2.146-.886-2.146-2.593 0-1.745 1.4-2.85 3.513-2.85 2.193 0 3.328 1.05 3.525 2.502h-1.996zM7.22 17.513c.108.544.538.934 1.2.934.618 0 1.037-.308 1.037-.992v-5.263H11.5v5.334c0 1.838-1.096 2.723-2.924 2.723-1.895 0-2.883-.984-3.08-2.736H7.22z"/>
          </svg>
        </div>
        {/* HTML5 */}
        <div className="floating-logo" style={{ left: '45%', top: '8%', animationDuration: '26s', animationDelay: '-8s' }}>
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M1.5 22L0 0h24l-1.5 22L12 24zM12 4.12v3.76h4.55l-.46 5.09L12 14.63v3.74l6.09-1.68.85-9.82H12zm0 10.51l-4.13-1.13-.26-2.89H3.83l.53 6.09 7.64 2.11v-4.18z"/>
          </svg>
        </div>
        {/* CSS3 */}
        <div className="floating-logo" style={{ left: '40%', top: '85%', animationDuration: '30s', animationDelay: '-12s' }}>
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M1.5 22L0 0h24l-1.5 22L12 24zM12 4.12v3.76h4.55l-.46 5.09L12 14.63v3.74l6.09-1.68.85-9.82H12zm-4.32 6.64H12v3.76H7.38l-.29-3.76zm-.43-5.32l-.15-2h4.9v3.76H7.25z"/>
          </svg>
        </div>
        {/* NodeJS */}
        <div className="floating-logo" style={{ right: '8%', top: '10%', animationDuration: '22s', animationDelay: '-3s' }}>
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M12 2L2 7.8v11.6L12 22l10-5.8V7.8L12 2zm8 13.5l-8 4.6-8-4.6V8.5l8-4.6 8 4.6v7zM12 7l4 2.3v4.6L12 16.2l-4-2.3V9.3L12 7z"/>
          </svg>
        </div>
        {/* Python */}
        <div className="floating-logo" style={{ right: '5%', top: '48%', animationDuration: '32s', animationDelay: '-15s' }}>
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M11.93 2C6.98 2 7.21 4.14 7.21 4.14v1.85h4.8v.67H5.2S2 6.3 2 11.23c0 4.94 2.76 4.75 2.76 4.75h1.65v-2.31c0-2.58 2.09-4.7 4.67-4.7h4.81s1.93-.05 1.93-4.8c0-4.76-2.93-4.17-2.93-4.17S14.9 2 11.93 2zm.14 20c4.95 0 4.72-2.14 4.72-2.14v-1.85h-4.8v-.67h6.81s3.2.36 3.2-4.57c0-4.94-2.76-4.75-2.76-4.75h-1.65v2.31c0 2.58-2.09 4.7-4.67 4.7H8.11s-1.93.05-1.93 4.8c0 4.76 2.93 4.17 2.93 4.17S9.1 22 12.07 22z"/>
          </svg>
        </div>
        {/* PHP */}
        <div className="floating-logo" style={{ right: '42%', top: '82%', animationDuration: '25s', animationDelay: '-6s' }}>
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 12.3c-.37.74-.98 1.1-1.83 1.1h-2.13v2.1h-1.63v-6.98h3.76c.85 0 1.46.36 1.83 1.1.37.74.55 1.64.55 2.7s-.18 1.98-.55 2.7zm-2.4-1.23c.3 0 .47-.2.47-.6v-.8c0-.4-.17-.6-.47-.6h-.5v2h.5z"/>
          </svg>
        </div>
        {/* Git */}
        <div className="floating-logo" style={{ left: '25%', top: '30%', animationDuration: '27s', animationDelay: '-9s' }}>
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M23.3 10.9L13.1.7C12.7.3 12-.1 11.4-.1s-1.3.4-1.7.8L7.1 3.3l3.2 3.2c.8-.3 1.8-.1 2.5.6.7.7.9 1.7.6 2.5l3.2 3.2c.8-.3 1.8-.1 2.5.6.9.9.9 2.4 0 3.3s-2.4.9-3.3 0c-.7-.7-.9-1.7-.6-2.5L12 11.1v4.7c.3.2.5.5.6.8.9.9.9 2.4 0 3.3s-2.4.9-3.3 0c-.9-.9-.9-2.4 0-3.3.3-.3.7-.5 1.1-.6v-5.1c-.4-.1-.8-.3-1.1-.6L6.1 7.1.7 12.5c-.9.9-.9 2.4 0 3.3l10.2 10.2c.4.4 1.1.8 1.7.8s1.3-.4 1.7-.8l9-9c1-.9 1-2.4 0-3.3z"/>
          </svg>
        </div>
        {/* Docker */}
        <div className="floating-logo" style={{ right: '28%', top: '60%', animationDuration: '29s', animationDelay: '-4s' }}>
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.188V8.956c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v1.934c0 .105.083.188.186.188zm-2.917-3.882h2.119c.102 0 .186-.083.186-.188V5.074c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v1.934c0 .105.083.188.186.188zm0 3.882h2.119c.102 0 .186-.083.186-.188V8.956c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v1.934c0 .105.083.188.186.188zm-2.916 0h2.119c.102 0 .186-.083.186-.188V8.956c0-.103-.084-.186-.186-.186H8.15c-.102 0-.186.083-.186.186v1.934c0 .105.084.188.186.188zm-2.917 0h2.119c.103 0 .186-.083.186-.188V8.956c0-.103-.083-.186-.186-.186H5.233c-.103 0-.186.083-.186.186v1.934c0 .105.083.188.186.188zm-2.917 0h2.119c.103 0 .186-.083.186-.188V8.956c0-.103-.083-.186-.186-.186H2.316c-.103 0-.186.083-.186.186v1.934c0 .105.083.188.186.188zm1.75 3.882h2.119c.103 0 .186-.083.186-.188v-1.934c0-.103-.083-.186-.186-.186H4.066c-.103 0-.186.083-.186.186v1.934c0 .105.083.188.186.188zm2.917 0h2.119c.102 0 .186-.083.186-.188v-1.934c0-.103-.084-.186-.186-.186H6.983c-.103 0-.186.083-.186.186v1.934c0 .105.083.188.186.188zm2.916 0h2.119c.102 0 .186-.083.186-.188v-1.934c0-.103-.084-.186-.186-.186H9.9c-.102 0-.186.083-.186.186v1.934c0 .105.084.188.186.188zm10.07-3.882c-.373-.047-.723-.1-.983-.162l.004-.038c.62-.266 1.054-.925 1.054-1.69 0-1.042-.81-1.89-1.808-1.89h-1.28c-.103 0-.186.083-.186.187v5.823c0 .104.083.188.186.188h2.09c1.037 0 1.874-.848 1.874-1.89 0-.256-.05-.498-.142-.716l.011-.046c.15-.084.283-.188.396-.307l-.216-.459z"/>
          </svg>
        </div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-grid">
          
          {/* Left Column: Information and CTAs */}
          <div className="hero-content">

            {/* GROW SMART Poster Banner */}
            <div className="grow-smart-banner fade-in-up" style={{ animationDelay: '0s' }}>
              <div className="grow-smart-top">
                <span className="grow-word">GROW</span>
                <span className="grow-arrow">
                  <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
                    <path d="M8 24 L24 8 M14 8 H24 V18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <div className="grow-smart-divider">GOVERNMENT &amp; COMPANY</div>
              <div className="smart-word">SMART</div>
            </div>

            {/* Tagline with accent line */}
            <p className="hero-tagline fade-in-up" style={{ animationDelay: '0.05s' }}>
              <span className="hero-tagline-line"></span>
              {t('hero.tagline')}
            </p>

            <div className="badge-wrapper">
              <span className="hero-badge">{t('hero.badge')}</span>
            </div>
            
            <h1 className="hero-title text-gradient brand-main-title fade-in-up" style={{ animationDelay: '0.1s' }}>
              ServiceLogi
            </h1>
            
            <h2 className="hero-subtitle">
              <SplitText
                text={t('hero.subtitle')}
                delay={0.4}
                stagger={15}
                duration={500}
              />
            </h2>
            
            <p className="hero-description">
              {t('hero.description')}
            </p>

            <div className="hero-actions-container">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="btn-primary hero-btn-main"
              >
                <span>{t('hero.explore')}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn-secondary hero-btn-sub"
              >
                {t('hero.contact_agent')}
              </button>
            </div>

            <div className="hero-quick-contact">
              <div className="contact-pill">
                <span className="dot emerald-dot"></span>
                <span className="pill-text">{t('hero.available')}</span>
              </div>
              <div className="quick-info">
                <a href="mailto:info@servicelogi.com" className="info-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span>info@servicelogi.com</span>
                </a>
                <span className="separator">|</span>
                <a href="tel:0969704325" className="info-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>096 970 4325</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Cyber Terminal visual mock */}
          <div className="hero-visual">
            <div className="cyber-terminal">
              <div className="terminal-header">
                <div className="mac-controls">
                  <span className="control-dot close-dot"></span>
                  <span className="control-dot minimize-dot"></span>
                  <span className="control-dot expand-dot"></span>
                </div>
                <span className="terminal-title">bash - servicelogi_core.sh</span>
                <span className="active-badge">Online</span>
              </div>
              <div ref={terminalBodyRef} className="terminal-body">
                <div className="terminal-log-row command-input">
                  <span className="prompt-symbol">servicelogi@root:~#</span>
                  <span className="typed-command">{logs[0] || ""}</span>
                </div>
                
                {logs.slice(1).map((log, index) => (
                  <div key={index} className="terminal-log-row">
                    <span className="log-timestamp">[{new Date().toLocaleTimeString()}]</span>
                    <span className="log-message">{log}</span>
                  </div>
                ))}
                
                <span className="cursor-blink">_</span>
              </div>
              
              {/* Animated Core Metrics */}
              <div className="terminal-footer">
                <div className="metric-box">
                  <span className="metric-label">Lightspeed Score</span>
                  <span className="metric-val text-gradient">{metricCount}%</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">SSL Core Grade</span>
                  <span className="metric-val grade-badge">A+</span>
                </div>
              </div>
            </div>

            {/* Small accepted-payment methods strip below the terminal */}
            <div className="hero-payments">
              <span className="hero-payments-label">{t('hero.payments')}</span>
              <div className="hero-payments-row">
                {heroPayments.map((p) => (
                  <span className="hero-pay-chip" key={p.name} title={p.name}>
                    <img src={p.src} alt={p.name} loading="lazy" />
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="scroll-indicator" onClick={() => scrollToSection('projects')}>
        <span className="mouse-wheel"></span>
      </div>
    </section>
  );
}
