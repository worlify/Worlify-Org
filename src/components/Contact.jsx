import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Users, Instagram, Share2, CheckCircle, Home } from 'lucide-react';
import { db } from '../lib/supabase';
import hqImage from '../assets/images/city_hq_isometric_1783241554295.jpg';
import styles from '../styles/Contact.module.css';

/**
 * Contact Component
 * Renders the "Contact Us" page of Worlify NGO.
 * This layout has been redesigned to EXACTLY match the uploaded design mockup.
 */
export default function Contact({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all fields before sending.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await db.registerContactMessage(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );

      if (error) {
        throw new Error(error.message || 'Failed to send message.');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactPage} id="contact-page-container">
      {/* Header Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.tag}>GET IN TOUCH</span>
          <h1 className={styles.title}>We'd Love to Hear From You</h1>
          <p className={styles.subtitle}>
            Whether you have questions about our initiatives, want to volunteer, or are interested in partnering for a cause, our team is ready to connect.
          </p>
        </div>
      </section>

      {/* Main Content Area: Form on the left, info on the right */}
      <section className={styles.mainContainer}>
        <div className={styles.gridContainer}>
          
          {/* Left Column: Contact Form Card */}
          <div className={styles.formColumn}>
            <div className={styles.formCard} id="contact-form-card">
              <h2 className={styles.formHeader}>Send us a Message</h2>

              {success ? (
                <div className={styles.successState} id="contact-success-box">
                  <CheckCircle size={56} className={styles.successIcon} />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out to Worlify. A coordinator will review your message and contact you shortly.</p>
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

                  {/* Desktop side-by-side inputs for Name and Email */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="contact-name">Full Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="contact-subject">Subject</label>
                    <div className={styles.selectWrapper}>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                        <option value="Partnership Proposals">Partnership Proposals</option>
                        <option value="Donations Support">Donations Support</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="6"
                      placeholder="How can we help you?"
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
                    {loading ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: HQ Contact Info Blocks */}
          <div className={styles.infoColumn}>
            <div className={styles.columnHeader}>
              <h2>Our Headquarters</h2>
            </div>

            <div className={styles.contactBlocks}>
              
              {/* Address block */}
              <div className={styles.contactBlockItem} id="block-address">
                <div className={`${styles.iconWrapper} ${styles.blueIcon}`}>
                  <MapPin size={20} />
                </div>
                <div className={styles.blockInfo}>
                  <span className={styles.blockTitleBlue}>GLOBAL ADDRESS</span>
                  <p className={styles.blockText}>
                    1280 Humanitarian Way, Suite 500<br />
                    San Francisco, CA 94103, USA
                  </p>
                </div>
              </div>

              {/* Email block */}
              <div className={styles.contactBlockItem} id="block-email">
                <div className={`${styles.iconWrapper} ${styles.greenIcon}`}>
                  <Mail size={20} />
                </div>
                <div className={styles.blockInfo}>
                  <span className={styles.blockTitleGreen}>EMAIL REACH</span>
                  <p className={styles.blockText}>
                    hello@worlify.ngo<br />
                    support@worlify.ngo
                  </p>
                </div>
              </div>

              {/* Phone block */}
              <div className={styles.contactBlockItem} id="block-phone">
                <div className={`${styles.iconWrapper} ${styles.purpleIcon}`}>
                  <Phone size={20} />
                </div>
                <div className={styles.blockInfo}>
                  <span className={styles.blockTitlePurple}>CONTACT NUMBER</span>
                  <p className={styles.blockText}>
                    +1 (555) 234-5678<br />
                    Mon - Fri, 9am - 6pm PST
                  </p>
                </div>
              </div>

            </div>

            {/* Divider Line */}
            <div className={styles.divider}></div>

            {/* Follow Impact Section */}
            <div className={styles.followSection}>
              <h3>FOLLOW OUR IMPACT</h3>
              <div className={styles.socialButtons}>
                <a href="#" className={styles.socialBtn} aria-label="Website">
                  <Globe size={18} />
                </a>
                <a href="#" className={styles.socialBtn} aria-label="Community">
                  <Users size={18} />
                </a>
                <a href="#" className={styles.socialBtn} aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" className={styles.socialBtn} aria-label="Share">
                  <Share2 size={18} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Isometric NGO Headquarters Banner Section */}
      <section className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <img 
            src={hqImage} 
            alt="NGO Headquarters Architectural City Layout" 
            className={styles.mapImage} 
          />
          
          {/* Floating badge 1: NGO Headquarters */}
          <div className={styles.badgeHq}>
            <Home size={14} className={styles.badgeIconHq} />
            <span>NGO Headquarters</span>
          </div>

          {/* Floating badge 2: Worlify Global Hub */}
          <div className={styles.cardGlobalHub}>
            <div className={styles.cardHubHeader}>
              <MapPin size={16} className={styles.cardHubPin} />
              <h4>Worlify Global Hub</h4>
            </div>
            <p>Our central operations for North American initiatives and donor coordination.</p>
          </div>
        </div>
      </section>

      {/* Common Questions Section (FAQs) */}
      <section className={styles.faqSection}>
        <div className={styles.faqContent}>
          <h2 className={styles.faqTitle}>Common Questions</h2>
          <p className={styles.faqSubtitle}>Quick answers to help you get started with Worlify.</p>
          
          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <h3>How are donations used?</h3>
              <p>90% of all donations go directly to program services, with 10% covering transparency reporting and essential logistics.</p>
            </div>
            
            <div className={styles.faqCard}>
              <h3>Can I volunteer remotely?</h3>
              <p>Yes! We have several digital volunteering opportunities including data analysis, design, and outreach coordination.</p>
            </div>
            
            <div className={styles.faqCard}>
              <h3>Are donations tax-deductible?</h3>
              <p>Yes, Worlify is a registered NGO with 12A and 80G status. All contributions are eligible for tax benefits.</p>
            </div>
            
            <div className={styles.faqCard}>
              <h3>How do I track my impact?</h3>
              <p>Every donor receives a personalized annual report and real-time updates via our donor portal dashboard.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
