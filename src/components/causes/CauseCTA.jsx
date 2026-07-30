import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import styles from '../../styles/CausePage.module.css';

export default function CauseCTA({ cta, causeTitle, setActiveTab, setDonationPreload }) {
  const handleDonateClick = () => {
    if (setDonationPreload) {
      setDonationPreload(causeTitle);
    }
    setActiveTab('donate');
  };

  const handleVolunteerClick = () => {
    setActiveTab('volunteer');
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaBgPattern} />
          
          <h2 className={styles.ctaHeadline}>{cta.headline}</h2>
          <p className={styles.ctaSubtext}>{cta.subtext}</p>

          <div className={styles.ctaActions}>
            <button 
              className={styles.ctaPrimaryBtn}
              onClick={handleDonateClick}
            >
              Donate Now <ArrowRight size={18} />
            </button>

            <button 
              className={styles.ctaSecondaryBtn}
              onClick={handleVolunteerClick}
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
