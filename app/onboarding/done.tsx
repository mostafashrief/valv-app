import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, spacing, typography } from '../../constants/theme';

export default function DoneStep() {
  const { t } = useTranslation();
  const { draft } = useOnboarding();

  const handleFinish = () => {
    // TODO: persist `draft` (brand/model/year/mileageKm) to Supabase and
    // generate the maintenance schedule before landing on the home tab.
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>{t('onboarding.doneTitle')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.doneSubtitle')}</Text>
        <Text style={styles.summary}>
          {draft.brand} {draft.model} · {draft.year} · {draft.mileageKm} km
        </Text>
      </View>
      <View style={styles.footer}>
        <Button label={t('common.getStarted')} onPress={handleFinish} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xl },
  emoji: { fontSize: 64, marginBottom: spacing.lg },
  title: { ...typography.title, color: colors.text, textAlign: 'center' },
  subtitle: {
    ...typography.subtitle,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  summary: { ...typography.body, color: colors.text, marginTop: spacing.xl, fontWeight: '600' },
  footer: { padding: spacing.lg },
});
