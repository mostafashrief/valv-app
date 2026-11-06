import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Button } from '../../components/Button';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../lib/auth-context';

export default function AuthChoice() {
  const { t } = useTranslation();
  const { signInWithApple, signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      AppleAuthentication.isAvailableAsync()
        .then(setAppleAvailable)
        .catch(() => setAppleAvailable(false));
    }
  }, []);

  const handleApple = async () => {
    setError(null);
    setLoading(true);
    const { error } = await signInWithApple();
    setLoading(false);
    if (error) setError(error);
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    const { error } = await signInWithGoogle();
    setLoading(false);
    if (error) setError(error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.wordmark}>carvalv</Text>
        <Text style={styles.title}>{t('auth.choiceTitle')}</Text>
        <Text style={styles.sub}>{t('auth.choiceSub')}</Text>
      </View>

      <View style={styles.footer}>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Apple Sign In — native button when available, styled fallback otherwise */}
        {Platform.OS === 'ios' && appleAvailable === true && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={radii.md}
            style={styles.appleButton}
            onPress={handleApple}
          />
        )}
        {Platform.OS === 'ios' && appleAvailable === false && (
          <TouchableOpacity style={styles.appleButtonFallback} onPress={handleApple} disabled={loading}>
            <Text style={styles.appleIcon}>  </Text>
            <Text style={styles.appleButtonFallbackText}>{t('auth.withApple')}</Text>
          </TouchableOpacity>
        )}

        {/* Google Sign In */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogle} disabled={loading}>
          <View style={styles.googleLogo}>
            <Text style={styles.googleLogoBlue}>G</Text>
          </View>
          <Text style={styles.googleText}>{t('auth.withGoogle')}</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Email */}
        <Button
          label={t('auth.withEmail')}
          variant="secondary"
          onPress={() => router.push('/auth/email')}
        />

        <Text style={styles.privacy}>{t('auth.privacy')}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  wordmark: {
    fontFamily: 'ChakraPetch_700Bold',
    fontSize: 28,
    color: colors.orange,
    letterSpacing: -0.5,
    marginBottom: spacing.lg,
  },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.sm },
  sub: { ...typography.body, color: colors.textMuted, fontSize: 15 },

  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.sm },

  error: { ...typography.body, color: colors.overdue, marginBottom: spacing.sm, textAlign: 'center' },

  appleButton: { width: '100%', height: 52 },
  appleButtonFallback: {
    width: '100%',
    height: 52,
    backgroundColor: '#000',
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  appleIcon: { color: '#fff', fontSize: 18 },
  appleButtonFallbackText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  googleButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  googleLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogoBlue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4285F4',
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  googleText: {
    color: '#1A1410',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { ...typography.label, color: colors.textMuted, fontSize: 11 },

  privacy: {
    ...typography.label,
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
