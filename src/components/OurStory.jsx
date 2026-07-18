import React from 'react';
import { Heart } from 'lucide-react';
import styles from '../styles/OurStory.module.css';
import ourStoryKidsImg from '../assets/images/our_story_kids.jpg';

/**
 * OurStory Component
 * Displays the historical origins, narrative, timeline milestones, and value metrics of Worlify.
 */
export default function OurStory({ setActiveTab }) {
  const timelineData = [
    {
      year: '2012',
      title: 'The Foundation',
      desc: 'Founded in a small garage by three friends with a vision for transparent, community-led giving models. We started with direct educational micro-grants for 15 children in Lucknow.'
    },
    {
      year: '2015',
      title: 'First Global Hub',
      desc: 'Opened our first field operations office, scaling to support 10,000+ local educational grants. We expanded our scope to include clean drinking water systems and primary healthcare.'
    },
    {
      year: '2019',
      title: 'Scale for Change & Medical Mobilization',
      desc: 'Partnered with international health agencies to build 15 sustainable clinics in underserved rural communities. These clinics run entirely on renewable energy and are staffed by local professionals.'
    },
    {
      year: '2023',
      title: 'Radical Digital Transparency',
      desc: 'Launched our real-time database tracker, allowing donors to view transaction-level impact. Every contribution is mapped directly to the school supply receipt or health camp invoice.'
    }
  ];

  const statsData = [
    {
      number: '12+',
      label: 'Years of Dedication',
      desc: 'Building sustainable communities since 2012.'
    },
    {
      number: '45k+',
      label: 'Lives Impacted',
      desc: 'Families enabled through direct aid programs.'
    },
    {
      number: '120+',
      label: 'Active Villages',
      desc: 'Supporting regional nodes with continuous resources.'
    },
    {
      number: '100%',
      label: 'Fund Transparency',
      desc: 'Publicly verifiable ledger of all receipt deployments.'
    }
  ];

  return (
    <div className={styles.storyWrapper} id="our-story-page">
      {/* 1. Hero Section */}
      <section className={styles.storyHero}>
        <div className={styles.heroContent}>
          <span className={styles.establishedBadge}>ESTABLISHED 2012</span>
          <h1 className={styles.heroTitle}>
            Our Journey: From A Small Seed To <span className={styles.highlight}>Global Impact</span>
          </h1>
          <p className={styles.heroDesc}>
            Worlify was founded on a simple, disruptive premise: aid should be direct, transparent, and community-led. For over a decade, we have bypassed traditional bureaucracies to put resources exactly where they belong.
          </p>
        </div>
      </section>

      {/* 2. Editorial Narrative Section */}
      <section className={styles.editorialSection}>
        <div className="container">
          <div className={styles.editorialGrid}>
            <div className={styles.editorialText}>
              <span className={styles.sectionLabel}>How It Began</span>
              <h2 className={styles.editorialTitle}>A promise written on a whiteboard, now supported by thousands.</h2>
              <p className={styles.editorialParagraph}>
                In late 2012, three humanitarian workers sat in a room, disillusioned by the heavy administrative overhead and lack of clear tracing in global charity models. They asked a single question: <em>"Can we create a framework where a donor knows exactly which child received their desk, books, or vaccine?"</em>
              </p>
              <div className={styles.quoteBlock}>
                "We didn't set out to build a giant institution. We set out to build a transparent window between kind hearts and communities in need."
              </div>
              <p className={styles.editorialParagraph}>
                What started as a localized campaign to supply desks to a rural school quickly grew. By leveraging lightweight mobile technologies and partnering with local micro-entrepreneurs, Worlify created a resilient distribution network that ensures 92% of all resources fund active field operations directly.
              </p>
            </div>
            <div className={styles.editorialImageWrapper}>
              <img 
                src={ourStoryKidsImg.src || ourStoryKidsImg} 
                alt="Children showing peace sign and smiling" 
                className={styles.editorialImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Alternating Interactive Timeline */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>A Decade of Dedication</h2>
            <p className={styles.sectionSubtitle}>
              Our growth is measured in trust and tangible transformations. Here is how we scaled our grassroots solutions over the years.
            </p>
          </div>

          <div className={styles.timelineContainer}>
            {timelineData.map((milestone, index) => {
              const alignmentClass = index % 2 === 0 ? styles.timelineLeft : styles.timelineRight;
              return (
                <div key={milestone.year} className={`${styles.timelineItem} ${alignmentClass}`}>
                  <div className={styles.timelineCard}>
                    <div className={styles.timelineYear}>{milestone.year}</div>
                    <h3 className={styles.timelineCardTitle}>{milestone.title}</h3>
                    <p className={styles.timelineCardDesc}>{milestone.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Glassmorphism Stats Cards */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {statsData.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <p className={styles.statDesc}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Be Part of Our Next Chapter</h2>
          <p className={styles.ctaDesc}>
            Every milestone in our story was made possible by everyday heroes—donors, volunteers, and local leaders. Join us to co-author what comes next.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaBtnPrimary} onClick={() => setActiveTab('donate')}>
              <Heart size={16} fill="var(--primary-color)" />
              Support Our Programs
            </button>
            <button className={styles.ctaBtnSecondary} onClick={() => setActiveTab('volunteer')}>
              Become a Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
