import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { 
  CheckCircle, 
  Users, 
  Award, 
  TrendingUp, 
  Globe, 
  Briefcase, 
  Heart, 
  Check 
} from 'lucide-react';
import styles from '../styles/Volunteer.module.css';

/**
 * Volunteer Component - High Fidelity Redesign matching Mockup
 * Integrates with database services and provides interactive scrolling.
 */
export default function Volunteer({ user, setActiveTab }) {
  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredCause, setPreferredCause] = useState('Education');
  const [motivation, setMotivation] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Pre-fill user details if authenticated
  useEffect(() => {
    if (user) {
      const fullName = user.first_name ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}` : '';
      setFullName(fullName);
      setEmail(user.email || '');
    } else {
      setFullName('');
      setEmail('');
    }
  }, [user]);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phoneNumber || !motivation) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Map phoneNumber to skills, motivation to message
      const { data, error } = await db.registerVolunteer(
        fullName,
        email,
        preferredCause,
        `Phone: ${phoneNumber}`,
        motivation
      );

      if (!error) {
        setSuccess(true);
        setPhoneNumber('');
        setMotivation('');
      } else {
        alert('Registration failed: ' + error.message);
      }
    } catch (err) {
      console.error('Error submitting volunteer registration: ', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    alert(`Thank you for subscribing! ${newsletterEmail} has been added to our monthly newsletter.`);
    setNewsletterEmail('');
  };

  return (
    <div className={styles.volunteerContainer} id="volunteer-view-container">
      
      {/* 1. Hero Cover Banner */}
      <section className={styles.heroSection} id="volunteer-hero">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContentContainer}>
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>Be the Change You Want to See</h1>
            <p className={styles.heroSubtitle}>
              Join a global movement of dreamers and doers committed to radical transparency and sustainable human impact.
            </p>
            <div className={styles.heroBtns}>
              <button 
                className={styles.startVolBtn} 
                onClick={() => scrollToSection('volunteer-form')}
                id="hero-start-volunteering-btn"
              >
                Start Volunteering
              </button>
              <button 
                className={styles.partnerBtn} 
                onClick={() => scrollToSection('corporate-partnerships')}
                id="hero-partner-btn"
              >
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Volunteer With Us Section */}
      <section className={styles.whySection} id="why-volunteer-section">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Volunteer With Us?</h2>
          <p className={styles.sectionSubtitle}>
            We provide the framework for you to create meaningful change while growing personally and professionally.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {/* Card 1: Official Certification */}
          <div className={styles.featureCard} id="why-card-cert">
            <div className={`${styles.iconWrapper} ${styles.blueIcon}`}>
              <Award size={24} />
            </div>
            <h3 className={styles.cardTitle}>Official Certification</h3>
            <p className={styles.cardText}>
              Gain formal recognition for your support with certificates that boost your professional portfolio and academic credentials.
            </p>
          </div>

          {/* Card 2: Global Community */}
          <div className={styles.featureCard} id="why-card-community">
            <div className={`${styles.iconWrapper} ${styles.greenIcon}`}>
              <Users size={24} />
            </div>
            <h3 className={styles.cardTitle}>Global Community</h3>
            <p className={styles.cardText}>
              Join a network of over 50,000 active change-makers from 120 countries, fostering collaboration across borders.
            </p>
          </div>

          {/* Card 3: Measurable Impact */}
          <div className={styles.featureCard} id="why-card-impact">
            <div className={`${styles.iconWrapper} ${styles.purpleIcon}`}>
              <TrendingUp size={24} />
            </div>
            <h3 className={styles.cardTitle}>Measurable Impact</h3>
            <p className={styles.cardText}>
              See the direct results of your efforts through our real-time impact dashboard and annual transparency reports.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Form and Info Split Section */}
      <section className={styles.applySection} id="volunteer-form">
        <div className={styles.applyGrid}>
          
          {/* Left Column: Context / Brand Copy */}
          <div className={styles.infoCol}>
            <span className={styles.applyTag}>Apply Today</span>
            <h2 className={styles.applyTitle}>Lend Your Hands, Transform Lives</h2>
            <p className={styles.applyDesc}>
              Choose a cause that resonates with your values. Whether it's educating a child or protecting the environment, your time is the most valuable gift you can give.
            </p>
            <div className={styles.checklist}>
              <div className={styles.checkItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>Flexible scheduling (Remote/On-field)</span>
              </div>
              <div className={styles.checkItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>Personalized mentorship programs</span>
              </div>
              <div className={styles.checkItem}>
                <Check size={18} className={styles.checkIcon} />
                <span>Access to exclusive NGO networking events</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card / Success Feedback */}
          <div className={styles.formCard} id="volunteer-interactive-form-box">
            {success ? (
              <div className={styles.successCard} id="volunteer-success-container">
                <CheckCircle size={48} className={styles.successIcon} />
                <h3 className={styles.successTitle}>Application Received!</h3>
                <p className={styles.successText}>
                  Thank you for stepping forward, {fullName}. We have logged your details under our <strong>{preferredCause}</strong> program. Our field coordinator will reach out to you within 3–5 working days.
                </p>
                <div className={styles.successActions}>
                  {user ? (
                    <button 
                      type="button" 
                      className={styles.viewStatusBtn}
                      onClick={() => setActiveTab('dashboard')}
                      id="success-dashboard-view-btn"
                    >
                      View Status in Dashboard
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.viewStatusBtn}
                      onClick={() => setActiveTab('auth')}
                      id="success-auth-redirect-btn"
                    >
                      Sign In to Track Status
                    </button>
                  )}
                  <button 
                    type="button" 
                    className={styles.anotherAppBtn}
                    onClick={() => setSuccess(false)}
                    id="success-submit-another-btn"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="mockup-volunteer-form">
                <div className={styles.formGrid}>
                  {/* Full Name */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      id="form-fullname-input"
                    />
                  </div>

                  {/* Email Address */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      id="form-email-input"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      className={styles.input}
                      placeholder="+1 (555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      id="form-phone-input"
                    />
                  </div>

                  {/* Cause Preference */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Cause Preference</label>
                    <select
                      className={styles.select}
                      value={preferredCause}
                      onChange={(e) => setPreferredCause(e.target.value)}
                      id="form-cause-select"
                    >
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Child Welfare">Child Welfare</option>
                      <option value="Women Empowerment">Women Empowerment</option>
                      <option value="Environment">Environment</option>
                    </select>
                  </div>

                  {/* Message (Why do you want to join Worlify?) */}
                  <div className={styles.fullWidthGroup}>
                    <label className={styles.label}>Why do you want to join Worlify?</label>
                    <textarea
                      className={styles.textarea}
                      placeholder="Tell us about your motivation..."
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      required
                      id="form-motivation-textarea"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                  id="form-submit-app-btn"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 4. Corporate & CSR Partnerships Horizontal Bento Grid */}
      <section className={styles.corporateSection} id="corporate-partnerships">
        <div className={styles.corporateCard}>
          <div className={styles.corporateGrid}>
            {/* Left Column (Slate Navy Background Content) */}
            <div className={styles.corporateLeft}>
              <h2 className={styles.corpTitle}>Corporate & CSR Partnerships</h2>
              <p className={styles.corpDesc}>
                We collaborate with forward-thinking organizations to design high-impact CSR strategies. From employee engagement programs to large-scale infrastructure projects, let's co-create a legacy of good.
              </p>
              <div className={styles.corpList}>
                <div className={styles.corpItem}>
                  <Briefcase size={18} className={styles.corpIcon} />
                  <span>Brand Alignment</span>
                </div>
                <div className={styles.corpItem}>
                  <TrendingUp size={18} className={styles.corpIcon} />
                  <span>Audited Reporting</span>
                </div>
                <div className={styles.corpItem}>
                  <Heart size={18} className={styles.corpIcon} />
                  <span>Employee Giving</span>
                </div>
                <div className={styles.corpItem}>
                  <Globe size={18} className={styles.corpIcon} />
                  <span>Global Scalability</span>
                </div>
              </div>
              <button 
                className={styles.partnerInquiryBtn}
                onClick={() => {
                  alert('Thank you for your corporate interest. Our partnership department will contact your CSR representatives shortly.');
                }}
                id="corporate-partner-inquiry-btn"
              >
                Partner Inquiry
              </button>
            </div>

            {/* Right Column (Handshake Image Container) */}
            <div className={styles.corporateRight}>
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                alt="Corporate CSR Handshake" 
                className={styles.corpImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Newsletter Signup Banner */}
      <section className={styles.newsletterSection} id="newsletter-signup-banner">
        <div className={styles.newsInner}>
          <h2 className={styles.newsTitle}>Ready to make an impact?</h2>
          <p className={styles.newsDesc}>
            Join our monthly newsletter for stories of change, transparency reports, and upcoming volunteer opportunities.
          </p>
          <form onSubmit={handleNewsletterSubmit} className={styles.newsForm}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.newsInput}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              id="newsletter-email-input"
            />
            <button type="submit" className={styles.newsBtn} id="newsletter-subscribe-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
