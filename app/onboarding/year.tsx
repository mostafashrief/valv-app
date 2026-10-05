import React from 'react';
import { FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { OnboardingShell } from '../../components/OnboardingShell';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { MODEL_YEAR_RANGES } from '../../data/cars-seed';

const CURRENT_YEAR = new Date().getFullYear();

function getYearsForModel(brand?: string, model?: string): number[] {
  const range = MODEL_YEAR_RANGES.find(r => r.brand === brand && r.model === model);
  const from = range?.yearFrom ?? CURRENT_YEAR - 24;
  const to = range?.yearTo ?? CURRENT_YEAR;
  return Array.from({ length: to - from + 1 }, (_, i) => to - i);
}

export default function YearStep() {
  const { t } = useTranslation();
  const { draft, setDraft } = useOnboarding();
  const YEARS = getYearsForModel(draft.brand, draft.model);

  const handleSelect = (year: number) => {
    setDraft({ year });
    router.push('/onboarding/mileage');
  };

  return (
    <OnboardingShell step={3} totalSteps={4} title={t('onboarding.yearTitle')}>
      <FlatList
        data={YEARS}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => handleSelect(item)}>
            <Text style={styles.rowText}>{item}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  rowText: { ...typography.body, color: colors.text, fontSize: 16 },
});
