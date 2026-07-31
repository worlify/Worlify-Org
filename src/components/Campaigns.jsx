import React from 'react';
import { CAMPAIGNS_DATA, CAMPAIGNS_LIST } from '../data/campaignsData';
import CausePage from './causes/CausePage';
import styles from '../styles/Campaigns.module.css';

export default function Campaigns({ activeTab, setActiveTab, setDonationPreload, preloadedCause, clearPreload }) {
  // Identify target campaign or default to #1 Padhaga Har Baccha
  const campaignKeys = Object.keys(CAMPAIGNS_DATA);
  const matchedKey = campaignKeys.find(key => CAMPAIGNS_DATA[key].tabKey === activeTab);
  const targetKey = matchedKey || 'padhaga-har-baccha';
  const campaignData = CAMPAIGNS_DATA[targetKey];

  if (!campaignData) return null;

  return (
    <div className={styles.campaignContainer} id={`campaign-wrapper-${campaignData.id}`}>
      {/* 1. Official Top Rank & Reason Banner matching user request image */}
      <div className={styles.topReasonBanner} style={{ '--banner-theme': campaignData.colors.primary }}>
        <div className={styles.bannerInner}>
          <div className={styles.rankBadge}>
            <span className={styles.rankNumber}>{campaignData.number}</span>
          </div>

          <div className={styles.bannerContent}>
            <div className={styles.titleRow}>
              <h2 className={styles.campaignTitle}>{campaignData.title}</h2>
              <span className={styles.hindiSubTitle}>– ( {campaignData.subTitle} )</span>
            </div>

            <div className={styles.reasonBox}>
              <span className={styles.reasonLabel}>Reason:</span>
              <span className={styles.reasonText}>{campaignData.reason}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full Standard Cause Page view for rich content */}
      <CausePage 
        causeData={campaignData} 
        setActiveTab={setActiveTab} 
        setDonationPreload={setDonationPreload} 
      />
    </div>
  );
}
