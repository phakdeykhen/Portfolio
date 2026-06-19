import { useState, useRef } from 'react';
import './ProjectsGrid.css';

const projects = [
  {
    id: 1,
    title: "POS System",
    image: "/portfolio/POS System.png",
    category: "Management",
    tags: ["React", "Electron", "Node.js", "SQLite"],
    desc: "A fully integrated Point of Sale software featuring real-time inventory tracking, physical receipt printing layouts, offline databases, and automated shifts syncing."
  },
  {
    id: 2,
    title: "Loan System",
    image: "/portfolio/Loan System.png",
    category: "Finance",
    tags: ["React", "Laravel", "MySQL", "Chart.js"],
    desc: "Automated lending and microfinance ledger dashboard. Handles customer profiles, amortization schedules, compound interest calculators, and visual repayment analytics."
  },
  {
    id: 3,
    title: "Crypto Website",
    image: "/portfolio/Crypto Website.png",
    category: "Web3",
    tags: ["React", "GSAP", "Tailwind", "Web3.js"],
    desc: "High-fidelity landing page for decentralized finance platform featuring crypto price graphs, token swap layout, and dark mode UI."
  },
  {
    id: 4,
    title: "Education Course",
    image: "/portfolio/Education Course.png",
    category: "EdTech",
    tags: ["React", "Firebase", "CSS Grid", "YouTube API"],
    desc: "Learning Management System (LMS) with module progress indicators, video hosting, custom lecture quizzes, and certificate downloads."
  },
  {
    id: 5,
    title: "Car Website",
    image: "/portfolio/Car website.png",
    category: "E-Commerce",
    tags: ["Vite", "GSAP", "CSS Variables"],
    desc: "Premium car rental and sales portal utilizing smooth GSAP transitions and grid filter views."
  },
  {
    id: 6,
    title: "Quotation System",
    image: "/portfolio/Quo System.png",
    category: "Utility",
    tags: ["React", "Node.js", "PostgreSQL", "PDFKit"],
    desc: "B2B client billing and quote generator. Streamlines invoices, price margins, PDF export, and email integration."
  },
  {
    id: 7,
    title: "School Administrative System",
    image: "/portfolio/School System-.png",
    category: "EdTech",
    tags: ["React", "PHP", "MariaDB"],
    desc: "Backoffice portal for schools, regulating class assignments, student rosters, grading structures, and fee payments."
  },
  {
    id: 8,
    title: "School Academic Website",
    image: "/portfolio/School website.png",
    category: "Corporate",
    tags: ["HTML5", "Vanilla JS", "CSS Grid"],
    desc: "Public-facing website for academic admissions, news releases, student galleries, and course outlines."
  },
  {
    id: 9,
    title: "Property Listing Portal",
    image: "/portfolio/Property .png",
    category: "Real Estate",
    tags: ["React", "Leaflet Maps", "Firebase"],
    desc: "Real estate search engine showcasing property coordinates on interactive maps, price graphs, and landlord message boards."
  },
  {
    id: 10,
    title: "Real Estate Portal",
    image: "/portfolio/Sell Property.png",
    category: "Real Estate",
    tags: ["React", "Styled Components", "MySQL"],
    desc: "Agent platform for selling properties. Includes 3D floor plan viewers, scheduling client visits, and contract tracking."
  },
  {
    id: 11,
    title: "Company Profile (Interactive)",
    image: "/portfolio/Company Profile .png",
    category: "Corporate",
    tags: ["React", "GSAP", "Vanilla CSS"],
    desc: "A stunning corporate identity page highlighting agency timelines, case studies, and client review carousels."
  },
  {
    id: 12,
    title: "Company Profile (Corporate)",
    image: "/portfolio/Compnay Profile.png",
    category: "Corporate",
    tags: ["Vite", "React", "CSS Modules"],
    desc: "Minimalist landing page for technology startups. Focused on performance, high readability, and clean typography."
  },
  {
    id: 13,
    title: "News Web Platform",
    image: "/portfolio/News Web.png",
    category: "Media",
    tags: ["React", "Next.js", "Redis"],
    desc: "High-traffic journalism platform featuring dynamic content blocks, search indexing, and content editor dashboards."
  },
  {
    id: 14,
    title: "News Portal",
    image: "/portfolio/News.png",
    category: "Media",
    tags: ["HTML5", "Vanilla CSS", "REST API"],
    desc: "Simple, layout-optimized news feed rendering real-time articles, categorization tabs, and clean reading grids."
  }
];

const categories = ["All", "Management", "Finance", "Web3", "EdTech", "Real Estate", "Corporate", "Media", "Utility"];

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState(null);

  // SpotLight Card mouse movement & 3D Tilt handler
  const handleMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set spotlight positions
    cardEl.style.setProperty('--mouse-x', `${x}px`);
    cardEl.style.setProperty('--mouse-y', `${y}px`);

    // Set 3D Tilt rotations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / (rect.height / 2) * 8; // Max 8 degrees Y axis
    const rotateY = (x - centerX) / (rect.width / 2) * 8; // Max 8 degrees X axis

    cardEl.style.setProperty('--rotate-x', `${rotateX}deg`);
    cardEl.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  // Reset 3D Tilt when mouse leaves card
  const handleMouseLeave = (cardEl) => {
    if (!cardEl) return;
    cardEl.style.setProperty('--rotate-x', '0deg');
    cardEl.style.setProperty('--rotate-y', '0deg');
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Case Studies</span>
          <h2 className="section-title">Our Production Project History</h2>
          <p className="section-description">
            A showcase of custom applications, portals, and software infrastructures designed and deployed globally.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="filter-controls">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search by project name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`tab-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              const cardRef = useRef(null);
              return (
                <div 
                  key={project.id}
                  ref={cardRef}
                  className="project-card interactive-hover"
                  onMouseMove={(e) => handleMouseMove(e, cardRef.current)}
                  onMouseLeave={() => handleMouseLeave(cardRef.current)}
                  onClick={() => setActiveModalProject(project)}
                >
                  <div className="spotlight-layer"></div>
                  
                  {/* Cyber viewfinder corner brackets */}
                  <div className="card-corner top-left"></div>
                  <div className="card-corner top-right"></div>
                  <div className="card-corner bottom-left"></div>
                  <div className="card-corner bottom-right"></div>
                  
                  <div className="card-image-wrapper">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-image"
                      loading="lazy"
                    />
                    <div className="card-overlay">
                      <span className="view-details-btn">View Details</span>
                    </div>
                  </div>

                  <div className="card-info">
                    <div className="card-info-header">
                      <span className="project-category-tag">{project.category}</span>
                      <span className="tech-tag-indicator"></span>
                    </div>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.desc.slice(0, 115)}...</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <h3>No Projects Found</h3>
              <p>We couldn't find any projects matching your search term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Details Modal */}
      {activeModalProject && (
        <div className="modal-backdrop" onClick={() => setActiveModalProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModalProject(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="modal-body">
              <div className="modal-image-pane">
                <img 
                  src={activeModalProject.image} 
                  alt={activeModalProject.title} 
                  className="modal-full-image"
                />
              </div>
              
              <div className="modal-info-pane">
                <div>
                  <span className="modal-category">{activeModalProject.category}</span>
                  <h2 className="modal-title">{activeModalProject.title}</h2>
                  <p className="modal-desc">{activeModalProject.desc}</p>
                </div>
                
                <div className="modal-meta" style={{ borderTop: 'none', paddingTop: 0 }}>
                  <div className="modal-footer-action">
                    <a href="#contact" onClick={() => { setActiveModalProject(null); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary modal-cta">
                      Request Consultation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
