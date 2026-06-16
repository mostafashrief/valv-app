import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function Home() {
  const { t } = useTranslation();
  const { draft } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>
        {t('home.greeting', { name: draft.model ?? '' }).trim()}
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('home.allGood')}</Text>
        <Text style={styles.cardSubtitle}>
          {draft.brand} {draft.model} ({draft.year}) · {draft.mileageKm ?? 0} km
        </Text>
      </View>
      <Text style={styles.note}>
        Next: wire this screen up to the real maintenance schedule from Supabase.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  greeting: { ...typography.title, color: colors.text, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  cardTitle: { ...typography.button, color: colors.healthy },
  cardSubtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  note: { ...typography.body, color: colors.textMuted, marginTop: spacing.xl, fontStyle: 'italic' },
});
