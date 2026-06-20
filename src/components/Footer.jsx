import './Footer.css';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="brand-name">
            Service<span className="accent-name">Logi</span>
          </span>
          <p className="footer-tagline">{t('footer.tagline')}</p>
        </div>

        <div className="footer-middle">
          <p className="copyright-text">
            &copy; {currentYear} ServiceLogi. {t('footer.copyright')}
          </p>
        </div>

        <button onClick={scrollToTop} className="back-to-top-btn interactive-hover" title="Back to Top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </button>
      </div>
    </footer>
  );
}
