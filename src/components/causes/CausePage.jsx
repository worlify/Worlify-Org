import React, { useEffect } from 'react';
import CauseHero from './CauseHero';
import HowWeHelp from './HowWeHelp';
import ImpactStats from './ImpactStats';
import CauseGallery from './CauseGallery';
import CauseCTA from './CauseCTA';
import styles from '../../styles/CausePage.module.css';

export default function CausePage({ causeData, setActiveTab, setDonationPreload }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [causeData?.id]);

  if (!causeData) return null;

  const { colors } = causeData;

  const themeVariables = {
    '--cause-primary': colors.primary,
    '--cause-secondary': colors.secondary,
    '--cause-gradient': colors.gradient,
    '--cause-light-bg': colors.lightBg,
    '--cause-dark-bg': colors.darkBg,
    '--cause-border': colors.border,
    '--cause-glow': colors.glow,
  };

  return (
    <div 
      className={styles.causePage} 
      style={themeVariables}
      id={`cause-page-${causeData.id}`}
    >
      {/* 1. Hero Section */}
      <CauseHero 
        causeData={causeData} 
        setActiveTab={setActiveTab} 
        setDonationPreload={setDonationPreload} 
      />

      {/* 2. How We Help Section */}
      <HowWeHelp 
        items={causeData.howWeHelp} 
        causeTitle={causeData.title} 
      />

      {/* 3. Impact Statistics Section */}
      <ImpactStats 
        stats={causeData.impactStats} 
      />

      {/* 4. Gallery Section */}
      <CauseGallery 
        gallery={causeData.gallery} 
        causeTitle={causeData.title} 
      />

      {/* 5. Final CTA Banner */}
      <CauseCTA 
        cta={causeData.cta} 
        causeTitle={causeData.title} 
        setActiveTab={setActiveTab} 
        setDonationPreload={setDonationPreload} 
      />
    </div>
  );
}
