import React, { useState, useEffect } from 'react';
import { Phone, ChevronUp } from 'lucide-react';
import styles from '../styles/FloatingActions.module.css';

/**
 * FloatingActions Component
 * Renders floating quick-action buttons on the bottom-right of every page:
 * 1. Phone Call button (+91 9161321513) - Always visible
 * 2. WhatsApp chat button (+91 9161321513) - Always visible
 * 3. Reach Top button (Smooth scroll to top) - Hidden at top, shown when user scrolls down
 */
export default function FloatingActions() {
  const phoneNumber = '9161321513';
  const fullPhoneWithCountry = '919161321513';
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show "Reach Top" button only when user has scrolled down > 250px
      if (window.scrollY > 250) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    // Check initial scroll state on load/route change
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.floatingContainer} id="floating-actions-container">
      {/* 1. Phone Call Action */}
      <a
        href={`tel:${phoneNumber}`}
        className={`${styles.actionBtn} ${styles.callBtn}`}
        title="Call Us (+91 9161321513)"
        aria-label="Call Us (+91 9161321513)"
        id="floating-call-btn"
      >
        <Phone size={24} fill="#ffffff" color="#ffffff" />
        <span className={styles.tooltip}>Call +91 {phoneNumber}</span>
      </a>

      {/* 2. WhatsApp Action */}
      <a
        href={`https://wa.me/${fullPhoneWithCountry}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.actionBtn} ${styles.whatsappBtn}`}
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp (+91 9161321513)"
        id="floating-whatsapp-btn"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982l-1.413 5.163 5.283-1.385a9.962 9.962 0 0 0 4.79 1.225h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.039-5.176-2.926-7.062A9.923 9.923 0 0 0 12.012 2zm5.836 14.167c-.244.688-1.431 1.314-1.97 1.373-.503.055-1.157.079-3.702-.968-3.045-1.253-5.006-4.352-5.158-4.553-.151-.201-1.236-1.644-1.236-3.136 0-1.492.78-2.227 1.057-2.529.277-.302.604-.378.805-.378.201 0 .403.002.579.011.186.01.436-.07.683.522.252.604.856 2.087.931 2.238.075.151.126.327.025.528-.101.201-.151.327-.302.503-.151.176-.317.393-.453.528-.151.151-.308.315-.133.617.176.302.781 1.288 1.677 2.087 1.151 1.026 2.122 1.343 2.424 1.494.302.151.478.126.654-.075.176-.201.755-.88.956-1.182.201-.302.403-.252.679-.151.277.101 1.76.83 2.062.981.302.151.503.227.579.353.076.126.076.729-.168 1.417z"/>
        </svg>
        <span className={styles.tooltip}>WhatsApp Us</span>
      </a>

      {/* 3. Reach Top Action (Only visible when scrolled down) */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`${styles.actionBtn} ${styles.topBtn} ${!showTopBtn ? styles.topBtnHidden : ''}`}
        title="Reach Top"
        aria-label="Scroll to Top"
        id="floating-reach-top-btn"
      >
        <ChevronUp size={28} color="#ffffff" strokeWidth={2.5} />
        <span className={styles.tooltip}>Reach Top</span>
      </button>
    </div>
  );
}
