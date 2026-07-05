import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { 
  CheckCircle, 
  Shield, 
  Gift, 
  Heart, 
  ArrowRight, 
  Lock, 
  CreditCard, 
  Landmark, 
  QrCode, 
  Smartphone, 
  Check, 
  BookOpen, 
  TrendingUp, 
  ChevronRight, 
  Award,
  Globe
} from 'lucide-react';
import styles from '../styles/Donate.module.css';

/**
 * Donate Component - High Fidelity Redesign matching Mockup
 * Fully integrated with database fallback systems for seamless tracking.
 */
export default function Donate({ user, preloadedCause, clearPreload, setActiveTab }) {
  // General Fund vs Specific Cause tab selection
  const [directTo, setDirectTo] = useState('general'); // 'general' or 'cause'
  
  // Frequency toggle (One-time vs Monthly)
  const [frequency, setFrequency] = useState('one-time'); // 'one-time' or 'monthly'
  
  // Selected donation presets (Currency: INR ₹)
  const [selectedAmount, setSelectedAmount] = useState('2500'); // '1000', '2500', '5000', '10000'
  const [customAmount, setCustomAmount] = useState('');
  
  const [selectedCause, setSelectedCause] = useState('Education');
  
  // Billing details (Simulated security form fields revealed upon proceed)
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastAmountLogged, setLastAmountLogged] = useState(2500);

  // Sync state if user redirected with a preloaded cause selection
  useEffect(() => {
    if (preloadedCause) {
      // Clean cause tag if it has decorative texts
      const cleanCause = preloadedCause
        .replace(' Support', '')
        .replace(' Programs', '')
        .replace(' Services', '')
        .replace(' Action', '');
      
      setSelectedCause(cleanCause);
      setDirectTo('cause'); // auto open cause selector
      clearPreload(); // Clear reference
    }
  }, [preloadedCause]);

  // Pre-populate email if user is logged in
  useEffect(() => {
    if (user) {
      setDonorEmail(user.email || '');
      setCardName(user.full_name || '');
    } else {
      setDonorEmail('');
      setCardName('');
    }
  }, [user]);

  // Preset amount options
  const presets = [
    { value: '1000', label: '₹1K', desc: 'One school kit' },
    { value: '2500', label: '₹2.5K', desc: 'Medical care' },
    { value: '5000', label: '₹5K', desc: 'Skill training' },
    { value: '10000', label: '₹10K', desc: 'Water system' },
  ];

  // Calculate final selected amount
  const getFinalAmount = () => {
    if (customAmount) {
      return Number(customAmount);
    }
    return Number(selectedAmount);
  };

  // Toggle frequency switch
  const handleFrequencyToggle = () => {
    setFrequency(prev => prev === 'one-time' ? 'monthly' : 'one-time');
  };

  // Handle Proceed to checkout
  const handleProceedClick = () => {
    const finalAmount = getFinalAmount();
    if (!finalAmount || finalAmount <= 0) {
      alert('Please enter or select a valid donation amount.');
      return;
    }
    // Reveal billing inputs
    setShowBillingForm(true);
    // Auto scroll down to billing section smoothly
    setTimeout(() => {
      const billingEl = document.getElementById('billing-form-wrapper');
      if (billingEl) {
        billingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Handle donation checkout payment
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    
    const finalAmount = getFinalAmount();
    const destination = directTo === 'general' ? 'General Fund' : selectedCause;

    if (!finalAmount || finalAmount <= 0) {
      alert('Please enter or select a valid donation amount.');
      return;
    }

    if (!donorEmail) {
      alert('Please provide a receipt email address.');
      return;
    }

    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      alert('Please complete all security billing fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const emailToUse = donorEmail || (user ? user.email : 'anonymous@helper.org');
      
      const { data, error } = await db.addDonation(finalAmount, destination, emailToUse);

      if (!error) {
        setLastAmountLogged(finalAmount);
        setSuccess(true);
        // Clear inputs and states
        setCustomAmount('');
        setCardNumber('');
        setCardExpiry('');
        setCardCvv('');
        setShowBillingForm(false);
      } else {
        alert('Payment processing failed: ' + error.message);
      }
    } catch (err) {
      console.error('Error executing checkout: ', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.donateContainer} id="donate-view-root">
      
      {/* 1. Hero Cover Banner / Split Layout Section */}
      <section className={styles.heroSection} id="donate-hero-section">
        <div className={styles.heroGrid}>
          
          {/* Left Column Text details */}
          <div className={styles.heroLeft}>
            <span className={styles.joinBadge}>Join The Movement</span>
            <h1 className={styles.heroTitle}>
              Your Contribution Makes an <span className={styles.heroTitleHighlight}>Impact</span>
            </h1>
            <p className={styles.heroDesc}>
              Empower communities, protect the environment, and provide essential healthcare. Every rupee you share helps us build a more equitable world for everyone.
            </p>
            
            {/* 100% Tax Benefit Card */}
            <div className={styles.taxBenefitCard} id="tax-benefit-guarantee-card">
              <div className={styles.shieldIconWrapper}>
                <Shield size={20} />
              </div>
              <div>
                <h4 className={styles.taxTitle}>100% Tax Benefit</h4>
                <p className={styles.taxSub}>Eligible for 80G tax exemption</p>
              </div>
            </div>
          </div>

          {/* Right Column: Active Campaign Highlight Frame */}
          <div className={styles.heroRight}>
            <div className={styles.imageWrapper} id="campaign-banner-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" 
                alt="Teacher helping Indian school children" 
                className={styles.campaignImg}
              />
              
              {/* Floating campaign overlay widget */}
              <div className={styles.activeProjectCard} id="floating-active-project-card">
                <span className={styles.activeTag}>ACTIVE PROJECT</span>
                <div className={styles.activeRow}>
                  <span className={styles.projectName}>Clean Water Initiative</span>
                  <span className={styles.projectAmount}>₹8.5L Raised</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '74%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Donation checkout card with light grey-purple background wrapper */}
      <section className={styles.checkoutSection} id="checkout-form-section">
        
        <div className={styles.checkoutCard} id="checkout-main-interactive-card">
          
          {success ? (
            <div className={styles.successCard} id="checkout-success-banner">
              <CheckCircle size={64} className={styles.successIcon} />
              <h2 className={styles.successTitle}>Transaction Cleared!</h2>
              <p className={styles.successText}>
                Thank you! A secure donation of <strong>₹{lastAmountLogged.toLocaleString('en-IN')}</strong> has been directed to our <strong>{directTo === 'general' ? 'General Fund' : selectedCause}</strong>. A tax-deductible 80G certificate has been queued to <strong>{donorEmail}</strong>.
              </p>
              <div className={styles.successActions}>
                {user ? (
                  <button 
                    type="button"
                    className={styles.dashboardBtn}
                    onClick={() => setActiveTab('dashboard')}
                    id="success-checkout-dashboard-btn"
                  >
                    Track in Dashboard
                  </button>
                ) : (
                  <button 
                    type="button"
                    className={styles.dashboardBtn}
                    onClick={() => setActiveTab('auth')}
                    id="success-checkout-signup-btn"
                  >
                    Create Free Supporter Account
                  </button>
                )}
                <button 
                  type="button" 
                  className={styles.resetBtn}
                  onClick={() => setSuccess(false)}
                  id="success-checkout-another-btn"
                >
                  Make Another Donation
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.cardTopLabel}>WHERE SHOULD WE DIRECT YOUR GIFT?</div>
              
              {/* General Fund vs Cause Selector tabs */}
              <div className={styles.tabsGroup} id="checkout-fund-routing-tabs">
                <button
                  type="button"
                  className={`${styles.tabBtn} ${directTo === 'general' ? styles.activeTabBtn : ''}`}
                  onClick={() => setDirectTo('general')}
                  id="tab-btn-general"
                >
                  General Fund
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${directTo === 'cause' ? styles.activeTabBtn : ''}`}
                  onClick={() => setDirectTo('cause')}
                  id="tab-btn-cause"
                >
                  Specific Cause
                </button>
              </div>

              {/* Conditionally rendered Cause selection */}
              {directTo === 'cause' && (
                <div className={styles.dropdownGroup} id="checkout-cause-dropdown-box">
                  <label className={styles.dropdownLabel}>Focus Area Preference</label>
                  <select
                    className={styles.causeSelect}
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    id="checkout-specific-cause-selector"
                  >
                    <option value="Education">Education Support</option>
                    <option value="Healthcare">Healthcare Programs</option>
                    <option value="Child Welfare">Child Welfare Services</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Environment">Environmental Preservation</option>
                  </select>
                </div>
              )}

              {/* Frequency Toggle switcher row */}
              <div className={styles.frequencyRow} id="checkout-frequency-row">
                <span className={`${styles.freqText} ${frequency === 'one-time' ? styles.freqTextActive : ''}`}>One-time</span>
                <div 
                  className={`${styles.switchContainer} ${frequency === 'monthly' ? styles.switchMonthly : ''}`}
                  onClick={handleFrequencyToggle}
                  id="frequency-switch-toggle"
                >
                  <div className={styles.switchKnob} />
                </div>
                <span className={`${styles.freqText} ${frequency === 'monthly' ? styles.freqTextActive : ''}`}>Monthly</span>
              </div>

              {/* Donation Amount Presets */}
              <div className={styles.presetsGrid} id="checkout-preset-amount-grids">
                {presets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`${styles.presetBtn} ${selectedAmount === preset.value && !customAmount ? styles.activePresetBtn : ''}`}
                    onClick={() => {
                      setSelectedAmount(preset.value);
                      setCustomAmount('');
                    }}
                    id={`preset-btn-${preset.value}`}
                  >
                    <span className={styles.presetVal}>{preset.label}</span>
                    <span className={styles.presetLabel}>{preset.desc}</span>
                  </button>
                ))}
              </div>

              {/* Custom amount field */}
              <div className={styles.customInputBlock} id="checkout-custom-amount-field-wrapper">
                <span className={styles.rupeeSign}>₹</span>
                <input
                  type="number"
                  className={styles.customInputEl}
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount('');
                  }}
                  id="checkout-custom-rupee-input"
                />
              </div>

              {/* Exemption details verification badge */}
              <div className={styles.exemptionBanner} id="tax-verification-exemption-banner">
                <div className={styles.exemptionText}>
                  <Check size={16} />
                  <span>80G Tax Exemption Certificate will be issued.</span>
                </div>
                <span className={styles.verifiedLabel}>VERIFIED</span>
              </div>

              {/* Row highlighting final selected quantity */}
              <div className={styles.summaryRow} id="checkout-amount-summary-row">
                <span className={styles.summaryLabel}>Selected Amount</span>
                <span className={styles.summaryVal}>
                  ₹{getFinalAmount().toLocaleString('en-IN')}
                </span>
              </div>

              {/* Main action proceed button */}
              {!showBillingForm && (
                <button
                  type="button"
                  className={styles.proceedBtn}
                  onClick={handleProceedClick}
                  id="checkout-proceed-to-payment-btn"
                >
                  <span>Proceed to Secure Payment</span>
                  <ArrowRight size={18} />
                </button>
              )}

              {/* Interactive billing form shown after proceed */}
              {showBillingForm && (
                <form onSubmit={handleCheckoutSubmit} className={styles.billingFormSection} id="billing-form-wrapper">
                  
                  {/* Receipt Email Address */}
                  <div className={styles.inputGroup} style={{ marginBottom: '20px' }}>
                    <label className={styles.label}>Receipt Email Address *</label>
                    <input
                      type="email"
                      className={styles.inputEl}
                      placeholder="e.g. supporter@gmail.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      id="billing-email-input"
                    />
                  </div>

                  <div className={styles.formGrid}>
                    {/* Name on Card */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Name on Card *</label>
                      <input
                        type="text"
                        className={styles.inputEl}
                        placeholder="Jane Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                        id="billing-cardname-input"
                      />
                    </div>

                    {/* Card Number */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Card Number *</label>
                      <input
                        type="text"
                        className={styles.inputEl}
                        placeholder="4111 2222 3333 4444"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        id="billing-cardnumber-input"
                      />
                    </div>

                    {/* Expiration and CVV in split grid */}
                    <div className={styles.fullWidthGroup}>
                      <div className={styles.creditCardExpiryCvv}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Expiration (MM/YY) *</label>
                          <input
                            type="text"
                            className={styles.inputEl}
                            placeholder="12/28"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            required
                            id="billing-cardexpiry-input"
                          />
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>CVV Security Code *</label>
                          <input
                            type="password"
                            className={styles.inputEl}
                            placeholder="•••"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            required
                            id="billing-cardcvv-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={styles.confirmBtn}
                    disabled={isSubmitting}
                    id="billing-complete-payment-submit-btn"
                  >
                    {isSubmitting ? 'Processing SSL Gateway...' : `Complete ₹${getFinalAmount().toLocaleString('en-IN')} Contribution`}
                  </button>

                </form>
              )}

              {/* Secure partner safety banner */}
              <div className={styles.partnersContainer} id="checkout-partner-security-trust-seal">
                <div className={styles.partnersLabel}>SECURE PAYMENT PARTNERS</div>
                
                <div className={styles.partnerIconsRow}>
                  <CreditCard size={20} className={styles.partnerIcon} />
                  <Landmark size={20} className={styles.partnerIcon} />
                  <QrCode size={20} className={styles.partnerIcon} />
                  <Smartphone size={20} className={styles.partnerIcon} />
                </div>

                <div className={styles.secureSSL}>
                  <Lock size={12} />
                  <span>256-BIT SSL ENCRYPTED CONNECTION</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </section>

      {/* 3. Every Penny Matters split structural grid layout */}
      <section className={styles.impactSection} id="every-penny-matters-impact-reports">
        
        <div className={styles.impactHeader}>
          <h2 className={styles.impactTitle}>Every Penny Matters</h2>
          <p className={styles.impactSubtitle}>
            See how your contributions are being utilized across our core impact pillars in 2024.
          </p>
        </div>

        {/* Row 1 Grid: Sustainability vs Education */}
        <div className={styles.row1Grid} id="every-penny-row1-grid">
          
          {/* Left Large Card: Sustainability Banner */}
          <div className={styles.sustainabilityCard} id="every-penny-sustainability-box">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
              alt="Volunteers planting trees" 
              className={styles.cardBgImg}
            />
            <div className={styles.cardDarkOverlay} />
            
            <div className={styles.sustainabilityContent}>
              <span className={styles.sustainBadge}>SUSTAINABILITY</span>
              <h3 className={styles.sustainTitle}>Greening Our Future</h3>
              <p className={styles.sustainDesc}>
                Planted 50,000+ trees and established 12 community-led water reservoirs in drought-prone regions.
              </p>
            </div>
          </div>

          {/* Right Smaller Card: Solid Royal Blue card representing Education */}
          <div className={styles.educationCard} id="every-penny-education-box">
            <div className={styles.eduIconWrapper}>
              <BookOpen size={22} />
            </div>
            
            <div>
              <h3 className={styles.eduTitle}>Education For All</h3>
              <p className={styles.eduDesc}>
                Support for 5,000+ students with digital literacy kits and scholarship programs this academic year.
              </p>
            </div>

            <div className={styles.eduStatBox}>
              <div className={styles.eduStatVal}>92%</div>
              <div className={styles.eduStatLabel}>SUCCESS RATE</div>
            </div>
          </div>

        </div>

        {/* Row 2: Full landscape card for Healthcare & Wellness */}
        <div className={styles.healthBar} id="every-penny-health-wellness-banner">
          <div className={styles.healthLeft}>
            <img 
              src="https://images.unsplash.com/photo-1584515901187-601004a702c5?auto=format&fit=crop&q=80&w=200" 
              alt="Medical clinics" 
              className={styles.healthThumb}
            />
            <div>
              <h4 className={styles.healthTitle}>Health & Wellness</h4>
              <p className={styles.healthDesc}>
                Over 100 mobile clinics deployed, reaching remote villages with essential medical aid and vaccines.
              </p>
            </div>
          </div>
          
          {/* Interactive Arrow Button */}
          <button 
            type="button" 
            className={styles.arrowCircleBtn}
            onClick={() => setActiveTab('causes')}
            id="health-wellness-arrow-btn"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </section>

    </div>
  );
}
