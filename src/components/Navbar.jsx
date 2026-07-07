import React, { useState } from 'react';
import { Globe, User, LogOut, Heart, Menu, X, ChevronDown } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

/**
 * Navbar Component
 * Renders the top header navigation, active page tab, and user-auth controls.
 * Uses CSS Modules for styling to avoid utility classes.
 */
export default function Navbar({ activeTab, setActiveTab, user, onLogout, isLocalMode, onOpenKeysModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

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

  return (
    <header className={styles.navbar} id="main-header">
      {/* Informative ribbon explaining Supabase local mock mode */}

      <div className={styles.navContainer}>
        {/* Brand Logo matching mockup */}
        <div 
          className={styles.logo} 
          onClick={() => handleNavClick('home')}
          id="navbar-logo"
        >
          <span className={styles.logoText}>Worlify</span>
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
              className={`${styles.navLink} ${activeTab === 'about' ? styles.activeNavLink : ''}`}
              onClick={() => handleNavClick('about')}
              id="nav-link-about"
            >
              About
            </li>
            <li 
              className={`${styles.navLink} ${activeTab === 'causes' ? styles.activeNavLink : ''}`}
              onClick={() => handleNavClick('causes')}
              id="nav-link-causes"
            >
              Our Causes
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
              {/* Authenticated user UI - Circular Avatar instead of Text Button */}
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
              {/* Guest UI */}
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

      {/* Mobile responsive menu dropdown */}
      {isMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-dropdown-menu">
          <ul className={styles.mobileNavLinks}>
            <li 
              className={`${styles.mobileNavLink} ${activeTab === 'home' ? styles.activeMobileNavLink : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </li>
            <li 
              className={`${styles.mobileNavLink} ${activeTab === 'about' ? styles.activeMobileNavLink : ''}`}
              onClick={() => handleNavClick('about')}
            >
              About
            </li>
            <li 
              className={`${styles.mobileNavLink} ${activeTab === 'causes' ? styles.activeMobileNavLink : ''}`}
              onClick={() => handleNavClick('causes')}
            >
              Our Causes
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
