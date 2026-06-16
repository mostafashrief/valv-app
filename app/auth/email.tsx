import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function EmailAuth() {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isEmailValid) { setError("That doesn't look like a valid email."); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
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
          {mode === 'signup' ? 'Create your account.' : 'Welcome back.'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="your@email.com"
          placeholderTextColor={colors.textMutedDark}
          value={email}
          onChangeText={(v) => { setEmail(v); setError(null); }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus
        />
        <TextInput
          style={[styles.input, { marginTop: spacing.sm }]}
          placeholder="Password (min. 6 characters)"
          placeholderTextColor={colors.textMutedDark}
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
            {mode === 'signup' ? 'Already have an account? Sign in.' : 'No account yet. Create one.'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Button
          label={mode === 'signup' ? 'Create account' : 'Sign in'}
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.espresso, justifyContent: 'space-between' },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  title: { ...typography.title, color: colors.textLight, marginBottom: spacing.xl },
  input: {
    backgroundColor: colors.surfaceDark,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderDark,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.textLight,
  },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.sm },
  switchRow: { marginTop: spacing.lg },
  switchText: { ...typography.body, color: colors.orange },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
