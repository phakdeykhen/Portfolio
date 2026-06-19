import './Services.css';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    title: "Custom Web Applications",
    desc: "Full-stack platforms built for scale, speed, and reliability."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ),
    title: "System Architecture",
    desc: "Scalable infrastructure design from database to deployment."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    title: "POS & ERP Solutions",
    desc: "Enterprise resource planning with real-time analytics dashboards."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    title: "Security & Compliance",
    desc: "SSL encryption, role-based access, and data protection protocols."
  }
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container services-container">
        
        {/* Left: Text content */}
        <div className="services-text">
          <span className="section-badge">What We Deliver</span>
          <h2 className="services-title">End-to-End Digital <br/><span className="text-gradient">Engineering</span></h2>
          <p className="services-description">
            From concept to production — we architect, design, and deploy enterprise-grade software 
            tailored to your business workflows and growth targets.
          </p>
          <div className="services-stats">
            <div className="stat-item">
              <span className="stat-number text-gradient">14+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number text-gradient">99%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number text-gradient">24/7</span>
              <span className="stat-label">Technical Support</span>
            </div>
          </div>
        </div>

        {/* Right: Stacked fanned cards */}
        <div className="stacked-cards-wrapper">
          {/* Decorative star shapes */}
          <div className="deco-star star-big">✦</div>
          <div className="deco-star star-small">✦</div>

          <div className="stacked-cards">
            {/* Back glass cards (decorative layers) */}
            <div className="glass-layer layer-3"></div>
            <div className="glass-layer layer-2"></div>
            <div className="glass-layer layer-1"></div>
            
            {/* Front card with content */}
            <div className="front-card">
              {services.map((service, index) => (
                <div key={index} className="service-row">
                  <div className="service-icon-box">
                    {service.icon}
                  </div>
                  <div className="service-info">
                    <h4 className="service-name">{service.title}</h4>
                    <p className="service-detail">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
