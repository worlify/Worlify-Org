import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import {
  ShieldCheck,
  Heart,
  Award,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building2,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import styles from '../styles/Donate.module.css';

const PRESET_AMOUNTS = [250, 500, 1000, 1500, 3000, 5000, 10000, 20000, 40000];

const CAUSES_LIST = [
  { id: 'General Fund', label: 'General Fund (Where Needed Most)' },
  { id: 'Education', label: 'Education Support' },
  { id: 'Healthcare', label: 'Healthcare & Medical Relief' },
  { id: 'Food & Nutrition', label: 'Food & Hunger Relief' },
  { id: 'Human Rights', label: 'Human Rights & Legal Aid' },
  { id: 'Environment', label: 'Environment & Tree Plantation' },
  { id: 'Animal Welfare', label: 'Animal Welfare & Shelter' },
  { id: 'Skill Development', label: 'Skill Development & Women Empowerment' },
  { id: 'Poverty Alleviation', label: 'Poverty Alleviation' },
];

export default function Donate({ user, preloadedCause, clearPreload, setActiveTab }) {
  // Amount states
  const [selectedPreset, setSelectedPreset] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('General Fund');

  // Donor Details states
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country] = useState('INDIA');
  const [panNumber, setPanNumber] = useState('');
  const [isCitizenDeclared, setIsCitizenDeclared] = useState(true);

  // Status & Validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedDonation, setSubmittedDonation] = useState(null);
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      if (user.first_name) {
        setFullName(`${user.first_name} ${user.last_name || ''}`.trim());
      }
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  // Handle preloaded cause selection
  useEffect(() => {
    if (preloadedCause) {
      const match = CAUSES_LIST.find(c =>
        c.label.toLowerCase().includes(preloadedCause.toLowerCase()) ||
        c.id.toLowerCase().includes(preloadedCause.toLowerCase())
      );
      if (match) {
        setSelectedCause(match.id);
      }
      if (clearPreload) clearPreload();
    }
  }, [preloadedCause, clearPreload]);

  // Pincode auto-lookup (India Post API)
  const handlePincodeChange = async (val) => {
    const cleanVal = val.replace(/\D/g, '').slice(0, 6);
    setPincode(cleanVal);

    if (cleanVal.length === 6) {
      setIsFetchingPincode(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${cleanVal}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
          const po = data[0].PostOffice[0];
          setCity(po.District || po.Block || po.Name);
          setState(po.State);
          setErrors(prev => ({ ...prev, pincode: null }));
        }
      } catch (e) {
        console.warn('Pincode lookup error:', e);
      } finally {
        setIsFetchingPincode(false);
      }
    }
  };

  // Full Name validation (no special characters except spaces and dots)
  const handleFullNameChange = (val) => {
    setFullName(val);
    const regex = /^[a-zA-Z\s.]*$/;
    if (!regex.test(val)) {
      setErrors(prev => ({ ...prev, fullName: 'Special characters not allowed in full name field' }));
    } else {
      setErrors(prev => ({ ...prev, fullName: null }));
    }
  };

  // Compute active donation amount
  const getDonationAmount = () => {
    if (customAmount) {
      return Number(customAmount);
    }
    return selectedPreset;
  };

  const currentAmount = getDonationAmount();

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    const amount = getDonationAmount();
    if (!amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Please enter a valid donation amount';
    } else if (amount > 100000) {
      newErrors.amount = 'Donations above ₹1,00,000 are not allowed online. Please contact our team.';
    }

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (!/^[a-zA-Z\s.]*$/.test(fullName)) {
      newErrors.fullName = 'Special characters not allowed in full name field';
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid Email Address is required';
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      newErrors.mobileNumber = 'Valid 10-digit Mobile Number is required';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!pincode.trim() || pincode.length < 6) {
      newErrors.pincode = 'Valid 6-digit Pincode is required';
    }

    if (panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(panNumber.trim())) {
      newErrors.panNumber = 'Invalid PAN format (e.g. ABCDE1234F)';
    }

    if (!isCitizenDeclared) {
      newErrors.declaration = 'You must accept the citizenship and funding declaration to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit & Proceed to Razorpay
  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorEl = document.querySelector(`.${styles.errorText}`);
      if (firstErrorEl) firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    const razorpayUrl = 'https://razorpay.me/@worlifyfoundation';

    const donationPayload = {
      donor_name: fullName.trim(),
      donor_dob: dob || null,
      donor_phone: mobileNumber.trim(),
      donor_address: address.trim(),
      donor_pincode: pincode.trim(),
      donor_city: city.trim(),
      donor_state: state.trim(),
      donor_pan: panNumber ? panNumber.trim().toUpperCase() : null,
      frequency: 'one-time',
      status: 'pending',
      declaration: isCitizenDeclared,
      razorpay_ref: razorpayUrl
    };

    try {
      const { data, error } = await db.addDonation(currentAmount, selectedCause, email.trim(), donationPayload);
      
      if (error) {
        console.error('Donation save error:', error);
      }

      setSubmittedDonation({
        amount: currentAmount,
        cause: selectedCause,
        name: fullName,
        email: email,
        pan: panNumber ? panNumber.toUpperCase() : null,
        id: data && data[0] ? data[0].id : 'DON-' + Date.now().toString().slice(-6),
        razorpayUrl: razorpayUrl
      });

      setIsSubmitted(true);

      // Open clean Razorpay Payment Link in new window
      window.open(razorpayUrl, '_blank', 'noopener,noreferrer');

    } catch (err) {
      console.error('Error proceeding to payment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer} id="donation-page-root">

      {/* 1. HERO HEADER SECTION */}
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badgePill}>
            <ShieldCheck size={16} color="var(--primary-color)" />
            <span>80G Tax Exempted & 12A Certified NGO</span>
          </div>
          <h1 className={styles.heroHeading}>
            Transform Lives With Your <span className={styles.highlightText}>Generosity</span>
          </h1>
          <p className={styles.heroSubheading}>
            Every contribution directly funds education, healthcare, food security, and community empowerment across underserved regions in India.
          </p>
        </div>
      </header>

      {/* 3. MAIN DONATION FORM CONTAINER */}
      <main className={styles.mainLayout}>
        {isSubmitted ? (
          /* THANK YOU / PAYMENT REDIRECT SCREEN */
          <div className={styles.successCard} id="donation-success-card">
            <div className={styles.successIconWrapper}>
              <CheckCircle2 size={56} className={styles.successCheckIcon} />
            </div>
            <h2 className={styles.successTitle}>Redirecting to Razorpay Secure Gateway...</h2>
            <p className={styles.successSub}>
              We have initiated your donation process for <strong>₹{submittedDonation?.amount?.toLocaleString('en-IN')}</strong> under <strong>{submittedDonation?.cause}</strong>.
            </p>

            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>Donor Name:</span>
                <strong>{submittedDonation?.name}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Email Address:</span>
                <strong>{submittedDonation?.email}</strong>
              </div>
              {submittedDonation?.pan && (
                <div className={styles.summaryRow}>
                  <span>PAN (80G Receipt):</span>
                  <strong>{submittedDonation?.pan}</strong>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>Reference ID:</span>
                <code>{submittedDonation?.id}</code>
              </div>
            </div>

            <div className={styles.razorpayBox}>
              <p className={styles.razorpayInstructions}>
                If the Razorpay payment window did not open automatically, click the button below to complete your payment securely:
              </p>
              <a
                href="https://razorpay.me/@worlifyfoundation"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.razorpayBtn}
              >
                Pay ₹{submittedDonation?.amount?.toLocaleString('en-IN')} via Razorpay <ExternalLink size={18} />
              </a>
            </div>

            <div className={styles.postPayActions}>
              <button
                className={styles.newDonationBtn}
                onClick={() => {
                  setIsSubmitted(false);
                  setCustomAmount('');
                }}
              >
                Make Another Donation
              </button>
              {setActiveTab && (
                <button
                  className={styles.homeBtn}
                  onClick={() => setActiveTab('home')}
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        ) : (
          /* MAIN DONATION FORM CARD */
          <div className={styles.cardContainer} id="donation-form-card">

            {/* STEP 1: CHOOSE CAUSE */}
            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.stepBadge}>Step 1</span>
                <h2 className={styles.sectionTitle}>Select Cause</h2>
              </div>
              <div className={styles.causeSelectWrapper}>
                <select
                  className={styles.causeDropdown}
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  id="donation-cause-select"
                >
                  {CAUSES_LIST.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            {/* STEP 2: CHOOSE AMOUNT */}
            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.stepBadge}>Step 2</span>
                <h2 className={styles.sectionTitle}>Select Donation Amount (₹)</h2>
              </div>

              {/* Amount Presets Grid */}
              <div className={styles.presetGrid} id="preset-amounts-grid">
                {PRESET_AMOUNTS.map((amt) => {
                  const isSelected = selectedPreset === amt && !customAmount;
                  return (
                    <button
                      key={amt}
                      type="button"
                      className={`${styles.presetBtn} ${isSelected ? styles.presetActive : ''}`}
                      onClick={() => {
                        setSelectedPreset(amt);
                        setCustomAmount('');
                        setErrors(prev => ({ ...prev, amount: null }));
                      }}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Input */}
              <div className={styles.customAmountWrapper}>
                <label className={styles.customLabel} htmlFor="custom-amount-input">
                  Or enter your own amount (₹):
                </label>
                <div className={styles.customInputGroup}>
                  <span className={styles.currencySymbol}>₹</span>
                  <input
                    type="number"
                    id="custom-amount-input"
                    className={`${styles.customInput} ${errors.amount ? styles.inputError : ''}`}
                    placeholder="Enter custom amount (Max ₹1,00,000)"
                    value={customAmount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomAmount(val);
                      if (Number(val) > 100000) {
                        setErrors(prev => ({ ...prev, amount: 'Donations above ₹1,00,000 are not allowed online. Please contact our team.' }));
                      } else {
                        setErrors(prev => ({ ...prev, amount: null }));
                      }
                    }}
                    min="1"
                    max="100000"
                  />
                </div>
                {errors.amount && <p className={styles.errorText}>{errors.amount}</p>}
              </div>
            </section>

            {/* STEP 3: DONOR DETAILS FORM (Matching requested layout) */}
            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.stepBadge}>Step 3</span>
                <h2 className={styles.sectionTitle}>Donor Details</h2>
              </div>

              <div className={styles.fieldNoticeBanner}>
                Special characters not allowed in full name field
              </div>

              <form onSubmit={handleProceedToPayment} className={styles.donorForm} noValidate>

                {/* ROW 1: Full Name & DOB */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-fullname">
                      Full Name <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      id="donor-fullname"
                      className={`${styles.formInput} ${errors.fullName ? styles.inputError : ''}`}
                      value={fullName}
                      onChange={(e) => handleFullNameChange(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                    />
                    {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-dob">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="donor-dob"
                      className={styles.formInput}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                </div>

                {/* ROW 2: Email & Mobile Number */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-email">
                      Email <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="email"
                      id="donor-email"
                      className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => ({ ...prev, email: null }));
                      }}
                      placeholder="name@example.com"
                    />
                    {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-mobile">
                      Mobile Number <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="donor-mobile"
                      className={`${styles.formInput} ${errors.mobileNumber ? styles.inputError : ''}`}
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        setErrors(prev => ({ ...prev, mobileNumber: null }));
                      }}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                    />
                    {errors.mobileNumber && <p className={styles.errorText}>{errors.mobileNumber}</p>}
                  </div>
                </div>

                {/* ROW 3: Address */}
                <div className={styles.formRowSingle}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-address">
                      Address <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      id="donor-address"
                      className={`${styles.formInput} ${errors.address ? styles.inputError : ''}`}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setErrors(prev => ({ ...prev, address: null }));
                      }}
                      placeholder="Street address, house number, area"
                    />
                    {errors.address && <p className={styles.errorText}>{errors.address}</p>}
                  </div>
                </div>

                <div className={styles.autofillHintText}>
                  Entering Pincode will autofill City and State
                </div>

                {/* ROW 4: Pincode & City */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-pincode">
                      Pincode <span className={styles.requiredStar}>*</span>
                    </label>
                    <div className={styles.inputWithSpinner}>
                      <input
                        type="text"
                        id="donor-pincode"
                        className={`${styles.formInput} ${errors.pincode ? styles.inputError : ''}`}
                        value={pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        placeholder="6-digit pincode"
                        maxLength="6"
                      />
                      {isFetchingPincode && <span className={styles.miniSpinner} />}
                    </div>
                    {errors.pincode && <p className={styles.errorText}>{errors.pincode}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-city">
                      City
                    </label>
                    <input
                      type="text"
                      id="donor-city"
                      className={styles.formInput}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City name"
                    />
                  </div>
                </div>

                {/* ROW 5: State & Country */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-state">
                      State
                    </label>
                    <input
                      type="text"
                      id="donor-state"
                      className={styles.formInput}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel}>
                      Country
                    </label>
                    <div className={styles.staticCountryValue}>
                      {country}
                    </div>
                  </div>
                </div>

                {/* ROW 6: PAN Number */}
                <div className={styles.formRowSingle}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="donor-pan">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      id="donor-pan"
                      className={`${styles.formInput} ${errors.panNumber ? styles.inputError : ''}`}
                      value={panNumber}
                      onChange={(e) => {
                        setPanNumber(e.target.value.toUpperCase());
                        setErrors(prev => ({ ...prev, panNumber: null }));
                      }}
                      placeholder="e.g. ABCDE1234F (Optional for 80G tax exemption)"
                      maxLength="10"
                    />
                    {errors.panNumber && <p className={styles.errorText}>{errors.panNumber}</p>}
                  </div>
                </div>

                {/* PAN TAX NOTICE */}
                <div className={styles.panNoticeBox}>
                  <strong>Please note that if you do not provide your PAN Number, you will not be able to claim 50% tax exemption u/s 80G in India</strong>
                </div>

                {/* LEGAL COMPLIANCE NOTICE */}
                <p className={styles.complianceText}>
                  Information is being collected to comply with government regulations and shall be treated as confidential.
                </p>

                {/* DECLARATION CHECKBOX */}
                <div className={styles.declarationWrapper}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={isCitizenDeclared}
                      onChange={(e) => {
                        setIsCitizenDeclared(e.target.checked);
                        setErrors(prev => ({ ...prev, declaration: null }));
                      }}
                    />
                    <span>
                      I hereby declare that I am a citizen of India, making this donation out of my own funds. The information provided above is true and correct.
                    </span>
                  </label>
                  {errors.declaration && <p className={styles.errorText}>{errors.declaration}</p>}
                </div>

                {/* PAYMENT METHODS & LOGOS FOOTER BOX */}
                <div className={styles.paymentMethodsBox}>
                  <div className={styles.paymentLogosRow}>
                    <span className={styles.payBadge}>RuPay</span>
                    <span className={styles.payBadge}>UPI</span>
                    <span className={styles.payBadge}>VISA</span>
                    <span className={styles.payBadge}>Mastercard</span>
                  </div>
                  <p className={styles.paymentMethodsNote}>
                    We accept all major payment methods (UPI, QR Scan, Cards, NetBanking, Wallets) via Razorpay
                  </p>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                  id="continue-to-payment-btn"
                >
                  {isSubmitting ? 'Processing Details...' : `Continue To Payment (₹${currentAmount ? currentAmount.toLocaleString('en-IN') : 0})`}
                </button>
              </form>

            </section>
          </div>
        )}
      </main>

      {/* 4. TRUST & TRANSPARENCY CARDS SECTION */}
      <footer className={styles.trustFooterSection}>
        <div className={styles.trustGrid}>
          <div className={styles.trustCard}>
            <ShieldCheck size={28} className={styles.trustIcon} />
            <h4>80G Tax Exemption</h4>
            <p>Donations to Worlify Foundation are eligible for 50% tax deduction under Section 80G of the Income Tax Act.</p>
          </div>
          <div className={styles.trustCard}>
            <Lock size={28} className={styles.trustIcon} />
            <h4>Secure Transactions</h4>
            <p>Your payment information is encrypted and processed via Razorpay's PCI-DSS compliant payment system.</p>
          </div>
          <div className={styles.trustCard}>
            <Award size={28} className={styles.trustIcon} />
            <h4>Transparency Promise</h4>
            <p>100% of your donation is deployed directly to project activities with regular audited impact reports.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
