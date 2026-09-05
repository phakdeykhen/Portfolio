import './Careers.css';
import { useLanguage } from '../context/LanguageContext';

const positions = [
  {
    id: 'marketing_intern',
    titleKey: 'careers.marketing_intern.title',
    descKey: 'careers.marketing_intern.desc',
    responsibilityKeys: [
      'careers.marketing_intern.r1',
      'careers.marketing_intern.r2',
      'careers.marketing_intern.r3',
      'careers.marketing_intern.r4',
    ],
    requirementKeys: [
      'careers.marketing_intern.q1',
      'careers.marketing_intern.q2',
      'careers.marketing_intern.q3',
      'careers.marketing_intern.q4',
    ],
  },
];

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Careers() {
  const { t } = useLanguage();

  return (
    <section id="careers" className="careers-section">
      <div className="careers-glow" aria-hidden="true" />

      <div className="container careers-container">
        <div className="section-header text-center careers-header">
          <span className="section-badge">{t('careers.badge')}</span>
          <h2 className="section-title">{t('careers.title')}</h2>
          <p className="section-description">{t('careers.desc')}</p>
        </div>

        <div className="careers-grid">
          {positions.map((position) => (
            <article className="career-card" key={position.id}>
              <div className="career-card-top">
                <span className="career-open-badge">
                  <span className="career-pulse-dot" aria-hidden="true" />
                  {t('careers.open_badge')}
                </span>
                <h3 className="career-title">{t(position.titleKey)}</h3>
                <p className="career-desc">{t(position.descKey)}</p>

                <div className="career-meta">
                  <span className="career-chip"><BriefcaseIcon />{t('careers.type')}</span>
                  <span className="career-chip"><PinIcon />{t('careers.location')}</span>
                  <span className="career-chip"><ClockIcon />{t('careers.schedule')}</span>
                </div>
              </div>

              <div className="career-lists">
                <div className="career-list-block">
                  <h4 className="career-list-title">{t('careers.responsibilities')}</h4>
                  <ul className="career-list">
                    {position.responsibilityKeys.map((key) => (
                      <li key={key}><span className="career-check"><CheckIcon /></span>{t(key)}</li>
                    ))}
                  </ul>
                </div>

                <div className="career-list-block">
                  <h4 className="career-list-title">{t('careers.requirements')}</h4>
                  <ul className="career-list">
                    {position.requirementKeys.map((key) => (
                      <li key={key}><span className="career-check"><CheckIcon /></span>{t(key)}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="career-apply">
                <a
                  href="https://t.me/KPK_developer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary career-apply-btn interactive-hover"
                >
                  {t('careers.apply')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </a>
                <span className="career-apply-note">{t('careers.apply_note')}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
