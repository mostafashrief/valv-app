import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { colors, spacing, typography } from '../../constants/theme';

export default function VerifyStep() {
  const { t } = useTranslation();
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
        <Text style={styles.title}>{t('auth.verifyTitle')}</Text>
        <Text style={styles.subtitle}>{t('auth.verifySubtitle', { phone })}</Text>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder={t('auth.codePlaceholder')}
          placeholderTextColor={colors.textMuted}
          value={code}
          onChangeText={(v) => { setCode(v); setError(null); }}
          autoFocus
          maxLength={6}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable onPress={handleResend} disabled={resending} style={styles.resendRow}>
          <Text style={styles.resendText}>{t('auth.resend')}</Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Button label={t('auth.verify')} onPress={handleVerify} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.subtitle, color: colors.textMuted, marginTop: spacing.sm },
  input: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: 24,
    letterSpacing: 4,
    color: colors.text,
  },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.sm },
  resendRow: { marginTop: spacing.lg, alignSelf: 'center' },
  resendText: { ...typography.body, color: colors.primary, fontWeight: '600' },
  footer: { padding: spacing.lg },
});
