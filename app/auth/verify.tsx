import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

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
    // AuthGate in _layout.tsx handles routing based on whether user has a car
  };

  const handleResend = async () => {
    if (!phone) return;
    setResending(true);
    await signInWithPhone(phone);
    setResending(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.kav}>
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
            returnKeyType="go"
            onSubmitEditing={handleVerify}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable onPress={handleResend} disabled={resending} style={styles.resendRow}>
            <Text style={styles.resendText}>
              {resending ? t('common.loading') : t('auth.resend')}
            </Text>
          </Pressable>
        </View>
        <View style={styles.footer}>
          <Button label={t('auth.verify')} onPress={handleVerify} loading={loading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  kav: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  title: { ...typography.title, color: colors.textLight },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  input: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
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
