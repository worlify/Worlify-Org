import React, { useState } from 'react';
import { User, LogOut, Heart, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import styles from '../styles/Navbar.module.css';
import logo from '../assets/images/logo.png';

const MARQUEE_TEXT = "Worlify Foundation is registered under sections 12A & 80G of the Income Tax Act, 1961 and CSR-1 registered under the Ministry of Corporate Affairs for undertaking CSR activities.";

/**
 * Navbar Component
 * Renders top header navigation, active page tab, and user-auth controls.
 * Integrates light/dark toggle and interactive dropdowns for About, Causes, and Contact.
 */
export default function Navbar({ activeTab, setActiveTab, user, onLogout, isLocalMode, onOpenKeysModal, theme = 'light', toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutDropdownOpen, setIsMobileAboutDropdownOpen] = useState(false);
  const [isCausesDropdownOpen, setIsCausesDropdownOpen] = useState(false);
  const [isMobileCausesDropdownOpen, setIsMobileCausesDropdownOpen] = useState(false);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  const getInitials = () => {
    if (user?.first_name) {
      return user.first_name.trim().charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.trim().charAt(0).toUpperCase();
    }
    return 'U';
  };

  const isContactActive = activeTab === 'contact' || activeTab === 'faqs';
  const isAboutActive = activeTab === 'about-story' || activeTab === 'about-mission' || activeTab === 'about-directors' || activeTab === 'about';
  const isCausesActive = activeTab === 'causes' || activeTab.startsWith('causes-');

  const causesList = [
    { id: 'causes-education', label: 'Education' },
    { id: 'causes-food-nutrition', label: 'Food & Nutrition' },
    { id: 'causes-healthcare', label: 'Healthcare' },
    { id: 'causes-human-rights', label: 'Human Rights' },
    { id: 'causes-environment', label: 'Environment' },
    { id: 'causes-animal-welfare', label: 'Animal Welfare' },
    { id: 'causes-skill-development', label: 'Skill Development' },
    { id: 'causes-poverty-alleviation', label: 'Poverty Alleviation' },
  ];

  return (
    <header className={styles.navbar} id="main-header">

      {/* 1. Top Bar Ribbon (Marquee, Dark Theme Toggle) */}
      <div className={styles.topBar} id="header-top-bar">
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTextContainer}>
            <span className={styles.marqueeSpan}>{MARQUEE_TEXT}</span>
            <span className={styles.marqueeSpan}>{MARQUEE_TEXT}</span>
          </div>
        </div>

        <div className={styles.topBarControls}>
          {/* Theme Toggle */}
          <button
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle Theme Mode"
          >
            {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
          </button>
        </div>
      </div>

      {/* 2. Main Navigation Header Container */}
      <div className={styles.navContainer}>
        {/* Brand Logo */}
        <div
          className={styles.logo}
          onClick={() => handleNavClick('home')}
          id="navbar-logo"
        >
          <img src={logo.src || logo} alt="Worlify Foundation" className={styles.logoImg} />
        </div>

        {/* Navigation links centered - Desktop */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks} id="nav-links-list">
            <li
              className={`${styles.navLink} ${activeTab === 'home' ? styles.activeNavLink : ''}`}
              onClick={() => handleNavClick('home')}
              id="nav-link-home"
            >
              Home
            </li>
            <li
              className={`${styles.navLink} ${styles.dropdownContainer} ${isAboutActive ? styles.activeNavLink : ''}`}
              onMouseEnter={() => setIsAboutDropdownOpen(true)}
              onMouseLeave={() => setIsAboutDropdownOpen(false)}
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
              id="nav-link-about-parent"
            >
              <span className={styles.dropdownToggle}>
                About <ChevronDown size={14} className={`${styles.caretIcon} ${isAboutDropdownOpen ? styles.caretRotated : ''}`} />
              </span>
              {isAboutDropdownOpen && (
                <ul className={styles.dropdownMenu} id="about-dropdown-menu">
                  <li
                    className={`${styles.dropdownItem} ${activeTab === 'about-story' ? styles.activeDropdownItem : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick('about-story');
                      setIsAboutDropdownOpen(false);
                    }}
                    id="dropdown-item-our-story"
                  >
                    Our Story
                  </li>
                  <li
                    className={`${styles.dropdownItem} ${activeTab === 'about-mission' ? styles.activeDropdownItem : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick('about-mission');
                      setIsAboutDropdownOpen(false);
                    }}
                    id="dropdown-item-our-mission"
                  >
                    Our Mission
                  </li>
                  <li
                    className={`${styles.dropdownItem} ${activeTab === 'about-directors' ? styles.activeDropdownItem : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick('about-directors');
                      setIsAboutDropdownOpen(false);
                    }}
                    id="dropdown-item-our-directors"
                  >
                    People Behind Worlify
                  </li>
                </ul>
              )}
            </li>

            {/* Our Causes Dropdown - Desktop */}
            <li
              className={`${styles.navLink} ${styles.dropdownContainer} ${isCausesActive ? styles.activeNavLink : ''}`}
              onMouseEnter={() => setIsCausesDropdownOpen(true)}
              onMouseLeave={() => setIsCausesDropdownOpen(false)}
              onClick={() => setIsCausesDropdownOpen(!isCausesDropdownOpen)}
              id="nav-link-causes-parent"
            >
              <span className={styles.dropdownToggle}>
                Our Causes <ChevronDown size={14} className={`${styles.caretIcon} ${isCausesDropdownOpen ? styles.caretRotated : ''}`} />
              </span>
              {isCausesDropdownOpen && (
                <ul className={styles.dropdownMenu} id="causes-dropdown-menu">
                  {causesList.map((item) => (
                    <li
                      key={item.id}
                      className={`${styles.dropdownItem} ${activeTab === item.id ? styles.activeDropdownItem : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(item.id);
                        setIsCausesDropdownOpen(false);
                      }}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li
              className={`${styles.navLink} ${activeTab === 'volunteer' ? styles.activeNavLink : ''}`}
              onClick={() => handleNavClick('volunteer')}
              id="nav-link-volunteer"
            >
              Get Involved
            </li>
            <li
              className={`${styles.navLink} ${activeTab === 'gallery' ? styles.activeNavLink : ''}`}
              onClick={() => handleNavClick('gallery')}
              id="nav-link-gallery"
            >
              Gallery
            </li>
            <li
              className={`${styles.navLink} ${activeTab === 'legal' ? styles.activeNavLink : ''}`}
              onClick={() => handleNavClick('legal')}
              id="nav-link-legal"
            >
              Legal & Transparency
            </li>
            <li
              className={`${styles.navLink} ${styles.dropdownContainer} ${isContactActive ? styles.activeNavLink : ''}`}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              id="nav-link-contact-parent"
            >
              <span className={styles.dropdownToggle}>
                Contact Us <ChevronDown size={14} className={`${styles.caretIcon} ${isDropdownOpen ? styles.caretRotated : ''}`} />
              </span>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu} id="contact-dropdown-menu">
                  <li
                    className={`${styles.dropdownItem} ${activeTab === 'contact' ? styles.activeDropdownItem : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick('contact');
                      setIsDropdownOpen(false);
                    }}
                    id="dropdown-item-get-in-touch"
                  >
                    Get in Touch
                  </li>
                  <li
                    className={`${styles.dropdownItem} ${activeTab === 'faqs' ? styles.activeDropdownItem : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick('faqs');
                      setIsDropdownOpen(false);
                    }}
                    id="dropdown-item-faqs"
                  >
                    FAQs
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Auth status action group - Desktop */}
        <div className={styles.authGroup} id="auth-actions-group">
          {user ? (
            <>
              <div
                className={`${styles.avatarCircle} ${activeTab === 'dashboard' ? styles.activeAvatarCircle : ''}`}
                onClick={() => handleNavClick('dashboard')}
                id="nav-link-dashboard"
                title={`Go to Dashboard (${user.first_name || user.email})`}
              >
                {getInitials()}
              </div>
              <button
                className={styles.logoutBtn}
                onClick={onLogout}
                id="logout-btn"
              >
                <LogOut size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.loginBtn}
                onClick={() => handleNavClick('auth')}
                id="login-btn"
              >
                Sign In
              </button>
            </>
          )}

          {/* Core high-impact CTA button */}
          <button
            className={styles.donateBtn}
            onClick={() => handleNavClick('donate')}
            id="quick-donate-btn"
          >
            Donate Now
          </button>
        </div>

        {/* Mobile responsive hamburger toggle button */}
        <button
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile responsive menu drawer */}
      {isMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-dropdown-menu">
          <ul className={styles.mobileNavLinks}>
            <li
              className={`${styles.mobileNavLink} ${activeTab === 'home' ? styles.activeMobileNavLink : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </li>
            <li className={styles.mobileDropdownContainer}>
              <div
                className={`${styles.mobileNavLink} ${styles.mobileDropdownToggle} ${isAboutActive ? styles.activeMobileNavLink : ''}`}
                onClick={() => setIsMobileAboutDropdownOpen(!isMobileAboutDropdownOpen)}
              >
                About <ChevronDown size={16} className={`${styles.caretIcon} ${isMobileAboutDropdownOpen ? styles.caretRotated : ''}`} />
              </div>
              {isMobileAboutDropdownOpen && (
                <ul className={styles.mobileSubMenu}>
                  <li
                    className={`${styles.mobileSubNavLink} ${activeTab === 'about-story' ? styles.activeMobileSubNavLink : ''}`}
                    onClick={() => {
                      handleNavClick('about-story');
                      setIsMenuOpen(false);
                    }}
                  >
                    Our Story
                  </li>
                  <li
                    className={`${styles.mobileSubNavLink} ${activeTab === 'about-mission' ? styles.activeMobileSubNavLink : ''}`}
                    onClick={() => {
                      handleNavClick('about-mission');
                      setIsMenuOpen(false);
                    }}
                  >
                    Our Mission
                  </li>
                  <li
                    className={`${styles.mobileSubNavLink} ${activeTab === 'about-directors' ? styles.activeMobileSubNavLink : ''}`}
                    onClick={() => {
                      handleNavClick('about-directors');
                      setIsMenuOpen(false);
                    }}
                  >
                    People Behind Worlify
                  </li>
                </ul>
              )}
            </li>

            {/* Our Causes Dropdown - Mobile */}
            <li className={styles.mobileDropdownContainer}>
              <div
                className={`${styles.mobileNavLink} ${styles.mobileDropdownToggle} ${isCausesActive ? styles.activeMobileNavLink : ''}`}
                onClick={() => setIsMobileCausesDropdownOpen(!isMobileCausesDropdownOpen)}
              >
                Our Causes <ChevronDown size={16} className={`${styles.caretIcon} ${isMobileCausesDropdownOpen ? styles.caretRotated : ''}`} />
              </div>
              {isMobileCausesDropdownOpen && (
                <ul className={styles.mobileSubMenu}>
                  {causesList.map((item) => (
                    <li
                      key={item.id}
                      className={`${styles.mobileSubNavLink} ${activeTab === item.id ? styles.activeMobileSubNavLink : ''}`}
                      onClick={() => {
                        handleNavClick(item.id);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li
              className={`${styles.mobileNavLink} ${activeTab === 'volunteer' ? styles.activeMobileNavLink : ''}`}
              onClick={() => handleNavClick('volunteer')}
            >
              Get Involved
            </li>
            <li
              className={`${styles.mobileNavLink} ${activeTab === 'gallery' ? styles.activeMobileNavLink : ''}`}
              onClick={() => handleNavClick('gallery')}
            >
              Gallery
            </li>
            <li
              className={`${styles.mobileNavLink} ${activeTab === 'legal' ? styles.activeMobileNavLink : ''}`}
              onClick={() => handleNavClick('legal')}
            >
              Legal & Transparency
            </li>
            <li className={styles.mobileDropdownContainer}>
              <div
                className={`${styles.mobileNavLink} ${styles.mobileDropdownToggle} ${isContactActive ? styles.activeMobileNavLink : ''}`}
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                Contact Us <ChevronDown size={16} className={`${styles.caretIcon} ${isMobileDropdownOpen ? styles.caretRotated : ''}`} />
              </div>
              {isMobileDropdownOpen && (
                <ul className={styles.mobileSubMenu}>
                  <li
                    className={`${styles.mobileSubNavLink} ${activeTab === 'contact' ? styles.activeMobileSubNavLink : ''}`}
                    onClick={() => {
                      handleNavClick('contact');
                      setIsMenuOpen(false);
                    }}
                  >
                    Get in Touch
                  </li>
                  <li
                    className={`${styles.mobileSubNavLink} ${activeTab === 'faqs' ? styles.activeMobileSubNavLink : ''}`}
                    onClick={() => {
                      handleNavClick('faqs');
                      setIsMenuOpen(false);
                    }}
                  >
                    FAQs
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <div className={styles.mobileAuthDivider}></div>

          <div className={styles.mobileAuthGroup}>
            {user ? (
              <>
                <div
                  className={styles.mobileUserBadge}
                  onClick={() => {
                    handleNavClick('dashboard');
                    setIsMenuOpen(false);
                  }}
                >
                  <div className={styles.mobileAvatar}>
                    {getInitials()}
                  </div>
                  <span>{user.first_name || user.email}</span>
                </div>
                <button
                  className={styles.mobileLogoutBtn}
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className={styles.mobileLoginBtn}
                onClick={() => handleNavClick('auth')}
              >
                Sign In
              </button>
            )}
            <button
              className={styles.mobileDonateBtn}
              onClick={() => handleNavClick('donate')}
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
