import React from 'react';
import { FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { OnboardingShell } from '../../components/OnboardingShell';
import { useOnboarding } from '../../lib/onboarding-context';
import { CAR_BRANDS_SEED } from '../../data/cars-seed';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function BrandStep() {
  const { t } = useTranslation();
  const { setDraft } = useOnboarding();

  const handleSelect = (brand: string) => {
    setDraft({ brand, model: undefined });
    router.push('/onboarding/model');
  };

  return (
    <OnboardingShell step={1} totalSteps={4} title={t('onboarding.brandStep')}>
      <FlatList
        data={CAR_BRANDS_SEED}
        keyExtractor={(item) => item.brand}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => handleSelect(item.brand)}>
            <Text style={styles.rowText}>{item.brand}</Text>
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
