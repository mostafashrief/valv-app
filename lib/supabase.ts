import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Set these in a local .env file (see .env.example) — never commit real keys.
// EXPO_PUBLIC_* vars are inlined at build time and are safe to ship in the
// client bundle (the anon key is meant to be public; row-level security in
// Supabase is what actually protects the data).
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://fxziatkzwpzoyhuoumxk.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4emlhdGt6d3B6b3lodW91bXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MjQ0MDEsImV4cCI6MjA5NzIwMDQwMX0.lH-tNUJ1RbXEmFiUUhBuT9eVPDh0ZADTPbtUqn_awdE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
