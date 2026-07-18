import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Activity, 
  Heart, 
  Leaf, 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  ChevronDown, 
  Download, 
  Info,
  ChevronRight
} from 'lucide-react';
import { db } from '../lib/supabase';
import styles from '../styles/Causes.module.css';

/**
 * Causes Component
 * Beautifully represents the Causes Page layout (Image 2).
 * Integrates an interactive five-pillar detail switcher.
 */
export default function Causes({ setActiveTab, setDonationPreload, preloadedCause, clearPreload }) {
  // Selected Detailed Pillar tab state
  const [selectedPillarId, setSelectedPillarId] = useState('education');

  useEffect(() => {
    if (preloadedCause) {
      const match = preloadedCause.toLowerCase();
      if (match.includes('education')) setSelectedPillarId('education');
      else if (match.includes('health')) setSelectedPillarId('healthcare');
      else if (match.includes('child') || match.includes('welfare')) setSelectedPillarId('welfare');
      else if (match.includes('women') || match.includes('empowerment')) setSelectedPillarId('empowerment');
      else if (match.includes('environment')) setSelectedPillarId('environment');
      clearPreload();
    }
  }, [preloadedCause]);

  // Focus areas definition matching Image 2 top grid
  const focusAreas = [
    {
      id: 'education',
      title: 'Illuminating Minds',
      cause: 'Education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
      tag: 'EDUCATION'
    },
    {
      id: 'healthcare',
      title: 'Resilient Health',
      cause: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      tag: 'HEALTH'
    },
    {
      id: 'environment',
      title: 'Earth Guard',
      cause: 'Environment',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
      tag: 'ENVIRONMENT'
    },
    {
      id: 'empowerment',
      title: 'Leading Change',
      cause: 'Women Empowerment',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
      tag: 'EMPOWERMENT'
    },
    {
      id: 'welfare',
      title: 'Bright Futures',
      cause: 'Child Welfare',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
      tag: 'WELFARE'
    }
  ];

  // Specific Detailed breakdown datasets for each pillar
  const pillarDetails = {
    education: {
      tag: 'PILLAR ONE: EDUCATION',
      heading: 'Empowering Through Knowledge.',
      desc: 'We believe education is the single most powerful tool to break the cycle of poverty. Our programs target the systemic barriers that prevent children and adults from reaching their full potential.',
      stats: [
        { val: '12k+', label: 'SCHOLARSHIPS AWARDED' },
        { val: '450', label: 'DIGITAL HUBS CREATED' }
      ],
      features: [
        {
          title: 'Elite Rural Scholarships',
          text: 'Full-ride funding for gifted students from marginalized backgrounds to attend top-tier universities.',
          icon: <Award size={18} color="white" />
        },
        {
          title: 'Digital Classrooms 2030',
          text: 'Equipping remote schools with solar power, starlink connectivity, and modern tablets for hybrid learning.',
          icon: <BookOpen size={18} color="white" />
        }
      ],
      quote: '"My scholarship changed everything for my family\'s future."',
      author: '— Sarah K., Scholar 2023',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
      cause: 'Education'
    },
    healthcare: {
      tag: 'PILLAR TWO: HEALTHCARE',
      heading: 'Resilient Health in Every Corner.',
      desc: 'Deploying pediatric units, basic medicine, hygiene kits, and regular diagnostic check-up medical camps to extremely isolated, high-risk regions.',
      stats: [
        { val: '85k+', label: 'MEDICAL CHECKUPS' },
        { val: '15', label: 'MOBILE CLINICS ACTIVE' }
      ],
      features: [
        {
          title: 'Pediatric Medical Camps',
          text: 'Local health checkups and vaccinations directed by qualified volunteer medical squads.',
          icon: <Activity size={18} color="white" />
        },
        {
          title: 'Emergency Medicine Ingress',
          text: 'Securing permanent stock lines of essential drugs for remote community clinics.',
          icon: <CheckCircle size={18} color="white" />
        }
      ],
      quote: '"The mobile clinic is the only healthcare our village has access to."',
      author: '— Amandine G., Village Elder',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
      cause: 'Healthcare'
    },
    welfare: {
      tag: 'PILLAR THREE: CHILD WELFARE',
      heading: 'Protecting the Future Generation.',
      desc: 'Establishing secure shelter facilities, rescue lines, psychological recovery spaces, and hot nutritious meal programs for vulnerable youths.',
      stats: [
        { val: '1,400+', label: 'ORPHANS SHELTERED' },
        { val: '3M+', label: 'DAILY MEALS SERVED' }
      ],
      features: [
        {
          title: 'The Orphan Haven Shelter',
          text: 'Safe lodging houses providing three balanced meals and mental healthcare loops.',
          icon: <Heart size={18} color="white" fill="white" />
        },
        {
          title: 'Youth Rescue Network',
          text: 'Active field units identifying and safeguarding high-risk adolescent cases.',
          icon: <CheckCircle size={18} color="white" />
        }
      ],
      quote: '"I feel safe here and have plenty of books to read every single day."',
      author: '— Daniel M., Age 9',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
      cause: 'Child Welfare'
    },
    empowerment: {
      tag: 'PILLAR FOUR: WOMEN EMPOWERMENT',
      heading: 'Leading Change and Self-Reliance.',
      desc: 'Facilitating business self-sufficiency through comprehensive vocational tailoring courses, financial literacy classes, and peer-led microloans.',
      stats: [
        { val: '3,100+', label: 'WOMEN ENTREPRENEURS' },
        { val: '12', label: 'COOPERATIVES ESTABLISHED' }
      ],
      features: [
        {
          title: 'Artisan Tailoring Collective',
          text: 'Complete sewing equipment and marketing training for certified women artisans.',
          icon: <Award size={18} color="white" />
        },
        {
          title: 'Micro-Finance Support',
          text: 'Zero-interest small business start-up capital handled through local peer groups.',
          icon: <ShieldCheck size={18} color="white" />
        }
      ],
      quote: '"My embroidery business enabled me to support both my daughter and mother."',
      author: '— Priya S., Tailoring Graduate',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
      cause: 'Women Empowerment'
    },
    environment: {
      tag: 'PILLAR FIVE: ENVIRONMENTAL ACTION',
      heading: 'Earth Guard: Resilient Ecosystems.',
      desc: 'Defending delicate coastal regions against ocean swells by replanting dense mangroves, and drilling water wells for drylands.',
      stats: [
        { val: '180k+', label: 'MANGROVES PLANTED' },
        { val: '45', label: 'CLEAN WATER SYSTEMS' }
      ],
      features: [
        {
          title: 'Deep Bore Well Installations',
          text: 'Drilling secure, hand-pumped water wells with local maintenance training squads.',
          icon: <Leaf size={18} color="white" />
        },
        {
          title: 'Mangrove Protection Guild',
          text: 'Replanting coastal defense barriers alongside regional fishing groups.',
          icon: <ShieldCheck size={18} color="white" />
        }
      ],
      quote: '"Planting back the mangrove forests shields our homes from tropical storms."',
      author: '— Captain Yusuf, Fishery Leader',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
      cause: 'Environment'
    }
  };

  const handleSupportClick = (causeName) => {
    setDonationPreload(causeName);
    setActiveTab('donate');
  };

  const activeDetails = pillarDetails[selectedPillarId] || pillarDetails.education;

  return (
    <div id="causes-view" className={styles.causesWrapper}>
      
      {/* 1. Header Hero section */}
      <section className={styles.headerHero} id="causes-hero-section">
        <div className="container">
          <div className={styles.heroCenter}>
            <span className={styles.heroTag}>HUMAN-CENTRIC IMPACT</span>
            <h1 className={styles.heroTitle} id="causes-hero-title">
              Driving Change in <span className={styles.highlight}>Every Corner</span>
            </h1>
            <p className={styles.heroDesc}>
              Our mission transcends borders. We operate through five strategic pillars to create systemic change and empower the world's most vulnerable communities.
            </p>
            
            <a href="#focused-breakdown" className={styles.scrollAnchorBtn} id="scroll-to-breakdown-btn">
              <span>Explore Focus Areas</span>
              <ChevronDown size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Top Causes Image Card Grid */}
      <section className={styles.focusGridSection} id="focused-breakdown">
        <div className="container">
          <div className={styles.focusGrid} id="causes-top-focus-grid">
            {focusAreas.map((area) => (
              <div 
                key={area.id} 
                className={`${styles.focusCard} ${selectedPillarId === area.id ? styles.activeFocusCard : ''}`}
                onClick={() => setSelectedPillarId(area.id)}
                id={`focus-area-card-${area.id}`}
              >
                <img src={area.image} alt={area.title} className={styles.focusCardImg} />
                <div className={styles.cardOverlay}></div>
                <div className={styles.cardTexts}>
                  <span className={styles.cardTag}>{area.tag}</span>
                  <h3 className={styles.cardTitle}>{area.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Sub-section breakdown (swaps dynamically) */}
      <section className={styles.pillarDetailSection} id="active-pillar-detail">
        <div className="container">
          <div className={styles.detailCard} id="dynamic-pillar-detail-card">
            <div className={styles.detailGrid}>
              
              {/* Left Column: Metrics & Features */}
              <div className={styles.detailTextCol}>
                <span className={styles.detailTag}>{activeDetails.tag}</span>
                <h2 className={styles.detailHeading} id="pillar-detail-heading">{activeDetails.heading}</h2>
                <p className={styles.detailDesc}>{activeDetails.desc}</p>

                {/* Statistics Box */}
                <div className={styles.detailStatsRow} id="pillar-detail-stats">
                  {activeDetails.stats.map((st, i) => (
                    <div className={styles.detailStatBox} key={i}>
                      <div className={styles.detailStatVal}>{st.val}</div>
                      <div className={styles.detailStatLabel}>{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features rows */}
                <div className={styles.featureList} id="pillar-detail-features">
                  {activeDetails.features.map((ft, i) => (
                    <div className={styles.featureItem} key={i}>
                      <div className={styles.featureIconContainer}>
                        {ft.icon}
                      </div>
                      <div>
                        <h4 className={styles.featureTitle}>{ft.title}</h4>
                        <p className={styles.featureText}>{ft.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Donate action */}
                <button 
                  className={styles.donateToCauseBtn} 
                  onClick={() => handleSupportClick(activeDetails.cause)}
                  id="donate-to-pillar-btn"
                >
                  Donate to this Cause
                </button>
              </div>

              {/* Right Column: Image with Floating Quote */}
              <div className={styles.detailVisualCol}>
                <div className={styles.visualWrapper}>
                  <img src={activeDetails.image} alt={activeDetails.heading} className={styles.pillarMainImage} />
                  
                  {/* Floating quote card */}
                  <div className={styles.floatingQuoteCard} id="floating-quote-badge">
                    <span className={styles.impactIndicator}>● ACTIVE IMPACT</span>
                    <p className={styles.floatingQuoteText}>{activeDetails.quote}</p>
                    <div className={styles.floatingQuoteAuthor}>{activeDetails.author}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Commitment to Transparency Block */}
      <section className={styles.transparencySection} id="causes-transparency-block">
        <div className="container">
          <div className={styles.transparencyCard}>
            <div className={styles.transparencyContent}>
              <h2 className={styles.transparencyTitle}>Commitment to Transparency</h2>
              <p className={styles.transparencyDesc}>
                We believe in radical honesty. Every dollar you donate is tracked and reported. Download our latest transparency report to see how we manage our funds and maximize impact.
              </p>
              <div className={styles.transparencyBtns}>
                <button 
                  className={styles.solidDarkBtn}
                  onClick={() => setActiveTab('about-mission')}
                  id="causes-download-report-btn"
                >
                  <Download size={16} />
                  <span>Annual Report 2023</span>
                </button>
                <button 
                  className={styles.outlineBtn}
                  onClick={() => setActiveTab('about-mission')}
                  id="causes-view-dashboard-btn"
                >
                  View Transparency Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
