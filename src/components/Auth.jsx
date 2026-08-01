import React, { useState } from 'react';
import { db, isLocalMode } from '../lib/supabase';
import styles from '../styles/Auth.module.css';

/**
 * Auth Component
 * Multi-tab Sign In / Register module. Handles:
 * - Local fallback authentication (localStorage user profiles)
 * - Real Supabase Auth requests if keys are loaded
 * - Real-time error formatting
 */
export default function Auth({ onLoginSuccess }) {
  // Tabs: 'signin' or 'signup'
  const [activeTab, setActiveTab] = useState('signin');

  // Input fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Show/hide password toggle per form
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Sign In submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please complete all credential fields.');
      return;
    }

    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const { data, error } = await db.signIn(normalizedEmail, normalizedPassword);

      if (!error && data) {
        // Authenticated successfully! Notify parent App
        onLoginSuccess(data.user);
      } else {
        setErrorMsg(error ? error.message : 'Invalid credentials. Please retry.');
      }
    } catch (err) {
      console.error('Sign in exception: ', err);
      setErrorMsg('An unexpected error occurred during auth.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Sign Up submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setErrorMsg('Please fill in all registration fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const { data, error } = await db.signUp(normalizedEmail, normalizedPassword, fullName);

      if (!error && data) {
        // Registered and auto logged in! Notify parent App
        onLoginSuccess(data.user);
      } else {
        setErrorMsg(error ? error.message : 'Registration failed.');
      }
    } catch (err) {
      console.error('Sign up exception: ', err);
      setErrorMsg('An unexpected error occurred during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.authSection} id="auth-section">
      <div className={styles.authCard} id="auth-card">
        {/* Auth title */}
        <div className={styles.authHeader}>
          <h2 className={styles.authTitle}>Supporter Portal</h2>
          <p className={styles.authDesc}>
            Join the Worlify network to log donations and track active volunteer status.
          </p>
        </div>

        {/* Tab triggers */}
        <div className={styles.tabs} id="auth-tabs">
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'signin' ? styles.activeTabBtn : ''}`}
            onClick={() => {
              setActiveTab('signin');
              setErrorMsg('');
            }}
            id="auth-tab-btn-signin"
          >
            Sign In
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'signup' ? styles.activeTabBtn : ''}`}
            onClick={() => {
              setActiveTab('signup');
              setErrorMsg('');
            }}
            id="auth-tab-btn-signup"
          >
            Register
          </button>
        </div>

        {/* Error Feedback banner */}
        {errorMsg && (
          <div className={styles.errorBanner} id="auth-error-banner">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Auth Form Panel */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} id="signin-form" autoComplete="off">
            {/* Hidden honeypot inputs — trick browsers into NOT autofilling the real fields */}
            <input type="text" name="fake_user" style={{ display: 'none' }} readOnly tabIndex={-1} aria-hidden="true" />
            <input type="password" name="fake_pass" style={{ display: 'none' }} readOnly tabIndex={-1} aria-hidden="true" />
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input
                type="email"
                className={styles.input}
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                inputMode="email"
                required
                id="signin-email-input"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password *</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showSignInPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                  id="signin-password-input"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowSignInPassword(prev => !prev)}
                  tabIndex={-1}
                  aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                  id="signin-toggle-password-btn"
                >
                  {showSignInPassword ? (
                    // Eye-off icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    // Eye icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
              id="signin-submit-btn"
            >
              {isSubmitting ? 'Authenticating Supporter...' : 'Access My Account'}
            </button>

            <p className={styles.togglePrompt}>
              New to Worlify?{' '}
              <span
                className={styles.toggleLink}
                onClick={() => {
                  setActiveTab('signup');
                  setErrorMsg('');
                }}
                id="switch-signup-link"
              >
                Register Here
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignUp} id="signup-form" autoComplete="off">
            {/* Hidden honeypot inputs — trick browsers into NOT autofilling the real fields */}
            <input type="text" name="fake_username" style={{ display: 'none' }} readOnly tabIndex={-1} aria-hidden="true" />
            <input type="password" name="fake_password" style={{ display: 'none' }} readOnly tabIndex={-1} aria-hidden="true" />

            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="words"
                required
                id="signup-name-input"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input
                type="email"
                className={styles.input}
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                inputMode="email"
                required
                id="signup-email-input"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Secure Password (Min 6 chars) *</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showSignUpPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  id="signup-password-input"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowSignUpPassword(prev => !prev)}
                  tabIndex={-1}
                  aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
                  id="signup-toggle-password-btn"
                >
                  {showSignUpPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
              id="signup-submit-btn"
            >
              {isSubmitting ? 'Creating Secure Account...' : 'Register Secure Account'}
            </button>

            <p className={styles.togglePrompt}>
              Already have an account?{' '}
              <span
                className={styles.toggleLink}
                onClick={() => {
                  setActiveTab('signin');
                  setErrorMsg('');
                }}
                id="switch-signin-link"
              >
                Login Here
              </span>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
