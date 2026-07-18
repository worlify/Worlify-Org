'use client';

import React from 'react';

/**
 * NotFound Page
 * Required by Next.js 15 App Router for the /_not-found route.
 * Renders a clean 404 page consistent with the Worlify design system.
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans, Inter, sans-serif)',
        backgroundColor: 'var(--bg-color, #f8fafc)',
        color: 'var(--text-main, #0f172a)',
        textAlign: 'center',
        padding: '24px',
      }}
      id="not-found-page"
    >
      <div
        style={{
          fontSize: '96px',
          fontWeight: '800',
          color: 'var(--primary-color, #0d9488)',
          lineHeight: 1,
          marginBottom: '16px',
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '12px',
          color: 'var(--text-main, #0f172a)',
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: 'var(--text-muted, #64748b)',
          maxWidth: '480px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}
      >
        The page you are looking for does not exist or has been moved. Please
        return to the Worlify homepage.
      </p>
      <a
        href="/"
        style={{
          backgroundColor: 'var(--primary-color, #0d9488)',
          color: 'white',
          padding: '12px 28px',
          borderRadius: '8px',
          fontWeight: '600',
          textDecoration: 'none',
          fontSize: '15px',
          transition: 'opacity 0.2s ease',
        }}
        id="not-found-home-link"
      >
        Go Back Home
      </a>
    </div>
  );
}
