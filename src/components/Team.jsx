import './Team.css';
import { useLanguage } from '../context/LanguageContext';
import fongPhoto from '../assets/fong.jpg';
import kimloongnginPhoto from '../assets/kimlongngin.jpg';

const teamMembers = [
  {
    name: 'Fong',
    roleKey: 'team.fong.role',
    image: fongPhoto,
    photoClass: 'team-photo--fong',
  },
  {
    name: 'Kimlong ngin',
    roleKey: 'team.kimloongngin.role',
    image: kimloongnginPhoto,
    photoClass: 'team-photo--kimloongngin',
  },
];

function AcademicCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11.2V16c2.8 2.5 9.2 2.5 12 0v-4.8" />
      <path d="M22 9v6" />
    </svg>
  );
}

export default function Team() {
  const { t } = useLanguage();

  return (
    <section id="team" className="team-section">
      <div className="team-glow team-glow--one" aria-hidden="true" />
      <div className="team-glow team-glow--two" aria-hidden="true" />

      <div className="container team-container">
        <div className="section-header text-center team-header">
          <span className="section-badge">{t('team.badge')}</span>
          <h2 className="section-title">{t('team.title')}</h2>
          <p className="section-description">{t('team.desc')}</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <article className="team-card" key={member.name}>
              <div className="team-lanyard" aria-hidden="true">
                <span />
              </div>

              <div className="team-photo-frame">
                <img
                  className={`team-photo ${member.photoClass}`}
                  src={member.image}
                  alt={`${member.name}, ${t(member.roleKey)}`}
                  loading="lazy"
                />
                <img
                  className="team-photo-logo"
                  src="/servicelogi_mark.png"
                  alt=""
                  aria-hidden="true"
                />
                <div className="team-photo-shade" aria-hidden="true" />
                <span className="team-member-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="team-card-content">
                <div className="team-member-copy">
                  <span className="team-card-label">{t('team.member')}</span>
                  <h3>{member.name}</h3>
                  <p>
                    <span className="team-degree-icon"><AcademicCapIcon /></span>
                    {t(member.roleKey)}
                  </p>
                </div>
                <div className="team-card-meta" aria-hidden="true">
                  <span>ServiceLogi</span>
                  <strong>ID · {String(index + 1).padStart(2, '0')}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
