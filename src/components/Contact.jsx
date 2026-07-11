import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ChevronDown, ChevronUp, Building2, Landmark } from 'lucide-react';
import { db } from '../lib/supabase';
import styles from '../styles/Contact.module.css';

/**
 * Contact Component
 * Redesigned to match the provided mockup layout.
 */
export default function Contact({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Accordion open/close state
  const [expandedAccordions, setExpandedAccordions] = useState({
    partnership: true,
    communication: false,
    programme: false,
    volunteering: false
  });

  // Regional office active tab
  const [activeOfficeTab, setActiveOfficeTab] = useState('head_office');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleAccordion = (panel) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Pack phone number into message field to preserve it safely in Supabase contact_messages table
      const finalMessage = `Phone: ${formData.phone}\n\nMessage:\n${formData.message}`;

      const { error } = await db.registerContactMessage(
        formData.name,
        formData.email,
        formData.subject,
        finalMessage
      );

      if (error) {
        throw new Error(error.message || 'Failed to send message.');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Office data for regional tabs
  const offices = {
    head_office: {
      address: 'A/1, JAN KALYAN BHAWAN-NEAR SMS COLLEGE, KASIMPUR BIRUHA, LUCKNOW, UTTAR PRADESH, 226501, INDIA',
      phone: '+91-9161321513',
      email: 'supportworlify@gmail.com'
    },
    regd_office: {
      address: 'A/189, GROUND FLOOR NARAYAN ENCLAVE, KASIMPUR BIRUHA, LUCKNOW, UTTAR PRADESH, 226501, INDIA',
      phone: '+91-9161321513',
      email: 'supportworlify@gmail.com'
    }
  };

  return (
    <div className={styles.contactPage} id="contact-page-container">

      {/* 1. Main Grid: Info columns left, Helpdesk form right */}
      <section className={styles.mainContainer}>
        <div className={styles.gridContainer}>

          {/* Left Column: Direct Contacts */}
          <div className={styles.infoColumn}>
            <div className={styles.contactSection}>
              <h3 className={styles.sectionHeader}>FOR CORPORATE PARTNERSHIPS</h3>
              <p className={styles.sectionText}>For all queries relating to corporate partnerships:</p>
              <a href="mailto:supportworlify@gmail.com" className={styles.emailLink}>
                supportworlify@gmail.com
              </a>
            </div>

            <div className={styles.contactSection}>
              <h3 className={styles.sectionHeader}>DONATION RELATED QUERIES</h3>

              <div className={styles.subSection}>
                <h4 className={styles.subSectionHeader}>FOR NEW DONORS</h4>
                <p className={styles.sectionText}>RAVI: +91 9161321513 / <a href="mailto:ravikumarverma.co.in@gmail.com" className={styles.inlineEmail}>ravikumarverma.co.in@gmail.com</a></p>
                <p className={styles.sectionText}>Or write to us at <a href="mailto:worlifyfoundation@gmail.com" className={styles.inlineEmail}>worlifyfoundation@gmail.com</a></p>
              </div>

              <div className={styles.subSection}>
                <h4 className={styles.subSectionHeader}>FOR EXISTING DONORS</h4>
                <p className={styles.sectionText}>For all queries regarding donation receipts/certificates:</p>
                <a href="mailto:worlifyfoundation@gmail.com" className={styles.emailLink}>
                  worlifyfoundation@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.contactSection}>
              <h3 className={styles.sectionHeader}>FOR ALL GENERAL QUERIES</h3>
              <a href="mailto:supportworlify@gmail.com" className={styles.emailLink}>
                supportworlify@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column: Helpdesk Form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard} id="contact-form-card">
              <h2 className={styles.formHeader}>HELPDESK</h2>
              <p className={styles.formSubheader}>For any queries, request, complaint or feedback write to us</p>

              {success ? (
                <div className={styles.successState} id="contact-success-box">
                  <CheckCircle size={48} className={styles.successIcon} />
                  <h3>Submitted Successfully!</h3>
                  <p>Thank you. Your message has been received. Our support team will get in touch with you shortly.</p>
                  <button
                    className={styles.resetBtn}
                    onClick={() => setSuccess(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  {errorMsg && (
                    <div className={styles.errorBox}>
                      <p>{errorMsg}</p>
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <label htmlFor="contact-subject">Subject *</label>
                    <div className={styles.selectWrapper}>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Corporate Partnerships">Corporate Partnerships</option>
                        <option value="Donation Queries">Donation Queries</option>
                        <option value="Volunteering Options">Volunteering Options</option>
                        <option value="Feedback & Support">Feedback & Support</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="contact-name">Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="contact-phone">Phone *</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="contact-email">Email *</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        placeholder="Your Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                    id="contact-submit-btn"
                  >
                    {loading ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Accordions Section */}
      <section className={styles.accordionSection}>
        <div className={styles.accordionContainer}>

          {/* Panel 1: Partnership Support */}
          <div className={styles.accordionItem}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleAccordion('partnership')}
            >
              <span>PARTNERSHIP SUPPORT</span>
              {expandedAccordions.partnership ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {expandedAccordions.partnership && (
              <div className={styles.accordionContent}>
                <div className={styles.accordionSubBlock}>
                  <h4 className={styles.subBlockTitle}>CORPORATE SOCIAL RESPONSIBILITY (CSR) RELATED QUERIES</h4>

                  <div className={styles.contactGrid}>
                    <div className={styles.gridCard}>
                      <span className={styles.cardRegion}>NORTH REGION</span>
                      <p className={styles.cardContactInfo}>Ravi Kumar Verma</p>
                      <p className={styles.cardContactInfo}>+91 9161321513</p>
                      <a href="mailto:ravikumarverma.co.in@gmail.com" className={styles.cardEmailLink}>ravikumarverma.co.in@gmail.com</a>
                    </div>

                    {/* <div className={styles.gridCard}>
                      <span className={styles.cardRegion}>WEST REGION</span>
                      <p className={styles.cardContactInfo}>Amit Shukla</p>
                      <p className={styles.cardContactInfo}>+91 9967115859</p>
                      <a href="mailto:amit.shukla@sankalpindia.org" className={styles.cardEmailLink}>amit.shukla@sankalpindia.org</a>
                    </div> */}
                  </div>
                </div>

                <div className={styles.accordionSubBlock} style={{ marginTop: '24px' }}>
                  <h4 className={styles.subBlockTitle}>OTHER PARTNERSHIPS</h4>

                  <div className={styles.contactGrid}>
                    <div className={styles.gridCard}>
                      <span className={styles.cardRegion}>EVENT RELATED QUERIES</span>
                      <p className={styles.cardContactInfo}>Support Worlify</p>
                      <a href="mailto:supportworlify@gmail.com" className={styles.cardEmailLink}>supportworlify@gmail.com</a>
                    </div>

                    {/* <div className={styles.gridCard}>
                      <span className={styles.cardRegion}>PHILANTHROPY ADVISORY</span>
                      <p className={styles.cardContactInfo}>Nitin Patel</p>
                      <a href="mailto:nitin.patel@sankalpindia.org" className={styles.cardEmailLink}>nitin.patel@sankalpindia.org</a>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel 2: Communication Associations */}
          <div className={styles.accordionItem}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleAccordion('communication')}
            >
              <span>COMMUNICATION RELATED ASSOCIATIONS</span>
              {expandedAccordions.communication ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {expandedAccordions.communication && (
              <div className={styles.accordionContent}>
                <p className={styles.accordionPlaceholderText}>For media relations, PR inquiries and public communication associations:</p>
                <p className={styles.accordionPlaceholderText}>
                  <strong>Media Desk:</strong> <a href="mailto:supportworlify@gmail.com" className={styles.inlineEmail}>supportworlify@gmail.com</a> or call +91-9161321513
                </p>
              </div>
            )}
          </div>

          {/* Panel 3: Programme Related Queries */}
          <div className={styles.accordionItem}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleAccordion('programme')}
            >
              <span>PROGRAMME RELATED QUERIES</span>
              {expandedAccordions.programme ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {expandedAccordions.programme && (
              <div className={styles.accordionContent}>
                <p className={styles.accordionPlaceholderText}>For questions regarding our ongoing campaigns, execution tracking and field status:</p>
                <p className={styles.accordionPlaceholderText}>
                  <strong>Program Office:</strong> <a href="mailto:supportworlify@gmail.com" className={styles.inlineEmail}>supportworlify@gmail.com</a> or call +91-9161321513
                </p>
              </div>
            )}
          </div>

          {/* Panel 4: Volunteering & Jobs */}
          <div className={styles.accordionItem}>
            <button
              className={styles.accordionHeader}
              onClick={() => toggleAccordion('volunteering')}
            >
              <span>VOLUNTEERING & JOBS</span>
              {expandedAccordions.volunteering ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {expandedAccordions.volunteering && (
              <div className={styles.accordionContent}>
                <p className={styles.accordionPlaceholderText}>To join our team or apply for internships, fellowship programs and voluntary duties:</p>
                <p className={styles.accordionPlaceholderText}>
                  <strong>Human Resources:</strong> <a href="mailto:supportworlify@gmail.com" className={styles.inlineEmail}>supportworlify@gmail.com</a>. Please attach your resume and cover letter.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. Visit Us Here (Head Office & Map) */}
      <section className={styles.visitUsSection}>
        <div className={styles.visitContainer}>
          <h2 className={styles.visitHeader}>VISIT US HERE</h2>

          <div className={styles.officeBlock}>
            <h3 className={styles.officeType}>HEAD OFFICE</h3>
            <p className={styles.officeAddress}>A/1, JAN KALYAN BHAWAN-NEAR SMS COLLEGE, KASIMPUR BIRUHA, LUCKNOW, UTTAR PRADESH, 226501, INDIA</p>
            <p className={styles.officeDetails}>Phone: +91-9161321513</p>
            <p className={styles.officeDetails}>Email: <a href="mailto:supportworlify@gmail.com" className={styles.inlineEmail}>supportworlify@gmail.com</a></p>

            <p className={styles.officeAddress} style={{ marginTop: '16px' }}><strong>Regd. Office:</strong></p>
            <p className={styles.officeAddress}>A/189, GROUND FLOOR NARAYAN ENCLAVE, KASIMPUR BIRUHA, LUCKNOW, UTTAR PRADESH, 226501, INDIA</p>
          </div>

          {/* Google Maps Iframe Embed container */}
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.9400421819164!2d81.0759911!3d26.778181099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be7a302a11e01%3A0x897b06736ed0e32c!2sWorlify%20Foundation!5e0!3m2!1sen!2sin!4v1783431168435!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Worlify Foundation Map Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. Regional Offices Section with tabs */}
      <section className={styles.regionalSection}>
        <div className={styles.regionalContainer}>
          <h2 className={styles.regionalHeader}>REGIONAL OFFICES</h2>

          {/* Tabs header */}
          <div className={styles.tabButtonsRow}>
            <button
              className={`${styles.tabBtn} ${activeOfficeTab === 'head_office' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveOfficeTab('head_office')}
            >
              Head Office
            </button>
            <button
              className={`${styles.tabBtn} ${activeOfficeTab === 'regd_office' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveOfficeTab('regd_office')}
            >
              Registered Office
            </button>
          </div>

          {/* Cards for active office */}
          <div className={styles.regionalCardsRow}>
            <div className={styles.regionalCard}>
              <div className={styles.cardIconWrapper}>
                <Building2 size={24} className={styles.cardIcon} />
              </div>
              <h4 className={styles.cardHeaderTitle}>ADDRESS</h4>
              <p className={styles.cardTextContent}>{offices[activeOfficeTab].address}</p>
            </div>

            <div className={styles.regionalCard}>
              <div className={styles.cardIconWrapper}>
                <Phone size={24} className={styles.cardIcon} />
              </div>
              <h4 className={styles.cardHeaderTitle}>PHONE</h4>
              <p className={styles.cardTextContent}>{offices[activeOfficeTab].phone}</p>
            </div>

            <div className={styles.regionalCard}>
              <div className={styles.cardIconWrapper}>
                <Mail size={24} className={styles.cardIcon} />
              </div>
              <h4 className={styles.cardHeaderTitle}>EMAIL</h4>
              <a href={`mailto:${offices[activeOfficeTab].email}`} className={styles.cardEmailLinkText}>
                {offices[activeOfficeTab].email}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
