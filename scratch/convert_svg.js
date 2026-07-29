const fs = require('fs');
const path = require('path');

const svgContent = fs.readFileSync(path.join(__dirname, '../src/assets/india.svg'), 'utf8');

// Replace class names dynamically on paths
let jsxContent = svgContent
  .replace(/<svg[\s\S]*?>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 696" className={styles.indiaRealSvg} aria-label="Map of India">`)
  .replace(/aria-label="/g, 'aria-label="');

// Wrap paths with style binding
jsxContent = jsxContent.replace(/<path\s+id="([^"]+)"\s+aria-label="([^"]+)"\s+d="([^"]+)"\s*\/>/g, (match, id, label, d) => {
  if (id === 'up') {
    return `<path id="${id}" aria-label="${label}" className={styles.stateUp} d="${d}" />`;
  }
  if (id === 'br') {
    return `<path id="${id}" aria-label="${label}" className={styles.stateBihar} d="${d}" />`;
  }
  return `<path id="${id}" aria-label="${label}" className={styles.stateInactive} d="${d}" />`;
});

const componentCode = `'use client';

import React from 'react';
import styles from '../styles/Home.module.css';

export default function IndiaRealMap() {
  return (
    <div className={styles.realMapContainer}>
      ${jsxContent.trim()}
      {/* Centroid text overlays for UP and BIHAR */}
      <svg viewBox="0 0 612 696" className={styles.labelOverlaySvg}>
        <text x="270" y="245" className={styles.mapStateLabel}>UP</text>
        <text x="370" y="270" className={styles.mapStateLabel}>BIHAR</text>
      </svg>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../src/components/IndiaRealMap.jsx'), componentCode);
console.log('Successfully generated IndiaRealMap.jsx!');
