import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, radii, spacing, typography } from '../../constants/theme';
import type { TransmissionType, TimingSystemType } from '../../types/car';

const TIMING_LABELS: Record<TimingSystemType, string> = {
  chain: 'Timing chain — maintenance-free',
  belt: 'Timing belt — must be replaced on schedule',
  unknown: 'Unknown',
};

function getTransmissionLabel(brand: string | undefined, transmission: TransmissionType): string {
  switch (transmission) {
    case 'dsg':
      if (brand === 'Volkswagen') return '7-Speed DSG';
      if (brand === 'Audi') return '7-Speed S-Tronic';
      return '7-Speed DSG';
    case 'automatic':
      if (brand === 'Volkswagen' || brand === 'Audi') return '8-Speed Automatic (ZF)';
      return 'Automatic';
    case 'cvt':
      return 'CVT (Continuously Variable)';
    case 'manual':
      return 'Manual Gearbox';
  }
}

function ConfirmRow({
  question,
  detail,
  confirmed,
  onToggle,
}: {
  question: string;
  detail: string;
  confirmed: boolean;
  onToggle: (val: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <View style={styles.toggleWrap}>
        <Pressable
          style={[styles.toggle, confirmed && styles.toggleActive]}
          onPress={() => onToggle(true)}
        >
          <Text style={[styles.toggleText, confirmed && styles.toggleTextActive]}>Yes</Text>
        </Pressable>
        <Pressable
          style={[styles.toggle, !confirmed && styles.toggleNo]}
          onPress={() => onToggle(false)}
        >
          <Text style={[styles.toggleText, !confirmed && styles.toggleTextNo]}>No</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ConfirmStep() {
  const { draft, setDraft } = useOnboarding();

  // Default to false (needs confirmation) when data was inferred — avoids silently
  // accepting wrong defaults when inference produced a fallback value.
  const [transmissionOk, setTransmissionOk] = useState(draft.transmission != null);
  const [timingOk, setTimingOk] = useState(draft.timingSystem != null);

  const transmission = draft.transmission ?? 'automatic';
  const timingSystem = draft.timingSystem ?? 'chain';

  const carLabel = [draft.year, draft.brand, draft.model].filter(Boolean).join(' ');

  const handleNext = () => {
    if (!transmissionOk || !timingOk) {
      setDraft({ transmission: undefined, timingSystem: undefined });
      router.push('/onboarding/engine');
      return;
    }
    router.push('/onboarding/done');
  };

  return (
    <OnboardingShell
      step={3}
      totalSteps={5}
      title={`We know your ${carLabel}.`}
      subtitle="Just confirm these match — we pulled them from the official dealer schedule."
      footer={<Button label="Looks right" onPress={handleNext} />}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ConfirmRow
          question="Transmission"
          detail={getTransmissionLabel(draft.brand, transmission as TransmissionType)}
          confirmed={transmissionOk}
          onToggle={(val) => setTransmissionOk(val)}
        />
        <ConfirmRow
          question="Timing system"
          detail={TIMING_LABELS[timingSystem as TimingSystemType] ?? timingSystem}
          confirmed={timingOk}
          onToggle={(val) => setTimingOk(val)}
        />

        {(!transmissionOk || !timingOk) && (
          <Text style={styles.hint}>
            Got it — tap "Looks right" and you can pick the correct one yourself.
          </Text>
        )}
      </ScrollView>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  rowLeft: { flex: 1 },
  question: { ...typography.body, color: colors.textMuted, fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 },
  detail: { ...typography.body, color: colors.text, fontSize: 15, fontWeight: '600' },
  toggleWrap: { flexDirection: 'row', gap: 6 },
  toggle: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radii.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  toggleActive: { borderColor: colors.orange, backgroundColor: colors.orange + '18' },
  toggleNo: { borderColor: colors.overdue, backgroundColor: colors.overdue + '18' },
  toggleText: { ...typography.body, color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  toggleTextActive: { color: colors.orange },
  toggleTextNo: { color: colors.overdue },
  hint: {
    ...typography.body,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.md,
    lineHeight: 18,
  },
});
