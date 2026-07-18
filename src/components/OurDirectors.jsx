import React from 'react';
import { Twitter, Linkedin, Mail } from 'lucide-react';
import styles from '../styles/OurDirectors.module.css';

// Import director images
import raviKumarVermaImg from '../assets/images/ravi_kumar_verma.png';
import rahulKumarVermaImg from '../assets/images/rahul_kumar_verma.jpg';
import lxminaDeviImg from '../assets/images/lxmina_devi.jpg';

/**
 * OurDirectors Component
 * Displays executive leadership profiles, board message, and advisory council committees.
 */
export default function OurDirectors({ setActiveTab }) {
  const directorsData = [
    {
      name: 'Mr. Ravi Kumar Verma',
      role: 'Chairman',
      image: raviKumarVermaImg,
      bio: 'Mr. Ravi Kumar Verma is the Chairman of Worlify. An entrepreneur and philanthropist with extensive leadership experience in grassroots development and social enterprise planning, driving community transformation initiatives across regions.',
      twitter: '#',
      linkedin: '#'
    },
    {
      name: 'Mr. Rahul Kumar Verma',
      role: 'Director',
      image: rahulKumarVermaImg,
      bio: 'Mr. Rahul Kumar Verma is a Director at Worlify. An operations specialist focusing on ground execution, resource logistics, and ensuring transparency in distribution networks.',
      twitter: '#',
      linkedin: '#'
    },
    {
      name: 'Ms. Lxmina Devi',
      role: 'Trustee',
      image: lxminaDeviImg,
      bio: 'Ms. Lxmina Devi is a Trustee of Worlify. An active community advocate overseeing child welfare, nutrition initiatives, and women empowerment initiatives to create social equity.',
      twitter: '#',
      linkedin: '#'
    },
    {
      name: 'Rajesh Kumar, CPA',
      role: 'Cordinator of Financial Department',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      bio: 'Rajesh has a decade of experience auditing public sector charities and NGOs. He oversees our blockchain receipt-matching systems and files quarterly public transparency reports.',
      twitter: '#',
      linkedin: '#'
    }
  ];

  const advisorsData = [
    {
      name: 'Dr. Aris Vance',
      role: 'Professor of Public Health, Johns Hopkins',
      committee: 'Healthcare & Nutrition'
    },
    {
      name: 'Maya Lin',
      role: 'Former Managing Director, Clean Grid Alliance',
      committee: 'Environmental Action'
    },
    {
      name: 'Justice Sandra Sen',
      role: 'Retired High Court Magistrate',
      committee: 'Audit & Compliance'
    },
    {
      name: 'Vikram Mehta',
      role: 'Co-Founder, Tech4Good Accelerator',
      committee: 'Education Tech'
    }
  ];

  return (
    <div className={styles.directorsWrapper} id="our-directors-page">
      {/* 1. Hero Section */}
      <section className={styles.directorsHero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle}>Leadership & Trust</span>
          <h1 className={styles.heroTitle}>
            Guided by Experience, <span className={styles.highlight}>Driven by Trust</span>
          </h1>
          <p className={styles.heroDesc}>
            Our board and advisors bring together decades of leadership in international aid, logistics, auditing, and healthcare to ensure Worlify operates at the highest standard of accountability.
          </p>
        </div>
      </section>

      {/* 2. Executive Leadership Grid */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Executive Board</h2>
            <p className={styles.sectionSubtitle}>
              Meet the directors overseeing daily operations, financial compliance, and project execution across our global focus pillars.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {directorsData.map((director, idx) => (
              <div key={idx} className={styles.directorCard}>
                <div className={styles.imageWrapper}>
                  <img src={director.image?.src || director.image} alt={director.name} className={styles.directorImage} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.directorName}>{director.name}</h3>
                  <div className={styles.directorRole}>{director.role}</div>
                  <p className={styles.directorBio}>{director.bio}</p>
                  <div className={styles.socialRow}>
                    <Twitter size={16} className={styles.socialIcon} onClick={() => window.open(director.twitter)} />
                    <Linkedin size={16} className={styles.socialIcon} onClick={() => window.open(director.linkedin)} />
                    <Mail size={16} className={styles.socialIcon} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Executive Message Section */}
      <section className={styles.messageSection}>
        <div className="container">
          <div className={styles.messageGrid}>
            <div className={styles.messageImageWrapper}>
              <img
                src={raviKumarVermaImg?.src || raviKumarVermaImg}
                alt="Mr. Ravi Kumar Verma Chairman"
                className={styles.messageImage}
              />
            </div>
            <div className={styles.messageText}>
              <h2 className={styles.messageTitle}>Letter from the Chairman</h2>
              <div className={styles.messageQuote}>
                "The measure of an organization is not the volume of funds it raises, but the efficiency and integrity with which those funds are translated into human dignity."
              </div>
              <p className={styles.messageParagraph}>
                For over a decade, we have held our operations to strict standards of transparency. We believe the donor is a partner, not a transaction. By showing you the direct receipt-level deployment of your support, we establish a loop of accountability that drives our team every single day.
              </p>
              <p className={styles.messageParagraph}>
                As we scale our five development pillars, we pledge to maintain this high-efficiency delivery model. Thank you for walking this path of transformation with us.
              </p>
              <div className={styles.signatureArea}>
                <div className={styles.directorSig}>Mr. Ravi Kumar Verma</div>
                <div className={styles.directorSigTitle}>Chairman, Worlify</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Advisory Board & Governance Section */}
      <section className={styles.governanceSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Advisory Council & Governance Committees</h2>
            <p className={styles.sectionSubtitle}>
              Our independent advisory board reviews project efficacy, financial files, and regulatory compliance.
            </p>
          </div>

          <div className={styles.govTableWrapper}>
            <table className={styles.govTable}>
              <thead>
                <tr>
                  <th>Advisor Name</th>
                  <th>Primary Affiliation / Role</th>
                  <th>Board Committee focus</th>
                </tr>
              </thead>
              <tbody>
                {advisorsData.map((advisor, idx) => (
                  <tr key={idx}>
                    <td className={styles.govMemberName}>{advisor.name}</td>
                    <td>{advisor.role}</td>
                    <td>
                      <span className={styles.committeeBadge}>{advisor.committee}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
