/**
 * LoadingOverlay
 * Reusable full-screen loading overlay that reuses the existing
 * worlify-splash CSS classes from index.css.
 * 
 * Props:
 *   message {string} — optional context label shown below the spinner
 *                      e.g. "Updating user details..." 
 */
export default function LoadingOverlay({ message = 'Processing...' }) {
  return (
    <div
      className="worlify-splash"
      id="loading-overlay"
      role="status"
      aria-label={message}
      style={{ zIndex: 99999 }}
    >
      {/* Top animated progress bar */}
      <div className="worlify-splash__progress-bar" />

      {/* Dual-ring spinner */}
      <div className="worlify-splash__spinner-wrap">
        <svg
          className="worlify-splash__ring-outer"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="url(#overlayGradOuter)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="198 66"
          />
          <defs>
            <linearGradient id="overlayGradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#0d9488" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="worlify-splash__ring-inner"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="50" cy="50" r="28"
            fill="none"
            stroke="url(#overlayGradInner)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="88 88"
          />
          <defs>
            <linearGradient id="overlayGradInner" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>

        {/* Centre pulsing dot */}
        <div className="worlify-splash__centre-dot" />
      </div>

      {/* Dynamic context message */}
      <p className="worlify-splash__brand-text">{message}</p>
    </div>
  );
}
