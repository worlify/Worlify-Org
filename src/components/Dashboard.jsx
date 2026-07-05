import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { CreditCard, Award, ClipboardList, TrendingUp, Calendar, Heart } from 'lucide-react';
import styles from '../styles/Dashboard.module.css';

/**
 * Dashboard Component
 * The private supporter center. Features:
 * - Dynamic personal impact calculations
 * - Cause-specific Merit Badge system
 * - Real-time volunteer status tracker
 * - Personal donation history logs
 */
export default function Dashboard({ user, setActiveTab }) {
  // Supporter metric states
  const [personalDonations, setPersonalDonations] = useState([]);
  const [personalVolunteers, setPersonalVolunteers] = useState([]);
  
  const [totalContributed, setTotalContributed] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch ALL donations and filter by current user's email
        const { data: donations, error: donError } = await db.getDonations();
        if (!donError && donations) {
          const userRecords = donations.filter(
            d => d.user_id === user.id || (d.user_email && d.user_email.toLowerCase() === user.email.toLowerCase())
          );
          setPersonalDonations(userRecords);

          // Calculate sum
          const sum = userRecords.reduce((acc, curr) => acc + Number(curr.amount), 0);
          setTotalContributed(sum);

          // Calculate custom badges earned
          const badges = [];
          const uniqueCauses = new Set(userRecords.map(r => r.cause));
          
          if (uniqueCauses.has('Education')) {
            badges.push({ name: '🎓 Mind Opener', color: '#0d9488' });
          }
          if (uniqueCauses.has('Healthcare')) {
            badges.push({ name: '🏥 Health Savior', color: '#06b6d4' });
          }
          if (uniqueCauses.has('Child Welfare')) {
            badges.push({ name: '👶 Child Protector', color: '#f97316' });
          }
          if (uniqueCauses.has('Women Empowerment')) {
            badges.push({ name: '⚡ Equalizer', color: '#8b5cf6' });
          }
          if (uniqueCauses.has('Environment')) {
            badges.push({ name: '🌲 Eco Guardian', color: '#10b981' });
          }
          
          setEarnedBadges(badges);
        }

        // Fetch volunteer registrations for current user
        const { data: volunteers, error: volError } = await db.getVolunteers();
        if (!volError && volunteers) {
          setPersonalVolunteers(volunteers);
        }
      } catch (err) {
        console.error('Error fetching dashboard records: ', err);
      }
    };

    fetchUserData();
  }, [user]);

  // Format date utility
  const formatDate = (isoString) => {
    if (!isoString) return 'Today';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div id="dashboard-view">
      {/* Page Header */}
      <section className={styles.dashboardHeader} id="dashboard-header">
        <div className="container">
          <div className={styles.welcomeRow}>
            <div>
              <h1 className={styles.welcomeTitle}>Welcome back, {user?.first_name || 'Supporter'}!</h1>
              <p className={styles.welcomeSub}>
                Manage your real-time humanitarian impact and track active registrations.
              </p>
            </div>
            <div 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                padding: '8px 16px', 
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              id="dashboard-user-id-badge"
            >
              ID: {user?.id}
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className={styles.dashboardBody} id="dashboard-content-body">
        <div className="container">
          
          {/* Summary Metric Cards */}
          <div className={styles.metricsGrid} id="dashboard-metrics">
            {/* Metric 1: Support Value */}
            <div className={styles.metricCard} id="metric-donations">
              <div className={`${styles.metricIconContainer}`} style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
                <CreditCard size={28} color="var(--primary-color)" />
              </div>
              <div>
                <div className={styles.metricValue}>${(user?.support || 0).toLocaleString()}</div>
                <div className={styles.metricLabel}>Total Support Value</div>
              </div>
            </div>

            {/* Metric 2: Badges from User Table */}
            <div className={styles.metricCard} id="metric-badges">
              <div className={`${styles.metricIconContainer}`} style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                <Award size={28} color="var(--secondary-color)" />
              </div>
              <div>
                <div className={styles.metricValue}>
                  {(() => {
                    try {
                      const badgeList = JSON.parse(user?.badges || '[]');
                      return badgeList.length;
                    } catch {
                      return 0;
                    }
                  })()} Earned
                </div>
                <div className={styles.metricLabel}>Custom Supporter Badges</div>
                <div className={styles.badgeGrid} id="dashboard-earned-badges">
                  {(() => {
                    try {
                      const badgeList = JSON.parse(user?.badges || '[]');
                      return badgeList.map((badge, idx) => (
                        <span 
                          className={styles.earnedBadge} 
                          key={idx}
                          style={{ borderColor: badge.color || '#666', color: badge.color || '#666' }}
                          id={`earned-badge-${idx}`}
                        >
                          {badge.name}
                        </span>
                      ));
                    } catch {
                      return null;
                    }
                  })()}
                </div>
              </div>
            </div>

            {/* Metric 3: Active Applications */}
            <div className={styles.metricCard} id="metric-applications">
              <div className={`${styles.metricIconContainer}`} style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                <ClipboardList size={28} color="#8b5cf6" />
              </div>
              <div>
                <div className={styles.metricValue}>{personalVolunteers.length} Active</div>
                <div className={styles.metricLabel}>Volunteer Registrations</div>
              </div>
            </div>
          </div>

          {/* Records Table Layout */}
          <div className={styles.recordsGrid} id="dashboard-records">
            
            {/* Left: Donation Log */}
            <div className={styles.recordCard} id="personal-donations-log">
              <h3 className={styles.cardHeaderTitle}>
                <TrendingUp size={20} color="var(--primary-color)" />
                My Contribution Log
              </h3>

              {personalDonations.length > 0 ? (
                <div className={styles.tableContainer}>
                  <table className={styles.table} id="donations-table">
                    <thead>
                      <tr>
                        <th className={styles.th}>Date</th>
                        <th className={styles.th}>Cause Pillar</th>
                        <th className={styles.th}>Amount</th>
                        <th className={styles.th}>Gateway Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personalDonations.map((item) => (
                        <tr key={item.id} id={`donation-row-${item.id}`}>
                          <td className={styles.td}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Calendar size={14} color="var(--text-light)" />
                              <span>{formatDate(item.date)}</span>
                            </div>
                          </td>
                          <td className={styles.td}>
                            <span 
                              style={{ 
                                fontWeight: '600', 
                                color: item.cause === 'Education' ? '#0d9488' : 
                                       item.cause === 'Healthcare' ? '#06b6d4' : 
                                       item.cause === 'Child Welfare' ? '#f97316' : 
                                       item.cause === 'Women Empowerment' ? '#8b5cf6' : '#10b981' 
                              }}
                            >
                              {item.cause}
                            </span>
                          </td>
                          <td className={styles.td} style={{ fontWeight: '700' }}>
                            ${Number(item.amount).toLocaleString()}
                          </td>
                          <td className={styles.td}>
                            <span className={`${styles.statusBadge} ${styles.statusCleared}`}>
                              Cleared
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.emptyState} id="donation-empty-state">
                  <Heart size={36} color="var(--border-color)" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                  <p>You haven't logged any contributions yet.</p>
                  <button 
                    className={styles.emptyBtn} 
                    onClick={() => setActiveTab('donate')}
                    id="dashboard-empty-donate"
                  >
                    Support Our Action
                  </button>
                </div>
              )}
            </div>

            {/* Right: Volunteer Applications status */}
            <div className={styles.recordCard} id="personal-volunteers-log">
              <h3 className={styles.cardHeaderTitle}>
                <ClipboardList size={20} color="var(--secondary-color)" />
                Volunteer Status
              </h3>

              {personalVolunteers.length > 0 ? (
                <div className={styles.tableContainer}>
                  <table className={styles.table} id="volunteers-table">
                    <thead>
                      <tr>
                        <th className={styles.th}>Selected Cause</th>
                        <th className={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personalVolunteers.map((item) => (
                        <tr key={item.id} id={`volunteer-row-${item.id}`}>
                          <td className={styles.td}>
                            <div style={{ fontWeight: '600' }}>{item.cause}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Registered {formatDate(item.date)}</div>
                          </td>
                          <td className={styles.td}>
                            <span className={`${styles.statusBadge} ${item.status === 'Approved' ? styles.statusApproved : styles.statusPending}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.emptyState} id="volunteer-empty-state">
                  <ClipboardList size={36} color="var(--border-color)" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                  <p>No active registrations found.</p>
                  <button 
                    className={styles.emptyBtn} 
                    style={{ backgroundColor: 'var(--secondary-color)' }}
                    onClick={() => setActiveTab('volunteer')}
                    id="dashboard-empty-volunteer"
                  >
                    Apply to Volunteer
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
