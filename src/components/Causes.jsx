import React from 'react';
import { CAUSES_DATA } from '../data/causesData';
import CausePage from './causes/CausePage';

export default function Causes({ activeTab, setActiveTab, setDonationPreload, preloadedCause, clearPreload }) {
  // Identify requested cause tab or default to Education
  const causeKeys = Object.keys(CAUSES_DATA);
  const matchedKey = causeKeys.find(key => CAUSES_DATA[key].tabKey === activeTab);
  const targetCauseKey = matchedKey || 'education';
  const causeData = CAUSES_DATA[targetCauseKey];

  return (
    <CausePage 
      causeData={causeData} 
      setActiveTab={setActiveTab} 
      setDonationPreload={setDonationPreload} 
    />
  );
}
