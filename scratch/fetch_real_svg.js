const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://cdn.jsdelivr.net/npm/@svg-maps/india/india.svg';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Process full untruncated SVG text
    let svgText = data.trim();

    // Remove Andaman & Nicobar (id="an") and Lakshadweep (id="ld") island dots as requested
    svgText = svgText.replace(/<path[\s\S]*?id="(an|ld)"[\s\S]*?\/>/g, '');

    // Replace root svg tag to bind CSS module class and crop viewBox tighter to mainland India (viewBox="50 0 540 600" or "40 0 530 590")
    svgText = svgText.replace(/<svg[\s\S]*?>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 0 540 590" className={styles.indiaRealSvg} aria-label="Map of India">`);

    // Add state classes based on id
    svgText = svgText.replace(/<path[\s\S]*?id="([^"]+)"[\s\S]*?\/>/g, (fullMatch, id) => {
      if (id === 'up') {
        return fullMatch.replace('<path', `<path className={styles.stateUp}`);
      }
      if (id === 'br') {
        return fullMatch.replace('<path', `<path className={styles.stateBihar}`);
      }
      return fullMatch.replace('<path', `<path className={styles.stateInactive}`);
    });

    const componentCode = `'use client';

import React from 'react';
import styles from '../styles/Home.module.css';

export default function IndiaRealMap() {
  return (
    <div className={styles.realMapContainer}>
      ${svgText}
      {/* Centroid text overlays for UP and BIHAR */}
      <svg viewBox="40 0 540 590" className={styles.labelOverlaySvg}>
        <text x="260" y="255" className={styles.mapStateLabel}>UP</text>
        <text x="375" y="275" className={styles.mapStateLabel}>BIHAR</text>
      </svg>
    </div>
  );
}
`;

    fs.writeFileSync(path.join(__dirname, '../src/components/IndiaRealMap.jsx'), componentCode);
    console.log('Successfully generated clean IndiaRealMap.jsx without island dots!');
  });
}).on('error', (err) => {
  console.error('Error fetching SVG:', err);
});
