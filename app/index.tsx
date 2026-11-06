import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { colors, spacing, typography } from '../constants/theme';

export default function Welcome() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.wordmark}>carvalv</Text>
        <Text style={styles.tagline}>{t('onboarding.welcomeHeadline')}</Text>
        <Text style={styles.sub}>{t('onboarding.welcomeSubheadline')}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.trustRow}>
          <Text style={styles.trustDot}>●</Text>
          <Text style={styles.trustText}>{t('onboarding.welcomeTrust')}</Text>
        </View>
        <Button label={t('onboarding.welcomeCta')} onPress={() => router.push('/auth')} style={styles.btn} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.engineBlack, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg },
  wordmark: {
    fontFamily: 'ChakraPetch_700Bold',
    fontSize: 36,
    color: colors.orange,
    letterSpacing: -1,
    marginBottom: spacing.lg,
  },
  tagline: {
    fontFamily: 'ChakraPetch_700Bold',
    fontSize: 32,
    color: colors.iconWhite,
    lineHeight: 40,
    marginBottom: spacing.md,
  },
  sub: {
    ...typography.body,
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  trustDot: { color: colors.healthy, fontSize: 8 },
  trustText: { ...typography.label, color: colors.textMuted, fontSize: 12 },
  btn: {},
});
