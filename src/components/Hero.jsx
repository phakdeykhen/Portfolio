import { useEffect, useState, useRef } from 'react';
import SplitText from './SplitText';
import { animate } from 'animejs';
import './Hero.css';

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
      
      <div className="container hero-container">
        <div className="hero-grid">
          
          {/* Left Column: Information and CTAs */}
          <div className="hero-content">
            <div className="badge-wrapper">
              <span className="hero-badge">Enterprise Digital Solutions</span>
            </div>
            
            <h1 className="hero-title">
              <SplitText 
                text="ServiceLogi" 
                className="text-gradient brand-main-title"
                delay={0.1}
                stagger={50}
              />
            </h1>
            
            <h2 className="hero-subtitle">
              <SplitText
                text="Turning ideas into scalable, high-performance software."
                delay={0.4}
                stagger={15}
                duration={500}
              />
            </h2>
            
            <p className="hero-description">
              We specialize in crafting professional, responsive, and secure custom solutions — including 
              point-of-sale systems, financial systems, educational portals, and web architectures 
              that drive real business value.
            </p>

            <div className="hero-actions-container">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="btn-primary hero-btn-main"
              >
                <span>Explore Projects</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn-secondary hero-btn-sub"
              >
                Contact Agent
              </button>
            </div>

            <div className="hero-quick-contact">
              <div className="contact-pill">
                <span className="dot emerald-dot"></span>
                <span className="pill-text">Available for Projects</span>
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
          </div>

        </div>
      </div>
      
      <div className="scroll-indicator" onClick={() => scrollToSection('projects')}>
        <span className="mouse-wheel"></span>
      </div>
    </section>
  );
}
