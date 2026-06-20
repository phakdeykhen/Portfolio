import { useState } from 'react';
import './Contact.css';
import FacebookPlugin from './FacebookPlugin';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const [copiedType, setCopiedType] = useState(null);
  const { language, t } = useLanguage();

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const copyText = language === 'km' ? 'ចម្លង' : 'Copy';
  const copiedText = language === 'km' ? 'បានចម្លង!' : 'Copied!';

  return (
    <section id="contact" className="contact-section">
      <div className="ambient-glow contact-glow"></div>
      
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">{t('contact.badge')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-description">
            {t('contact.desc')}
          </p>
        </div>

        <div className="contact-layout">
          {/* Info cards pane */}
          <div className="contact-info-cards">
            {/* Phone 1 */}
            <div className="info-card interactive-hover">
              <div className="card-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div className="card-details">
                <span className="details-label">{t('contact.call_rep')}</span>
                <a href="tel:0969704325" className="details-value">096 970 4325</a>
              </div>
              <button 
                onClick={() => handleCopy('096 970 4325', 'phone1')}
                className={`copy-btn ${copiedType === 'phone1' ? 'copied' : ''}`}
                title="Copy to clipboard"
              >
                {copiedType === 'phone1' ? copiedText : copyText}
              </button>
            </div>

            {/* Phone 2 */}
            <div className="info-card interactive-hover">
              <div className="card-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div className="card-details">
                <span className="details-label">{t('contact.alt_line')}</span>
                <a href="tel:0765496978" className="details-value">076 549 6978</a>
              </div>
              <button 
                onClick={() => handleCopy('076 549 6978', 'phone2')}
                className={`copy-btn ${copiedType === 'phone2' ? 'copied' : ''}`}
                title="Copy to clipboard"
              >
                {copiedType === 'phone2' ? copiedText : copyText}
              </button>
            </div>

            {/* Email */}
            <div className="info-card interactive-hover">
              <div className="card-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div className="card-details">
                <span className="details-label">{t('contact.send_email')}</span>
                <a href="mailto:info@servicelogi.com" className="details-value">info@servicelogi.com</a>
              </div>
              <button 
                onClick={() => handleCopy('info@servicelogi.com', 'email')}
                className={`copy-btn ${copiedType === 'email' ? 'copied' : ''}`}
                title="Copy to clipboard"
              >
                {copiedType === 'email' ? copiedText : copyText}
              </button>
            </div>
          </div>

          {/* Facebook page integration pane */}
          <div className="contact-form-pane" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#1877F2' }}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                {t('contact.fb_header')}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto', fontFamily: 'var(--font-sans)', lineHeight: '1.5' }}>
                {t('contact.fb_desc')}
              </p>
            </div>
            <FacebookPlugin />
          </div>
        </div>
      </div>
    </section>
  );
}
