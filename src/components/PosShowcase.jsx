import { useRef, useEffect } from 'react';
import './PosShowcase.css';
import { useLanguage } from '../context/LanguageContext';

import acledaVideo from '../assets/POS-ACLEDA.mp4';
import abaVideo from '../assets/POS-ABA.mp4';
import acledaMachine from '../assets/Machinc POS ACLEDA.jpg';
import abaMachine from '../assets/Machine POS ABA .webp';
import acledaBanner from '../assets/banner-pos- ACLEDA.jpg';
import paywayLogo from '../assets/payway.png';
import khFlag from '../assets/kh flag.png';

const integrations = [
  {
    id: 'acleda',
    brand: 'ACLEDA',
    accent: '#0b7a3b',
    badgeKey: 'pos.acleda.badge',
    titleKey: 'pos.acleda.title',
    descKey: 'pos.acleda.desc',
    featureKeys: ['pos.acleda.f1', 'pos.acleda.f2', 'pos.acleda.f3', 'pos.acleda.f4'],
    video: acledaVideo,
    machine: acledaMachine,
    poster: acledaBanner,
  },
  {
    id: 'aba',
    brand: 'ABA · PayWay',
    accent: '#0046ad',
    badgeKey: 'pos.aba.badge',
    titleKey: 'pos.aba.title',
    descKey: 'pos.aba.desc',
    featureKeys: ['pos.aba.f1', 'pos.aba.f2', 'pos.aba.f3', 'pos.aba.f4'],
    video: abaVideo,
    machine: abaMachine,
    logo: paywayLogo,
  },
];

function LazyVideo({ src, poster, accent }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="pos-video"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      style={{ '--accent': accent }}
    />
  );
}

export default function PosShowcase() {
  const { t } = useLanguage();

  return (
    <section id="pos" className="pos-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">{t('pos.badge')}</span>
          <h2 className="section-title">{t('pos.title')}</h2>
          <p className="section-description">{t('pos.desc')}</p>
        </div>

        <div className="pos-grid">
          {integrations.map((item, index) => (
            <article
              key={item.id}
              className={`pos-card ${index % 2 === 1 ? 'pos-card--reverse' : ''}`}
              style={{ '--accent': item.accent }}
            >
              {/* Floating machine background image */}
              <img
                src={item.machine}
                alt={`${item.brand} POS machine`}
                className="pos-machine-bg"
                loading="lazy"
                aria-hidden="true"
              />

              {/* Media: live POS video */}
              <div className="pos-media">
                <div className="pos-video-frame">
                  <LazyVideo src={item.video} poster={item.poster} accent={item.accent} />
                  <span className="pos-live-tag">
                    <span className="pos-live-dot"></span> {t('pos.live')}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="pos-info">
                <div className="pos-info-head">
                  <span className="pos-badge">{t(item.badgeKey)}</span>
                  <img src={khFlag} alt="Cambodia" className="pos-flag" loading="lazy" />
                </div>

                <h3 className="pos-title">{t(item.titleKey)}</h3>
                <p className="pos-desc">{t(item.descKey)}</p>

                <ul className="pos-features">
                  {item.featureKeys.map((key) => (
                    <li key={key}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Accepted payment methods strip — centered below the cards */}
        <div className="pos-payments">
          <img src={paywayLogo} alt="Accepted payments — ABA, KHQR, Visa, Mastercard, UnionPay, JCB, Alipay, WeChat" className="pos-payments-img" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
