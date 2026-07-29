const fs = require('fs');
const path = require('path');

const contentPath = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\75b58e81-68b8-47c7-b720-56fac3272eca\\.system_generated\\steps\\135\\content.md';

const rawFile = fs.readFileSync(contentPath, 'utf8');

const viewBoxIdx = rawFile.indexOf('viewBox="0 0 612 696"');
const svgStart = rawFile.lastIndexOf('<svg', viewBoxIdx);
const svgEnd = rawFile.lastIndexOf('</svg>') + 6;

console.log('svgStart:', svgStart, 'svgEnd:', svgEnd);

let svgText = rawFile.substring(svgStart, svgEnd);

// Replace root svg tag to bind CSS module class
svgText = svgText.replace(/<svg[\s\S]*?>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 696" className={styles.indiaRealSvg} aria-label="Map of India">`);

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
      <svg viewBox="0 0 612 696" className={styles.labelOverlaySvg}>
        <text x="260" y="255" className={styles.mapStateLabel}>UP</text>
        <text x="375" y="275" className={styles.mapStateLabel}>BIHAR</text>
      </svg>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../src/components/IndiaRealMap.jsx'), componentCode);
console.log('Successfully generated complete IndiaRealMap.jsx');
