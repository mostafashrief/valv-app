import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function MileageStep() {
  const { setDraft } = useOnboarding();
  const [value, setValue] = useState('');

  const mileage = parseInt(value, 10);
  const isValid = !Number.isNaN(mileage) && mileage >= 0;

  const handleNext = () => {
    if (!isValid) return;
    setDraft({ mileageKm: mileage });
    router.push('/onboarding/done');
  };

  return (
    <OnboardingShell
      step={4}
      totalSteps={4}
      title="What's on the odometer?"
      subtitle="Just the number."
      footer={<Button label="Next" onPress={handleNext} disabled={!isValid} />}
    >
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="e.g. 45000"
        placeholderTextColor={colors.textMuted}
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
