import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './supabase';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

interface AuthContextValue {
  session: Session | null;
  initializing: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null; session?: any }>;
  signInWithApple: () => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signInWithPhone: (e164Phone: string) => Promise<{ error: string | null }>;
  verifyOtp: (e164Phone: string, code: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  const [_googleRequest, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
  });

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

  // Resolve Google token when auth session completes
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      if (id_token) {
        supabase.auth.signInWithIdToken({ provider: 'google', token: id_token });
      }
    }
  }, [googleResponse]);

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
      signInWithApple: async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          if (!credential.identityToken) return { error: 'No identity token returned from Apple' };
          const { error } = await supabase.auth.signInWithIdToken({
            provider: 'apple',
            token: credential.identityToken,
          });
          return { error: error?.message ?? null };
        } catch (e: any) {
          if (e.code === 'ERR_REQUEST_CANCELED') return { error: null };
          return { error: String(e.message ?? e) };
        }
      },
      signInWithGoogle: async () => {
        try {
          const result = await promptGoogleAsync();
          if (result.type === 'cancel' || result.type === 'dismiss') return { error: null };
          if (result.type === 'error') return { error: result.error?.message ?? 'Google sign-in failed' };
          // Success is handled by the googleResponse useEffect above
          return { error: null };
        } catch (e: any) {
          return { error: String(e.message ?? e) };
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
    [session, initializing, promptGoogleAsync],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
