import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
    '⚠️ Supabase credentials not configured in environment or secrets.\n' +
    'The app will run in "Local Mode" using localStorage for mock authentication and database persistence.'
  );
}

/**
 * Worlify Local DB & Auth Fallback System
 * This module mimics Supabase Auth and Database functions when keys are missing.
 * It lets a beginner test signup, login, logging donations, and volunteer applications
 * directly in the browser preview.
 */
class LocalDBService {
  constructor() {
    // Initialize collections in localStorage if they don't exist
    if (!localStorage.getItem('worlify_users')) {
      localStorage.setItem('worlify_users', JSON.stringify([]));
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
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  // Helper to write localStorage
  _set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- AUTH METHODS ---
  
  async signUp(email, password, fullName = 'Supporter') {
    if (supabase) {
      // Real Supabase implementation - use custom users table
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network latency
      
      // Split full name into first and last name
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || 'User';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Check if user exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase())
        .single();
      
      if (existingUsers) {
        return { data: null, error: { message: 'A user with this email already exists.' } };
      }

      // Create new user in custom users table
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([
          {
            email: email.toLowerCase(),
            password, // Note: In production, hash this password!
            first_name: firstName,
            last_name: lastName,
            support: 0,
            badges: '[]'
          }
        ])
        .select();

      if (error) {
        return { data: null, error };
      }

      // Auto log in after signup
      const user = newUser[0];
      this.currentSession = { user };
      this._set('worlify_session', this.currentSession);
      return { data: this.currentSession, error: null };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 600));
    const users = this._get('worlify_users');
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { data: null, error: { message: 'A user with this email already exists.' } };
    }

    const nameParts = fullName.trim().split(' ');
    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email.toLowerCase(),
      password,
      first_name: nameParts[0] || 'User',
      last_name: nameParts.slice(1).join(' ') || '',
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
    if (supabase) {
      // Real Supabase implementation - query custom users table
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase());

      if (error || !users || users.length === 0) {
        return { data: null, error: { message: 'Invalid email or password.' } };
      }

      const user = users[0];
      // Simple password comparison (in production, use bcrypt or similar)
      if (user.password !== password) {
        return { data: null, error: { message: 'Invalid email or password.' } };
      }

      this.currentSession = { user };
      this._set('worlify_session', this.currentSession);
      return { data: this.currentSession, error: null };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 600));
    const users = this._get('worlify_users');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      return { data: null, error: { message: 'Invalid email or password.' } };
    }

    this.currentSession = { user };
    this._set('worlify_session', this.currentSession);
    return { data: this.currentSession, error: null };
  }

  async signOut() {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      return { error };
    }

    // Mock Implementation
    this.currentSession = null;
    localStorage.removeItem('worlify_session');
    return { error: null };
  }

  getCurrentUser() {
    if (supabase) {
      // For real Supabase, use the active session or fetch user
      return supabase.auth.getUser();
    }
    return this.currentSession ? this.currentSession.user : null;
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
  async addDonation(amount, cause, email = null) {
    const user = this.getCurrentUser();
    const donorEmail = email || (user ? user.email : 'anonymous@helper.org');
    const userId = user ? user.id : 'anonymous';

    if (supabase) {
      const { data, error } = await supabase
        .from('donations')
        .insert([
          {
            amount: Number(amount),
            cause,
            user_id: userId,
            user_email: donorEmail,
            date: new Date().toISOString()
          }
        ])
        .select();
      return { data, error };
    }

    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    const donations = this._get('worlify_donations');
    const newDonation = {
      id: 'don_' + Math.random().toString(36).substr(2, 9),
      user_id: userId,
      user_email: donorEmail,
      amount: Number(amount),
      cause,
      date: new Date().toISOString()
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
    const userId = user ? user.id : 'anonymous';

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
    const userId = user ? user.id : 'anonymous';

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
}

// Export the singleton local database service
export const db = new LocalDBService();
export const isLocalMode = !hasValidCredentials;
