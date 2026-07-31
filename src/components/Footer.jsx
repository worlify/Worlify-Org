import React from 'react';
import { Globe, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, Youtube, ChevronRight } from 'lucide-react';
import styles from '../styles/Footer.module.css';
import logo from '../assets/images/logo.png';

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
            <div className={styles.brandLogo}>
              <img src={logo.src || logo} alt="Worlify Foundation" className={styles.logoImg} />
            </div>
            <p className={styles.brandTagline}>
              Worlify is a registered multi-cause non-governmental organization working on the frontlines of global relief. We believe in transparency, collaborative action, and making local impact globally across 5 critical pillars.
            </p>
          </div>

          {/* Causes Pillar Links */}
          <div>
            <h4 className={styles.columnTitle}>Our Focus Pillars</h4>
            <ul className={styles.linksList}>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes-education')} id="footer-cause-education">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Education Support</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes-healthcare')} id="footer-cause-healthcare">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Healthcare Programs</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes-food-nutrition')} id="footer-cause-nutrition">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Food & Nutrition</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes-skill-development')} id="footer-cause-skills">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Skill Development</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes-environment')} id="footer-cause-environment">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Environmental Action</span>
              </li>
            </ul>
          </div>

          {/* Core Page Navigation */}
          <div>
            <h4 className={styles.columnTitle}>Quick Navigation</h4>
            <ul className={styles.linksList}>
              <li className={styles.linkItem} onClick={() => setActiveTab('home')} id="footer-nav-home">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Home Page</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('campaign-padhaga-har-baccha')} id="footer-nav-campaign">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Campaign (Top 10)</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('causes-education')} id="footer-nav-causes">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Active Causes</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('volunteer')} id="footer-nav-volunteer">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Volunteer Hub</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('donate')} id="footer-nav-donate">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Make a Donation</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('contact')} id="footer-nav-contact">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Contact Us</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('faqs')} id="footer-nav-faqs">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>FAQs</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('legal')} id="footer-nav-legal">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Legal & Transparency</span>
              </li>
              <li className={styles.linkItem} onClick={() => setActiveTab('auth')} id="footer-nav-auth">
                <ChevronRight size={16} className={styles.linkChevron} />
                <span>Supporter Portal</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className={styles.columnTitle}>Get In Touch</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <div className={styles.iconCircle}>
                  <MapPin size={16} className={styles.contactIcon} />
                </div>
                <span>A/189, GROUND FLOOR NARAYAN ENCLAVE, KASIMPUR BIRUHA, LUCKNOW, UTTAR PRADESH, 226501, INDIA</span>
              </div>
              <div className={`${styles.contactRow} ${styles.contactRowCenter}`}>
                <div className={styles.iconCircle}>
                  <Phone size={16} className={styles.contactIcon} />
                </div>
                <span>+91 9161321513</span>
              </div>
              <div className={`${styles.contactRow} ${styles.contactRowCenter}`}>
                <div className={styles.iconCircle}>
                  <Mail size={16} className={styles.contactIcon} />
                </div>
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
            <a href="https://www.facebook.com/share/1KR1fknnr8/" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
              <Facebook size={18} className={styles.socialIcon} id="footer-social-facebook" />
            </a>
            <a href="https://x.com/worlifyngo" target="_blank" rel="noopener noreferrer" title="Twitter / X" aria-label="Twitter / X">
              <Twitter size={18} className={styles.socialIcon} id="footer-social-twitter" />
            </a>
            <a href="https://www.instagram.com/worlifyngo?igsh=MWNwMmkzand2ZzhzMQ==" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
              <Instagram size={18} className={styles.socialIcon} id="footer-social-instagram" />
            </a>
            <a href="https://www.linkedin.com/company/worlifyfoundation/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
              <Linkedin size={18} className={styles.socialIcon} id="footer-social-linkedin" />
            </a>
            <a href="https://youtube.com/@worlifyfoundation?si=VQuQRmWtRaBNQBQW" target="_blank" rel="noopener noreferrer" title="YouTube" aria-label="YouTube">
              <Youtube size={18} className={styles.socialIcon} id="footer-social-youtube" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
