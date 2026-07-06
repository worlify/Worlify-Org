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
  const [impactedCount, setImpactedCount] = useState(20); // In Lakhs

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data, error } = await db.getDonations();
        if (!error && data) {
          const totalAmount = data.reduce((sum, item) => sum + Number(item.amount), 0);
          // Dynamically increase impacted count based on donations
          setImpactedCount(20 + Number((totalAmount / 100000).toFixed(2))); 
        }
      } catch (e) {
        console.error('Error loading stats: ', e);
      }
    };
    loadStats();
  }, []);

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
              <div className={styles.impactValue}>{impactedCount}+ Lakh</div>
              <div className={styles.impactLabel}>LIVES</div>
              <div className={styles.impactSub}>children and families impacted directly so far</div>
            </div>
            
            <div className={styles.impactCard} id="impact-card-villages">
              <div className={styles.impactValue}>2000+</div>
              <div className={styles.impactLabel}>VILLAGES</div>
              <div className={styles.impactSub}>and urban slums reached across the country</div>
            </div>
            
            <div className={styles.impactCard} id="impact-card-projects">
              <div className={styles.impactValue}>400+</div>
              <div className={styles.impactLabel}>PROJECTS</div>
              <div className={styles.impactSub}>focused on education, healthcare, and livelihood</div>
            </div>
            
            <div className={styles.impactCard} id="impact-card-states">
              <div className={styles.impactValue}>27+</div>
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
          <div className={styles.impactDivider}></div>

          <div className={styles.programmeGrid}>
            {/* Programme 1: Education */}
            <div className={styles.programmeCard} id="prog-card-education">
              <div className={styles.programmeHeader}>
                <div className={`${styles.programmeIcon} ${styles.iconEdu}`}>
                  <BookOpen size={24} />
                </div>
                <h3 className={`${styles.programmeTitle} ${styles.colorEdu}`}>EDUCATION</h3>
              </div>
              <p className={styles.programmeDesc}>
                Reaching out to children in slums and rural areas, ensuring access to quality elementary schooling, textbooks, and remote digital classrooms.
              </p>
            </div>

            {/* Programme 2: Healthcare */}
            <div className={styles.programmeCard} id="prog-card-healthcare">
              <div className={styles.programmeHeader}>
                <div className={`${styles.programmeIcon} ${styles.iconHealth}`}>
                  <Activity size={24} />
                </div>
                <h3 className={`${styles.programmeTitle} ${styles.colorHealth}`}>HEALTHCARE</h3>
              </div>
              <p className={styles.programmeDesc}>
                Deploying mobile pediatric clinics, diagnostic health camps, and maternal health consultations directly to remote villages and slums.
              </p>
            </div>

            {/* Programme 3: Women Empowerment */}
            <div className={styles.programmeCard} id="prog-card-women">
              <div className={styles.programmeHeader}>
                <div className={`${styles.programmeIcon} ${styles.iconWomen}`}>
                  <Users size={24} />
                </div>
                <h3 className={`${styles.programmeTitle} ${styles.colorWomen}`}>WOMEN EMPOWERMENT</h3>
              </div>
              <p className={styles.programmeDesc}>
                Facilitating self-help groups, vocational training, financial literacy workshops, and leadership skills development for young girls.
              </p>
            </div>

            {/* Programme 4: Livelihood */}
            <div className={styles.programmeCard} id="prog-card-livelihood">
              <div className={styles.programmeHeader}>
                <div className={`${styles.programmeIcon} ${styles.iconLive}`}>
                  <Briefcase size={24} />
                </div>
                <h3 className={`${styles.programmeTitle} ${styles.colorLive}`}>LIVELIHOOD</h3>
              </div>
              <p className={styles.programmeDesc}>
                Providing job-readiness skills training, computer coding modules, retail certifications, and job-placement assistance to urban youth.
              </p>
            </div>

            {/* Programme 5: Empowering Grassroots */}
            <div className={styles.programmeCard} id="prog-card-grassroots">
              <div className={styles.programmeHeader}>
                <div className={`${styles.programmeIcon} ${styles.iconGrass}`}>
                  <Flame size={24} />
                </div>
                <h3 className={`${styles.programmeTitle} ${styles.colorGrass}`}>EMPOWERING GRASSROOTS</h3>
              </div>
              <p className={styles.programmeDesc}>
                Strengthening smaller community-based organizations (CBOs) through training, seed funding, governance auditing, and scale mentorship.
              </p>
            </div>

            {/* Programme 6: Disaster Response */}
            <div className={styles.programmeCard} id="prog-card-disaster">
              <div className={styles.programmeHeader}>
                <div className={`${styles.programmeIcon} ${styles.iconDisaster}`}>
                  <ShieldCheck size={24} />
                </div>
                <h3 className={`${styles.programmeTitle} ${styles.colorDisaster}`}>DISASTER RESPONSE</h3>
              </div>
              <p className={styles.programmeDesc}>
                Reaching out in times of natural disasters or humanitarian crises with immediate survival kits, dry rations, hygiene products, and shelters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SDG Sustainable Development Goals Section */}
      <section className={styles.sdgSection} id="sdg-grid">
        <div className="container">
          <div className={styles.sdgIntro}>TOWARDS ACHIEVING</div>
          <h2 className={styles.sectionHeading}>SUSTAINABLE DEVELOPMENT GOALS</h2>
          <div className={styles.impactDivider}></div>

          <div className={styles.hexagonGrid}>
            {/* Hexagon 1: SDG 3 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 100" className={styles.hexSvg}>
                <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="#e5243b" />
                <foreignObject x="15" y="15" width="70" height="70">
                  <div className={styles.hexContent}>
                    <div className={styles.hexIcon}><Activity size={18} /></div>
                    <div className={styles.hexTitle}>Good Health & Well-being</div>
                    <div className={styles.hexGoal}>SDG 3</div>
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* Hexagon 2: SDG 5 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 100" className={styles.hexSvg}>
                <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="#ff3a21" />
                <foreignObject x="15" y="15" width="70" height="70">
                  <div className={styles.hexContent}>
                    <div className={styles.hexIcon}><Users size={18} /></div>
                    <div className={styles.hexTitle}>Gender Equality</div>
                    <div className={styles.hexGoal}>SDG 5</div>
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* Hexagon 3: SDG 4 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 100" className={styles.hexSvg}>
                <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="#c5192d" />
                <foreignObject x="15" y="15" width="70" height="70">
                  <div className={styles.hexContent}>
                    <div className={styles.hexIcon}><BookOpen size={18} /></div>
                    <div className={styles.hexTitle}>Quality Education</div>
                    <div className={styles.hexGoal}>SDG 4</div>
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* Hexagon 4: SDG 8 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 100" className={styles.hexSvg}>
                <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="#a21942" />
                <foreignObject x="15" y="15" width="70" height="70">
                  <div className={styles.hexContent}>
                    <div className={styles.hexIcon}><Briefcase size={18} /></div>
                    <div className={styles.hexTitle}>Decent Work & Growth</div>
                    <div className={styles.hexGoal}>SDG 8</div>
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* Hexagon 5: SDG 10 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 100" className={styles.hexSvg}>
                <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="#dd1367" />
                <foreignObject x="15" y="15" width="70" height="70">
                  <div className={styles.hexContent}>
                    <div className={styles.hexIcon}><Smile size={18} /></div>
                    <div className={styles.hexTitle}>Reduced Inequalities</div>
                    <div className={styles.hexGoal}>SDG 10</div>
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* Hexagon 6: SDG 17 */}
            <div className={styles.hexWrapper}>
              <svg viewBox="0 0 100 100" className={styles.hexSvg}>
                <polygon points="50 3, 93 28, 93 72, 50 97, 7 72, 7 28" fill="#19486a" />
                <foreignObject x="15" y="15" width="70" height="70">
                  <div className={styles.hexContent}>
                    <div className={styles.hexIcon}><Award size={18} /></div>
                    <div className={styles.hexTitle}>Partnerships for Goals</div>
                    <div className={styles.hexGoal}>SDG 17</div>
                  </div>
                </foreignObject>
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
