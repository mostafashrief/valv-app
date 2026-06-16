import React from 'react';
import { FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 25 }, (_, i) => CURRENT_YEAR + 1 - i);

export default function YearStep() {
  const { setDraft } = useOnboarding();

  const handleSelect = (year: number) => {
    setDraft({ year });
    router.push('/onboarding/mileage');
  };

  return (
    <OnboardingShell step={3} totalSteps={4} title="What year is it?">
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
