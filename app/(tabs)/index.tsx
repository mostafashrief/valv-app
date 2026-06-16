import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from '../../lib/onboarding-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function Home() {
  const { draft } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Your car</Text>
      <Text style={styles.carName}>
        {draft.brand ?? '—'} {draft.model ?? ''}
      </Text>
      <Text style={styles.mileage}>
        {(draft.mileageKm ?? 0).toLocaleString()} km
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status</Text>
        <Text style={styles.statusValue}>All clear.</Text>
        <Text style={styles.statusSub}>Nothing overdue. Maintenance plan is active.</Text>
      </View>

      <Text style={styles.buildNote}>
        Maintenance schedule cards and mileage log will replace this next.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: spacing.lg },
  label: { ...typography.label, color: colors.orange, marginTop: spacing.xl },
  carName: { ...typography.title, color: colors.text, marginTop: spacing.xs },
  mileage: { ...typography.monoLarge, color: colors.text, marginTop: spacing.xs },
  statusCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  statusLabel: { ...typography.label, color: colors.healthy },
  statusValue: { ...typography.title, color: colors.text, marginTop: spacing.sm },
  statusSub: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs },
  buildNote: { ...typography.body, color: colors.textMuted, marginTop: spacing.xl, fontStyle: 'italic' },
});
