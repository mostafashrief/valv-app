import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function EmailAuth() {
  const { t } = useTranslation();
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isEmailValid) { setError(t('auth.errorInvalidEmail')); return; }
    if (password.length < 6) { setError(t('auth.errorShortPassword')); return; }

    setError(null);
    setLoading(true);
    const { error: authError } = mode === 'signup'
      ? await signUp(email, password)
      : await signIn(email, password);
    setLoading(false);

    if (authError) { setError(authError); return; }
    router.replace('/onboarding/brand');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {mode === 'signup' ? t('auth.signUpTitle') : t('auth.signInTitle')}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t('auth.emailPlaceholder')}
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={(v) => { setEmail(v); setError(null); }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus
        />
        <TextInput
          style={[styles.input, { marginTop: spacing.sm }]}
          placeholder={t('auth.passwordPlaceholder')}
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={(v) => { setPassword(v); setError(null); }}
          secureTextEntry
        />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xl },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.sm },
  switchRow: { marginTop: spacing.lg, alignSelf: 'center' },
  switchText: { ...typography.body, color: colors.primary, fontWeight: '600' },
  footer: { padding: spacing.lg },
});
