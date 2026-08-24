import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { OnboardingShell } from '../../components/OnboardingShell';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function MileageStep() {
  const { t } = useTranslation();
  const { setDraft } = useOnboarding();
  const [value, setValue] = useState('');

  const mileage = parseInt(value.replace(/,/g, ''), 10);
  const isValid = !Number.isNaN(mileage) && mileage >= 0;

  const handleNext = () => {
    if (!isValid) return;
    setDraft({ mileageKm: mileage });
    router.push('/onboarding/engine');
  };

  return (
    <OnboardingShell
      step={4}
      totalSteps={6}
      title={t('onboarding.mileageTitle')}
      subtitle={t('onboarding.mileageSubtitle')}
      footer={<Button label={t('common.next')} onPress={handleNext} disabled={!isValid} />}
    >
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder={t('onboarding.mileagePlaceholder')}
        placeholderTextColor={colors.steel}
        value={value}
        onChangeText={setValue}
        autoFocus
      />
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    color: colors.text,
    ...typography.monoLarge,
  },
});
