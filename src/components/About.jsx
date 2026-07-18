import React from 'react';
import { 
  Award, 
  Target, 
  Eye, 
  Download, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Heart, 
  BookOpen, 
  Activity, 
  Leaf, 
  ShieldCheck 
} from 'lucide-react';
import styles from '../styles/About.module.css';

// Import director images
import raviKumarVermaImg from '../assets/images/ravi_kumar_verma.png';
import rahulKumarVermaImg from '../assets/images/rahul_kumar_verma.jpg';
import lxminaDeviImg from '../assets/images/lxmina_devi.jpg';

/**
 * About Component
 * Renders the full organizational overview, transparency breakdown,
 * and holistic impact model from the design guidelines.
 */
export default function About({ setActiveTab }) {
  // Timeline items
  const timeline = [
    {
      year: '2012',
      title: 'The Foundation',
      desc: 'Founded in a small garage by three friends with a vision for transparent, community-led giving models.'
    },
    {
      year: '2015',
      title: 'First Global Hub',
      desc: 'Opened our first field office in Southeast Asia, scaling to support 10,000+ local educational grants.'
    },
    {
      year: '2019',
      title: 'Scale for Change',
      desc: 'Partnered with international health agencies to build 15 sustainable clinics in sub-Saharan Africa.'
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      desc: 'Launched our blockchain-based fund tracking, allowing donors to view transaction-level impact in real-time.'
    }
  ];

  // Leadership Team
  const team = [
    {
      name: 'Mr. Ravi Kumar Verma',
      role: 'Chairman',
      image: raviKumarVermaImg,
      bio: 'An entrepreneur and philanthropist with extensive leadership experience in grassroots development and social enterprise planning.'
    },
    {
      name: 'Mr. Rahul Kumar Verma',
      role: 'Director',
      image: rahulKumarVermaImg,
      bio: 'An operations specialist focusing on ground execution, resource logistics, and ensuring transparency in distribution networks.'
    },
    {
      name: 'Ms. Lxmina Devi',
      role: 'Trustee',
      image: lxminaDeviImg,
      bio: 'An active community advocate overseeing child welfare, nutrition initiatives, and women empowerment initiatives.'
    }
  ];

  return (
    <div id="about-page" className={styles.aboutWrapper}>
      {/* 1. Header Hero section */}
      <section className={styles.aboutHero} id="about-hero-section">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className={styles.establishedBadge}>ESTABLISHED 2012</span>
              <h1 className={styles.heroTitle} id="about-hero-title">
                Transparency, Impact, and <span className={styles.highlight}>Dedication</span>
              </h1>
              <p className={styles.heroDesc}>
                We are a global collective of humanitarian professionals dedicated to solving systemic inequality through direct action and radical financial transparency. We trace every single contribution to its exact field deployment.
              </p>
              <div className={styles.heroActions}>
                <button 
                  className={styles.primaryAction} 
                  onClick={() => setActiveTab('donate')}
                  id="about-hero-donate-btn"
                >
                  <Heart size={16} fill="white" />
                  Support Our Mission
                </button>
              </div>
            </div>
            <div className={styles.heroImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800" 
                alt="Worlify Community Garden and Operations" 
                className={styles.heroImage}
                id="about-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission and Vision */}
      <section className={styles.coreValuesSection} id="core-values-section">
        <div className="container">
          <div className={styles.valuesGrid}>
            {/* Card 1: Mission */}
            <div className={styles.valueCard} id="mission-card">
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
                <Target size={24} color="var(--primary-color)" />
              </div>
              <h2 className={styles.valueTitle}>Our Mission</h2>
              <p className={styles.valueText}>
                To empower marginalized communities by providing the tools, education, and resources necessary for self-sustained growth, ensuring every individual has the opportunity to thrive with dignity.
              </p>
            </div>

            {/* Card 2: Vision */}
            <div className={styles.valueCard} id="vision-card">
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                <Eye size={24} color="var(--secondary-color)" />
              </div>
              <h2 className={styles.valueTitle}>Our Vision</h2>
              <p className={styles.valueText}>
                A world where geographic location does not determine a human's potential, and where sustainable, transparent aid models create lasting global equity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A Decade of Dedication Timeline */}
      <section className={styles.timelineSection} id="timeline-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>A Decade of Dedication</h2>
            <p className={styles.sectionSubtitle}>
              Our transparent history of grassroots growth and structural expansion over the last decade.
            </p>
          </div>

          <div className={styles.timelineGrid} id="decade-timeline-grid">
            {timeline.map((item, idx) => (
              <div className={styles.timelineCard} key={idx} id={`timeline-item-${item.year}`}>
                <div className={styles.timelineYear}>{item.year}</div>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Holistic Development Wheel Section */}
      <section className={styles.wheelSection} id="holistic-model-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Holistic Development Model</h2>
            <p className={styles.sectionSubtitle}>
              We believe progress in one area fuels progress in all others. Our interconnected model ensures sustainable impact.
            </p>
          </div>

          <div className={styles.wheelContainer} id="interactive-wheel-diagram">
            {/* SVG circular web */}
            <div className={styles.wheelWrapper}>
              <div className={styles.wheelCenter} id="wheel-center-impact">
                <Heart size={28} color="white" fill="white" />
                <span>IMPACT CORE</span>
              </div>
              
              <div className={`${styles.wheelNode} ${styles.nodeEducation}`} id="wheel-node-education">
                <div className={styles.nodeIcon} style={{ background: '#0d9488' }}>
                  <BookOpen size={20} color="white" />
                </div>
                <span>EDUCATION</span>
              </div>

              <div className={`${styles.wheelNode} ${styles.nodeHealth}`} id="wheel-node-health">
                <div className={styles.nodeIcon} style={{ background: '#06b6d4' }}>
                  <Activity size={20} color="white" />
                </div>
                <span>HEALTH</span>
              </div>

              <div className={`${styles.wheelNode} ${styles.nodeWelfare}`} id="wheel-node-welfare">
                <div className={styles.nodeIcon} style={{ background: '#f97316' }}>
                  <Heart size={20} color="white" />
                </div>
                <span>CHILD WELFARE</span>
              </div>

              <div className={`${styles.wheelNode} ${styles.nodeEmpowerment}`} id="wheel-node-empowerment">
                <div className={styles.nodeIcon} style={{ background: '#8b5cf6' }}>
                  <ShieldCheck size={20} color="white" />
                </div>
                <span>EMPOWERMENT</span>
              </div>

              <div className={`${styles.wheelNode} ${styles.nodeEnvironment}`} id="wheel-node-environment">
                <div className={styles.nodeIcon} style={{ background: '#10b981' }}>
                  <Leaf size={20} color="white" />
                </div>
                <span>ENVIRONMENT</span>
              </div>

              {/* Decorative dotted connecting lines */}
              <svg className={styles.wheelSvgLines}>
                <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="90%" y2="35%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="10%" y2="35%" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Team Leadership Section */}
      <section className={styles.teamSection} id="leadership-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Hearts Behind the Mission</h2>
            <p className={styles.sectionSubtitle}>
              Our leadership team brings together decades of experience in field operations, financial management, and sustainable technology.
            </p>
          </div>

          <div className={styles.teamGrid} id="team-grid">
            {team.map((member, idx) => (
              <div className={styles.teamCard} key={idx} id={`team-card-${idx}`}>
                <div className={styles.teamImageWrapper}>
                  <img src={member.image?.src || member.image} alt={member.name} className={styles.teamImage} />
                </div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <div className={styles.teamRole}>{member.role}</div>
                <p className={styles.teamBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Financial Accountability Donut Section */}
      <section className={styles.financialSection} id="financial-accountability-section">
        <div className="container">
          <div className={styles.accountabilityCard} id="financial-card">
            <div className={styles.accountabilityGrid}>
              
              {/* Text explanation */}
              <div className={styles.financialIntro}>
                <div className={styles.auditBadge}>Verified by 80G</div>
                <h2 className={styles.financialTitle}>Financial Accountability</h2>
                <p className={styles.financialDesc}>
                  We pride ourselves on an industry-leading <strong>92% efficiency rating</strong>. For every $1 donated, 92 cents go directly to on-the-ground programs, bypass middle layers, and produce tracked local outcomes.
                </p>

                {/* Vertical bars */}
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
                      <span>ADMINISTRATION</span>
                      <span>5%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '5%', backgroundColor: 'var(--secondary-color)' }}></div>
                    </div>
                  </div>

                  <div className={styles.barItem}>
                    <div className={styles.barHeader}>
                      <span>FUNDRAISING</span>
                      <span>3%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: '3%', backgroundColor: 'var(--accent-color)' }}></div>
                    </div>
                  </div>
                </div>

                <button className={styles.downloadBtn} id="download-report-btn">
                  <Download size={16} />
                  Download 2023 Annual Report
                </button>
              </div>

              {/* Graphical efficiency ring */}
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
