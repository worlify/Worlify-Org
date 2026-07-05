import React, { useState } from 'react';
import { Globe, User, LogOut, Heart, Menu, X } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

/**
 * Navbar Component
 * Renders the top header navigation, active page tab, and user-auth controls.
 * Uses CSS Modules for styling to avoid utility classes.
 */
export default function Navbar({ activeTab, setActiveTab, user, onLogout, isLocalMode, onOpenKeysModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

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
          </ul>
        </nav>

        {/* Auth status action group - Desktop */}
        <div className={styles.authGroup} id="auth-actions-group">
          {user ? (
            <>
              {/* Authenticated user UI */}
              <div 
                className={`${styles.navLink} ${activeTab === 'dashboard' ? styles.activeNavLink : ''} ${styles.userBadge}`}
                onClick={() => handleNavClick('dashboard')}
                id="nav-link-dashboard"
              >
                <User size={16} />
                <span>{user.first_name || user.email}</span>
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
          </ul>

          <div className={styles.mobileAuthDivider}></div>

          <div className={styles.mobileAuthGroup}>
            {user ? (
              <>
                <div 
                  className={styles.mobileUserBadge}
                  onClick={() => handleNavClick('dashboard')}
                >
                  <User size={16} />
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
