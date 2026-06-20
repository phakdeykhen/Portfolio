import './TechOrbit.css';
import { useLanguage } from '../context/LanguageContext';

const rows = [
  {
    dir: 'left',
    items: ['JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Swift', 'Kotlin', 'Dart'],
  },
  {
    dir: 'right',
    items: ['TypeScript', 'Go', 'Rust', 'C++', 'Node.js', 'Laravel', 'React', 'Vue'],
  },
  {
    dir: 'left',
    items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GraphQL', 'Docker', 'AWS'],
  },
];

function MarqueeRow({ items, dir }) {
  // Duplicate the items so the loop is seamless (track scrolls by -50%).
  const loop = [...items, ...items];
  return (
    <div className="tech-marquee">
      <div className={`tech-track ${dir === 'right' ? 'tech-track--rev' : ''}`}>
        {loop.map((label, i) => (
          <span className="tech-chip" key={`${label}-${i}`}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export default function TechOrbit() {
  const { t } = useLanguage();

  return (
    <section id="tech" className="tech-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">{t('tech.badge')}</span>
          <h2 className="section-title">{t('tech.title')}</h2>
          <p className="section-description">{t('tech.desc')}</p>
        </div>
      </div>

      {/* Full-bleed running lines of technical languages */}
      <div className="tech-lines">
        {rows.map((row, i) => (
          <MarqueeRow key={i} items={row.items} dir={row.dir} />
        ))}
      </div>
    </section>
  );
}
