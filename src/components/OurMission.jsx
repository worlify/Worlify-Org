import React, { useState } from 'react';
import { Target, Eye, BookOpen, Activity, Heart, ShieldCheck, Leaf, Download } from 'lucide-react';
import styles from '../styles/OurMission.module.css';

/**
 * OurMission Component
 * Renders the core organizational mission/vision, interactive 5 pillars, and detailed financial reports.
 */
export default function OurMission({ setActiveTab }) {
  const [selectedPillar, setSelectedPillar] = useState('education');

  const pillarsData = {
    education: {
      name: 'Education Support',
      icon: <BookOpen size={20} />,
      color: '#0d9488', // Teal
      bgLight: 'rgba(13, 148, 136, 0.1)',
      desc: 'Providing tutoring, resources, digital literacy, and educational materials to children in marginalized areas. We establish community study circles, provide scholarships, and refurbish rural schools with desk setups, blackboards, and books to promote continuous learning.'
    },
    healthcare: {
      name: 'Healthcare Programs',
      icon: <Activity size={20} />,
      color: '#06b6d4', // Cyan
      bgLight: 'rgba(6, 182, 212, 0.1)',
      desc: 'Coordinating medical camps, health checkups, distribution of hygiene kits, and sanitization awareness. We partner with local healthcare professionals to run diagnostic clinics and run specialized maternal and child health sessions in remote locations.'
    },
    welfare: {
      name: 'Child Welfare',
      icon: <Heart size={20} />,
      color: '#f97316', // Orange
      bgLight: 'rgba(249, 115, 22, 0.1)',
      desc: 'Securing food security, clothing, safety networks, and counseling for vulnerable youth. Our welfare programs provide direct nutritional support to malnourished children and run recreational therapy centers where they can grow safely.'
    },
    empowerment: {
      name: 'Women Empowerment',
      icon: <ShieldCheck size={20} />,
      color: '#8b5cf6', // Violet
      bgLight: 'rgba(139, 92, 246, 0.1)',
      desc: 'Enabling self-reliance through vocational skill training, financial literacy workshops, and small business grants. We support women-led micro-enterprises and self-help groups, teaching coding, tailoring, and agricultural techniques.'
    },
    environment: {
      name: 'Environmental Action',
      icon: <Leaf size={20} />,
      color: '#10b981', // Emerald
      bgLight: 'rgba(16, 185, 129, 0.1)',
      desc: 'Fostering ecological balance through community tree planting, solar lamp installations, and clean energy initiatives. We educate families on sustainable farming practices, water conservation techniques, and zero-waste lifestyles.'
    }
  };

  return (
    <div className={styles.missionWrapper} id="our-mission-page">
      {/* 1. Hero Section */}
      <section className={styles.missionHero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle}>Purpose & Pillars</span>
          <h1 className={styles.heroTitle}>
            Empowering Communities, <span className={styles.highlight}>Securing Futures</span>
          </h1>
          <p className={styles.heroDesc}>
            At Worlify, our mission is to eliminate systemic barriers to human potential. We focus on holistic regional growth, funding programs that support children, families, and ecological systems side by side.
          </p>
        </div>
      </section>

      {/* 2. Core Beliefs: Mission & Vision */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard} id="mission-card">
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
                <Target size={28} color="var(--primary-color)" />
              </div>
              <h2 className={styles.valueTitle}>Our Mission Statement</h2>
              <p className={styles.valueText}>
                To empower marginalized communities by providing the tools, education, and health resources necessary for self-sustained growth, ensuring every individual has the opportunity to thrive with dignity and security.
              </p>
            </div>

            <div className={styles.valueCard} id="vision-card">
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                <Eye size={28} color="var(--secondary-color)" />
              </div>
              <h2 className={styles.valueTitle}>Our Long-term Vision</h2>
              <p className={styles.valueText}>
                A world where geographic location and social status do not determine a human's potential, and where sustainable, transparent aid models create lasting global equity and community resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Focus Pillars Selector */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Interconnected Development Model</h2>
            <p className={styles.sectionSubtitle}>
              We believe progress in one area fuels progress in all others. Click on our five focus pillars below to explore how we create comprehensive regional growth.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {Object.keys(pillarsData).map((key) => {
              const pillar = pillarsData[key];
              const isSelected = selectedPillar === key;
              return (
                <div 
                  key={key} 
                  className={styles.pillarCard}
                  onClick={() => setSelectedPillar(key)}
                  style={isSelected ? { borderColor: pillar.color, backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-md)' } : {}}
                >
                  <div 
                    className={styles.pillarIcon} 
                    style={{ backgroundColor: pillar.color }}
                  >
                    {pillar.icon}
                  </div>
                  <div className={styles.pillarName}>{pillar.name}</div>
                  <div className={styles.pillarDesc}>Click to view focus</div>
                </div>
              );
            })}
          </div>

          {/* Active Pillar Detail View */}
          {selectedPillar && (
            <div className={styles.pillarDetailPanel}>
              <div 
                className={styles.detailIconLarge}
                style={{ backgroundColor: pillarsData[selectedPillar].color }}
              >
                {React.cloneElement(pillarsData[selectedPillar].icon, { size: 36 })}
              </div>
              <div className={styles.detailContent}>
                <h3 className={styles.detailTitle}>{pillarsData[selectedPillar].name}</h3>
                <p className={styles.detailText}>{pillarsData[selectedPillar].desc}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Financial Transparency & Accountability Section */}
      <section className={styles.transparencySection}>
        <div className="container">
          <div className={styles.accountabilityCard}>
            <div className={styles.accountabilityGrid}>
              
              <div className={styles.financialIntro}>
                <span className={styles.auditBadge}>Verified and Audited</span>
                <h2 className={styles.financialTitle}>Radical Accountability</h2>
                <p className={styles.financialDesc}>
                  We pride ourselves on an industry-leading <strong>92% efficiency rating</strong>. For every dollar donated, 92 cents go directly to on-the-ground programs, bypassing heavy middle layers and providing verifiable regional outcomes.
                </p>

                {/* Progress bars */}
                <div className={styles.statBars}>
                  <div className={styles.barItem}>
                    <div className={styles.barHeader}>
                      <span>PROGRAM SERVICES</span>
                      <span>92%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '92%', backgroundColor: 'var(--primary-color)' }}></div>
                    </div>
                  </div>

                  <div className={styles.barItem}>
                    <div className={styles.barHeader}>
                      <span>ADMINISTRATIVE COSTS</span>
                      <span>5%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '5%', backgroundColor: 'var(--secondary-color)' }}></div>
                    </div>
                  </div>

                  <div className={styles.barItem}>
                    <div className={styles.barHeader}>
                      <span>FUNDRAISING OPERATIONS</span>
                      <span>3%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '3%', backgroundColor: 'var(--accent-color)' }}></div>
                    </div>
                  </div>
                </div>

                <button 
                  className={styles.downloadBtn}
                  onClick={() => alert('Downloading Annual Report 2023... (In production this will retrieve the PDF file)')}
                >
                  <Download size={16} />
                  Download 2023 Annual Report
                </button>
              </div>

              {/* Graphic Efficiency Ring */}
              <div className={styles.efficiencyCircleWrapper}>
                <div className={styles.concentricRing}>
                  <div className={styles.ringValue}>92%</div>
                  <div className={styles.ringLabel}>EFFICIENCY</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
