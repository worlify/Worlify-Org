import React, { useState } from 'react';
import { db, isLocalMode } from '../lib/supabase';
import styles from '../styles/Auth.module.css';
import logoImport from '../assets/images/logo.png';
import avatarGirl1Import from '../assets/images/avatar_girl1.png';
import avatarGirl2Import from '../assets/images/avatar_girl2.png';
import avatarBoy1Import from '../assets/images/avatar_boy1.png';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';

// Safely extract image source strings for Next.js image imports
const logo = logoImport?.src || logoImport;
const avatarGirl1 = avatarGirl1Import?.src || avatarGirl1Import;
const avatarGirl2 = avatarGirl2Import?.src || avatarGirl2Import;
const avatarBoy1 = avatarBoy1Import?.src || avatarBoy1Import;

/**
 * Redesigned Auth Component
 * Matches the requested modern glassmorphic layout:
 * - Left Hero Panel: Ambient mesh gradient, translucent WORLIFY watermark, glossy 3D orb, Worlify Welfare Foundation title & subtext
 * - Right Form Panel: Sleek input fields with icons, pill-shaped primary action button, Google sign-in, and bottom social proof avatar widget
 */
export default function Auth({ onLoginSuccess }) {
  // Tabs: 'signin' or 'signup'
  const [activeTab, setActiveTab] = useState('signin');

  // Input fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Show/hide password toggle per form
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

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
    setSuccessMsg('');
    try {
      const { data, error } = await db.signIn(normalizedEmail, normalizedPassword);

      if (!error && data) {
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
    setSuccessMsg('');
    try {
      const { data, error } = await db.signUp(normalizedEmail, normalizedPassword, fullName);

      if (!error && data) {
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

  // Handle Forgot Password
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  return (
    <section className={styles.authSection} id="auth-section">
      {/* Ambient Radial Glow Background */}
      <div className={styles.ambientGlowContainer}>
        <div className={`${styles.glowSphere} ${styles.glowSphere1}`}></div>
        <div className={`${styles.glowSphere} ${styles.glowSphere2}`}></div>
      </div>

      {/* Main 2-Panel Card */}
      <div className={styles.authCardWrapper} id="auth-card">

        {/* LEFT PANEL: Branding & Visual Hero */}
        <div className={styles.leftHeroCard}>
          {/* Top Brand Tag */}
          <div className={styles.leftHeaderTag}>
            <span className={styles.badgeDot}></span>
            <span>Worlify Members Portal</span>
          </div>

          {/* Center 3D Glass Orb Graphic */}
          <div className={styles.orbGraphicContainer}>
            <div className={styles.glassOrb}>
              <div className={styles.orbShineSpec}></div>
              <div className={styles.orbInnerGlow}></div>
              <img src={logo} alt="Worlify Logo" className={styles.orbLogoOverlay} />
            </div>
          </div>

          {/* Bottom Branding Content */}
          <div className={styles.heroBottomContent}>
            <h2 className={styles.heroTitle}>
              <span>WORLIFY WELFARE </span>
              <span className={styles.titleSecondLine}>FOUNDATION</span>
            </h2>
            <p className={styles.heroDescription}>
              Join hands to serve society, empower underprivileged communities, and drive meaningful social change together.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: Authentication Form */}
        <div className={styles.rightFormCard}>
          <div>

            {/* Title & Subtitle */}
            <h2 className={styles.formTitle}>
              {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={styles.formSubtitle}>
              {activeTab === 'signin'
                ? 'Sign in to access your unified inbox'
                : 'Register to join Worlify Welfare Foundation'}
            </p>

            {/* Tab Triggers */}
            <div className={styles.tabToggleRow} id="auth-tabs">
              <button
                type="button"
                className={`${styles.tabToggleBtn} ${activeTab === 'signin' ? styles.tabToggleActive : ''}`}
                onClick={() => {
                  setActiveTab('signin');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                id="auth-tab-btn-signin"
              >
                Sign In
              </button>
              <button
                type="button"
                className={`${styles.tabToggleBtn} ${activeTab === 'signup' ? styles.tabToggleActive : ''}`}
                onClick={() => {
                  setActiveTab('signup');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                id="auth-tab-btn-signup"
              >
                Sign Up
              </button>
            </div>

            {/* Error Feedback Banner */}
            {errorMsg && (
              <div className={styles.errorBanner} id="auth-error-banner">
                <span className={styles.errorIcon}>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Feedback Banner */}
            {successMsg && (
              <div className={styles.successBanner}>
                <span className={styles.successIcon}>✓</span>
                <span>{successMsg}</span>
              </div>
            )}

            {/* SIGN IN FORM */}
            {activeTab === 'signin' ? (
              <form onSubmit={handleSignIn} id="signin-form" autoComplete="off">
                <input type="text" name="fake_user" style={{ display: 'none' }} readOnly tabIndex={-1} aria-hidden="true" />
                <input type="password" name="fake_pass" style={{ display: 'none' }} readOnly tabIndex={-1} aria-hidden="true" />

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIconLeft} size={18} />
                    <input
                      type="email"
                      className={styles.styledInput}
                      placeholder="you@example.com"
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
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Password</label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIconLeft} size={18} />
                    <input
                      type={showSignInPassword ? 'text' : 'password'}
                      className={styles.styledInput}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      required
                      id="signin-password-input"
                    />
                    <button
                      type="button"
                      className={styles.eyeToggleBtn}
                      onClick={() => setShowSignInPassword(prev => !prev)}
                      tabIndex={-1}
                      aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                      id="signin-toggle-password-btn"
                    >
                      {showSignInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Checkbox & Forgot Password Row */}
                <div className={styles.formOptionsRow}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className={styles.customCheckbox}
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className={styles.forgotPassBtn}
                    onClick={() => {
                      setForgotEmail(email);
                      setIsForgotModalOpen(true);
                      setForgotSent(false);
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Main Submit Pill Button */}
                <button
                  type="submit"
                  className={styles.primaryPillBtn}
                  disabled={isSubmitting}
                  id="signin-submit-btn"
                >
                  {isSubmitting ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            ) : (
              /* SIGN UP FORM */
              <form onSubmit={handleSignUp} id="signup-form" autoComplete="off">
                <input type="text" name="fake_username" style={{ display: 'none' }} readOnly tabIndex={-1} aria-hidden="true" />
                <input type="password" name="fake_password" style={{ display: 'none' }} readOnly tabIndex={-1} aria-hidden="true" />

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Full Name</label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIconLeft} size={18} />
                    <input
                      type="text"
                      className={styles.styledInput}
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
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIconLeft} size={18} />
                    <input
                      type="email"
                      className={styles.styledInput}
                      placeholder="you@example.com"
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
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Password</label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIconLeft} size={18} />
                    <input
                      type={showSignUpPassword ? 'text' : 'password'}
                      className={styles.styledInput}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                      id="signup-password-input"
                    />
                    <button
                      type="button"
                      className={styles.eyeToggleBtn}
                      onClick={() => setShowSignUpPassword(prev => !prev)}
                      tabIndex={-1}
                      aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
                      id="signup-toggle-password-btn"
                    >
                      {showSignUpPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Main Submit Pill Button */}
                <button
                  type="submit"
                  className={styles.primaryPillBtn}
                  disabled={isSubmitting}
                  id="signup-submit-btn"
                  style={{ marginTop: '12px' }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
            )}

            {/* Toggle Signin/Signup Link */}
            <p className={styles.togglePrompt}>
              {activeTab === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <span
                    className={styles.toggleLink}
                    onClick={() => {
                      setActiveTab('signup');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    id="switch-signup-link"
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span
                    className={styles.toggleLink}
                    onClick={() => {
                      setActiveTab('signin');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    id="switch-signin-link"
                  >
                    Sign in
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Social Proof Widget at Bottom of Right Card */}
          <div className={styles.socialProofCard}>
            <div className={styles.avatarStack}>
              <img src={avatarGirl1} alt="User Girl 1" className={styles.avatarImg} />
              <img src={avatarGirl2} alt="User Girl 2" className={styles.avatarImg} />
              <img src={avatarBoy1} alt="User Boy 1" className={styles.avatarImg} />
            </div>
            <div className={styles.socialProofText}>
              <div className={styles.proofHeadline}>2000+ Users</div>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsForgotModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Reset Password</h3>
            <p className={styles.modalSub}>
              Enter your registered email address to receive password reset instructions.
            </p>
            {forgotSent ? (
              <div className={styles.modalSuccess}>
                ✓ Password reset link has been sent to <strong>{forgotEmail}</strong>. Please check your inbox.
                <button
                  type="button"
                  className={styles.primaryPillBtn}
                  style={{ marginTop: '16px' }}
                  onClick={() => setIsForgotModalOpen(false)}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className={styles.inputGroup} style={{ marginTop: '14px' }}>
                  <label className={styles.inputLabel}>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIconLeft} size={18} />
                    <input
                      type="email"
                      className={styles.styledInput}
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.modalBtnRow}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setIsForgotModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.primaryPillBtn}>
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
