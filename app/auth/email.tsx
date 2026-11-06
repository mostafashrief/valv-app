import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet,
  KeyboardAvoidingView, Platform, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { colors, radii, spacing, typography } from '../../constants/theme';

async function userHasCar(userId: string): Promise<boolean> {
  const { data } = await supabase.from('cars').select('id').eq('user_id', userId).limit(1);
  return (data?.length ?? 0) > 0;
}

export default function EmailAuth() {
  const { t } = useTranslation();
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isEmailValid) { setError(t('auth.errorInvalidEmail')); return; }
    if (password.length < 6) { setError(t('auth.errorShortPassword')); return; }
    setError(null);
    setLoading(true);
    if (mode === 'signup') {
      const { error: authError } = await signUp(email, password);
      setLoading(false);
      if (authError) { setError(authError); return; }
      router.replace('/quiz/name');
    } else {
      const { error: authError, session } = await signIn(email, password);
      setLoading(false);
      if (authError) { setError(authError); return; }
      const hasCar = session?.user ? await userHasCar(session.user.id) : false;
      router.replace(hasCar ? '/(tabs)' : '/onboarding/brand');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            {mode === 'signup' ? t('auth.signUpTitle') : t('auth.signInTitle')}
          </Text>
          <Text style={styles.sub}>
            {mode === 'signup' ? t('auth.signUpSub') : t('auth.signInSub')}
          </Text>

          <View style={styles.fieldGroup}>
            <TextInput
              style={styles.input}
              placeholder={t('auth.emailPlaceholder')}
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={(v) => { setEmail(v); setError(null); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
              returnKeyType="next"
            />

            <View style={styles.passwordRow}>
              <TextInput
                style={styles.passwordInput}
                placeholder={t('auth.passwordPlaceholder')}
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={(v) => { setPassword(v); setError(null); }}
                secureTextEntry={!showPassword}
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={8}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            onPress={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(null); }}
            style={styles.switchRow}
          >
            <Text style={styles.switchText}>
              {mode === 'signup' ? t('auth.switchToSignIn') : t('auth.switchToSignUp')}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Button
            label={mode === 'signup' ? t('auth.signUp') : t('auth.signIn')}
            onPress={handleSubmit}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  kav: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  sub: { ...typography.body, color: colors.textMuted, fontSize: 14, marginBottom: spacing.xl },

  fieldGroup: { gap: spacing.sm },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  eyeBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  eyeIcon: { fontSize: 18 },

  error: { ...typography.body, color: colors.overdue, marginTop: spacing.sm, fontSize: 14 },
  switchRow: { marginTop: spacing.lg },
  switchText: { ...typography.body, color: colors.orange, fontSize: 14 },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
