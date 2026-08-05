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
      </View>
      <View style={styles.footer}>
        <Text style={styles.sub}>{t('onboarding.welcomeSubheadline')}</Text>
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
    fontSize: 42,
    color: colors.orange,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: 'ChakraPetch_700Bold',
    fontSize: 30,
    color: colors.iconWhite,
    marginTop: spacing.md,
    lineHeight: 38,
  },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  sub: { ...typography.body, color: colors.textMuted },
  btn: { marginTop: spacing.xs },
});
