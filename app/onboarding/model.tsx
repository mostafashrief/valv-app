import React from 'react';
import { FlatList, Pressable, Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { OnboardingShell } from '../../components/OnboardingShell';
import { useOnboarding } from '../../lib/onboarding-context';
import { CAR_BRANDS_SEED } from '../../data/cars-seed';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function ModelStep() {
  const { t } = useTranslation();
  const { draft, setDraft } = useOnboarding();

  const brandSeed = CAR_BRANDS_SEED.find((b) => b.brand === draft.brand);
  const models = brandSeed?.models ?? [];

  const handleSelect = (model: string) => {
    setDraft({ model, year: undefined });
    router.push('/onboarding/year');
  };

  return (
    <OnboardingShell step={2} totalSteps={4} title={t('onboarding.modelTitle')}>
      <FlatList
        data={models}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => handleSelect(item)}>
            <Text style={styles.rowText}>{item}</Text>
          </Pressable>
        )}
        ListFooterComponent={
          <View style={styles.footerWrap}>
            <Pressable style={styles.suggestRow} onPress={() => router.push('/onboarding/suggest')}>
              <Text style={styles.suggestText}>My model isn't here</Text>
              <Text style={styles.suggestSub}>Suggest it — we'll add it</Text>
            </Pressable>
          </View>
        }
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
  footerWrap: { marginTop: spacing.sm },
  suggestRow: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  suggestText: { ...typography.body, color: colors.textMuted, fontSize: 15 },
  suggestSub: { ...typography.label, color: colors.orange, fontSize: 11, marginTop: 2 },
});
