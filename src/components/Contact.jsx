import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [copiedType, setCopiedType] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="ambient-glow contact-glow"></div>
      
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Connect</span>
          <h2 className="section-title">Let's Build Something Together</h2>
          <p className="section-description">
            Reach out directly for project inquiries, technical consultations, or custom quotes.
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
                <span className="details-label">Call Business Representative</span>
                <a href="tel:0969704325" className="details-value">096 970 4325</a>
              </div>
              <button 
                onClick={() => handleCopy('096 970 4325', 'phone1')}
                className={`copy-btn ${copiedType === 'phone1' ? 'copied' : ''}`}
                title="Copy to clipboard"
              >
                {copiedType === 'phone1' ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Phone 2 */}
            <div className="info-card interactive-hover">
              <div className="card-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div className="card-details">
                <span className="details-label">Alternative Direct Line</span>
                <a href="tel:0765496978" className="details-value">076 549 6978</a>
              </div>
              <button 
                onClick={() => handleCopy('076 549 6978', 'phone2')}
                className={`copy-btn ${copiedType === 'phone2' ? 'copied' : ''}`}
                title="Copy to clipboard"
              >
                {copiedType === 'phone2' ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Email */}
            <div className="info-card interactive-hover">
              <div className="card-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div className="card-details">
                <span className="details-label">Send an Email Inquiry</span>
                <a href="mailto:info@servicelogi.com" className="details-value">info@servicelogi.com</a>
              </div>
              <button 
                onClick={() => handleCopy('info@servicelogi.com', 'email')}
                className={`copy-btn ${copiedType === 'email' ? 'copied' : ''}`}
                title="Copy to clipboard"
              >
                {copiedType === 'email' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Contact form pane */}
          <div className="contact-form-pane">
            {formSubmitted ? (
              <div className="form-success-alert">
                <div className="success-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting ServiceLogi. Our team will review your inquiry and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. POS System Quote"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, and requirements in detail..."
                  />
                </div>

                <button type="submit" className="btn-primary form-submit-btn">
                  <span>Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
