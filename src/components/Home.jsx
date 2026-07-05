import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Activity, 
  Heart, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  TrendingUp, 
  Gift, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Download,
  Users,
  Briefcase,
  Smile
} from 'lucide-react';
import { db } from '../lib/supabase';
import styles from '../styles/Home.module.css';

/**
 * Home Component
 * Re-designed as per high-fidelity "stitch design" specifications.
 */
export default function Home({ setActiveTab, setDonationPreload, isLocalMode }) {
  // Live stats dynamically modified by local/cloud DB actions
  const [totals, setTotals] = useState({
    raised: 124500,
    impacted: 52400,
    volunteers: 1218
  });

  // Recent contributions list
  const [recentDonations, setRecentDonations] = useState([]);
  
  // Interactive slider state for testimonials
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote: "Worlify didn't just give me a scholarship; they gave me a path to dignity. Today, I am the first in my village to become a certified engineer.",
      author: "Amara K.",
      role: "Scholarship Recipient, Class of 2022",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=600"
    },
    {
      quote: "My scholarship changed everything for my family's future. The transparent tracker made me feel connected to my global sponsor.",
      author: "Sarah K.",
      role: "Scholar 2023, Education Pillar",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
    }
  ];

  // Load live DB donations to dynamically update total calculations
  const loadDonationData = async () => {
    try {
      const { data, error } = await db.getDonations();
      if (!error && data) {
        const totalAmount = data.reduce((sum, item) => sum + Number(item.amount), 0);
        setTotals({
          raised: 124500 + totalAmount,
          impacted: 52400 + Math.floor(totalAmount / 10), // $10 impacts 1 person
          volunteers: 1218 + Math.floor(data.length / 2)
        });
        setRecentDonations(data.slice(0, 3));
      }
    } catch (e) {
      console.error('Error fetching donation data for landing: ', e);
    }
  };

  useEffect(() => {
    loadDonationData();
  }, []);

  // 7 high resolution images representing different pillars of Worlify in India for the sliding background
  const heroImages = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600", // Smiling Indian school children with books
    "https://images.unsplash.com/photo-1597006338631-2a837f26e69a?auto=format&fit=crop&q=80&w=1600", // Excited Indian students raising hands in classroom
    "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1600", // Indian primary students studying diligently
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=1600", // Happy Indian school girls in uniform smiling
    "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&q=80&w=1600", // Group of rural Indian school kids waving happily
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1600", // Warm portrait of happy Indian rural children
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1600"  // Indian classroom learning, laughing, and studying together
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Auto-slide hero background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Rotate every 6 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextHeroImage = (e) => {
    e.stopPropagation();
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = (e) => {
    e.stopPropagation();
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // 5 Focus pillars styled with full card backgrounds and tiny corner icons
  const focusPillars = [
    {
      id: 'education',
      title: 'Education',
      desc: 'Building rural classrooms, funding books, and tech-driven literacy.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
      icon: <BookOpen size={16} color="white" />,
      accent: '#0d9488'
    },
    {
      id: 'health',
      title: 'Health',
      desc: 'Deploying pediatric clinics, basic hygiene, and medical support.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      icon: <Activity size={16} color="white" />,
      accent: '#06b6d4'
    },
    {
      id: 'welfare',
      title: 'Child Welfare',
      desc: 'Securing safe rescue shelters, nourishing meals, and recovery centers.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
      icon: <Smile size={16} color="white" />,
      accent: '#f97316'
    },
    {
      id: 'empowerment',
      title: 'Empowerment',
      desc: 'Facilitating micro-grants, legal advocacy, and leadership programs.',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
      icon: <Briefcase size={16} color="white" />,
      accent: '#8b5cf6'
    },
    {
      id: 'environment',
      title: 'Environment',
      desc: 'Combatting forest loss through afforestation and local eco action.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
      icon: <Leaf size={16} color="white" />,
      accent: '#10b981'
    }
  ];

  // Activities Feed
  const activities = [
    {
      tag: 'FIELD UPDATE',
      title: 'Bringing Clean Water to 15 Villages in Sahel',
      desc: 'Our latest clean water initiative has successfully completed its first phase, drilling 15 solar-powered bore wells and impacting over 5,000 residents.',
      image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=600'
    },
    {
      tag: 'INNOVATION',
      title: 'Digital Literacy: New Tech Hubs Launched',
      desc: 'We\'ve partnered with global technology firms to establish three new digital classroom hubs equipped with high-speed satellite links.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'
    },
    {
      tag: 'TRANSPARENCY',
      title: 'Q4 Financial Transparency Report Released',
      desc: 'In our commitment to radical transparency, we have released the complete ledger breakdown of our worldwide project expenditures.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div id="home-view" className={styles.homeContainer}>
      {/* 1. Hero Showcase Background Image Slider */}
      <section className={styles.heroSection} id="hero-showcase">
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

        {/* Manual Navigation Controls */}
        <button 
          className={styles.heroArrowLeft} 
          onClick={prevHeroImage}
          aria-label="Previous background"
          id="hero-slider-prev-arrow"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          className={styles.heroArrowRight} 
          onClick={nextHeroImage}
          aria-label="Next background"
          id="hero-slider-next-arrow"
        >
          <ChevronRight size={20} />
        </button>

        {/* Navigation Indicators (Dots) */}
        <div className={styles.heroDotsContainer}>
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.heroDot} ${currentHeroIndex === idx ? styles.activeHeroDot : ''}`}
              onClick={() => setCurrentHeroIndex(idx)}
              aria-label={`Go to background slide ${idx + 1}`}
              id={`hero-slider-dot-${idx}`}
            />
          ))}
        </div>

        <div className={styles.heroContentContainer}>
          <div className="container">
            <div className={styles.heroInner}>
              <h1 className={styles.heroTitle}>
                Building a Better<br />Tomorrow, Together
              </h1>
              <p className={styles.heroSubtitle}>
                Worlify is dedicated to creating sustainable change through targeted initiatives in education, healthcare, and environmental conservation. We believe in radical transparency and the power of collective action.
              </p>
              <div className={styles.heroBtns}>
                <button 
                  className={styles.getInvolvedBtn} 
                  onClick={() => setActiveTab('volunteer')}
                  id="hero-get-involved-btn"
                >
                  Get Involved
                </button>
                <button 
                  className={styles.ourMissionBtn} 
                  onClick={() => setActiveTab('about')}
                  id="hero-our-mission-btn"
                >
                  Our Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Container directly beneath hero */}
      <section className={styles.statsSection} id="key-stats-banner">
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statBox} id="stat-lives-changed">
              <div className={styles.statVal}>{(totals.impacted).toLocaleString()}+</div>
              <div className={styles.statLabel}>LIVES CHANGED</div>
            </div>
            <div className={styles.statBox} id="stat-villages-reached">
              <div className={styles.statVal}>100+</div>
              <div className={styles.statLabel}>VILLAGES REACHED</div>
            </div>
            <div className={styles.statBox} id="stat-children-educated">
              <div className={styles.statVal}>10,000+</div>
              <div className={styles.statLabel}>CHILDREN EDUCATED</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Core Causes Section */}
      <section className={styles.causesSection} id="core-causes">
        <div className="container">
          <div className={styles.causesHeaderRow}>
            <div>
              <h2 className={styles.sectionTitle}>Our Core Causes</h2>
              <p className={styles.sectionSubtitle}>
                We focus our resources where they can have the most immediate and long-lasting impact on human dignity and environmental health.
              </p>
            </div>
            <button 
              className={styles.viewInitiativesBtn} 
              onClick={() => setActiveTab('causes')}
              id="home-view-initiatives-btn"
            >
              <span>View All Initiatives</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className={styles.causesGrid} id="core-causes-grid">
            {focusPillars.map((pillar) => (
              <div 
                key={pillar.id} 
                className={styles.causeImageCard}
                onClick={() => {
                  setDonationPreload(pillar.title);
                  setActiveTab('causes');
                }}
                id={`core-cause-card-${pillar.id}`}
              >
                <img src={pillar.image} alt={pillar.title} className={styles.cardBgImage} />
                <div className={styles.cardGradientOverlay}></div>
                <div className={styles.cornerIcon} style={{ backgroundColor: pillar.accent }}>
                  {pillar.icon}
                </div>
                <div className={styles.cardTextContent}>
                  <h3 className={styles.cardTitle}>{pillar.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonial quote Section */}
      <section className={styles.testimonialSection} id="home-testimonial">
        <div className="container">
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialGrid}>
              
              {/* Left Photo */}
              <div className={styles.testimonialPhotoContainer}>
                <img 
                  src={testimonials[testimonialIndex].image} 
                  alt={testimonials[testimonialIndex].author} 
                  className={styles.testimonialPhoto} 
                />
              </div>

              {/* Right Content */}
              <div className={styles.testimonialTextContainer}>
                <div className={styles.quoteMark}>”</div>
                <blockquote className={styles.quoteParagraph}>
                  "{testimonials[testimonialIndex].quote}"
                </blockquote>
                <div className={styles.quoteAuthorRow}>
                  <div className={styles.authorName}>{testimonials[testimonialIndex].author}</div>
                  <div className={styles.authorRole}>{testimonials[testimonialIndex].role}</div>
                </div>

                <div className={styles.sliderControls}>
                  <button 
                    className={styles.sliderBtn} 
                    onClick={prevTestimonial}
                    id="testimonial-prev-btn"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className={styles.sliderBtn} 
                    onClick={nextTestimonial}
                    id="testimonial-next-btn"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. How You Can Help Bento Section */}
      <section className={styles.helpSection} id="how-you-can-help">
        <div className="container">
          <div className={styles.centerHeader}>
            <h2 className={styles.sectionTitleCenter}>How You Can Help</h2>
          </div>

          <div className={styles.bentoGrid} id="bento-help-grid">
            {/* Column 1: Stack of three short cards */}
            <div className={styles.bentoLeftCol}>
              
              {/* Direct Donation */}
              <div 
                className={`${styles.bentoCard} ${styles.blueBento}`}
                onClick={() => setActiveTab('donate')}
                id="bento-direct-donation"
              >
                <div className={styles.bentoIcon}>
                  <Gift size={24} color="white" />
                </div>
                <h3 className={styles.bentoTitle}>Direct Donation</h3>
                <p className={styles.bentoText}>Your contribution goes directly to the field. 95% of every dollar reaches the cause.</p>
                <ArrowUpRight size={18} className={styles.bentoArrow} />
              </div>

              {/* Stack of Partner & Fundraise side by side */}
              <div className={styles.bentoSubGrid}>
                {/* Partner */}
                <div 
                  className={`${styles.bentoCard} ${styles.lightBlueBento}`}
                  onClick={() => setActiveTab('volunteer')}
                  id="bento-partner"
                >
                  <Briefcase size={20} color="#0056d2" />
                  <h3 className={styles.bentoTitleDark}>Partner</h3>
                  <p className={styles.bentoTextDark}>CSR partnerships for corporations looking to make a measurable social impact.</p>
                  <ArrowUpRight size={16} className={styles.bentoArrowDark} />
                </div>

                {/* Fundraise */}
                <div 
                  className={`${styles.bentoCard} ${styles.purpleBento}`}
                  onClick={() => setActiveTab('donate')}
                  id="bento-fundraise"
                >
                  <TrendingUp size={20} color="#8b5cf6" />
                  <h3 className={styles.bentoTitleDark}>Fundraise</h3>
                  <p className={styles.bentoTextDark}>Start a personal campaign for your birthday or a special occasion.</p>
                  <ArrowUpRight size={16} className={styles.bentoArrowDark} />
                </div>
              </div>

            </div>

            {/* Column 2: Tall Volunteer Card */}
            <div 
              className={`${styles.bentoCard} ${styles.mintBento}`}
              onClick={() => setActiveTab('volunteer')}
              id="bento-volunteer"
            >
              <div className={styles.bentoIconMint}>
                <Users size={28} color="#00875a" />
              </div>
              <div className={styles.bentoMintBottom}>
                <h3 className={styles.bentoTitleDarkLarge}>Volunteer</h3>
                <p className={styles.bentoTextDarkLarge}>Join us on the ground or contribute your skills remotely to our various projects.</p>
              </div>
              <ArrowUpRight size={20} className={styles.bentoArrowMint} />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Accountability tax-exempt row */}
      <section className={styles.accountabilitySection} id="our-accountability">
        <div className="container">
          <div className={styles.accountabilityInner}>
            <div className={styles.accountabilityTexts}>
              <h3 className={styles.accountTitle}>Our Accountability</h3>
              <p className={styles.accountDesc}>We maintain the highest standards of financial integrity and reporting.</p>
            </div>
            
            <div className={styles.accountCertifications}>
              <div className={styles.certRow}>
                <ShieldCheck size={18} color="var(--primary-color)" />
                <span>12A REGISTERED</span>
              </div>
              <div className={styles.certRow}>
                <ShieldCheck size={18} color="var(--primary-color)" />
                <span>80G TAX EXEMPT</span>
              </div>
              
              <button 
                className={styles.annualReportBtn}
                onClick={() => setActiveTab('about')}
                id="accountability-annual-report-btn"
              >
                <Download size={16} />
                <span>Annual Report 2023</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Latest Activities News feed */}
      <section className={styles.newsSection} id="latest-activities">
        <div className="container">
          <div className={styles.newsHeaderRow}>
            <h2 className={styles.sectionTitle}>Latest Activities</h2>
            <button 
              className={styles.readAllNewsBtn}
              onClick={() => setActiveTab('gallery')}
              id="home-read-news-btn"
            >
              Read All News
            </button>
          </div>

          <div className={styles.newsGrid} id="news-activities-grid">
            {activities.map((article, idx) => (
              <div className={styles.newsCard} key={idx} id={`news-article-${idx}`}>
                <div className={styles.newsImageContainer}>
                  <img src={article.image} alt={article.title} className={styles.newsImage} />
                </div>
                <div className={styles.newsBody}>
                  <span className={styles.newsTag}>{article.tag}</span>
                  <h3 className={styles.newsTitle}>{article.title}</h3>
                  <p className={styles.newsDesc}>{article.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
