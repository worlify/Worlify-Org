'use client';

import React, { useState, useEffect } from 'react';
import logoImg from './assets/images/logo.png';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Causes from './components/Causes';
import Campaigns from './components/Campaigns';
import OurStory from './components/OurStory';
import OurMission from './components/OurMission';
import OurDirectors from './components/OurDirectors';
import Gallery from './components/Gallery';
import Volunteer from './components/Volunteer';
import Donate from './components/Donate';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Faqs from './components/Faqs';
import Legal from './components/Legal';
import Footer from './components/Footer';
import KeysModal from './components/KeysModal';
import FloatingActions from './components/FloatingActions';
import Toast from './components/Toast';
import { db, isLocalMode } from './lib/supabase';

const VALID_TABS = [
  'home', 'causes',
  'causes-education', 'causes-food-nutrition', 'causes-healthcare',
  'causes-human-rights', 'causes-environment', 'causes-animal-welfare',
  'causes-skill-development', 'causes-poverty-alleviation',
  'campaign',
  'campaign-padhaga-har-baccha', 'campaign-ann-seva', 'campaign-nayi-pehchaan',
  'campaign-sahara', 'campaign-apna-aashiyana', 'campaign-umeed',
  'campaign-dharti-bachao', 'campaign-jeev-raksha', 'campaign-beti-ki-muskan',
  'campaign-jeevandan',
  'about-story', 'about-mission', 'about-directors',
  'about', 'gallery', 'volunteer', 'donate', 'contact', 'faqs', 'legal',
  'auth', 'dashboard'
];

function getTabFromUrl() {
  if (typeof window === 'undefined') return 'home';
  // Prioritize clean pathname (e.g. /causes/education or /campaign/padhaga-har-baccha)
  let path = window.location.pathname.replace(/^\//, '').trim();
  if (path.startsWith('causes/')) {
    path = path.replace('/', '-');
  } else if (path.startsWith('campaign/')) {
    path = path.replace('/', '-');
  }
  if (path && VALID_TABS.includes(path)) {
    return path;
  }
  // Support hash fallback if present
  let hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (hash.startsWith('causes/')) {
    hash = hash.replace('/', '-');
  } else if (hash.startsWith('campaign/')) {
    hash = hash.replace('/', '-');
  }
  if (hash && VALID_TABS.includes(hash)) {
    return hash;
  }
  return 'home';
}

/**
 * Main Application Component (Worlify NGO)
 * Governs state-driven client-side routing, user session handling,
 * and global configuration guides.
 */
export default function App() {
  // Current visible tab initialized from URL
  const [activeTab, setActiveTabState] = useState(getTabFromUrl);

  const setActiveTab = (tabId) => {
    setActiveTabState(tabId);
    if (typeof window !== 'undefined') {
      let newPath = tabId === 'home' ? '/' : `/${tabId}`;
      if (tabId.startsWith('causes-')) {
        newPath = `/${tabId.replace('causes-', 'causes/')}`;
      } else if (tabId.startsWith('campaign-')) {
        newPath = `/${tabId.replace('campaign-', 'campaign/')}`;
      }
      if (window.location.pathname !== newPath || window.location.hash) {
        window.history.pushState({ tab: tabId }, '', newPath);
      }
    }
  };

  // Sync state on URL popstate (back/forward) or hashchange
  useEffect(() => {
    const handleUrlChange = () => {
      const tabFromUrl = getTabFromUrl();
      setActiveTabState(tabFromUrl);
    };

    const currentTab = getTabFromUrl();
    let targetPath = currentTab === 'home' ? '/' : `/${currentTab}`;
    if (currentTab.startsWith('causes-')) {
      targetPath = `/${currentTab.replace('causes-', 'causes/')}`;
    } else if (currentTab.startsWith('campaign-')) {
      targetPath = `/${currentTab.replace('campaign-', 'campaign/')}`;
    }
    if (typeof window !== 'undefined' && (window.location.pathname !== targetPath || window.location.hash)) {
      window.history.replaceState({ tab: currentTab }, '', targetPath);
    }

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Authenticated user state
  const [user, setUser] = useState(null);

  // Shared state to transfer donation intent between views (e.g., clicking support on a Cause)
  const [donationPreload, setDonationPreload] = useState('');

  // Supabase credentials configuration modal state
  const [keysModalOpen, setKeysModalOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Loading state for recovery session check
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Global Theme State
  const [theme, setTheme] = useState('light');

  // Initialize theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('worlify_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('worlify_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Restore session on application load
  // Uses Promise.all to enforce a minimum splash duration (600ms) so the
  // loader is always visible long enough — without adding delay when the
  // session check itself takes longer.
  useEffect(() => {
    async function restoreSession() {
      const MIN_SPLASH_MS = 600;
      const minDelay = new Promise((res) => setTimeout(res, MIN_SPLASH_MS));

      try {
        const currentUser = db.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          console.log('✅ Session restored:', currentUser.email);
        } else {
          console.log('No session found, showing home page');
        }
      } catch (e) {
        console.error('Session recovery failed: ', e);
      }

      // Wait until both the session check AND the minimum time have passed
      await minDelay;
      setIsLoadingSession(false);
    }
    restoreSession();
  }, []);

  // Dynamic client-side SEO update for title, description, keywords, and canonical URL
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const TAB_SEO = {
      'home': {
        title: 'Worlify Foundation | NGO India — Education, Healthcare & Community Welfare',
        desc: 'Worlify Foundation is a registered NGO based in Lucknow, Uttar Pradesh, India. We work on education, healthcare, food & nutrition, skill development, women empowerment, and environmental conservation. Donate online with 80G tax exemption.',
        canonical: 'https://worlify.org/'
      },
      'causes': {
        title: 'Our Causes | Education, Healthcare, Environment & More — Worlify Foundation',
        desc: 'Explore all causes supported by Worlify Foundation: education for underprivileged children, free healthcare camps, food & nutrition drives, skill development, environmental action, and more.',
        canonical: 'https://worlify.org/causes'
      },
      'causes-education': {
        title: 'Education for Underprivileged Children | Worlify Foundation NGO India',
        desc: 'Worlify Foundation provides tutoring, scholarships, and educational materials to underprivileged children in India. Support education for every child. Donate online with 80G tax benefit.',
        canonical: 'https://worlify.org/causes/education'
      },
      'causes-healthcare': {
        title: 'Free Healthcare Camps & Medical Support | Worlify Foundation NGO',
        desc: 'Worlify Foundation organizes free medical camps, health checkups, hygiene kits, and maternal healthcare in rural India. Support healthcare for the poor. Donate with 80G tax exemption.',
        canonical: 'https://worlify.org/causes/healthcare'
      },
      'causes-food-nutrition': {
        title: 'Food Security & Nutrition Programs | Worlify Foundation NGO India',
        desc: 'Worlify runs Ann Seva and nutrition drives ensuring no child goes to bed hungry. We tackle food insecurity and malnutrition across India. Donate to feed a family today.',
        canonical: 'https://worlify.org/causes/food-nutrition'
      },
      'causes-human-rights': {
        title: 'Human Rights Advocacy | Worlify Foundation NGO India',
        desc: 'Worlify Foundation advocates for the rights of marginalized communities across India. We provide legal awareness, support networks, and empowerment programs.',
        canonical: 'https://worlify.org/causes/human-rights'
      },
      'causes-environment': {
        title: 'Environmental Conservation & Green India | Worlify Foundation NGO',
        desc: 'Worlify Foundation drives environmental conservation through tree plantations, clean energy, water conservation, and zero-waste programs across India.',
        canonical: 'https://worlify.org/causes/environment'
      },
      'causes-animal-welfare': {
        title: 'Animal Welfare Programs | Worlify Foundation NGO India',
        desc: 'Worlify Foundation supports animal welfare through rescue, care, and awareness programs across India. We believe all living beings deserve compassion and protection.',
        canonical: 'https://worlify.org/causes/animal-welfare'
      },
      'causes-skill-development': {
        title: 'Skill Development & Vocational Training | Worlify Foundation NGO',
        desc: 'Worlify Foundation provides vocational training, coding courses, tailoring, agricultural techniques, and financial literacy to empower youth and women.',
        canonical: 'https://worlify.org/causes/skill-development'
      },
      'causes-poverty-alleviation': {
        title: 'Poverty Alleviation Programs | Worlify Foundation NGO India',
        desc: 'Worlify Foundation works to break the cycle of poverty through income support, housing assistance, welfare programs, and community empowerment.',
        canonical: 'https://worlify.org/causes/poverty-alleviation'
      },
      'campaign': {
        title: 'Active Campaigns | Donate to Change Lives — Worlify Foundation',
        desc: 'Browse all active fundraising campaigns by Worlify Foundation. From Padhega Har Baccha (education) to Ann Seva (nutrition) and Beti Ki Muskan (girl education).',
        canonical: 'https://worlify.org/campaign'
      },
      'campaign-padhaga-har-baccha': {
        title: 'Padhega Har Baccha — Education Campaign | Worlify Foundation',
        desc: 'Padhega Har Baccha is Worlify\'s flagship campaign to ensure every child in India gets access to quality education. Donate now for school supplies and scholarships.',
        canonical: 'https://worlify.org/campaign/padhaga-har-baccha'
      },
      'campaign-ann-seva': {
        title: 'Ann Seva — Food Security Campaign | Worlify Foundation',
        desc: 'Ann Seva is Worlify\'s nutrition and food distribution campaign targeting hunger and malnutrition in underserved communities. Donate to feed families in need.',
        canonical: 'https://worlify.org/campaign/ann-seva'
      },
      'campaign-nayi-pehchaan': {
        title: 'Nayi Pehchaan — Women Empowerment Campaign | Worlify Foundation',
        desc: 'Nayi Pehchaan empowers women through skill training, self-help groups, and economic independence programs in India.',
        canonical: 'https://worlify.org/campaign/nayi-pehchaan'
      },
      'campaign-sahara': {
        title: 'Sahara — Child Welfare Campaign | Worlify Foundation',
        desc: 'Sahara provides safety, shelter, nutrition, and counseling to vulnerable children across India. Join Worlify in protecting the future of every child.',
        canonical: 'https://worlify.org/campaign/sahara'
      },
      'campaign-apna-aashiyana': {
        title: 'Apna Aashiyana — Shelter & Housing Campaign | Worlify Foundation',
        desc: 'Apna Aashiyana helps homeless and underserved families gain safe shelter and housing support in India.',
        canonical: 'https://worlify.org/campaign/apna-aashiyana'
      },
      'campaign-umeed': {
        title: 'Umeed — Healthcare Campaign | Worlify Foundation NGO',
        desc: 'Umeed brings free medical camps, health screenings, and medicines to communities without access to healthcare.',
        canonical: 'https://worlify.org/campaign/umeed'
      },
      'campaign-dharti-bachao': {
        title: 'Dharti Bachao — Environmental Campaign | Worlify Foundation',
        desc: 'Dharti Bachao is Worlify\'s environmental campaign focused on tree plantation, clean energy, and sustainable living in India.',
        canonical: 'https://worlify.org/campaign/dharti-bachao'
      },
      'campaign-jeev-raksha': {
        title: 'Jeev Raksha — Animal Welfare Campaign | Worlify Foundation',
        desc: 'Jeev Raksha supports rescue, care, and protection of animals across India. Donate to give every living being a chance at life.',
        canonical: 'https://worlify.org/campaign/jeev-raksha'
      },
      'campaign-beti-ki-muskan': {
        title: 'Beti Ki Muskan — Girl Education Campaign | Worlify Foundation',
        desc: 'Beti Ki Muskan focuses on empowering girls through education, scholarships, and life skills programs in India.',
        canonical: 'https://worlify.org/campaign/beti-ki-muskan'
      },
      'campaign-jeevandan': {
        title: 'Jeevandan — Blood & Organ Donation Campaign | Worlify Foundation',
        desc: 'Jeevandan encourages blood and organ donation awareness across India. Worlify Foundation connects donors with those in need.',
        canonical: 'https://worlify.org/campaign/jeevandan'
      },
      'about': {
        title: 'About Worlify Foundation | Our Mission & Vision | NGO India',
        desc: 'Learn about Worlify Foundation — a registered multi-cause NGO in Lucknow, India. Discover our mission, vision, and five impact pillars.',
        canonical: 'https://worlify.org/about'
      },
      'about-story': {
        title: 'Our Story | How Worlify Foundation Was Founded | NGO India',
        desc: 'Read the story of Worlify Foundation — founded with a vision to create transparent, community-led change across India.',
        canonical: 'https://worlify.org/about-story'
      },
      'about-directors': {
        title: 'Our Leadership & Directors | Worlify Foundation NGO India',
        desc: 'Meet the team behind Worlify Foundation — our Chairman, Directors, and founding members leading community development in India.',
        canonical: 'https://worlify.org/about-directors'
      },
      'donate': {
        title: 'Donate Online to NGO India — 80G Tax Exemption | Worlify Foundation',
        desc: 'Donate securely online to Worlify Foundation, a registered NGO in India. Support education, healthcare, nutrition, and environmental causes. Get 80G tax exemption certificate.',
        canonical: 'https://worlify.org/donate'
      },
      'volunteer': {
        title: 'Volunteer with an NGO India | Join Worlify Foundation',
        desc: 'Become a volunteer with Worlify Foundation and create real change in communities across India. Apply online to volunteer in education, healthcare, environment, or field operations.',
        canonical: 'https://worlify.org/volunteer'
      },
      'gallery': {
        title: 'Photo Gallery | Our Work on the Ground | Worlify Foundation',
        desc: 'See Worlify Foundation in action through our photo gallery. Real stories, real people, real impact across India.',
        canonical: 'https://worlify.org/gallery'
      },
      'contact': {
        title: 'Contact Worlify Foundation | NGO India — Get In Touch',
        desc: 'Reach out to Worlify Foundation for donations, partnerships, volunteering, or general inquiries. Based in Lucknow, Uttar Pradesh, India.',
        canonical: 'https://worlify.org/contact'
      },
      'faqs': {
        title: 'Frequently Asked Questions | Worlify Foundation NGO India',
        desc: 'Find answers to common questions about Worlify Foundation: how to donate, 80G tax exemption, volunteering, fund usage, and campaign details.',
        canonical: 'https://worlify.org/faqs'
      },
      'legal': {
        title: 'Legal Documents & Transparency | 80G, 12A, PAN | Worlify Foundation',
        desc: 'Worlify Foundation is a legally registered NGO in India with 80G, 12A, NITI Aayog, and CSR-1 compliance. Download legal documents and reports.',
        canonical: 'https://worlify.org/legal'
      }
    };

    const currentMeta = TAB_SEO[activeTab] || TAB_SEO['home'];
    document.title = currentMeta.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentMeta.desc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = currentMeta.desc;
      document.head.appendChild(metaDesc);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentMeta.canonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = currentMeta.canonical;
      document.head.appendChild(canonicalLink);
    }

    window.scrollTo(0, 0);
  }, [activeTab]);

  // Login handler
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveTab('dashboard'); // Forward to dashboard
    setToast({
      message: `Welcome back, ${userData.first_name || 'Supporter'}! Signed in successfully.`,
      type: 'success'
    });
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      const { error } = await db.signOut();
      if (!error) {
        setUser(null);
        setActiveTab('home'); // Send back home
        setToast({
          message: 'You have been logged out successfully. See you soon!',
          type: 'info'
        });
      } else {
        setToast({
          message: 'Logout failed: ' + error.message,
          type: 'error'
        });
      }
    } catch (err) {
      console.error('Error during logout: ', err);
      setToast({
        message: 'An unexpected error occurred during logout.',
        type: 'error'
      });
    }
  };

  if (isLoadingSession) {
    return (
      <div className="worlify-splash" id="loading-screen" role="status" aria-label="Loading Worlify Foundation">

        {/* Top progress bar */}
        <div className="worlify-splash__progress-bar" />

        {/* Dual-ring spinner */}
        <div className="worlify-splash__spinner-wrap">
          <svg
            className="worlify-splash__ring-outer"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="url(#ringGradOuter)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="198 66"
            />
            <defs>
              <linearGradient id="ringGradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            className="worlify-splash__ring-inner"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="50" cy="50" r="28"
              fill="none"
              stroke="url(#ringGradInner)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="88 88"
            />
            <defs>
              <linearGradient id="ringGradInner" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centre dot */}
          <div className="worlify-splash__centre-dot" />
        </div>

        {/* Brand text */}
        <p className="worlify-splash__brand-text">Worlify Foundation</p>

      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-color)'
      }}
      id="worlify-root"
    >
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
      {/* 1. Universal Site Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        isLocalMode={isLocalMode}
        onOpenKeysModal={() => setKeysModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. Main Tabbed Panel Stage */}
      <main style={{ flexGrow: 1 }} id="main-content-stage">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            setDonationPreload={setDonationPreload}
            isLocalMode={isLocalMode}
          />
        )}

        {(activeTab === 'causes' || activeTab.startsWith('causes-')) && (
          <Causes
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setDonationPreload={setDonationPreload}
            preloadedCause={donationPreload}
            clearPreload={() => setDonationPreload('')}
          />
        )}

        {(activeTab === 'campaign' || activeTab.startsWith('campaign-')) && (
          <Campaigns
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setDonationPreload={setDonationPreload}
            preloadedCause={donationPreload}
            clearPreload={() => setDonationPreload('')}
          />
        )}

        {activeTab === 'about-story' && (
          <OurStory
            setActiveTab={setActiveTab}
          />
        )}

        {(activeTab === 'about' || activeTab === 'about-mission') && (
          <OurMission
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'about-directors' && (
          <OurDirectors
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'gallery' && (
          <Gallery setActiveTab={setActiveTab} setDonationPreload={setDonationPreload} />
        )}

        {activeTab === 'volunteer' && (
          <Volunteer
            user={user}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'donate' && (
          <Donate
            user={user}
            preloadedCause={donationPreload}
            clearPreload={() => setDonationPreload('')}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contact' && (
          <Contact
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'faqs' && (
          <Faqs
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'legal' && (
          <Legal
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'auth' && (
          <Auth
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            user={user}
            onUserUpdate={(updatedUser) => setUser(updatedUser)}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* 3. Site-wide Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4. Supabase Setup Guide Modal */}
      <KeysModal
        isOpen={keysModalOpen}
        onClose={() => setKeysModalOpen(false)}
      />

      {/* 5. Floating Actions (Phone Call, WhatsApp, Reach Top) */}
      <FloatingActions />

    </div>
  );
}
