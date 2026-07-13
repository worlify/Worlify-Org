import React from 'react';
import { Globe, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Heart } from 'lucide-react';
import styles from '../styles/Footer.module.css';

/**
 * Footer Component
 * Standard structured NGO footer that lets users navigate to various causes or pages.
 */
export default function Footer({ setActiveTab }) {
  return (
    <footer className={styles.footer} id="main-footer">
      <div className={styles.footerContainer}>
        {/* Main Grid Section */}
        <div className={styles.grid}>
          {/* Brand Introduction */}
          <div className={styles.brandColumn}>
            <p className={styles.brandTagline}>
              Worlify is a registered multi-cause non-governmental organization working on the frontlines of global relief. We believe in transparency, collaborative action, and making local impact globally across 5 critical pillars.
            </p>
          </div>

          {/* Causes Pillar Links */}
          <div>
            <h4 className={styles.columnTitle}>Our Focus Pillars</h4>
            <ul className={styles.linksList}>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes')} id="footer-cause-education">Education Support</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes')} id="footer-cause-healthcare">Healthcare Programs</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes')} id="footer-cause-welfare">Child Welfare Services</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes')} id="footer-cause-empowerment">Women Empowerment</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes')} id="footer-cause-environment">Environmental Action</li>
            </ul>
          </div>

          {/* Core Page Navigation */}
          <div>
            <h4 className={styles.columnTitle}>Quick Navigation</h4>
            <ul className={styles.linksList}>
              <li className={styles.linkItem} onClick={() => setActiveTab('home')} id="footer-nav-home">Home Page</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes')} id="footer-nav-causes">Active Causes</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('volunteer')} id="footer-nav-volunteer">Volunteer Hub</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('donate')} id="footer-nav-donate">Make a Donation</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('contact')} id="footer-nav-contact">Contact Us</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('faqs')} id="footer-nav-faqs">FAQs</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('legal')} id="footer-nav-legal">Legal & Transparency</li>
              <li className={styles.linkItem} onClick={() => setActiveTab('auth')} id="footer-nav-auth">Supporter Portal</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className={styles.columnTitle}>Get In Touch</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <MapPin size={16} className={styles.logoIcon} />
                <span>A/189, GROUND FLOOR NARAYAN ENCLAVE, KASIMPUR BIRUHA, LUCKNOW, UTTAR PRADESH, 226501, INDIA</span>
              </div>
              <div className={styles.contactRow}>
                <Phone size={16} className={styles.logoIcon} />
                <span>+91 9161321513</span>
              </div>
              <div className={styles.contactRow}>
                <Mail size={16} className={styles.logoIcon} />
                <span>supportworlify@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className={styles.bottomBar}>
          <div>
            <span>© {new Date().getFullYear()} Worlify Foundation. All rights reserved.</span>
          </div>

          <div className={styles.socials}>
            <Twitter size={18} className={styles.socialIcon} id="footer-social-twitter" />
            <Facebook size={18} className={styles.socialIcon} id="footer-social-facebook" />
            <Instagram size={18} className={styles.socialIcon} id="footer-social-instagram" />
            <Heart size={18} className={styles.socialIcon} fill="var(--secondary-color)" color="var(--secondary-color)" />
          </div>
        </div>
      </div>
    </footer>
  );
}
