import React from 'react';
import { FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { useOnboarding } from '../../lib/onboarding-context';
import { CAR_BRANDS_SEED } from '../../data/cars-seed';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function ModelStep() {
  const { draft, setDraft } = useOnboarding();

  const brandSeed = CAR_BRANDS_SEED.find((b) => b.brand === draft.brand);
  const models = brandSeed?.models ?? [];

  const handleSelect = (model: string) => {
    setDraft({ model, year: undefined });
    router.push('/onboarding/year');
  };

  return (
    <OnboardingShell step={2} totalSteps={4} title="Which model?">
      <FlatList
        data={models}
        keyExtractor={(item) => item}
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
