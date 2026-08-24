import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

// expo-web-browser requires a native build — not available in Expo Go
let WebBrowser: typeof import('expo-web-browser') | null = null;
let makeRedirectUri: typeof import('expo-auth-session').makeRedirectUri | null = null;
try {
  WebBrowser = require('expo-web-browser');
  makeRedirectUri = require('expo-auth-session').makeRedirectUri;
  WebBrowser?.maybeCompleteAuthSession();
} catch {
  // running in Expo Go — Google sign-in unavailable
}

interface AuthContextValue {
  session: Session | null;
  initializing: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null; session?: any }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signInWithPhone: (e164Phone: string) => Promise<{ error: string | null }>;
  verifyOtp: (e164Phone: string, code: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitializing(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      initializing,
      signUp: async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        return { error: error?.message ?? null };
      },
      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null, session: data.session };
      },
      signInWithGoogle: async () => {
        try {
          if (!WebBrowser || !makeRedirectUri) return { error: 'Google sign-in requires a native build' };
          const redirectUrl = makeRedirectUri({ scheme: 'carvalv', path: 'auth/callback' });
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: redirectUrl,
              skipBrowserRedirect: true,
            },
          });
          if (error) return { error: error.message };
          if (!data.url) return { error: 'No auth URL returned' };

          const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
          if (result.type !== 'success') return { error: null }; // user cancelled

          const url = result.url;
          const params = new URL(url);
          const accessToken = params.searchParams.get('access_token');
          const refreshToken = params.searchParams.get('refresh_token');

          if (accessToken && refreshToken) {
            await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          } else {
            // Try fragment params (Supabase sometimes uses hash)
            const hash = url.split('#')[1] ?? '';
            const hashParams = new URLSearchParams(hash);
            const at = hashParams.get('access_token');
            const rt = hashParams.get('refresh_token');
            if (at && rt) await supabase.auth.setSession({ access_token: at, refresh_token: rt });
          }
          return { error: null };
        } catch (e) {
          return { error: String(e) };
        }
      },
      signInWithPhone: async (e164Phone) => {
        const { error } = await supabase.auth.signInWithOtp({ phone: e164Phone });
        return { error: error?.message ?? null };
      },
      verifyOtp: async (e164Phone, code) => {
        const { error } = await supabase.auth.verifyOtp({
          phone: e164Phone,
          token: code,
          type: 'sms',
        });
        return { error: error?.message ?? null };
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
    }),
    [session, initializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
