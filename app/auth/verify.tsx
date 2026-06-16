import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function VerifyStep() {
  const { verifyOtp, signInWithPhone } = useAuth();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (!phone || code.length < 4) return;
    setError(null);
    setLoading(true);
    const { error: verifyError } = await verifyOtp(phone, code);
    setLoading(false);
    if (verifyError) { setError(verifyError); return; }
    router.replace('/onboarding/brand');
  };

  const handleResend = async () => {
    if (!phone) return;
    setResending(true);
    await signInWithPhone(phone);
    setResending(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Check your texts.</Text>
        <Text style={styles.subtitle}>Code sent to {phone}.</Text>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="6-digit code"
          placeholderTextColor={colors.textMutedDark}
          value={code}
          onChangeText={(v) => { setCode(v); setError(null); }}
          autoFocus
          maxLength={6}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable onPress={handleResend} disabled={resending} style={styles.resendRow}>
          <Text style={styles.resendText}>
            {resending ? 'Sending...' : 'Resend code.'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Button label="Verify" onPress={handleVerify} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.espresso, justifyContent: 'space-between' },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  title: { ...typography.title, color: colors.textLight },
  subtitle: { ...typography.body, color: colors.textMutedDark, marginTop: spacing.sm },
  input: {
    marginTop: spacing.xl,
    backgroundColor: colors.surfaceDark,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderDark,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: 28,
    letterSpacing: 6,
    color: colors.textLight,
    fontFamily: 'Courier New',
  },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.sm },
  resendRow: { marginTop: spacing.lg },
  resendText: { ...typography.body, color: colors.orange },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
