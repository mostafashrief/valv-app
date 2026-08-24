import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { OnboardingShell } from '../../components/OnboardingShell';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, radii, spacing, typography } from '../../constants/theme';
import type { TransmissionType, TimingSystemType } from '../../types/car';

const TRANSMISSIONS: { value: TransmissionType; label: string; sub: string }[] = [
  { value: 'automatic', label: 'Automatic (AT)', sub: 'Traditional auto gearbox' },
  { value: 'cvt',       label: 'CVT',           sub: 'Nissan, Suzuki, some Toyota' },
  { value: 'dsg',       label: 'DSG / DCT',     sub: 'VW, Kia, Hyundai twin-clutch' },
  { value: 'manual',    label: 'Manual',         sub: 'You shift the gears yourself' },
];

const TIMING: { value: TimingSystemType; label: string; sub: string }[] = [
  { value: 'chain', label: '⛓ Timing Chain', sub: 'No scheduled replacement — lasts the engine\'s life' },
  { value: 'belt',  label: '🔗 Timing Belt',  sub: 'Must be replaced on schedule — critical' },
  { value: 'unknown', label: 'I don\'t know',  sub: 'We\'ll leave it out until you confirm' },
];

export default function EngineStep() {
  const { t } = useTranslation();
  const { setDraft } = useOnboarding();
  const [transmission, setTransmission] = useState<TransmissionType | null>(null);
  const [timingSystem, setTimingSystem] = useState<TimingSystemType | null>(null);

  const canContinue = transmission !== null && timingSystem !== null;

  const handleNext = () => {
    if (!canContinue) return;
    setDraft({ transmission, timingSystem });
    router.push('/onboarding/done');
  };

  return (
    <OnboardingShell
      step={5}
      totalSteps={6}
      title="Two quick questions."
      subtitle="This makes your maintenance plan accurate — not a guess."
      footer={<Button label={t('common.next')} onPress={handleNext} disabled={!canContinue} />}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>TRANSMISSION TYPE</Text>
        {TRANSMISSIONS.map((opt) => (
          <Pressable
            key={opt.value}
            style={[styles.option, transmission === opt.value && styles.optionActive]}
            onPress={() => setTransmission(opt.value)}
          >
            <View style={styles.optionInner}>
              <Text style={[styles.optionLabel, transmission === opt.value && styles.optionLabelActive]}>
                {opt.label}
              </Text>
              <Text style={styles.optionSub}>{opt.sub}</Text>
            </View>
            {transmission === opt.value && <Text style={styles.check}>✓</Text>}
          </Pressable>
        ))}

        <Text style={[styles.sectionLabel, { marginTop: spacing.lg }]}>TIMING SYSTEM</Text>
        {TIMING.map((opt) => (
          <Pressable
            key={opt.value}
            style={[styles.option, timingSystem === opt.value && styles.optionActive]}
            onPress={() => setTimingSystem(opt.value)}
          >
            <View style={styles.optionInner}>
              <Text style={[styles.optionLabel, timingSystem === opt.value && styles.optionLabelActive]}>
                {opt.label}
              </Text>
              <Text style={styles.optionSub}>{opt.sub}</Text>
            </View>
            {timingSystem === opt.value && <Text style={styles.check}>✓</Text>}
          </Pressable>
        ))}

        <Text style={styles.hint}>
          Not sure about timing? Check your owner's manual or ask your mechanic. Getting this wrong means wrong reminders.
        </Text>
      </ScrollView>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    ...typography.label,
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  option: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionActive: {
    borderColor: colors.orange,
    backgroundColor: colors.orange + '12',
  },
  optionInner: { flex: 1 },
  optionLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    fontSize: 15,
  },
  optionLabelActive: { color: colors.orange },
  optionSub: {
    ...typography.body,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  check: { fontSize: 16, color: colors.orange, marginLeft: spacing.sm },
  hint: {
    ...typography.body,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    lineHeight: 18,
  },
});
