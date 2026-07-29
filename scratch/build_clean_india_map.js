const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://cdn.jsdelivr.net/npm/@svg-maps/india/india.svg';

https.get(url, (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    let svgContent = rawData.trim();

    // Extract path elements cleanly
    const pathRegex = /<path[\s\S]*?\/>/g;
    const paths = svgContent.match(pathRegex) || [];

    const processedPaths = [];

    paths.forEach((pathStr) => {
      const idMatch = pathStr.match(/\bid="([^"]+)"/);
      const labelMatch = pathStr.match(/\baria-label="([^"]+)"/);
      const dMatch = pathStr.match(/\bd="([\s\S]*?)"\s*\/>/);

      if (!idMatch || !dMatch) return;

      const id = idMatch[1];
      const label = labelMatch ? labelMatch[1] : id;
      const d = dMatch[1].trim();

      // Remove Andaman & Nicobar (an) and Lakshadweep (ld) to prevent floating ocean dots
      if (id === 'an' || id === 'ld') return;

      let className = 'styles.stateInactive';
      let extraProps = '';

      if (id === 'up') {
        className = 'styles.stateUp';
        extraProps = ` onMouseEnter={(e) => handleMouseEnter('Uttar Pradesh', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}`;
      } else if (id === 'br') {
        className = 'styles.stateBihar';
        extraProps = ` onMouseEnter={(e) => handleMouseEnter('Bihar', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}`;
      }

      processedPaths.push(`      <path id="${id}" aria-label="${label}" className={${className}}${extraProps} d="${d}" />`);
    });

    const jsxCode = `'use client';

import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function IndiaRealMap() {
  const [tooltip, setTooltip] = useState(null);

  const handleMouseEnter = (name, event) => {
    const svgEl = event.currentTarget.ownerSVGElement;
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    setTooltip({
      name,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseMove = (event) => {
    if (!tooltip) return;
    const svgEl = event.currentTarget.ownerSVGElement;
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    setTooltip((prev) =>
      prev
        ? {
            ...prev,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          }
        : null
    );
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className={styles.realMapContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 612 696"
        className={styles.indiaRealSvg}
        aria-label="Map of India"
      >
${processedPaths.join('\n')}
      </svg>
      {tooltip && (
        <div
          className={styles.mapTooltip}
          style={{
            left: \`\${tooltip.x}px\`,
            top: \`\${tooltip.y - 12}px\`,
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}
`;

    fs.writeFileSync(path.join(__dirname, '../src/components/IndiaRealMap.jsx'), jsxCode);
    console.log(`Successfully generated interactive IndiaRealMap.jsx!`);
  });
}).on('error', (err) => {
  console.error('Error fetching SVG:', err);
});
