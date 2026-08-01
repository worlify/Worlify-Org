import { createClient } from '@supabase/supabase-js';

const normalizeEnvVar = (value) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
};

// Retrieve Supabase credentials from environment variables supported by Next.js, Vite, and generic deployment env names
const supabaseUrl = normalizeEnvVar(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL
);
const supabaseAnonKey = normalizeEnvVar(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY
);

// Check if a string is a valid HTTP or HTTPS URL
const isValidHttpUrl = (string) => {
  if (!string) return false;
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

const normalizeEmail = (value) => (typeof value === 'string' ? value.trim().toLowerCase() : '');
const normalizePassword = (value) => (typeof value === 'string' ? value.trim() : '');

// Check if valid credentials are provided
const hasValidCredentials = 
  isValidHttpUrl(supabaseUrl) && 
  supabaseUrl !== 'https://your-supabase-project.supabase.co' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your-anon-key-here';

// Initialize the real Supabase client if keys are provided
export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Log status for debugging and guidance
if (hasValidCredentials) {
  console.log('✅ Supabase initialized successfully with custom credentials.');
} else {
  console.warn(
    '⚠️ Supabase credentials not configured or invalid.\n' +
    `Loaded URL: "${supabaseUrl}"\n` +
    `Loaded Key: ${supabaseAnonKey ? '(Present, length ' + supabaseAnonKey.length + ')' : '(Missing)'}\n` +
    'The app will run in "Local Mode" using localStorage for mock authentication and database persistence.'
  );
}

const getInitialRoleForEmail = (email) => {
  const normalized = normalizeEmail(email);
  if (
    normalized === 'adminworlify@gmail.com' ||
    normalized === 'admin@worlify.org' ||
    normalized === 'admin@worlify.com'
  ) {
    return 'admin';
  }
  if (
    normalized === 'coordinatorworlify@gmail.com' ||
    normalized === 'coordinator@worlify.org' ||
    normalized === 'coordinator@worlify.com'
  ) {
    return 'coordinator';
  }
  return 'user';
};

/**
 * Worlify Local DB & Auth Fallback System
 * This module mimics Supabase Auth and Database functions when keys are missing.
 * It lets a beginner test signup, login, logging donations, and volunteer applications
 * directly in the browser preview.
 */
class LocalDBService {
  constructor() {
    if (typeof window === 'undefined') {
      this.currentSession = null;
      return;
    }

    // Initialize collections in localStorage if they don't exist
    if (!localStorage.getItem('worlify_users')) {
      const initialUsers = [
        {
          id: 'usr_admin',
          email: 'admin@worlify.org',
          password: 'password123',
          first_name: 'Super',
          last_name: 'Admin',
          role: 'admin',
          support: 5,
          badges: ['Admin'],
          created_at: new Date().toISOString()
        },
        {
          id: 'usr_coordinator',
          email: 'coordinator@worlify.org',
          password: 'password123',
          first_name: 'NGO',
          last_name: 'Coordinator',
          role: 'coordinator',
          support: 2,
          badges: ['Staff'],
          created_at: new Date().toISOString()
        }
      ];
      localStorage.setItem('worlify_users', JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem('worlify_donations')) {
      // Seed some initial demo donations to make the site look alive and active!
      const initialDonations = [
        { id: '1', user_id: 'system', user_email: 'anonymous@helper.org', amount: 150, cause: 'Education', date: new Date(Date.now() - 86400000 * 2).toISOString() },
        { id: '2', user_id: 'system', user_email: 'clean_seas@nature.com', amount: 500, cause: 'Environment', date: new Date(Date.now() - 86400000 * 5).toISOString() },
        { id: '3', user_id: 'system', user_email: 'care_giver@health.org', amount: 250, cause: 'Healthcare', date: new Date(Date.now() - 86400000 * 7).toISOString() },
        { id: '4', user_id: 'system', user_email: 'child_first@care.com', amount: 100, cause: 'Child Welfare', date: new Date(Date.now() - 86400000 * 10).toISOString() },
        { id: '5', user_id: 'system', user_email: 'empower_her@women.org', amount: 350, cause: 'Women Empowerment', date: new Date(Date.now() - 86400000 * 12).toISOString() },
      ];
      localStorage.setItem('worlify_donations', JSON.stringify(initialDonations));
    }
    if (!localStorage.getItem('worlify_volunteers')) {
      // Seed some demo volunteer applications
      const initialVolunteers = [
        { id: 'v1', user_id: 'system', name: 'John Doe', email: 'john@example.com', cause: 'Education', skills: 'Teaching, English', status: 'Approved', date: new Date().toISOString() }
      ];
      localStorage.setItem('worlify_volunteers', JSON.stringify(initialVolunteers));
    }

    // Store current session in memory and localStorage
    const savedSession = localStorage.getItem('worlify_session');
    this.currentSession = savedSession ? JSON.parse(savedSession) : null;
  }

  // Helper to read localStorage
  _get(key) {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  // Helper to write localStorage
  _set(key, data) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- AUTH METHODS ---
  
  async signUp(email, password, fullName = 'Supporter') {
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = normalizePassword(password);
    const assignedRole = getInitialRoleForEmail(normalizedEmail);

    if (supabase) {
      // Real Supabase implementation - create an Auth user then persist profile metadata in the users table
      await new Promise(resolve => setTimeout(resolve, 600));

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: normalizedPassword,
      });

      if (authError) {
        // Fallback: If rate limit exceeded or user already registered, attempt auto sign-in
        const errLower = (authError.message || '').toLowerCase();
        if (errLower.includes('rate limit') || errLower.includes('already registered') || errLower.includes('already exists')) {
          console.warn('Signup rate limit or existing user encountered. Falling back to sign-in...');
          const signInFallback = await this.signIn(normalizedEmail, normalizedPassword);
          if (!signInFallback.error && signInFallback.data) {
            return signInFallback;
          }
        }
        return { data: null, error: authError };
      }

      const authUser = authData?.user;
      if (!authUser) {
        return { data: null, error: { message: 'Unable to create account. Please verify your email if required.' } };
      }

      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || 'User';
      const lastName = nameParts.slice(1).join(' ') || '';

      const userPayload = {
        id: authUser.id,
        email: normalizedEmail,
        password: normalizedPassword,
        first_name: firstName,
        last_name: lastName,
        role: assignedRole,
        support: 0,
        badges: '[]'
      };

      let { data: newUser, error } = await supabase
        .from('users')
        .insert([userPayload])
        .select();

      if (error) {
        // Fallback: If PostgREST schema cache does not have 'role' column, insert without role column
        console.warn('Supabase users table query warning:', error.message);
        delete userPayload.role;
        const retry = await supabase
          .from('users')
          .insert([userPayload])
          .select();
        newUser = retry.data;
      }

      const user = Array.isArray(newUser) && newUser.length > 0 ? newUser[0] : (newUser || userPayload);
      const sessionUser = { ...authUser, ...user, role: user?.role || assignedRole };
      this.currentSession = { user: sessionUser };
      this._set('worlify_session', this.currentSession);
      return { data: this.currentSession, error: null };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 600));
    const users = this._get('worlify_users');
    
    if (users.some(u => normalizeEmail(u.email) === normalizedEmail)) {
      return { data: null, error: { message: 'A user with this email already exists.' } };
    }

    const nameParts = fullName.trim().split(' ');
    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: normalizedEmail,
      password: normalizedPassword,
      first_name: nameParts[0] || 'User',
      last_name: nameParts.slice(1).join(' ') || '',
      role: assignedRole,
      support: 0,
      badges: [],
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    this._set('worlify_users', users);

    this.currentSession = { user: newUser };
    this._set('worlify_session', this.currentSession);
    return { data: this.currentSession, error: null };
  }

  async signIn(email, password) {
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = normalizePassword(password);
    const assignedRole = getInitialRoleForEmail(normalizedEmail);

    if (supabase) {
      // Real Supabase implementation - authenticate with Supabase Auth and load profile metadata
      await new Promise(resolve => setTimeout(resolve, 600));

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: normalizedPassword,
      });

      if (authError) {
        // Fallback: if the user exists in the local users table with the same credentials,
        // continue with that profile instead of failing completely.
        const { data: fallbackUser, error: fallbackError } = await supabase
          .from('users')
          .select('*')
          .eq('email', normalizedEmail)
          .single();

        if (!fallbackError && fallbackUser) {
          const storedPassword = typeof fallbackUser.password === 'string' ? fallbackUser.password.trim() : '';
          if (storedPassword === normalizedPassword) {
            const sessionUser = { ...fallbackUser, email: normalizedEmail, role: fallbackUser.role || assignedRole };
            this.currentSession = { user: sessionUser };
            this._set('worlify_session', this.currentSession);
            return { data: this.currentSession, error: null };
          }
        }

        return { data: null, error: authError };
      }

      const authUser = authData?.user;
      if (!authUser) {
        return { data: null, error: { message: 'Invalid email or password.' } };
      }

      const { data: userMeta, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('email', normalizedEmail)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        return { data: null, error: profileError };
      }

      const sessionUser = userMeta
        ? { ...authUser, ...userMeta, role: userMeta.role || assignedRole }
        : { ...authUser, email: normalizedEmail, first_name: '', last_name: '', role: assignedRole, support: 0, badges: [] };

      this.currentSession = { user: sessionUser };
      this._set('worlify_session', this.currentSession);
      return { data: this.currentSession, error: null };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 600));
    const users = this._get('worlify_users');
    let user = users.find((u) => {
      const storedEmail = normalizeEmail(u.email);
      const storedPassword = typeof u.password === 'string' ? u.password.trim() : '';
      return storedEmail === normalizedEmail && storedPassword === normalizedPassword;
    });

    if (!user) {
      return { data: null, error: { message: 'Invalid email or password.' } };
    }

    if (!user.role) {
      user.role = assignedRole;
    }

    this.currentSession = { user };
    this._set('worlify_session', this.currentSession);
    return { data: this.currentSession, error: null };
  }

  async signOut() {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase auth signOut error:', err);
      }
    }

    // Clear local session states in both real Supabase and Mock modes
    this.currentSession = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('worlify_session');
    }
    return { error: null };
  }

  getCurrentUser() {
    if (typeof window === 'undefined') {
      return null;
    }

    // First, check if session exists in memory
    if (this.currentSession && this.currentSession.user) {
      return this.currentSession.user;
    }

    // Try to restore from localStorage
    try {
      const sessionData = localStorage.getItem('worlify_session');
      if (sessionData) {
        const savedSession = JSON.parse(sessionData);
        if (savedSession && savedSession.user) {
          this.currentSession = savedSession;
          return savedSession.user;
        }
      }
    } catch (err) {
      console.error('Error parsing saved session:', err);
    }

    // No session found
    return null;
  }

  // --- DATABASE METHODS ---

  // Get all donations
  async getDonations() {
    if (supabase) {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('date', { ascending: false });
      return { data, error };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 400));
    const donations = this._get('worlify_donations');
    // Sort descending by date
    donations.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { data: donations, error: null };
  }

  // Add a new donation
  async addDonation(amount, cause, email = null, details = {}) {
    const user = this.getCurrentUser();
    const donorEmail = email || details.donor_email || (user ? user.email : 'anonymous@helper.org');
    let userId = user ? user.id : null;

    // Validate UUID format to prevent foreign key violation with mock IDs
    if (userId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
      userId = null;
    }

    const record = {
      amount: Number(amount),
      cause,
      user_id: userId,
      user_email: donorEmail,
      donor_name: details.donor_name || null,
      donor_phone: details.donor_phone || null,
      donor_dob: details.donor_dob || null,
      donor_address: details.donor_address || null,
      donor_pincode: details.donor_pincode || null,
      donor_city: details.donor_city || null,
      donor_state: details.donor_state || null,
      donor_pan: details.donor_pan || null,
      frequency: details.frequency || 'one-time',
      status: details.status || 'pending',
      razorpay_ref: details.razorpay_ref || null,
      razorpay_payment_id: details.razorpay_payment_id || null,
      declaration: details.declaration !== undefined ? details.declaration : true,
      date: new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase
        .from('donations')
        .insert([record])
        .select();

      // Retry without user_id if foreign key constraint fails (error code 23503)
      if (error && error.code === '23503') {
        console.warn('Foreign key violation on user_id in donations. Retrying as anonymous.');
        const fallbackRecord = { ...record, user_id: null };
        const retryResult = await supabase
          .from('donations')
          .insert([fallbackRecord])
          .select();
        return retryResult;
      }

      return { data, error };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    const donations = this._get('worlify_donations');
    const newDonation = {
      id: 'don_' + Math.random().toString(36).substr(2, 9),
      ...record
    };

    donations.unshift(newDonation);
    this._set('worlify_donations', donations);
    return { data: [newDonation], error: null };
  }

  // Get volunteer registrations
  async getVolunteers() {
    const user = this.getCurrentUser();
    if (!user) return { data: [], error: { message: 'Must be logged in to view volunteer status' } };

    if (supabase) {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .eq('user_id', user.id);
      return { data, error };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 400));
    const volunteers = this._get('worlify_volunteers');
    const userVolunteers = volunteers.filter(v => v.user_id === user.id);
    return { data: userVolunteers, error: null };
  }

  // Register as a volunteer
  async registerVolunteer(name, email, cause, skills, message) {
    const user = this.getCurrentUser();
    let userId = user ? user.id : null;

    // Validate UUID format to prevent foreign key violation with mock IDs
    if (userId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
      userId = null;
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('volunteers')
        .insert([
          {
            user_id: userId,
            name,
            email,
            cause,
            skills,
            message,
            status: 'Pending',
            date: new Date().toISOString()
          }
        ])
        .select();

      // Retry without user_id if foreign key constraint fails (error code 23503)
      if (error && error.code === '23503') {
        console.warn('Foreign key violation on user_id in volunteers. Retrying as anonymous.');
        const retryResult = await supabase
          .from('volunteers')
          .insert([
            {
              user_id: null,
              name,
              email,
              cause,
              skills,
              message,
              status: 'Pending',
              date: new Date().toISOString()
            }
          ])
          .select();
        return retryResult;
      }

      return { data, error };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    const volunteers = this._get('worlify_volunteers');
    const newVolunteer = {
      id: 'vol_' + Math.random().toString(36).substr(2, 9),
      user_id: userId,
      name,
      email,
      cause,
      skills,
      message,
      status: 'Pending',
      date: new Date().toISOString()
    };

    volunteers.unshift(newVolunteer);
    this._set('worlify_volunteers', volunteers);
    return { data: [newVolunteer], error: null };
  }

  // Register a contact query
  async registerContactMessage(name, email, subject, message) {
    const user = this.getCurrentUser();
    let userId = user ? user.id : null;

    // Validate UUID format to prevent foreign key violation with mock IDs
    if (userId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
      userId = null;
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            user_id: userId,
            name,
            email,
            subject,
            message,
            date: new Date().toISOString()
          }
        ])
        .select();

      // Retry without user_id if foreign key constraint fails (error code 23503)
      if (error && error.code === '23503') {
        console.warn('Foreign key violation on user_id in contact_messages. Retrying as anonymous.');
        const retryResult = await supabase
          .from('contact_messages')
          .insert([
            {
              user_id: null,
              name,
              email,
              subject,
              message,
              date: new Date().toISOString()
            }
          ])
          .select();
        return retryResult;
      }

      return { data, error };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!localStorage.getItem('worlify_contact_messages')) {
      localStorage.setItem('worlify_contact_messages', JSON.stringify([]));
    }
    const messages = JSON.parse(localStorage.getItem('worlify_contact_messages') || '[]');
    const newMessage = {
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      user_id: userId,
      name,
      email,
      subject,
      message,
      date: new Date().toISOString()
    };
    messages.unshift(newMessage);
    localStorage.setItem('worlify_contact_messages', JSON.stringify(messages));
    return { data: [newMessage], error: null };
  }

  // --- ROLE BASED MANAGEMENT METHODS ---

  // Get all registered users (Coordinator & Admin)
  async getAllUsers() {
    const user = this.getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
      return { data: [], error: { message: 'Unauthorized access to user records' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    const users = this._get('worlify_users');
    return { data: users, error: null };
  }

  // Update user role (Admin Only)
  async updateUserRole(targetUserId, newRole) {
    const user = this.getCurrentUser();
    if (!user || user.role !== 'admin') {
      return { data: null, error: { message: 'Only Admins can modify user roles' } };
    }

    if (!['user', 'coordinator', 'admin'].includes(newRole)) {
      return { data: null, error: { message: 'Invalid role specified' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', targetUserId)
        .select();
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    const users = this._get('worlify_users');
    const targetUser = users.find(u => u.id === targetUserId);
    if (targetUser) {
      targetUser.role = newRole;
      this._set('worlify_users', users);

      if (this.currentSession && this.currentSession.user && this.currentSession.user.id === targetUserId) {
        this.currentSession.user.role = newRole;
        this._set('worlify_session', this.currentSession);
      }
      return { data: targetUser, error: null };
    }
    return { data: null, error: { message: 'User not found' } };
  }

  // Update full user details (email, password, phone, name, role) for Admin & Coordinator
  async updateUserFullDetails(targetUserId, updatedData) {
    const user = this.getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
      return { data: null, error: { message: 'Unauthorized action' } };
    }

    const targetEmail = normalizeEmail(updatedData.email);

    const payload = {
      first_name: updatedData.first_name,
      last_name: updatedData.last_name,
      email: targetEmail
    };

    if (updatedData.phone !== undefined) {
      payload.phone = updatedData.phone || '';
    }

    if (updatedData.password && updatedData.password.trim()) {
      payload.password = updatedData.password.trim();
    }

    if (user.role === 'admin' && updatedData.role) {
      payload.role = updatedData.role;
    }

    // ─── SUPABASE PATH ────────────────────────────────────────────────────────
    if (supabase) {
      // Helper: attempt an update, retry without optional columns on schema errors
      const trySupabaseUpdate = async (matchField, matchValue, fieldPayload) => {
        let { data, error } = await supabase
          .from('users')
          .update(fieldPayload)
          .eq(matchField, matchValue)
          .select();

        if (error && error.message && error.message.toLowerCase().includes('column')) {
          console.warn('Column mismatch – retrying without phone/password:', error.message);
          const safePayload = { ...fieldPayload };
          delete safePayload.phone;
          delete safePayload.password;
          const retry = await supabase
            .from('users')
            .update(safePayload)
            .eq(matchField, matchValue)
            .select();
          data = retry.data;
          error = retry.error;
        }
        return { data, error };
      };

      // 1. Try matching by UUID id
      let { data, error } = await trySupabaseUpdate('id', targetUserId, payload);

      // 2. If 0 rows matched by id (and no hard error), fall back to matching by email
      if (!error && (!data || data.length === 0) && targetEmail) {
        console.warn('No row matched by id, retrying by email:', targetEmail);
        const emailResult = await trySupabaseUpdate('email', targetEmail, payload);
        data = emailResult.data;
        error = emailResult.error;
      }

      if (error) {
        console.error('Supabase updateUserFullDetails error:', error);
        return { data: null, error };
      }

      if (!data || data.length === 0) {
        // Supabase returned no error but updated 0 rows.
        // Most common cause: Row Level Security (RLS) policy is blocking the update.
        // Fix: Go to Supabase Dashboard → Authentication → Policies → users table
        // and add an UPDATE policy that allows admin/service_role to update any row.
        const rlsMsg =
          'Update blocked: 0 rows were matched in the database. ' +
          'This is most likely caused by a Supabase Row Level Security (RLS) policy that ' +
          'prevents admins from updating other users records. ' +
          'Please add an RLS UPDATE policy on the "users" table that allows admin updates.';
        console.error(rlsMsg);
        return { data: null, error: { message: rlsMsg } };
      }

      // SUCCESS — sync localStorage cache (best effort, does NOT determine success)
      try {
        const cachedUsers = this._get('worlify_users');
        const idx = cachedUsers.findIndex(u => u.id === targetUserId || (u.email && normalizeEmail(u.email) === targetEmail));
        if (idx !== -1) {
          cachedUsers[idx] = { ...cachedUsers[idx], ...payload };
          this._set('worlify_users', cachedUsers);
        }
      } catch (_) { /* cache sync is non-critical */ }

      // Update in-memory session only if admin is editing their OWN account
      if (this.currentSession && this.currentSession.user && this.currentSession.user.id === targetUserId) {
        this.currentSession.user = { ...this.currentSession.user, ...payload };
        this._set('worlify_session', this.currentSession);
      }

      return { data: data[0], error: null };
    }

    // ─── MOCK / LOCAL-STORAGE PATH (no Supabase credentials configured) ───────
    await new Promise(resolve => setTimeout(resolve, 400));

    const users = this._get('worlify_users');
    const userIndex = users.findIndex(u => u.id === targetUserId || (u.email && normalizeEmail(u.email) === targetEmail));

    if (userIndex === -1) {
      return { data: null, error: { message: 'User not found in local database.' } };
    }

    users[userIndex] = { ...users[userIndex], ...payload };
    this._set('worlify_users', users);

    // Update session only if editing own account
    if (this.currentSession && this.currentSession.user && this.currentSession.user.id === targetUserId) {
      this.currentSession.user = { ...this.currentSession.user, ...payload };
      this._set('worlify_session', this.currentSession);
    }

    return { data: users[userIndex], error: null };
  }

  // Delete user account (Admin Only)
  async deleteUser(targetUserId) {
    const user = this.getCurrentUser();
    if (!user || user.role !== 'admin') {
      return { data: null, error: { message: 'Only Admins can delete users' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', targetUserId);
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    let users = this._get('worlify_users');
    users = users.filter(u => u.id !== targetUserId);
    this._set('worlify_users', users);
    return { data: true, error: null };
  }

  // Get all volunteer submissions (Coordinator & Admin)
  async getAllVolunteers() {
    const user = this.getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
      return { data: [], error: { message: 'Unauthorized access to volunteers data' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('date', { ascending: false });
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    const volunteers = this._get('worlify_volunteers');
    volunteers.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { data: volunteers, error: null };
  }

  // Update volunteer application status (Coordinator & Admin)
  async updateVolunteerStatus(volId, newStatus) {
    const user = this.getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
      return { data: null, error: { message: 'Unauthorized action' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('volunteers')
        .update({ status: newStatus })
        .eq('id', volId)
        .select();
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    const volunteers = this._get('worlify_volunteers');
    const vol = volunteers.find(v => v.id === volId);
    if (vol) {
      vol.status = newStatus;
      this._set('worlify_volunteers', volunteers);
      return { data: vol, error: null };
    }
    return { data: null, error: { message: 'Volunteer record not found' } };
  }

  // Delete volunteer application (Admin Only)
  async deleteVolunteer(volId) {
    const user = this.getCurrentUser();
    if (!user || user.role !== 'admin') {
      return { data: null, error: { message: 'Only Admins can delete volunteer records' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('volunteers')
        .delete()
        .eq('id', volId);
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    let volunteers = this._get('worlify_volunteers');
    volunteers = volunteers.filter(v => v.id !== volId);
    this._set('worlify_volunteers', volunteers);
    return { data: true, error: null };
  }

  // Get all contact form messages (Coordinator & Admin)
  async getAllContactMessages() {
    const user = this.getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
      return { data: [], error: { message: 'Unauthorized access to messages' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('date', { ascending: false });
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    const messages = JSON.parse(localStorage.getItem('worlify_contact_messages') || '[]');
    messages.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { data: messages, error: null };
  }

  // Delete contact message (Admin Only)
  async deleteContactMessage(msgId) {
    const user = this.getCurrentUser();
    if (!user || user.role !== 'admin') {
      return { data: null, error: { message: 'Only Admins can delete messages' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', msgId);
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    let messages = JSON.parse(localStorage.getItem('worlify_contact_messages') || '[]');
    messages = messages.filter(m => m.id !== msgId);
    localStorage.setItem('worlify_contact_messages', JSON.stringify(messages));
    return { data: true, error: null };
  }

  // Delete donation record (Admin Only)
  async deleteDonation(donId) {
    const user = this.getCurrentUser();
    if (!user || user.role !== 'admin') {
      return { data: null, error: { message: 'Only Admins can delete donation records' } };
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('donations')
        .delete()
        .eq('id', donId);
      return { data, error };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    let donations = this._get('worlify_donations');
    donations = donations.filter(d => d.id !== donId);
    this._set('worlify_donations', donations);
    return { data: true, error: null };
  }

  // Update user profile details
  async updateUserProfile(userId, profileData) {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .update({
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            phone: profileData.phone || '',
            address: profileData.address || '',
            city: profileData.city || '',
            state: profileData.state || '',
            pincode: profileData.pincode || '',
            pan_card: profileData.pan_card || '',
            occupation: profileData.occupation || ''
          })
          .eq('id', userId)
          .select();

        if (!error && data && data.length > 0) {
          const updatedUser = { ...this.getCurrentUser(), ...data[0] };
          this.currentSession = { user: updatedUser };
          this._set('worlify_session', this.currentSession);
          return { data: updatedUser, error: null };
        }
      } catch (err) {
        console.warn('Supabase updateUserProfile error:', err);
      }
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 400));
    const users = this._get('worlify_users');
    const userIndex = users.findIndex(u => u.id === userId || u.email === profileData.email);
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone || '',
        address: profileData.address || '',
        city: profileData.city || '',
        state: profileData.state || '',
        pincode: profileData.pincode || '',
        pan_card: profileData.pan_card || '',
        occupation: profileData.occupation || ''
      };
      this._set('worlify_users', users);

      const currentUser = this.getCurrentUser() || {};
      const updatedUser = { ...currentUser, ...users[userIndex] };
      this.currentSession = { user: updatedUser };
      this._set('worlify_session', this.currentSession);
      return { data: updatedUser, error: null };
    }

    // Fallback if session exists but user isn't in mock table
    const currentUser = this.getCurrentUser() || {};
    const updatedUser = {
      ...currentUser,
      ...profileData
    };
    this.currentSession = { user: updatedUser };
    this._set('worlify_session', this.currentSession);
    return { data: updatedUser, error: null };
  }
}

// Export the singleton local database service
export const db = new LocalDBService();
export const isLocalMode = !hasValidCredentials;
