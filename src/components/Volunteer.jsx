import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/supabase';
import {
  Users, Heart, Globe, CheckCircle, ArrowRight, Lock,
  User, Mail, Phone, ChevronDown, BookOpen, Stethoscope,
  Leaf, Award, Zap, Shield, Clock, TrendingUp, Star,
} from 'lucide-react';
import styles from '../styles/Volunteer.module.css';

/* ── Constants ─────────────────────────────────────────────── */
const CAUSES = [
  'Education', 'Healthcare', 'Food & Nutrition', 'Human Rights',
  'Environment', 'Animal Welfare', 'Skill Development', 'Poverty Alleviation',
];

const STATS = [
  { value: '12,000+', label: 'Lives Impacted', icon: Heart },
  { value: '500+', label: 'Active Volunteers', icon: Users },
  { value: '8', label: 'Focus Programmes', icon: Globe },
  { value: '8', label: 'Years of Service', icon: Clock },
];

const WAYS = [
  {
    icon: Users,
    color: '#0d9488',
    bg: 'rgba(13,148,136,0.08)',
    title: 'Volunteer On Ground',
    desc: 'Spend time with communities in Lucknow — teach, heal, or simply listen. Every hour you give changes a life forever.',
    tags: ['Flexible Hours', 'Field Work', 'Training Provided'],
  },
  {
    icon: Heart,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    title: 'Donate & Fund Change',
    desc: '100% of your donation goes directly to our programmes — audited annually, transparent always. No impact is too small.',
    tags: ['80G Tax Benefit', 'Transparent Audit', 'One-time / Monthly'],
  },
  {
    icon: Globe,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    title: 'Corporate Partnership',
    desc: 'Align your CSR mandate with proven impact. We design, execute and report high-impact social programmes for forward-thinking companies.',
    tags: ['CSR Certified', 'Brand Visibility', 'Audited Reports'],
  },
];

const PERKS = [
  { icon: Award, text: 'Official volunteer certificate' },
  { icon: Shield, text: 'Background-verified safe network' },
  { icon: Zap, text: 'Flexible remote or on-field roles' },
  { icon: TrendingUp, text: 'Real-time impact dashboard access' },
  { icon: Star, text: 'Mentorship from sector leaders' },
  { icon: BookOpen, text: 'Free skill-development workshops' },
];

/* ── Animated Counter Hook ─────────────────────────────────── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const numericTarget = parseInt(target.replace(/\D/g, ''), 10);
      if (!numericTarget) { setCount(target); return; }
      const step = Math.ceil(numericTarget / (duration / 16));
      let cur = 0;
      const id = setInterval(() => {
        cur = Math.min(cur + step, numericTarget);
        setCount(cur.toLocaleString('en-IN') + (target.includes('+') ? '+' : ''));
        if (cur >= numericTarget) clearInterval(id);
      }, 16);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

/* ── Stat Item ─────────────────────────────────────────────── */
function StatItem({ value, label, icon: Icon }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className={styles.statItem} ref={ref}>
      <div className={styles.statIconWrap}><Icon size={20} /></div>
      <div className={styles.statValue}>{count || value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────── */
export default function Volunteer({ user, setActiveTab }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredCause, setPreferredCause] = useState('');
  const [motivation, setMotivation] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const name = user.first_name
        ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}` : '';
      setFullName(name);
      setEmail(user.email || '');
    } else {
      setFullName('');
      setEmail('');
    }
  }, [user]);

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = 'Full name is required.';
    if (!email.trim()) e.email = 'Email address is required.';
    if (!phoneNumber.trim()) e.phoneNumber = 'Phone number is required.';
    if (!preferredCause) e.preferredCause = 'Please select a cause.';
    if (!motivation.trim()) e.motivation = 'Please share your motivation.';
    return e;
  };

  const handleMotivationChange = (e) => {
    const val = e.target.value.slice(0, 500);
    setMotivation(val);
    setCharCount(val.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }
    setErrors({});
    setIsSubmitting(true);
    try {
      const { error } = await db.registerVolunteer(
        fullName, email, preferredCause, `Phone: ${phoneNumber}`, motivation
      );
      if (!error) {
        setSuccess(true);
        setPhoneNumber(''); setMotivation(''); setCharCount(0); setPreferredCause('');
      } else {
        alert('Registration failed: ' + error.message);
      }
    } catch (err) {
      console.error('Volunteer submit error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () =>
    document.getElementById('volunteer-form-anchor')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className={styles.page} id="volunteer-view-container">

      {/* ════════════════════════════════════════
          SECTION 1 — HERO BANNER
      ════════════════════════════════════════ */}
      <section className={styles.hero} id="volunteer-hero">
        <div className={styles.heroOverlay} />
        <div className={styles.heroGlow} />

        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <Leaf size={13} />
            <span>Together for a Better Tomorrow</span>
          </div>

          <h1 className={styles.heroH1}>
            Volunteer with <span className={styles.heroGradientText}>NGO India</span><br />
            Make a Real Difference in Lucknow
          </h1>

          <p className={styles.heroP}>
            Worlify Foundation is a registered NGO in Lucknow, Uttar Pradesh, India empowering thousands of lives across child education, healthcare camps, food security, and women empowerment. Join our team of passionate volunteers and receive official experience certificates for your social service.
          </p>

          <div className={styles.heroCtas}>
            <button className={styles.heroPrimary} onClick={scrollToForm} id="hero-join-btn">
              Join as Volunteer <ArrowRight size={17} />
            </button>
            <button className={styles.heroSecondary} onClick={() => setActiveTab('donate')} id="hero-donate-btn">
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 2 — ANIMATED STATS STRIP
      ════════════════════════════════════════ */}
      <section className={styles.statsStrip} id="impact-stats">
        <div className={styles.statsGrid}>
          {STATS.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 3 — WAYS TO GET INVOLVED
      ════════════════════════════════════════ */}
      <section className={styles.waysSection} id="ways-to-get-involved">
        <div className={styles.sectionWrap}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTag}>HOW YOU CAN HELP</span>
            <h2 className={styles.sectionH2}>Three Powerful Ways<br />to Drive Real Change</h2>
            <p className={styles.sectionSub}>
              Whether you have time, money, or influence — every form of support
              creates a ripple that reaches thousands.
            </p>
          </div>

          <div className={styles.waysGrid}>
            {WAYS.map((w) => (
              <div key={w.title} className={styles.wayCard}>
                <div className={styles.wayIconBox} style={{ background: w.bg, color: w.color }}>
                  <w.icon size={26} />
                </div>
                <h3 className={styles.wayTitle}>{w.title}</h3>
                <p className={styles.wayDesc}>{w.desc}</p>
                <div className={styles.wayTags}>
                  {w.tags.map((t) => (
                    <span key={t} className={styles.wayTag}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 4 — SPLIT: PERKS + FORM
      ════════════════════════════════════════ */}
      <section className={styles.splitSection} id="volunteer-form-anchor">
        <div className={styles.splitWrap}>

          {/* LEFT — Perks + decorative panel */}
          <div className={styles.leftPanel}>
            <div className={styles.leftBg} />
            <div className={styles.leftContent}>
              <span className={styles.leftEyebrow}>WHY VOLUNTEER WITH US</span>
              <h2 className={styles.leftH2}>
                Grow While You<br />Give Back
              </h2>
              <p className={styles.leftDesc}>
                Your time is the most valuable gift. We make sure every hour you
                invest creates both community impact and personal growth.
              </p>

              <div className={styles.perksList}>
                {PERKS.map(({ icon: Icon, text }) => (
                  <div key={text} className={styles.perkItem}>
                    <div className={styles.perkIconBox}><Icon size={15} /></div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Mini testimonial */}
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#f97316" color="#f97316" />
                  ))}
                </div>
                <p className={styles.testimonialText}>
                  "Volunteering with Worlify changed my perspective completely.
                  Within three months I was leading an education drive for 80 children."
                </p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>P</div>
                  <div>
                    <div className={styles.testimonialName}>Priya Sharma</div>
                    <div className={styles.testimonialRole}>Education Volunteer, Lucknow</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Form card */}
          <div className={styles.rightPanel}>
            <div className={styles.formCard} id="volunteer-interactive-form-box">
              {success ? (

                /* SUCCESS */
                <div className={styles.successState} id="volunteer-success-container">
                  <div className={styles.successRing}>
                    <CheckCircle size={36} />
                  </div>
                  <h2 className={styles.successTitle}>Application Received! 🎉</h2>
                  <p className={styles.successDesc}>
                    Thank you, <strong>{fullName}</strong>! Your interest in the{' '}
                    <strong>{preferredCause || 'selected'}</strong> programme has been logged.
                    Our field coordinator will contact you within 3–5 working days.
                  </p>
                  <div className={styles.successActions}>
                    {user ? (
                      <button className={styles.primaryBtn} onClick={() => setActiveTab('dashboard')} id="success-dashboard-view-btn">
                        View in Dashboard
                      </button>
                    ) : (
                      <button className={styles.primaryBtn} onClick={() => setActiveTab('auth')} id="success-auth-redirect-btn">
                        Sign In to Track Status
                      </button>
                    )}
                    <button className={styles.ghostBtn} onClick={() => setSuccess(false)} id="success-submit-another-btn">
                      Submit Another Application
                    </button>
                  </div>
                </div>

              ) : (

                /* FORM */
                <>
                  <div className={styles.formHeader}>
                    <div className={styles.formIconBadge}><Heart size={22} /></div>
                    <h2 className={styles.formTitle}>Join Our Mission</h2>
                    <p className={styles.formSubtitle}>
                      Fill out the form — we'll be in touch within 3 business days.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate id="mockup-volunteer-form">
                    <div className={styles.formGrid}>

                      {/* Full Name */}
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel} htmlFor="form-fullname-input">Full Name</label>
                        <div className={styles.inputWrap}>
                          <User size={14} className={styles.inputIcon} />
                          <input
                            id="form-fullname-input"
                            type="text"
                            className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                            placeholder="Your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                        {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
                      </div>

                      {/* Email */}
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel} htmlFor="form-email-input">Email Address</label>
                        <div className={styles.inputWrap}>
                          <Mail size={14} className={styles.inputIcon} />
                          <input
                            id="form-email-input"
                            type="email"
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel} htmlFor="form-phone-input">Phone Number</label>
                        <div className={styles.inputWrap}>
                          <Phone size={14} className={styles.inputIcon} />
                          <input
                            id="form-phone-input"
                            type="tel"
                            className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ''}`}
                            placeholder="+91 98765 43210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        {errors.phoneNumber && <span className={styles.errorMsg}>{errors.phoneNumber}</span>}
                      </div>

                      {/* Cause */}
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel} htmlFor="form-cause-select">Cause Preference</label>
                        <div className={styles.selectWrap}>
                          <select
                            id="form-cause-select"
                            className={`${styles.select} ${errors.preferredCause ? styles.inputError : ''}`}
                            value={preferredCause}
                            onChange={(e) => setPreferredCause(e.target.value)}
                          >
                            <option value="" disabled>Select a cause</option>
                            {CAUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown size={14} className={styles.selectChevron} />
                        </div>
                        {errors.preferredCause && <span className={styles.errorMsg}>{errors.preferredCause}</span>}
                      </div>

                      {/* Motivation */}
                      <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                        <label className={styles.fieldLabel} htmlFor="form-motivation-textarea">
                          Why do you want to join Worlify?
                        </label>
                        <div className={styles.textareaWrap}>
                          <textarea
                            id="form-motivation-textarea"
                            className={`${styles.textarea} ${errors.motivation ? styles.inputError : ''}`}
                            placeholder="Tell us about your motivation and what you hope to contribute..."
                            value={motivation}
                            onChange={handleMotivationChange}
                            rows={4}
                          />
                          <span className={styles.charCount}>{charCount}/500</span>
                        </div>
                        {errors.motivation && <span className={styles.errorMsg}>{errors.motivation}</span>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={isSubmitting}
                      id="form-submit-app-btn"
                    >
                      {isSubmitting ? (
                        <span className={styles.spinnerWrap}>
                          <span className={styles.spinner} />
                          Submitting…
                        </span>
                      ) : (
                        <>Submit Application <ArrowRight size={17} /></>
                      )}
                    </button>

                    <div className={styles.trustNote}>
                      <Lock size={12} />
                      <span>Your information is safe with us. We respect your privacy.</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 5 — BOTTOM CTA BANNER
      ════════════════════════════════════════ */}
      <section className={styles.ctaBanner} id="get-involved-cta">
        <div className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaH2}>Ready to Make Your Mark?</h2>
            <p className={styles.ctaP}>
              Join thousands of change-makers who've already taken the first step.
              Every action — big or small — matters.
            </p>
          </div>
          <div className={styles.ctaBtns}>
            <button className={styles.ctaPrimary} onClick={scrollToForm} id="cta-apply-btn">
              Apply Now <ArrowRight size={16} />
            </button>
            <button className={styles.ctaGhost} onClick={() => setActiveTab('contact')} id="cta-contact-btn">
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
