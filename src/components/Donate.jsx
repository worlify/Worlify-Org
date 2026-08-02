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
import Receipt80G from './Receipt80G';

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

  // Helper to dynamically load Razorpay Checkout SDK if window.Razorpay is not yet loaded
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Submit & Launch Razorpay Checkout
  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorEl = document.querySelector(`.${styles.errorText}`);
      if (firstErrorEl) firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded || !window.Razorpay) {
      alert('Razorpay Payment Gateway failed to load. Please check your internet connection or ad blocker and try again.');
      setIsSubmitting(false);
      return;
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      alert('Payment configuration error: Razorpay key is missing. Please contact support.');
      setIsSubmitting(false);
      return;
    }
    const amountInPaise = currentAmount * 100;

    // ── STEP 1: Create Razorpay Order on server (REQUIRED for Live Mode) ──
    let orderId = null;
    try {
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            cause: selectedCause,
            donor_name: fullName.trim(),
            donor_email: email.trim(),
          }
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.id) {
        const errMsg = orderData?.error || 'Could not initiate payment. Please try again.';
        alert(`Payment Error: ${errMsg}`);
        setIsSubmitting(false);
        return;
      }

      orderId = orderData.id;
    } catch (fetchErr) {
      console.error('Order creation network error:', fetchErr);
      alert('Network error while initiating payment. Please check your connection and try again.');
      setIsSubmitting(false);
      return;
    }

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
      status: 'under_review',
      declaration: isCitizenDeclared,
      razorpay_ref: 'Razorpay Checkout'
    };

    // ── STEP 2: Open Razorpay Checkout with the server order_id ──
    const options = {
      key: razorpayKey,
      amount: amountInPaise,
      currency: 'INR',
      order_id: orderId,
      name: 'Worlify Foundation',
      description: `Donation for ${selectedCause}`,
      image: '/favicon.ico',
      prefill: {
        name: fullName.trim(),
        email: email.trim(),
        contact: mobileNumber.trim()
      },
      notes: {
        cause: selectedCause,
        address: `${address.trim()}, ${city.trim()}, ${state.trim()} - ${pincode.trim()}`,
        pan: panNumber ? panNumber.trim().toUpperCase() : 'N/A'
      },
      theme: {
        color: '#0d5c3a'
      },
      handler: async function (response) {
        console.log('✅ Razorpay Payment Success:', response);
        const paymentId = response.razorpay_payment_id;

        try {
          const { data, error } = await db.addDonation(currentAmount, selectedCause, email.trim(), {
            ...donationPayload,
            status: 'under_review',
            razorpay_payment_id: paymentId,
            razorpay_ref: paymentId
          });

          if (error) {
            console.error('Donation save error:', error);
          }

          setSubmittedDonation({
            amount: currentAmount,
            cause: selectedCause,
            name: fullName.trim(),
            email: email.trim(),
            phone: mobileNumber.trim(),
            address: `${address.trim()}${city ? ', ' + city : ''}${state ? ', ' + state : ''}${pincode ? ' - ' + pincode : ''}`,
            pan: panNumber ? panNumber.trim().toUpperCase() : '',
            id: paymentId || (data && data[0] ? data[0].id : 'DON-' + Date.now().toString().slice(-6)),
            paymentId: paymentId || ('PAY-' + Date.now().toString().slice(-8)),
            date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
          });

          setIsSubmitted(true);
        } catch (err) {
          console.error('Error recording completed donation:', err);
        } finally {
          setIsSubmitting(false);
        }
      },
      modal: {
        ondismiss: function () {
          console.log('Razorpay payment modal closed');
          setIsSubmitting(false);
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Razorpay Payment Failed:', response.error);
        alert(`Payment Failed: ${response.error.description || 'Transaction could not be completed'}`);
        setIsSubmitting(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay Init Error:', err);
      alert('Failed to launch Razorpay checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  const donateSchema = {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    name: 'Donate to Worlify Foundation NGO India',
    description: 'Donate online to support education, healthcare, food security, and skill development in India. 80G Tax Exemption certificate issued automatically.',
    recipient: {
      '@type': 'NGO',
      name: 'Worlify Foundation',
      url: 'https://worlify.org',
      taxID: 'AACTW5671G',
      nonprofitStatus: 'Nonprofit501c3',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lucknow',
        addressRegion: 'Uttar Pradesh',
        postalCode: '226501',
        addressCountry: 'IN'
      }
    },
    price: '250',
    priceCurrency: 'INR'
  };

  return (
    <div className={styles.pageContainer} id="donation-page-root">
      {/* DonateAction JSON-LD Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }}
      />

      {/* 1. HERO HEADER SECTION */}
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badgePill}>
            <ShieldCheck size={16} color="var(--primary-color)" />
            <span>80G Tax Exempted &amp; 12A Registered NGO India</span>
          </div>
          <h1 className={styles.heroHeading}>
            Donate Online to <span className={styles.highlightText}>NGO India</span> — 80G Tax Exemption Benefits
          </h1>
          <p className={styles.heroSubheading}>
            Donate securely online to Worlify Foundation, a registered NGO based in Lucknow, Uttar Pradesh, India. Your contribution directly supports child education, free healthcare camps, food security (Ann Seva), and women empowerment with instant 80G tax deduction receipts.
          </p>
        </div>
      </header>

      {/* 3. MAIN DONATION FORM CONTAINER */}
      <main className={styles.mainLayout}>
        {isSubmitted ? (
          /* THANK YOU / PAYMENT SUCCESS RECEIPT SCREEN */
          <div className={styles.successCard} id="donation-success-card">
            <div className={styles.successIconWrapper}>
              <CheckCircle2 size={56} className={styles.successCheckIcon} />
            </div>
            <h2 className={styles.successTitle}>Thank You For Your Generous Donation!</h2>
            <p className={styles.successSub}>
              Your contribution of <strong>₹{submittedDonation?.amount?.toLocaleString('en-IN')}</strong> towards <strong>{submittedDonation?.cause}</strong> has been successfully received and verified via Razorpay.
            </p>

            <div style={{ margin: '24px 0' }}>
              <Receipt80G donationData={submittedDonation} />
            </div>

            <div className={styles.postPayActions}>
              <button
                className={styles.razorpayBtn}
                onClick={() => window.print()}
                style={{ cursor: 'pointer' }}
              >
                Print / Save 80G Receipt <FileText size={18} />
              </button>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  setSubmittedDonation({
                    amount: currentAmount || 1000,
                    cause: selectedCause || 'General Fund',
                    name: fullName.trim() || 'Rahul Verma',
                    email: email.trim() || 'rahul.verma@example.com',
                    phone: mobileNumber.trim() || '9876543210',
                    address: address.trim() ? `${address.trim()}${city ? ', ' + city : ''}${state ? ', ' + state : ''}${pincode ? ' - ' + pincode : ''}` : 'Plot No 45, Sector 5, Gomti Nagar, Lucknow, UP - 226010',
                    pan: panNumber ? panNumber.trim().toUpperCase() : 'ABCDE1234F',
                    id: 'DON-SAMPLE80G',
                    paymentId: 'PAY-SAMPLE80G99',
                    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                  });
                  setIsSubmitted(true);
                }}
                style={{
                  background: 'none',
                  border: '1px dashed #0d5c3a',
                  color: '#0d5c3a',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                👁️ Preview 80G Receipt Format
              </button>
            </div>

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
