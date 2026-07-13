'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Activity, 
  Heart, 
  Briefcase, 
  Smile, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Users,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import { db } from '../lib/supabase';
import styles from '../styles/Home.module.css';

// Import local generated assets
import heroSchoolGirl from '../assets/images/hero_school_girl.png';
import awardCeremony from '../assets/images/award_ceremony.png';

export default function Home({ setActiveTab, setDonationPreload, isLocalMode }) {
  // Live stats dynamically updated by db if available
  const [livesTarget, setLivesTarget] = useState(2000);
  const [livesCount, setLivesCount] = useState(0);
  const [villagesCount, setVillagesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [statesCount, setStatesCount] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data, error } = await db.getDonations();
        if (!error && data) {
          const totalAmount = data.reduce((sum, item) => sum + Number(item.amount), 0);
          // Dynamically increase lives target based on donations
          setLivesTarget(2000 + Math.floor(totalAmount / 500));
        }
      } catch (e) {
        console.error('Error loading stats: ', e);
      }
    };
    loadStats();
  }, []);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds fast counting animation
    let animationFrameId;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutQuad
      const easeOutProgress = progress * (2 - progress);

      setLivesCount(Math.floor(easeOutProgress * livesTarget));
      setVillagesCount(Math.floor(easeOutProgress * 5));
      setProjectsCount(Math.floor(easeOutProgress * 15));
      setStatesCount(Math.floor(easeOutProgress * 3));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [livesTarget]);

  // 10 high-resolution sliding backgrounds representing education and community support
  const heroImages = [
    heroSchoolGirl.src || heroSchoolGirl,
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1597006338631-2a837f26e69a?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600"
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Auto-slide hero background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Rotate every 6 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div id="home-view" className={styles.homeContainer}>
      
      {/* 1. Hero Cover Banner Section */}
      <section className={styles.heroSection} id="hero-banner">
        {/* Dynamic sliding background images */}
        <div className={styles.heroSliderContainer}>
          {heroImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className={`${styles.heroSlide} ${currentHeroIndex === idx ? styles.activeHeroSlide : ''}`}
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          ))}
        </div>

        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              BRINGING SMILES <br />
              <span className={styles.heroTitleHighlight}>THROUGH EDUCATION <br />& EMPOWERMENT</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Empowering children, women, and communities across India to achieve their potential.
            </p>
            <div className={styles.heroActions}>
              <button 
                className={styles.primaryBtn} 
                onClick={() => setActiveTab('donate')}
                id="hero-donate-now-btn"
              >
                Support a Cause <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro Text Section */}
      <section className={styles.introSection} id="intro-about">
        <div className="container">
          <div className={styles.introContent}>
            <p className={styles.introHighlight}>
              <strong>Worlify Foundation</strong> is a development organisation in India, focusing on children's education, healthcare, livelihood, and women empowerment. We believe in grassroots empowerment and achieving sustainable development goals.
            </p>
            <p className={styles.introText}>
              Our grassroots programmes address the needs of underprivileged sections of society. We partner with grassroots organisations and local communities to implement sustainable development initiatives, helping families secure healthcare, clean environments, and educational support.
            </p>
            <button 
              className={styles.readMoreLink} 
              onClick={() => setActiveTab('about')}
              id="intro-read-more-btn"
            >
              Read More <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Our Impact Section */}
      <section className={styles.impactSection} id="our-impact">
        <div className="container">
          <h2 className={styles.sectionHeading}>OUR IMPACT</h2>
          <div className={styles.impactDivider}></div>
          
          <div className={styles.impactGrid}>
            <div className={styles.impactCard} id="impact-card-lives">
              <div className={styles.impactValue}>{livesCount}+</div>
              <div className={styles.impactLabel}>LIVES</div>
              <div className={styles.impactSub}>children and families impacted directly so far</div>
            </div>
            
            <div className={styles.impactCard} id="impact-card-villages">
              <div className={styles.impactValue}>{villagesCount}+</div>
              <div className={styles.impactLabel}>VILLAGES</div>
              <div className={styles.impactSub}>and urban slums reached across the country</div>
            </div>
            
            <div className={styles.impactCard} id="impact-card-projects">
              <div className={styles.impactValue}>{projectsCount}+</div>
              <div className={styles.impactLabel}>PROJECTS</div>
              <div className={styles.impactSub}>focused on education, healthcare, and livelihood</div>
            </div>
            
            <div className={styles.impactCard} id="impact-card-states">
              <div className={styles.impactValue}>{statesCount}+</div>
              <div className={styles.impactLabel}>STATES</div>
              <div className={styles.impactSub}>covered under active grassroots operations</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Programmes Section */}
      <section className={styles.programmesSection} id="our-programmes">
        <div className="container">
          <h2 className={styles.sectionHeading}>OUR PROGRAMMES</h2>

          <div className={styles.programmeGrid}>
            {/* Programme 1: Education */}
            <div className={styles.programmeItem} id="prog-item-education">
              <div className={styles.programmeIconWrapper}>
                <svg viewBox="0 0 100 100" className={styles.programmeSvg} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 22,45 C 18,28 36,15 54,18 C 72,21 82,35 80,53 C 78,71 63,82 46,80 C 29,78 26,62 22,45 Z" fill="#FCEACD" />
                  <path d="M 28,68 L 48,74 L 52,74 L 72,68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M 28,68 C 28,68 38,62 48,65 L 48,74 C 38,71 28,68 28,68 Z" fill="#D97706" stroke="#334155" strokeWidth="2" />
                  <path d="M 72,68 C 72,68 62,62 52,65 L 52,74 C 62,71 72,68 72,68 Z" fill="#D97706" stroke="#334155" strokeWidth="2" />
                  <path d="M 30,38 C 30,38 38,32 48,35 L 48,65 C 38,62 30,38 30,38 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M 30,38 C 30,38 38,32 48,35 L 48,65 C 38,62 30,68 30,68 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M 70,38 C 70,38 62,32 52,35 L 52,65 C 62,62 70,68 70,68 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="50" y1="36" x2="50" y2="70" stroke="#334155" strokeWidth="2" />
                  <path d="M 34,44 Q 40,41 44,43" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 34,50 Q 40,47 44,49" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 34,56 Q 40,53 44,55" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 66,44 Q 60,41 56,43" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 66,50 Q 60,47 56,49" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 66,56 Q 60,53 56,55" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.programmeText}>
                <h3 className={`${styles.programmeTitle} ${styles.colorEdu}`}>EDUCATION</h3>
                <p className={styles.programmeDesc}>
                  Education, nutrition and holistic development of children
                </p>
              </div>
            </div>

            {/* Programme 2: Healthcare */}
            <div className={styles.programmeItem} id="prog-item-healthcare">
              <div className={styles.programmeIconWrapper}>
                <svg viewBox="0 0 100 100" className={styles.programmeSvg} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 25,48 C 21,30 33,18 51,20 C 69,22 79,32 77,50 C 75,68 62,79 44,77 C 26,75 29,66 25,48 Z" fill="#E8E2F5" />
                  <path d="M 50,72 C 50,72 26,52 26,38 C 26,26 36,18 46,24 C 50,28 50,28 50,28 C 50,28 50,28 54,24 C 64,18 74,26 74,38 C 74,52 50,72 50,72 Z" fill="#C084FC" opacity="0.3" />
                  <path d="M 50,72 C 50,72 26,52 26,38 C 26,26 36,18 46,24 C 50,28 50,28 50,28 C 50,28 50,28 54,24 C 64,18 74,26 74,38 C 74,52 50,72 50,72 Z" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M 22,46 L 36,46 L 41,35 L 46,55 L 51,28 L 56,50 L 60,42 L 64,46 L 78,46" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className={styles.programmeText}>
                <h3 className={`${styles.programmeTitle} ${styles.colorHealth}`}>HEALTHCARE</h3>
                <p className={styles.programmeDesc}>
                  Taking healthcare services to doorsteps of hard to reach communities
                </p>
              </div>
            </div>

            {/* Programme 3: Women Empowerment */}
            <div className={styles.programmeItem} id="prog-item-women">
              <div className={styles.programmeIconWrapper}>
                <svg viewBox="0 0 100 100" className={styles.programmeSvg} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 20,48 C 18,30 32,16 52,19 C 72,22 81,37 79,55 C 77,73 61,81 42,79 C 23,77 22,66 20,48 Z" fill="#DBEFEF" />
                  <path d="M 42,65 L 42,76 C 42,78 45,80 50,80 C 55,80 58,78 58,76 L 58,65" fill="#2DD4BF" opacity="0.3" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 38,62 C 34,60 34,50 38,48 C 38,48 38,44 42,44 C 44,44 46,46 46,48 C 46,46 48,44 51,44 C 54,44 55,47 55,49 C 55,47 58,45 61,45 C 64,45 66,48 66,52 C 66,56 64,65 58,66 C 54,67 44,66 38,62 Z" fill="#2DD4BF" opacity="0.4" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 36,60 C 36,60 42,52 49,54 C 51,55 52,57 52,59 C 52,61 48,63 42,63 C 38,63 36,60 36,60 Z" fill="#2DD4BF" opacity="0.5" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 46,48 L 46,55" stroke="#334155" strokeWidth="2" />
                  <path d="M 53,49 L 53,55" stroke="#334155" strokeWidth="2" />
                  <path d="M 59,51 L 59,57" stroke="#334155" strokeWidth="2" />
                  <line x1="28" y1="36" x2="33" y2="40" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="34" y1="26" x2="38" y2="32" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="50" y1="22" x2="50" y2="28" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="66" y1="26" x2="62" y2="32" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="72" y1="36" x2="67" y2="40" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.programmeText}>
                <h3 className={`${styles.programmeTitle} ${styles.colorWomen}`}>WOMEN EMPOWERMENT</h3>
                <p className={styles.programmeDesc}>
                  Empowering adolescent girls & women through community engagement
                </p>
              </div>
            </div>

            {/* Programme 4: Livelihood */}
            <div className={styles.programmeItem} id="prog-item-livelihood">
              <div className={styles.programmeIconWrapper}>
                <svg viewBox="0 0 100 100" className={styles.programmeSvg} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 23,45 C 19,27 34,16 52,18 C 70,20 81,32 79,50 C 77,68 64,79 46,77 C 28,75 27,63 23,45 Z" fill="#F4E9E2" />
                  <g transform="rotate(-3 50 50)">
                    <rect x="30" y="24" width="40" height="52" rx="4" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M 30,24 L 70,24 L 70,44 Z" fill="#F59E0B" opacity="0.1" />
                    <rect x="36" y="32" width="12" height="12" rx="2" fill="#E2E8F0" stroke="#334155" strokeWidth="2" />
                    <circle cx="42" cy="36" r="3" fill="#94A3B8" />
                    <path d="M 38,43 C 38,40 40,40 42,40 C 44,40 46,40 46,43 Z" fill="#94A3B8" />
                    <line x1="53" y1="34" x2="64" y2="34" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="53" y1="40" x2="60" y2="40" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="36" y1="52" x2="64" y2="52" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="36" y1="58" x2="64" y2="58" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                    <line x1="36" y1="64" x2="56" y2="64" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
              <div className={styles.programmeText}>
                <h3 className={`${styles.programmeTitle} ${styles.colorLive}`}>LIVELIHOOD</h3>
                <p className={styles.programmeDesc}>
                  Skill training and placement support for underprivileged youth
                </p>
              </div>
            </div>

            {/* Programme 5: Empowering Grassroots */}
            <div className={styles.programmeItem} id="prog-item-grassroots">
              <div className={styles.programmeIconWrapper}>
                <svg viewBox="0 0 100 100" className={styles.programmeSvg} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 22,46 C 18,29 33,15 51,18 C 69,21 80,33 78,51 C 76,69 63,80 45,78 C 27,76 26,63 22,46 Z" fill="#DFF4E5" />
                  <path d="M 28,44 C 28,26 72,26 72,44 C 72,46 64,48 50,48 C 36,48 28,44 28,44 Z" fill="#4ADE80" opacity="0.3" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 39,46 C 39,46 44,32 50,48" stroke="#334155" strokeWidth="1.5" fill="none" />
                  <path d="M 61,46 C 61,46 56,32 50,48" stroke="#334155" strokeWidth="1.5" fill="none" />
                  <line x1="28" y1="44" x2="50" y2="68" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <line x1="39" y1="47" x2="50" y2="68" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="61" y1="47" x2="50" y2="68" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="72" y1="44" x2="50" y2="68" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <rect x="44" y="66" width="12" height="12" rx="2" fill="#FFFFFF" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="50" y1="69" x2="50" y2="75" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
                  <line x1="47" y1="72" x2="53" y2="72" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.programmeText}>
                <h3 className={`${styles.programmeTitle} ${styles.colorGrass}`}>EMPOWERING GRASSROOTS</h3>
                <p className={styles.programmeDesc}>
                  Helping community-based organizations become locally sustainable
                </p>
              </div>
            </div>

            {/* Programme 6: Disaster Response */}
            <div className={styles.programmeItem} id="prog-item-disaster">
              <div className={styles.programmeIconWrapper}>
                <svg viewBox="0 0 100 100" className={styles.programmeSvg} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 24,46 C 20,29 32,15 50,17 C 68,19 80,31 78,49 C 76,67 63,78 45,76 C 27,74 28,63 24,46 Z" fill="#FCE6E2" />
                  <path d="M 50,56 C 50,56 40,48 40,42 C 40,36 45,33 50,37 C 55,33 60,36 60,42 C 60,48 50,56 50,56 Z" fill="#F87171" opacity="0.5" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M 28,62 C 28,62 34,54 44,57 C 46,58 48,60 46,63 C 44,66 38,68 32,67 C 30,67 28,62 28,62 Z" fill="#F87171" opacity="0.3" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M 32,67 Q 38,72 44,70 Q 50,68 50,60" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 72,62 C 72,62 66,54 56,57 C 54,58 52,60 54,63 C 56,66 62,68 68,67 C 70,67 72,62 72,62 Z" fill="#F87171" opacity="0.3" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M 68,67 Q 62,72 56,70 Q 50,68 50,60" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="50" cy="45" r="12" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="2,2" />
                </svg>
              </div>
              <div className={styles.programmeText}>
                <h3 className={`${styles.programmeTitle} ${styles.colorDisaster}`}>DISASTER RESPONSE</h3>
                <p className={styles.programmeDesc}>
                  Reach out and respond to the needs of the disaster-affected people
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SDG Sustainable Development Goals Section */}
      <section className={styles.sdgSection} id="sdg-grid">
        <div className="container">
          <div className={styles.sdgIntro}>TOWARDS ACHIEVING</div>
          <h2 className={styles.sectionHeading}>SUSTAINABLE DEVELOPMENT GOALS</h2>

          <div className={styles.hexagonGrid}>
            
            {/* Hexagon 1: SDG 3 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 110" className={styles.hexSvg} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="sdg-shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                  </filter>
                  <linearGradient id="grad-sdg3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#CBB4E5" />
                    <stop offset="100%" stopColor="#835EBE" />
                  </linearGradient>
                </defs>
                <path d="M 56.9 7 L 86.1 24 Q 93 28 93 36 L 93 74 Q 93 82 86.1 86 L 56.9 103 Q 50 107 43.1 103 L 13.9 86 Q 7 82 7 74 L 7 36 Q 7 28 13.9 24 L 43.1 7 Q 50 3 56.9 7 Z" fill="url(#grad-sdg3)" />
                {/* 3D Slit Groove Shadow */}
                <ellipse cx="50" cy="56.5" rx="38" ry="2.2" fill="#000000" opacity="0.32" filter="url(#sdg-shadow-blur)" />
                <line x1="8" y1="55" x2="92" y2="55" stroke="#000000" strokeWidth="0.8" opacity="0.22" />
                
                {/* Icon: Heart Pulse */}
                <g transform="translate(0, 4)">
                  <path d="M 50 37 Q 50 37 36 26 C 29 20 40 12 50 22 C 60 12 71 20 64 26 Z" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 31 28 L 41 28 L 44 20 L 47 36 L 51 14 L 54 31 L 57 25 L 60 28 L 69 28" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Text: GOOD HEALTH & WELL BEING #3 */}
                <text x="50" y="73" fill="white" fontSize="5.8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.2">GOOD HEALTH &amp;</text>
                <text x="50" y="81" fill="white" fontSize="5.8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.2">WELL BEING</text>
                <text x="50" y="96" fill="white" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">#3</text>
              </svg>
            </div>

            {/* Hexagon 2: SDG 5 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 110" className={styles.hexSvg} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad-sdg5" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EC6EA4" />
                    <stop offset="100%" stopColor="#DE3A7E" />
                  </linearGradient>
                </defs>
                <path d="M 56.9 7 L 86.1 24 Q 93 28 93 36 L 93 74 Q 93 82 86.1 86 L 56.9 103 Q 50 107 43.1 103 L 13.9 86 Q 7 82 7 74 L 7 36 Q 7 28 13.9 24 L 43.1 7 Q 50 3 56.9 7 Z" fill="url(#grad-sdg5)" />
                {/* 3D Slit Groove Shadow */}
                <ellipse cx="50" cy="56.5" rx="38" ry="2.2" fill="#000000" opacity="0.32" filter="url(#sdg-shadow-blur)" />
                <line x1="8" y1="55" x2="92" y2="55" stroke="#000000" strokeWidth="0.8" opacity="0.22" />

                {/* Icon: Combined Gender Equality */}
                <g transform="translate(0, 3)">
                  <circle cx="50" cy="26" r="8" fill="none" stroke="white" strokeWidth="2.5" />
                  {/* Female cross */}
                  <line x1="50" y1="34" x2="50" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="46" y1="38" x2="54" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Male arrow */}
                  <line x1="56" y1="20" x2="63" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="58" y1="13" x2="63" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="63" y1="13" x2="63" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Equals sign */}
                  <line x1="47" y1="24" x2="53" y2="24" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="47" y1="28" x2="53" y2="28" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </g>

                {/* Text: GENDER EQUALITY #5 */}
                <text x="50" y="73" fill="white" fontSize="5.8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.2">GENDER</text>
                <text x="50" y="81" fill="white" fontSize="5.8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.2">EQUALITY</text>
                <text x="50" y="96" fill="white" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">#5</text>
              </svg>
            </div>

            {/* Hexagon 3: SDG 4 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 110" className={styles.hexSvg} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad-sdg4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#EAA31A" />
                  </linearGradient>
                </defs>
                <path d="M 56.9 7 L 86.1 24 Q 93 28 93 36 L 93 74 Q 93 82 86.1 86 L 56.9 103 Q 50 107 43.1 103 L 13.9 86 Q 7 82 7 74 L 7 36 Q 7 28 13.9 24 L 43.1 7 Q 50 3 56.9 7 Z" fill="url(#grad-sdg4)" />
                {/* 3D Slit Groove Shadow */}
                <ellipse cx="50" cy="56.5" rx="38" ry="2.2" fill="#000000" opacity="0.32" filter="url(#sdg-shadow-blur)" />
                <line x1="8" y1="55" x2="92" y2="55" stroke="#000000" strokeWidth="0.8" opacity="0.22" />

                {/* Icon: Graduation Cap */}
                <g transform="translate(0, 4)">
                  <polygon points="50 14, 78 22, 50 30, 22 22" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M 32 25 L 32 31 C 32 36 68 36 68 31 L 68 25" fill="white" stroke="white" strokeWidth="1" />
                  <path d="M 72 23 L 78 25 L 78 35" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="78" cy="35" r="1.5" fill="white" />
                </g>

                {/* Text: QUALITY EDUCATION #4 */}
                <text x="50" y="73" fill="white" fontSize="5.8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.2">QUALITY</text>
                <text x="50" y="81" fill="white" fontSize="5.8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.2">EDUCATION</text>
                <text x="50" y="96" fill="white" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">#4</text>
              </svg>
            </div>

            {/* Hexagon 4: SDG 8 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 110" className={styles.hexSvg} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad-sdg8" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6ECC6E" />
                    <stop offset="100%" stopColor="#3B9C3B" />
                  </linearGradient>
                </defs>
                <path d="M 56.9 7 L 86.1 24 Q 93 28 93 36 L 93 74 Q 93 82 86.1 86 L 56.9 103 Q 50 107 43.1 103 L 13.9 86 Q 7 82 7 74 L 7 36 Q 7 28 13.9 24 L 43.1 7 Q 50 3 56.9 7 Z" fill="url(#grad-sdg8)" />
                {/* 3D Slit Groove Shadow */}
                <ellipse cx="50" cy="56.5" rx="38" ry="2.2" fill="#000000" opacity="0.32" filter="url(#sdg-shadow-blur)" />
                <line x1="8" y1="55" x2="92" y2="55" stroke="#000000" strokeWidth="0.8" opacity="0.22" />

                {/* Icon: Bar Chart Upward */}
                <g transform="translate(0, 4)">
                  {/* Axes */}
                  <line x1="28" y1="36" x2="68" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="28" y1="16" x2="28" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  {/* Bars */}
                  <rect x="33" y="27" width="5" height="9" fill="white" />
                  <rect x="43" y="22" width="5" height="14" fill="white" />
                  <rect x="53" y="16" width="5" height="20" fill="white" />
                  {/* Up Arrow */}
                  <path d="M 33 29 L 45 19 L 57 14 L 66 11" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 59 11 L 66 11 L 66 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Text: DECENT WORK & ECONOMIC GROWTH #8 */}
                <text x="50" y="71" fill="white" fontSize="5.3" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.1">DECENT WORK &amp;</text>
                <text x="50" y="78" fill="white" fontSize="5.3" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.1">ECONOMIC GROWTH</text>
                <text x="50" y="96" fill="white" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">#8</text>
              </svg>
            </div>

            {/* Hexagon 5: SDG 10 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 110" className={styles.hexSvg} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad-sdg10" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6A93D4" />
                    <stop offset="100%" stopColor="#3D5FA4" />
                  </linearGradient>
                </defs>
                <path d="M 56.9 7 L 86.1 24 Q 93 28 93 36 L 93 74 Q 93 82 86.1 86 L 56.9 103 Q 50 107 43.1 103 L 13.9 86 Q 7 82 7 74 L 7 36 Q 7 28 13.9 24 L 43.1 7 Q 50 3 56.9 7 Z" fill="url(#grad-sdg10)" />
                {/* 3D Slit Groove Shadow */}
                <ellipse cx="50" cy="56.5" rx="38" ry="2.2" fill="#000000" opacity="0.32" filter="url(#sdg-shadow-blur)" />
                <line x1="8" y1="55" x2="92" y2="55" stroke="#000000" strokeWidth="0.8" opacity="0.22" />

                {/* Icon: Inequalities Ring */}
                <g transform="translate(0, 4)">
                  <circle cx="50" cy="25" r="9.5" stroke="white" strokeWidth="2.5" fill="none" strokeDasharray="50 10" strokeDashoffset="12" />
                  <line x1="45" y1="23" x2="55" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="45" y1="27" x2="55" y2="27" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Text: REDUCED INEQUALITIES #10 */}
                <text x="50" y="73" fill="white" fontSize="5.8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.2">REDUCED</text>
                <text x="50" y="81" fill="white" fontSize="5.8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.2">INEQUALITIES</text>
                <text x="50" y="96" fill="white" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">#10</text>
              </svg>
            </div>

            {/* Hexagon 6: SDG 17 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 110" className={styles.hexSvg} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad-sdg17" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8ED851" />
                    <stop offset="100%" stopColor="#5B9B27" />
                  </linearGradient>
                </defs>
                <path d="M 56.9 7 L 86.1 24 Q 93 28 93 36 L 93 74 Q 93 82 86.1 86 L 56.9 103 Q 50 107 43.1 103 L 13.9 86 Q 7 82 7 74 L 7 36 Q 7 28 13.9 24 L 43.1 7 Q 50 3 56.9 7 Z" fill="url(#grad-sdg17)" />
                {/* 3D Slit Groove Shadow */}
                <ellipse cx="50" cy="56.5" rx="38" ry="2.2" fill="#000000" opacity="0.32" filter="url(#sdg-shadow-blur)" />
                <line x1="8" y1="55" x2="92" y2="55" stroke="#000000" strokeWidth="0.8" opacity="0.22" />

                {/* Icon: Partnerships Flower Venn */}
                <g transform="translate(0, 4)">
                  <circle cx="50" cy="20" r="5" fill="none" stroke="white" strokeWidth="1.25" />
                  <circle cx="58" cy="24" r="5" fill="none" stroke="white" strokeWidth="1.25" />
                  <circle cx="55" cy="32" r="5" fill="none" stroke="white" strokeWidth="1.25" />
                  <circle cx="45" cy="32" r="5" fill="none" stroke="white" strokeWidth="1.25" />
                  <circle cx="42" cy="24" r="5" fill="none" stroke="white" strokeWidth="1.25" />
                </g>

                {/* Text: PARTNERSHIPS FOR THE GOALS #17 */}
                <text x="50" y="71" fill="white" fontSize="5.3" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.1">PARTNERSHIPS</text>
                <text x="50" y="78" fill="white" fontSize="5.3" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.1">FOR THE GOALS</text>
                <text x="50" y="96" fill="white" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">#17</text>
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Stories in Motion Section */}
      <section className={styles.storiesSection} id="stories-motion">
        <div className="container">
          <h2 className={styles.sectionHeading}>STORIES IN MOTION</h2>
          <div className={styles.impactDivider}></div>

          <div className={styles.videoGrid}>
            {/* Video 1 */}
            <div className={styles.videoCard} id="video-card-1">
              <div 
                className={styles.videoThumbnail} 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=600')` }}
              >
                <div className={styles.videoOverlay}>
                  <div className={styles.playButton}>
                    <Play size={24} fill="white" />
                  </div>
                </div>
              </div>
              <h3 className={styles.videoTitle}>Impact in Rural Slums: The Ground Reality</h3>
            </div>

            {/* Video 2 */}
            <div className={styles.videoCard} id="video-card-2">
              <div 
                className={styles.videoThumbnail} 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600')` }}
              >
                <div className={styles.videoOverlay}>
                  <div className={styles.playButton}>
                    <Play size={24} fill="white" />
                  </div>
                </div>
              </div>
              <h3 className={styles.videoTitle}>Shiksha Na Ruke: Education Campaign Documentary</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Support a Cause Section */}
      <section className={styles.causesSupportSection} id="support-cause">
        <div className="container">
          <h2 className={styles.sectionHeading}>SUPPORT A CAUSE</h2>
          <div className={styles.impactDivider}></div>

          <div className={styles.supportCauseGrid}>
            {/* Cause Card 1 */}
            <div className={styles.supportCard} id="support-cause-education">
              <div 
                className={styles.supportCardImg} 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600')` }}
              >
                <div className={styles.supportCardTitleTag}>EDUCATION</div>
              </div>
              <div className={styles.supportCardBody}>
                <h3 className={styles.supportCardTitle}>Shiksha Na Ruke</h3>
                <p className={styles.supportCardDesc}>
                  Ensure that underprivileged children do not drop out of school due to lack of notebooks, school kits, or digital classroom tools.
                </p>
              </div>
            </div>

            {/* Cause Card 2 */}
            <div className={styles.supportCard} id="support-cause-healthcare">
              <div 
                className={styles.supportCardImg} 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600')` }}
              >
                <div className={styles.supportCardTitleTag}>HEALTHCARE</div>
              </div>
              <div className={styles.supportCardBody}>
                <h3 className={styles.supportCardTitle}>Health on Wheels</h3>
                <p className={styles.supportCardDesc}>
                  Fund mobile clinic vans that supply primary healthcare, pediatric checks, and medicine to thousands of cut-off villages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Our Partners in Change Section */}
      <section className={styles.partnersSection} id="partners-csr">
        <div className="container">
          <h2 className={styles.sectionHeading}>OUR PARTNERS IN CHANGE</h2>
          <div className={styles.impactDivider}></div>

          <div className={styles.partnersGrid}>
            <div className={styles.partnersTexts}>
              <h3 className={styles.partnersSubtitle}>Corporate Social Responsibility Partnerships</h3>
              <p className={styles.partnersDesc}>
                We partner with leading corporations to create high-impact, transparent, and measurable CSR initiatives. Our solutions cover baseline auditing, community-first deployment, operational reporting, and third-party certifications to match global benchmarks.
              </p>
              <button 
                className={styles.secondaryBtn}
                onClick={() => setActiveTab('volunteer')}
                id="partner-contact-btn"
              >
                Get In Touch <ArrowRight size={16} style={{ marginLeft: '6px' }} />
              </button>
            </div>
            
            <div className={styles.partnersImageContainer}>
              <img 
                src={awardCeremony.src || awardCeremony} 
                alt="Award ceremony at corporate social responsibility event" 
                className={styles.partnersImg} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Empanelment & Accreditations Section */}
      <section className={styles.accreditSection} id="empanelment-accreditations">
        <div className="container">
          <h2 className={styles.sectionHeading}>EMPANELMENT & ACCREDITATIONS</h2>
          <div className={styles.impactDivider}></div>

          <div className={styles.accreditGrid}>
            {/* Card 1 */}
            <div className={styles.accreditCard} id="accredit-card-un">
              <div className={styles.accreditLogoText}>UNGC MEMBER</div>
              <h3 className={styles.accreditTitle}>Member of the United Nations Global Compact</h3>
              <p className={styles.accreditDesc}>
                Worlify is an active member supporting the United Nations Global Compact, aligning operations with universal principles on human rights, environment, and anti-corruption.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.accreditCard} id="accredit-card-guidestar">
              <div className={styles.accreditLogoText}>GUIDESTAR PLATINUM</div>
              <h3 className={styles.accreditTitle}>Accredited at Platinum level by GuideStar India</h3>
              <p className={styles.accreditDesc}>
                Worlify has been accredited at the highest Platinum status for financial transparency, standard practices, regulatory compliance, and community outreach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
