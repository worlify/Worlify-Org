'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Causes from './components/Causes';
import About from './components/About';
import Gallery from './components/Gallery';
import Volunteer from './components/Volunteer';
import Donate from './components/Donate';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Faqs from './components/Faqs';
import Legal from './components/Legal';
import Footer from './components/Footer';
import KeysModal from './components/KeysModal';
import { db, isLocalMode } from './lib/supabase';

/**
 * Main Application Component (Worlify NGO)
 * Governs state-driven client-side routing, user session handling,
 * and global configuration guides.
 */
export default function App() {
  // Current visible tab: 'home' | 'causes' | 'about' | 'gallery' | 'volunteer' | 'donate' | 'auth' | 'dashboard'
  const [activeTab, setActiveTab] = useState('home');
  
  // Authenticated user state
  const [user, setUser] = useState(null);
  
  // Shared state to transfer donation intent between views (e.g., clicking support on a Cause)
  const [donationPreload, setDonationPreload] = useState('');
  
  // Supabase credentials configuration modal state
  const [keysModalOpen, setKeysModalOpen] = useState(false);
  
  // Loading state for recovery session check
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Global Theme State
  const [theme, setTheme] = useState('light');

  // Initialize theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('worlify_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('worlify_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Restore session on application load
  useEffect(() => {
    function restoreSession() {
      try {
        const currentUser = db.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          console.log('✅ Session restored:', currentUser.email);
        } else {
          console.log('No session found, showing home page');
        }
      } catch (e) {
        console.error('Session recovery failed: ', e);
      } finally {
        setIsLoadingSession(false);
      }
    }
    restoreSession();
  }, []);

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Login handler
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveTab('dashboard'); // Forward to dashboard
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      const { error } = await db.signOut();
      if (!error) {
        setUser(null);
        setActiveTab('home'); // Send back home
      } else {
        alert('Logout failed: ' + error.message);
      }
    } catch (err) {
      console.error('Error during logout: ', err);
    }
  };

  if (isLoadingSession) {
    return (
      <div 
        style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-muted)'
        }}
        id="loading-screen"
      >
        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '12px' }}>Worlify</div>
        <div>Loading Supporter Session...</div>
      </div>
    );
  }

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        backgroundColor: 'var(--bg-color)' 
      }}
      id="worlify-root"
    >
      {/* 1. Universal Site Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLogout={handleLogout}
        isLocalMode={isLocalMode}
        onOpenKeysModal={() => setKeysModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. Main Tabbed Panel Stage */}
      <main style={{ flexGrow: 1 }} id="main-content-stage">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab} 
            setDonationPreload={setDonationPreload}
            isLocalMode={isLocalMode}
          />
        )}
        
        {activeTab === 'causes' && (
          <Causes 
            setActiveTab={setActiveTab}
            setDonationPreload={setDonationPreload}
            preloadedCause={donationPreload}
            clearPreload={() => setDonationPreload('')}
          />
        )}

        {activeTab === 'about' && (
          <About 
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'gallery' && (
          <Gallery setActiveTab={setActiveTab} setDonationPreload={setDonationPreload} />
        )}
        
        {activeTab === 'volunteer' && (
          <Volunteer 
            user={user}
            setActiveTab={setActiveTab}
          />
        )}
        
        {activeTab === 'donate' && (
          <Donate 
            user={user}
            preloadedCause={donationPreload}
            clearPreload={() => setDonationPreload('')}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contact' && (
          <Contact 
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'faqs' && (
          <Faqs 
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'legal' && (
          <Legal 
            setActiveTab={setActiveTab}
          />
        )}
        
        {activeTab === 'auth' && (
          <Auth 
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            user={user}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* 3. Site-wide Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4. Supabase Setup Guide Modal */}
      <KeysModal 
        isOpen={keysModalOpen} 
        onClose={() => setKeysModalOpen(false)} 
      />

    </div>
  );
}
