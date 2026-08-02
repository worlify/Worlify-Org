import React from 'react';
import { ChevronRight, Heart, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import styles from '../../styles/CausePage.module.css';

export default function CauseHero({ causeData, setActiveTab, setDonationPreload }) {
  const { title, subtitle, heading, description, badge, heroImage } = causeData;

  const handleDonateClick = () => {
    if (setDonationPreload) {
      setDonationPreload(title);
    }
    setActiveTab('donate');
  };

  const handleVolunteerClick = () => {
    setActiveTab('volunteer');
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBgCircle} />

      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <span
            className={styles.breadcrumbItem}
            onClick={() => setActiveTab('home')}
          >
            Home
          </span>
          <ChevronRight size={14} className={styles.breadcrumbSeparator} />
          <span
            className={styles.breadcrumbItem}
            onClick={() => setActiveTab('causes')}
          >
            Our Causes
          </span>
          <ChevronRight size={14} className={styles.breadcrumbSeparator} />
          <span className={styles.breadcrumbActive}>{title}</span>
        </nav>

        {/* Hero Grid */}
        <div className={styles.heroGrid}>
          {/* Left Content */}
          <div className={styles.heroContent}>
            <div className={styles.subtitleBadge}>
              <Heart size={12} fill="currentColor" />
              <span>{subtitle}</span>
            </div>

            <h1 className={styles.causeTitle}>{title}</h1>
            <h2 className={styles.heroHeading}>{heading}</h2>
            <p className={styles.heroDescription}>{description}</p>

            <div className={styles.heroActions}>
              <button
                className={styles.primaryBtn}
                onClick={handleDonateClick}
              >
                Donate Now <ArrowRight size={16} />
              </button>
              <button
                className={styles.secondaryBtn}
                onClick={handleVolunteerClick}
              >
                Become a Volunteer
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className={styles.heroVisualWrapper}>
            <div className={styles.heroImageContainer}>
              <img
                src={heroImage}
                alt={title}
                className={styles.heroImage}
                loading="eager"
              />
            </div>

            <div className={styles.heroFloatingBadge}>
              <div className={styles.badgeIconWrapper}>
                <ShieldCheck size={20} />
              </div>
              <div className={styles.badgeTextContainer}>
                <span className={styles.badgeTextMain}>{badge}</span>
                <span className={styles.badgeTextSub}>Worlify Social Welfare Initiatives</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
