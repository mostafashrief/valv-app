import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { OnboardingShell } from '../../components/OnboardingShell';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../lib/onboarding-context';
import { supabase } from '../../lib/supabase';
import { colors, radii, spacing, typography } from '../../constants/theme';
import type { TransmissionType, TimingSystemType } from '../../types/car';

async function inferEngineConfig(brand: string, model: string, year: number) {
  const { data } = await supabase
    .from('maintenance_schedules')
    .select('name')
    .eq('brand', brand)
    .eq('model', model)
    .eq('data_source', 'official_dealer');

  if (!data || data.length === 0) return null;

  const inYear = data; // year filtering done by done.tsx; here we just need item names for inference
  if (inYear.length === 0) return null;

  const names = inYear.map((r: any) => r.name.toLowerCase());

  let transmission: TransmissionType = 'automatic';
  if (names.some((n: string) => n.includes('dsg') || n.includes('dct'))) transmission = 'dsg';
  else if (names.some((n: string) => n.includes('cvt'))) transmission = 'cvt';
  else if (names.some((n: string) => n.includes('gearbox oil'))) transmission = 'manual';

  const timingSystem: TimingSystemType = names.some((n: string) => n.includes('timing belt')) ? 'belt' : 'chain';

  return { transmission, timingSystem };
}

export default function MileageStep() {
  const { t } = useTranslation();
  const { draft, setDraft } = useOnboarding();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const mileage = parseInt(value.replace(/,/g, ''), 10);
  const isValid = !Number.isNaN(mileage) && mileage >= 0;

  const handleNext = async () => {
    if (!isValid) return;
    setLoading(true);
    setDraft({ mileageKm: mileage });

    if (draft.brand && draft.model && draft.year) {
      const inferred = await inferEngineConfig(draft.brand, draft.model, draft.year);
      if (inferred) {
        setDraft({ mileageKm: mileage, ...inferred });
        setLoading(false);
        router.push('/onboarding/confirm');
        return;
      }
    }

    setLoading(false);
    router.push('/onboarding/engine');
  };

  return (
    <OnboardingShell
      step={4}
      totalSteps={4}
      title={t('onboarding.mileageTitle')}
      subtitle={t('onboarding.mileageSubtitle')}
      footer={<Button label={t('common.next')} onPress={handleNext} disabled={!isValid} loading={loading} />}
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
