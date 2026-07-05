import React from 'react';
import { X, Database, ShieldAlert, Check } from 'lucide-react';
import styles from '../styles/KeysModal.module.css';

/**
 * KeysModal Component
 * Step-by-step setup guide overlays to instruct beginners on Supabase setups.
 */
export default function KeysModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} id="keys-guide-overlay">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} id="keys-guide-content">
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} id="keys-guide-close-btn">
          <X size={20} />
        </button>

        {/* Header */}
        <div className={styles.modalTitle}>
          <Database size={24} color="var(--primary-color)" />
          <span>Connect Your Supabase Database</span>
        </div>
        <p className={styles.modalDesc}>
          Worlify is pre-built to utilize Supabase for secure cloud-hosted user accounts, donation tracking, and volunteer lists. Follow these steps to link your own free Supabase project!
        </p>

        {/* Steps */}
        <h3 className={styles.sectionTitle}>Step-by-Step Instructions</h3>
        <div className={styles.stepList}>
          {/* Step 1 */}
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepText}>
              <strong>Create a free Supabase Account</strong>
              <div>Head to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'underline' }}>supabase.com</a>, register, and create a new project named <strong>Worlify</strong>.</div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepText}>
              <strong>Obtain API Credentials</strong>
              <div>In your Supabase Dashboard, go to <strong>Project Settings → API</strong>. Copy the <strong>Project URL</strong> and <strong>anon public API key</strong>.</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepText}>
              <strong>Configure secrets in Google AI Studio</strong>
              <div>Open the <strong>Secrets panel</strong> (or gear icon settings) in Google AI Studio and configure these two environment variables:</div>
              <div className={styles.codeBlock}>
                VITE_SUPABASE_URL="your_copied_project_url"<br />
                VITE_SUPABASE_ANON_KEY="your_copied_anon_key"
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepText}>
              <strong>Create Your Tables</strong>
              <div>In your Supabase project, open the <strong>SQL Editor</strong> and run this query to create the schema:</div>
              <div className={styles.codeBlock} style={{ maxHeight: '140px', overflowY: 'auto', fontSize: '11px' }}>
                {`-- 1. Create Donations Table
create table public.donations (
  id uuid default gen_random_uuid() primary key,
  user_id text,
  user_email text,
  amount numeric not null,
  cause text not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Volunteers Table
create table public.volunteers (
  id uuid default gen_random_uuid() primary key,
  user_id text,
  name text not null,
  email text not null,
  cause text not null,
  skills text not null,
  message text not null,
  status text default 'Pending' not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null
);`}
              </div>
            </div>
          </div>
        </div>

        {/* Schema Note */}
        <div className={styles.schemaNote}>
          <strong>🛡️ Local Storage Fallback:</strong>
          <div>Until credentials are added, Worlify is pre-programmed with a fully featured localStorage sandbox database. You can test register, sign in, donate, and check volunteer statuses instantly in this preview!</div>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.confirmBtn} onClick={onClose} id="keys-guide-understand-btn">
            I Understand, Continue Sandbox
          </button>
        </div>
      </div>
    </div>
  );
}
