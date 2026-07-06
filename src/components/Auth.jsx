import React, { useState } from 'react';
import { db } from '../lib/supabase';
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
          <form onSubmit={handleSignIn} id="signin-form">
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input
                type="email"
                className={styles.input}
                placeholder="e.g. supporter@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                inputMode="email"
                required
                id="signin-email-input"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password *</label>
              <input
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                id="signin-password-input"
              />
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
          <form onSubmit={handleSignUp} id="signup-form">
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                id="signup-name-input"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input
                type="email"
                className={styles.input}
                placeholder="e.g. supporter@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                inputMode="email"
                required
                id="signup-email-input"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Secure Password (Min 6 chars) *</label>
              <input
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                id="signup-password-input"
              />
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
