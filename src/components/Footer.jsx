import './Footer.css';
import { useLanguage } from '../context/LanguageContext';
import abaLogo from '../assets/payments/aba.png';
import khqrLogo from '../assets/payments/khqr.png';
import visaLogo from '../assets/payments/visa.png';
import mastercardLogo from '../assets/payments/mastercard.png';
import unionpayLogo from '../assets/payments/unionpay.png';
import jcbLogo from '../assets/payments/jcb.png';
import alipayLogo from '../assets/payments/alipay.png';
import wechatLogo from '../assets/payments/wechat.png';

const paymentMethods = [
  { src: abaLogo, name: 'ABA Bank' },
  { src: khqrLogo, name: 'KHQR' },
  { src: visaLogo, name: 'Visa' },
  { src: mastercardLogo, name: 'Mastercard' },
  { src: unionpayLogo, name: 'UnionPay' },
  { src: jcbLogo, name: 'JCB' },
  { src: alipayLogo, name: 'Alipay' },
  { src: wechatLogo, name: 'WeChat Pay' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      {/* Accepted payment methods */}
      <div className="container footer-payments">
        <span className="payments-label">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          {t('footer.payments')}
        </span>
        <div className="payment-chips">
          {paymentMethods.map((method) => (
            <div className="payment-chip" key={method.name} title={method.name}>
              <img src={method.src} alt={method.name} className="payment-chip-img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

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
