import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { 
  CreditCard, Award, ClipboardList, TrendingUp, Calendar, Heart, 
  Users, Mail, ShieldAlert, CheckCircle, Clock, Trash2, Search, 
  UserCheck, ShieldCheck, DollarSign, User, Eye
} from 'lucide-react';
import styles from '../styles/Dashboard.module.css';
import LoadingOverlay from './LoadingOverlay';

/**
 * Reusable Pagination Controls Component with page size selector
 */
const PaginationControls = ({ currentPage, totalItems, pageSize, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Smart page buttons: show first, last, current ± 1, with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1].filter(p => p >= 1 && p <= totalPages));
    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result = [];
    sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1] > 1) result.push('...');
      result.push(p);
    });
    return result;
  };

  return (
    <div className={styles.paginationRow}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div className={styles.paginationInfo}>
          Showing <strong>{startItem}</strong>–<strong>{endItem}</strong> of <strong>{totalItems}</strong> entries
        </div>
        {onPageSizeChange && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
              style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer' }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className={styles.paginationButtons}>
          <button
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            title="Previous Page"
          >
            &larr; Prev
          </button>

          {getPageNumbers().map((p, idx) =>
            p === '...' ? (
              <span key={`ellipsis-${idx}`} style={{ padding: '0 4px', color: 'var(--text-muted)' }}>…</span>
            ) : (
              <button
                key={p}
                className={`${styles.pageNumberBtn} ${p === currentPage ? styles.pageNumberBtnActive : ''}`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            )
          )}

          <button
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            title="Next Page"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Role-Based Dashboard Component with Profile Editing, User Modal, Table Pagination & Search Filtering
 */
export default function Dashboard({ user, onUserUpdate, setActiveTab }) {
  const role = user?.role || 'user';
  const isAdmin = role === 'admin';
  const isCoordinator = role === 'coordinator';
  const isStaff = isAdmin || isCoordinator;

  // Active portal sub-tab state ('my-impact', 'my-profile', 'users-management', 'volunteers-management', 'contact-messages', 'donations-ledger')
  const [activePortalTab, setActivePortalTab] = useState('my-impact');

  // Supporter personal states
  const [personalDonations, setPersonalDonations] = useState([]);
  const [personalVolunteers, setPersonalVolunteers] = useState([]);
  const [totalContributed, setTotalContributed] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);

  // Staff / Admin database states
  const [allUsers, setAllUsers] = useState([]);
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [allDonations, setAllDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  // Global loading overlay — set a message string to show, null/'' to hide
  const [loadingMessage, setLoadingMessage] = useState('');

  // Profile form state pre-filled from user prop
  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // User details inline-page edit state (Admin & Coordinator can view/edit user details + password)
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [userEditForm, setUserEditForm] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(true);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  // Sync profile form when user prop changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  // Pagination page states — default 10 rows per page
  const [pageUsers, setPageUsers] = useState(1);
  const [pageVolunteers, setPageVolunteers] = useState(1);
  const [pageMessages, setPageMessages] = useState(1);
  const [pageDonations, setPageDonations] = useState(1);
  const [pagePersonalDonations, setPagePersonalDonations] = useState(1);
  const [pagePersonalVolunteers, setPagePersonalVolunteers] = useState(1);

  const [pageSizeUsers, setPageSizeUsers] = useState(10);
  const [pageSizeVolunteers, setPageSizeVolunteers] = useState(10);
  const [pageSizeMessages, setPageSizeMessages] = useState(10);
  const [pageSizeDonations, setPageSizeDonations] = useState(10);
  const [pageSizePersonalDonations, setPageSizePersonalDonations] = useState(10);
  const [pageSizePersonalVolunteers, setPageSizePersonalVolunteers] = useState(10);

  // Reset pagination to page 1 whenever search query or sub-tab changes
  useEffect(() => {
    setPageUsers(1);
    setPageVolunteers(1);
    setPageMessages(1);
    setPageDonations(1);
    setPagePersonalDonations(1);
    setPagePersonalVolunteers(1);
  }, [searchQuery, activePortalTab]);

  // Load personal metrics & staff data
  const loadDashboardData = async () => {
    if (!user) return;

    try {
      // 1. Personal data
      const { data: donations } = await db.getDonations();
      if (donations) {
        const userRecords = donations.filter(
          d => d.user_id === user.id || (d.user_email && d.user_email.toLowerCase() === user.email.toLowerCase())
        );
        setPersonalDonations(userRecords);
        const sum = userRecords.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalContributed(sum);

        const badges = [];
        const uniqueCauses = new Set(userRecords.map(r => r.cause));
        if (uniqueCauses.has('Education')) badges.push({ name: '🎓 Mind Opener', color: '#0d9488' });
        if (uniqueCauses.has('Healthcare')) badges.push({ name: '🏥 Health Savior', color: '#06b6d4' });
        if (uniqueCauses.has('Child Welfare')) badges.push({ name: '👶 Child Protector', color: '#f97316' });
        if (uniqueCauses.has('Women Empowerment')) badges.push({ name: '⚡ Equalizer', color: '#8b5cf6' });
        if (uniqueCauses.has('Environment')) badges.push({ name: '🌲 Eco Guardian', color: '#10b981' });
        setEarnedBadges(badges);
      }

      const { data: volunteers } = await db.getVolunteers();
      if (volunteers) {
        setPersonalVolunteers(volunteers);
      }

      // 2. Staff / Admin Data
      if (isStaff) {
        const { data: usersData } = await db.getAllUsers();
        if (usersData) setAllUsers(usersData);

        const { data: volsData } = await db.getAllVolunteers();
        if (volsData) setAllVolunteers(volsData);

        const { data: msgsData } = await db.getAllContactMessages();
        if (msgsData) setAllMessages(msgsData);
      }

      if (isAdmin) {
        if (donations) setAllDonations(donations);
      }
    } catch (err) {
      console.error('Error loading dashboard records:', err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user, role]);

  const showNotification = (text, type = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 4000);
  };

  // Open user details inline form (Admin & Coordinator)
  const handleOpenUserModal = (targetUser) => {
    setSelectedUserForEdit(targetUser);
    setUserEditForm({
      id: targetUser.id,
      first_name: targetUser.first_name || '',
      last_name: targetUser.last_name || '',
      email: targetUser.email || '',
      password: targetUser.password || '',
      phone: targetUser.phone || '',
      role: targetUser.role || 'user'
    });
    setShowPassword(false);
    setActivePortalTab('user-edit');
  };

  const handleCloseUserModal = () => {
    setSelectedUserForEdit(null);
    setActivePortalTab('users-management');
  };

  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveUserFromModal = async (e) => {
    e.preventDefault();
    if (!userEditForm.first_name.trim() || !userEditForm.email.trim()) {
      showNotification('First Name and Email are required.', 'error');
      return;
    }

    const targetId = selectedUserForEdit?.id || userEditForm.id;

    setIsUpdatingUser(true);
    setLoadingMessage('Updating user details...');
    try {
      const { data: updated, error } = await db.updateUserFullDetails(targetId, userEditForm);
      if (!error && updated) {
        showNotification('User details updated successfully!');
        handleCloseUserModal();
        await loadDashboardData();
      } else {
        showNotification(error?.message || 'Failed to update user record.', 'error');
      }
    } catch (err) {
      console.error('Error updating user record:', err);
      showNotification('An error occurred while updating user record.', 'error');
    } finally {
      setIsUpdatingUser(false);
      setLoadingMessage('');
    }
  };

  // Handle Profile input changes
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.first_name.trim()) {
      showNotification('First Name is required.', 'error');
      return;
    }

    setIsSavingProfile(true);
    setLoadingMessage('Saving profile changes...');
    try {
      const { data: updatedUser, error } = await db.updateUserProfile(user.id, profileForm);
      if (!error && updatedUser) {
        showNotification('Your profile details have been updated successfully!');
        if (onUserUpdate) {
          onUserUpdate(updatedUser);
        }
      } else {
        showNotification(error?.message || 'Failed to update profile.', 'error');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      showNotification('An error occurred while saving profile.', 'error');
    } finally {
      setIsSavingProfile(false);
      setLoadingMessage('');
    }
  };

  // Admin/Coordinator: Volunteer Status Change
  const handleVolunteerStatusChange = async (volId, newStatus) => {
    if (!isStaff) return;
    setLoadingMessage(`Updating status to "${newStatus}"...`);
    try {
      const { error } = await db.updateVolunteerStatus(volId, newStatus);
      if (!error) {
        showNotification(`Volunteer application status updated to ${newStatus}.`);
        await loadDashboardData();
      } else {
        showNotification(error.message || 'Failed to update status', 'error');
      }
    } finally {
      setLoadingMessage('');
    }
  };

  // Admin: Delete operations
  const handleDeleteUser = async (userId) => {
    if (!isAdmin) return;
    if (window.confirm('Are you sure you want to delete this user account?')) {
      setLoadingMessage('Deleting user account...');
      try {
        const { error } = await db.deleteUser(userId);
        if (!error) {
          showNotification('User deleted successfully.');
          await loadDashboardData();
        }
      } finally {
        setLoadingMessage('');
      }
    }
  };

  const handleDeleteVolunteer = async (volId) => {
    if (!isAdmin) return;
    if (window.confirm('Delete this volunteer submission?')) {
      setLoadingMessage('Removing volunteer record...');
      try {
        const { error } = await db.deleteVolunteer(volId);
        if (!error) {
          showNotification('Volunteer record removed.');
          await loadDashboardData();
        }
      } finally {
        setLoadingMessage('');
      }
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!isAdmin) return;
    if (window.confirm('Delete this contact message?')) {
      setLoadingMessage('Deleting message...');
      try {
        const { error } = await db.deleteContactMessage(msgId);
        if (!error) {
          showNotification('Message deleted.');
          await loadDashboardData();
        }
      } finally {
        setLoadingMessage('');
      }
    }
  };

  const handleDeleteDonation = async (donId) => {
    if (!isAdmin) return;
    if (window.confirm('Delete this donation log?')) {
      setLoadingMessage('Deleting donation record...');
      try {
        const { error } = await db.deleteDonation(donId);
        if (!error) {
          showNotification('Donation log deleted.');
          await loadDashboardData();
        }
      } finally {
        setLoadingMessage('');
      }
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Today';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Filtered dataset calculations
  const filteredUsers = allUsers.filter(u =>
    !searchQuery ||
    (u.first_name + ' ' + u.last_name).toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedUsers = filteredUsers.slice((pageUsers - 1) * pageSizeUsers, pageUsers * pageSizeUsers);

  const filteredVolunteers = allVolunteers.filter(v =>
    !searchQuery ||
    (v.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (v.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (v.cause || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedVolunteers = filteredVolunteers.slice((pageVolunteers - 1) * pageSizeVolunteers, pageVolunteers * pageSizeVolunteers);

  const filteredMessages = allMessages.filter(m =>
    !searchQuery ||
    (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.message || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedMessages = filteredMessages.slice((pageMessages - 1) * pageSizeMessages, pageMessages * pageSizeMessages);

  const filteredDonations = allDonations.filter(d =>
    !searchQuery ||
    (d.user_email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.donor_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.cause || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedDonations = filteredDonations.slice((pageDonations - 1) * pageSizeDonations, pageDonations * pageSizeDonations);

  const paginatedPersonalDonations = personalDonations.slice((pagePersonalDonations - 1) * pageSizePersonalDonations, pagePersonalDonations * pageSizePersonalDonations);
  const paginatedPersonalVolunteers = personalVolunteers.slice((pagePersonalVolunteers - 1) * pageSizePersonalVolunteers, pagePersonalVolunteers * pageSizePersonalVolunteers);

  return (
    <div id="dashboard-view">
      {/* Full-screen loading overlay — shown during any async update/delete/save */}
      {loadingMessage && <LoadingOverlay message={loadingMessage} />}

      {/* Page Header with Role Badge */}
      <section className={styles.dashboardHeader} id="dashboard-header">
        <div className="container">
          <div className={styles.welcomeRow}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <h1 className={styles.welcomeTitle}>Welcome back, {user?.first_name || 'Supporter'}!</h1>
                <span className={`${styles.rolePill} ${isAdmin ? styles.roleAdmin : isCoordinator ? styles.roleCoordinator : styles.roleUser}`}>
                  {isAdmin ? '👑 Admin' : isCoordinator ? '📋 Coordinator' : '👤 Supporter'}
                </span>
              </div>
              <p className={styles.welcomeSub}>
                {isAdmin
                  ? 'Full administrative control across donations, volunteers, user roles, and messages.'
                  : isCoordinator
                  ? 'Coordinator Portal — Review enrolled users, volunteers, and contact inquiries.'
                  : 'Manage your real-time humanitarian impact and update your profile details.'}
              </p>
            </div>
            <div>
              <button
                className={styles.portalTabBtn}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.3)' }}
                onClick={() => setActivePortalTab('my-profile')}
                title="Edit My Profile"
              >
                <User size={16} /> My Profile
              </button>
            </div>
          </div>

          {/* Role Navigation Sub-Tabs */}
          <div className={styles.portalTabsNav} id="portal-navigation-tabs">
            <button
              className={`${styles.portalTabBtn} ${activePortalTab === 'my-impact' ? styles.portalTabBtnActive : ''}`}
              onClick={() => setActivePortalTab('my-impact')}
            >
              <Heart size={16} /> My Impact
            </button>

            <button
              className={`${styles.portalTabBtn} ${activePortalTab === 'my-profile' ? styles.portalTabBtnActive : ''}`}
              onClick={() => setActivePortalTab('my-profile')}
            >
              <User size={16} /> My Profile
            </button>

            {isStaff && (
              <>
                <button
                  className={`${styles.portalTabBtn} ${activePortalTab === 'users-management' ? styles.portalTabBtnActive : ''}`}
                  onClick={() => setActivePortalTab('users-management')}
                >
                  <Users size={16} /> Enrolled Users ({allUsers.length})
                </button>

                <button
                  className={`${styles.portalTabBtn} ${activePortalTab === 'volunteers-management' ? styles.portalTabBtnActive : ''}`}
                  onClick={() => setActivePortalTab('volunteers-management')}
                >
                  <ClipboardList size={16} /> Volunteer Applications ({allVolunteers.length})
                </button>

                <button
                  className={`${styles.portalTabBtn} ${activePortalTab === 'contact-messages' ? styles.portalTabBtnActive : ''}`}
                  onClick={() => setActivePortalTab('contact-messages')}
                >
                  <Mail size={16} /> Contact Inbox ({allMessages.length})
                </button>
              </>
            )}

            {isAdmin && (
              <button
                className={`${styles.portalTabBtn} ${activePortalTab === 'donations-ledger' ? styles.portalTabBtnActive : ''}`}
                onClick={() => setActivePortalTab('donations-ledger')}
              >
                <DollarSign size={16} /> Financial Donations ({allDonations.length})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className={styles.dashboardBody} id="dashboard-content-body">
        <div className="container">

          {/* Status Alert Notification */}
          {statusMsg.text && (
            <div className={`${styles.statusBanner} ${statusMsg.type === 'error' ? styles.statusBannerError : styles.statusBannerSuccess}`}>
              {statusMsg.type === 'error' ? <ShieldAlert size={18} /> : <CheckCircle size={18} />}
              {statusMsg.text}
            </div>
          )}

          {/* TAB 1: MY IMPACT & PROFILE SUMMARY */}
          {activePortalTab === 'my-impact' && (
            <div>
              {/* Summary Metric Cards */}
              <div className={styles.metricsGrid} id="dashboard-metrics">
                <div className={styles.metricCard} id="metric-donations">
                  <div className={styles.metricIconContainer} style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)' }}>
                    <CreditCard size={28} color="var(--primary-color)" />
                  </div>
                  <div>
                    <div className={styles.metricValue}>₹{totalContributed.toLocaleString()}</div>
                    <div className={styles.metricLabel}>Total Personal Contributions</div>
                  </div>
                </div>

                <div className={styles.metricCard} id="metric-badges">
                  <div className={styles.metricIconContainer} style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                    <Award size={28} color="var(--secondary-color)" />
                  </div>
                  <div>
                    <div className={styles.metricValue}>{earnedBadges.length} Earned</div>
                    <div className={styles.metricLabel}>Custom Supporter Badges</div>
                    <div className={styles.badgeGrid}>
                      {earnedBadges.map((badge, idx) => (
                        <span className={styles.earnedBadge} key={idx} style={{ borderColor: badge.color, color: badge.color }}>
                          {badge.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.metricCard} id="metric-applications">
                  <div className={styles.metricIconContainer} style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                    <ClipboardList size={28} color="#8b5cf6" />
                  </div>
                  <div>
                    <div className={styles.metricValue}>{personalVolunteers.length} Active</div>
                    <div className={styles.metricLabel}>Volunteer Submissions</div>
                  </div>
                </div>
              </div>

              {/* Personal Logs Table */}
              <div className={styles.recordsGrid}>
                <div className={styles.recordCard}>
                  <h3 className={styles.cardHeaderTitle}>
                    <TrendingUp size={20} color="var(--primary-color)" />
                    My Personal Donation Logs
                  </h3>
                  {personalDonations.length > 0 ? (
                    <>
                      <div className={styles.tableContainer}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th className={styles.th}>Date</th>
                              <th className={styles.th}>Cause</th>
                              <th className={styles.th}>Amount</th>
                              <th className={styles.th}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedPersonalDonations.map(item => (
                              <tr key={item.id}>
                                <td className={styles.td}>{formatDate(item.date)}</td>
                                <td className={styles.td} style={{ fontWeight: '600' }}>{item.cause}</td>
                                <td className={styles.td} style={{ fontWeight: '700' }}>₹{Number(item.amount).toLocaleString()}</td>
                                <td className={styles.td}><span className={`${styles.statusBadge} ${styles.statusCleared}`}>Cleared</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <PaginationControls
                        currentPage={pagePersonalDonations}
                        totalItems={personalDonations.length}
                        pageSize={pageSizePersonalDonations}
                        onPageChange={setPagePersonalDonations}
                        onPageSizeChange={setPageSizePersonalDonations}
                      />
                    </>
                  ) : (
                    <div className={styles.emptyState}>
                      <Heart size={36} color="var(--border-color)" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                      <p>You haven't logged any contributions yet.</p>
                      <button className={styles.emptyBtn} onClick={() => setActiveTab('donate')}>Support Our Action</button>
                    </div>
                  )}
                </div>

                <div className={styles.recordCard}>
                  <h3 className={styles.cardHeaderTitle}>
                    <ClipboardList size={20} color="var(--secondary-color)" />
                    My Volunteer Applications
                  </h3>
                  {personalVolunteers.length > 0 ? (
                    <>
                      <div className={styles.tableContainer}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th className={styles.th}>Cause</th>
                              <th className={styles.th}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedPersonalVolunteers.map(item => (
                              <tr key={item.id}>
                                <td className={styles.td}>
                                  <div style={{ fontWeight: '600' }}>{item.cause}</div>
                                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatDate(item.date)}</div>
                                </td>
                                <td className={styles.td}>
                                  <span className={`${styles.statusBadge} ${item.status === 'Approved' ? styles.statusApproved : styles.statusPending}`}>
                                    {item.status || 'Pending'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <PaginationControls
                        currentPage={pagePersonalVolunteers}
                        totalItems={personalVolunteers.length}
                        pageSize={pageSizePersonalVolunteers}
                        onPageChange={setPagePersonalVolunteers}
                        onPageSizeChange={setPageSizePersonalVolunteers}
                      />
                    </>
                  ) : (
                    <div className={styles.emptyState}>
                      <ClipboardList size={36} color="var(--border-color)" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                      <p>No active registrations found.</p>
                      <button className={styles.emptyBtn} style={{ backgroundColor: 'var(--secondary-color)' }} onClick={() => setActiveTab('volunteer')}>Apply to Volunteer</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY PROFILE FORM (VIEW & UPDATE DETAILS) */}
          {activePortalTab === 'my-profile' && (
            <div className={styles.recordCard}>
              <div className={styles.profileHeaderCard}>
                <div className={styles.avatarCircle}>
                  {((profileForm.first_name[0] || 'U') + (profileForm.last_name[0] || '')).toUpperCase()}
                </div>
                <div>
                  <h2 className={styles.profileName}>
                    {profileForm.first_name || 'Supporter'} {profileForm.last_name}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span className={styles.profileEmail}>{user?.email}</span>
                    <span className={`${styles.rolePill} ${isAdmin ? styles.roleAdmin : isCoordinator ? styles.roleCoordinator : styles.roleUser}`}>
                      {isAdmin ? '👑 Admin' : isCoordinator ? '📋 Coordinator' : '👤 Supporter'}
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className={styles.profileForm}>
                <h3 className={styles.cardHeaderTitle} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <UserCheck size={20} color="var(--primary-color)" />
                  Personal Profile & Contact Information
                </h3>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      className={styles.formInput}
                      value={profileForm.first_name}
                      onChange={handleProfileInputChange}
                      placeholder="e.g. Rahul"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      className={styles.formInput}
                      value={profileForm.last_name}
                      onChange={handleProfileInputChange}
                      placeholder="e.g. Sharma"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address (Read-Only)</label>
                    <input
                      type="email"
                      className={`${styles.formInput} ${styles.formInputDisabled}`}
                      value={profileForm.email}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className={styles.formInput}
                      value={profileForm.phone}
                      onChange={handleProfileInputChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className={styles.profileActionRow}>
                  <button
                    type="submit"
                    className={styles.saveProfileBtn}
                    disabled={isSavingProfile}
                  >
                    {isSavingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelProfileBtn}
                    onClick={() => {
                      if (user) {
                        setProfileForm({
                          first_name: user.first_name || '',
                          last_name: user.last_name || '',
                          email: user.email || '',
                          phone: user.phone || ''
                        });
                      }
                    }}
                  >
                    Reset / Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ENROLLED USERS MANAGEMENT (Coordinator Read & Edit | Admin Full Access) */}
          {isStaff && activePortalTab === 'users-management' && (
            <div className={styles.recordCard}>
              <div className={styles.tableHeaderRow}>
                <div>
                  <h3 className={styles.cardHeaderTitle} style={{ marginBottom: '4px', border: 'none', padding: 0 }}>
                    <Users size={22} color="#0056d2" />
                    Enrolled NGO Members & Users ({allUsers.length})
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    {isAdmin ? 'Admin View: Full access to inspect details, passwords, and manage accounts.' : 'Coordinator View: Inspect details, passwords, and contact info.'}
                  </p>
                </div>
                <div className={styles.searchBox}>
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              {filteredUsers.length > 0 ? (
                <>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th className={styles.th}>Member Name</th>
                          <th className={styles.th}>Email Address</th>
                          <th className={styles.th}>Current Role</th>
                          <th className={styles.th}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedUsers.map((usr) => (
                          <tr key={usr.id}>
                            <td className={styles.td} style={{ fontWeight: '600' }}>
                              {usr.first_name} {usr.last_name || ''}
                            </td>
                            <td className={styles.td}>{usr.email}</td>
                            <td className={styles.td}>
                              <span className={`${styles.rolePill} ${usr.role === 'admin' ? styles.roleAdmin : usr.role === 'coordinator' ? styles.roleCoordinator : styles.roleUser}`}>
                                {usr.role === 'admin' ? '👑 Admin' : usr.role === 'coordinator' ? '📋 Coordinator' : '👤 User'}
                              </span>
                            </td>
                            <td className={styles.td}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                  className={styles.actionBtnEdit}
                                  onClick={() => handleOpenUserModal(usr)}
                                  title="View & Edit User Details & Password"
                                >
                                  <Eye size={15} />
                                </button>
                                {isAdmin && (
                                  <button
                                    className={styles.actionBtnDelete}
                                    onClick={() => handleDeleteUser(usr.id)}
                                    title="Delete User Account"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationControls
                    currentPage={pageUsers}
                    totalItems={filteredUsers.length}
                    pageSize={pageSizeUsers}
                    onPageChange={setPageUsers}
                    onPageSizeChange={setPageSizeUsers}
                  />
                </>
              ) : (
                <div className={styles.emptyState}>
                  <p>No user accounts found matching "{searchQuery}".</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: VOLUNTEER SUBMISSIONS (Coordinator & Admin Status Management) */}
          {isStaff && activePortalTab === 'volunteers-management' && (
            <div className={styles.recordCard}>
              <div className={styles.tableHeaderRow}>
                <div>
                  <h3 className={styles.cardHeaderTitle} style={{ marginBottom: '4px', border: 'none', padding: 0 }}>
                    <ClipboardList size={22} color="var(--secondary-color)" />
                    Volunteer Applications Registry ({allVolunteers.length})
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    Review, approve, or update volunteer candidate applications.
                  </p>
                </div>
                <div className={styles.searchBox}>
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search volunteer or cause..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              {filteredVolunteers.length > 0 ? (
                <>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th className={styles.th}>Applicant Name</th>
                          <th className={styles.th}>Email & Skills</th>
                          <th className={styles.th}>Cause</th>
                          <th className={styles.th}>Status</th>
                          <th className={styles.th}>Update Status</th>
                          {isAdmin && <th className={styles.th}>Delete</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedVolunteers.map((vol) => (
                          <tr key={vol.id}>
                            <td className={styles.td} style={{ fontWeight: '600' }}>{vol.name}</td>
                            <td className={styles.td}>
                              <div>{vol.email}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Skills: {vol.skills || 'N/A'}</div>
                            </td>
                            <td className={styles.td} style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{vol.cause}</td>
                            <td className={styles.td}>
                              <span className={`${styles.statusBadge} ${vol.status === 'Approved' ? styles.statusApproved : vol.status === 'Rejected' ? styles.statusRejected : styles.statusPending}`}>
                                {vol.status || 'Pending'}
                              </span>
                            </td>
                            <td className={styles.td}>
                              <select
                                className={styles.roleSelect}
                                value={vol.status || 'Pending'}
                                onChange={(e) => handleVolunteerStatusChange(vol.id, e.target.value)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            {isAdmin && (
                              <td className={styles.td}>
                                <button className={styles.actionBtnDelete} onClick={() => handleDeleteVolunteer(vol.id)}>
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationControls
                    currentPage={pageVolunteers}
                    totalItems={filteredVolunteers.length}
                    pageSize={pageSizeVolunteers}
                    onPageChange={setPageVolunteers}
                    onPageSizeChange={setPageSizeVolunteers}
                  />
                </>
              ) : (
                <div className={styles.emptyState}>
                  <p>No volunteer applications found matching "{searchQuery}".</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CONTACT MESSAGES INBOX (Coordinator & Admin) */}
          {isStaff && activePortalTab === 'contact-messages' && (
            <div className={styles.recordCard}>
              <div className={styles.tableHeaderRow}>
                <div>
                  <h3 className={styles.cardHeaderTitle} style={{ marginBottom: '4px', border: 'none', padding: 0 }}>
                    <Mail size={22} color="#8b5cf6" />
                    Public Contact Inquiries Inbox ({allMessages.length})
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    Inquiries submitted from the Contact Us form.
                  </p>
                </div>
                <div className={styles.searchBox}>
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search by sender or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              {filteredMessages.length > 0 ? (
                <>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th className={styles.th}>Date & Sender</th>
                          <th className={styles.th}>Subject</th>
                          <th className={styles.th}>Message Body</th>
                          {isAdmin && <th className={styles.th}>Delete</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedMessages.map((msg) => (
                          <tr key={msg.id}>
                            <td className={styles.td}>
                              <div style={{ fontWeight: '600' }}>{msg.name}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{msg.email}</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{formatDate(msg.date)}</div>
                            </td>
                            <td className={styles.td} style={{ fontWeight: '600' }}>{msg.subject || 'General Inquiry'}</td>
                            <td className={styles.td} style={{ maxWidth: '340px', lineHeight: '1.5' }}>{msg.message}</td>
                            {isAdmin && (
                              <td className={styles.td}>
                                <button className={styles.actionBtnDelete} onClick={() => handleDeleteMessage(msg.id)}>
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationControls
                    currentPage={pageMessages}
                    totalItems={filteredMessages.length}
                    pageSize={pageSizeMessages}
                    onPageChange={setPageMessages}
                    onPageSizeChange={setPageSizeMessages}
                  />
                </>
              ) : (
                <div className={styles.emptyState}>
                  <p>No contact messages found matching "{searchQuery}".</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: FINANCIAL DONATIONS LEDGER (Admin Only) */}
          {isAdmin && activePortalTab === 'donations-ledger' && (
            <div className={styles.recordCard}>
              <div className={styles.tableHeaderRow}>
                <div>
                  <h3 className={styles.cardHeaderTitle} style={{ marginBottom: '4px', border: 'none', padding: 0 }}>
                    <DollarSign size={22} color="#10b981" />
                    Complete Financial Donations Ledger ({allDonations.length})
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    Admin Financial View: Total Raised ₹{allDonations.reduce((acc, c) => acc + Number(c.amount || 0), 0).toLocaleString()}
                  </p>
                </div>
                <div className={styles.searchBox}>
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search by donor or cause..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              {filteredDonations.length > 0 ? (
                <>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th className={styles.th}>Date</th>
                          <th className={styles.th}>Donor Email / Name</th>
                          <th className={styles.th}>Cause</th>
                          <th className={styles.th}>Amount</th>
                          <th className={styles.th}>Razorpay Ref</th>
                          <th className={styles.th}>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedDonations.map((don) => (
                          <tr key={don.id}>
                            <td className={styles.td}>{formatDate(don.date)}</td>
                            <td className={styles.td}>
                              <div style={{ fontWeight: '600' }}>{don.donor_name || 'Anonymous Donor'}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{don.user_email || 'No Email'}</div>
                            </td>
                            <td className={styles.td} style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{don.cause}</td>
                            <td className={styles.td} style={{ fontWeight: '700', color: '#10b981' }}>₹{Number(don.amount).toLocaleString()}</td>
                            <td className={styles.td} style={{ fontSize: '12px', fontFamily: 'monospace' }}>{don.razorpay_payment_id || don.razorpay_ref || 'N/A'}</td>
                            <td className={styles.td}>
                              <button className={styles.actionBtnDelete} onClick={() => handleDeleteDonation(don.id)}>
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationControls
                    currentPage={pageDonations}
                    totalItems={filteredDonations.length}
                    pageSize={pageSizeDonations}
                    onPageChange={setPageDonations}
                    onPageSizeChange={setPageSizeDonations}
                  />
                </>
              ) : (
                <div className={styles.emptyState}>
                  <p>No financial donation logs found matching "{searchQuery}".</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: USER EDIT INLINE FORM (replaces modal — Admin & Coordinator) */}
          {isStaff && activePortalTab === 'user-edit' && selectedUserForEdit && (
            <div className={styles.recordCard}>
              {/* Header with back navigation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                <button
                  type="button"
                  onClick={handleCloseUserModal}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '7px 14px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}
                >
                  ← Back to Users
                </button>
                <div>
                  <h3 className={styles.cardHeaderTitle} style={{ margin: 0, border: 'none', padding: 0 }}>
                    <UserCheck size={20} color="var(--primary-color)" />
                    Editing: {selectedUserForEdit.first_name} {selectedUserForEdit.last_name}
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {isAdmin ? 'Admin View: All fields editable including email, password and role.' : 'Coordinator View: View and edit user contact details and password.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveUserFromModal} className={styles.profileForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      className={styles.formInput}
                      value={userEditForm.first_name}
                      onChange={handleUserFormChange}
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      className={styles.formInput}
                      value={userEditForm.last_name}
                      onChange={handleUserFormChange}
                      placeholder="Last Name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className={styles.formInput}
                      value={userEditForm.email}
                      onChange={handleUserFormChange}
                      placeholder="user@example.com"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone / Mobile Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className={styles.formInput}
                      value={userEditForm.phone}
                      onChange={handleUserFormChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>Account Password</label>
                    <div className={styles.passwordWrapper}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className={styles.formInput}
                        style={{ width: '100%', paddingRight: '48px' }}
                        value={userEditForm.password}
                        onChange={handleUserFormChange}
                        placeholder="Enter password to update it (leave blank to keep unchanged)"
                      />
                      <button
                        type="button"
                        className={styles.passwordToggleBtn}
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? 'Hide Password' : 'Show Password'}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className={styles.formGroupFull}>
                      <label className={styles.formLabel}>Account Role</label>
                      <select
                        name="role"
                        className={styles.roleSelect}
                        style={{ width: '100%', padding: '10px 14px', fontSize: '14px' }}
                        value={userEditForm.role}
                        onChange={handleUserFormChange}
                      >
                        <option value="user">👤 User (Supporter)</option>
                        <option value="coordinator">📋 Coordinator (Staff)</option>
                        <option value="admin">👑 Admin (Executive)</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className={styles.profileActionRow} style={{ marginTop: '24px' }}>
                  <button type="submit" className={styles.saveProfileBtn} disabled={isUpdatingUser}>
                    {isUpdatingUser ? 'Saving Changes...' : 'Save User Changes'}
                  </button>
                  <button type="button" className={styles.cancelProfileBtn} onClick={handleCloseUserModal}>
                    Cancel & Go Back
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
