'use client';

import React from 'react';
import styles from '../styles/Home.module.css';
import IndiaRealMap from './IndiaRealMap';

export default function ProgrammesMap() {
  return (
    <section className={styles.mapSection} id="programmes-across-india">
      <div className="container">
        <div className={styles.mapGrid}>
          {/* Left Column: Heading & Text */}
          <div className={styles.mapContent}>
            <h2 className={styles.mapHeading}>
              WORLIFY FOUNDATION'S<br />
              PROGRAMMES<br />
              ACROSS INDIA
            </h2>

            <p className={styles.mapDescription}>
              Worlify Foundation is actively implementing impactful programmes across multiple states in India, with a strong focus on uplifting underserved communities. Our initiatives are designed to create lasting change in the areas of education, healthcare, nutrition, environmental sustainability, and social empowerment.
            </p>
          </div>

          {/* Right Column: Real India Map Visual */}
          <div className={styles.mapVisualContainer}>
            <IndiaRealMap />
          </div>
        </div>
      </div>
    </section>
  );
}
