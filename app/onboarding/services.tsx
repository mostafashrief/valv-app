import React, { useState } from 'react';
import {
  View, Text, Pressable, StyleSheet, FlatList, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { getPendingItems, clearPendingItems } from '../../lib/pending-items';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function ServicesStep() {
  const items = getPendingItems();
  // true = user confirms it was done recently; false = hasn't been done (overdue)
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((i) => [i.name, true])),
  );
  const [saving, setSaving] = useState(false);

  const toggle = (name: string) =>
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }));

  const handleConfirm = async () => {
    if (items.length === 0) { router.replace('/quiz/ownership'); return; }
    setSaving(true);

    const toInsert = items.map((item) => {
      const done = checked[item.name] ?? true;
      return {
        ...item,
        // If user said NOT done, clear the assumed "done at current km" so it shows as overdue
        last_done_at_km: done ? item.last_done_at_km : null,
        last_done_at: done ? item.last_done_at : null,
      };
    });

    const { error } = await supabase.from('maintenance_items').insert(toInsert as any);
    setSaving(false);
    if (error) { Alert.alert('Error', error.message); return; }
    clearPendingItems();
    router.replace('/quiz/ownership');
  };

  const doneCount = Object.values(checked).filter(Boolean).length;
  const overdueCount = items.length - doneCount;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Almost there</Text>
        <Text style={styles.title}>Which services have been done recently?</Text>
        <Text style={styles.subtitle}>
          We assumed everything was done at your current mileage. Uncheck anything you know hasn't been done — we'll remind you right away.
        </Text>
        {overdueCount > 0 && (
          <View style={styles.overdueChip}>
            <Text style={styles.overdueChipText}>{overdueCount} will be marked overdue</Text>
          </View>
        )}
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.name}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isDone = checked[item.name] ?? true;
          return (
            <Pressable
              style={[styles.row, !isDone && styles.rowOverdue]}
              onPress={() => toggle(item.name)}
            >
              <View style={[styles.checkbox, isDone && styles.checkboxChecked]}>
                {isDone && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowName, !isDone && styles.rowNameOverdue]}>{item.name}</Text>
                <Text style={styles.rowSub}>
                  {isDone ? 'Done recently — next reminder at current + interval' : "Haven't done it — remind me now"}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />

      <View style={styles.footer}>
        <Pressable style={styles.selectAll} onPress={() => {
          const allDone = Object.values(checked).every(Boolean);
          setChecked(Object.fromEntries(items.map((i) => [i.name, !allDone])));
        }}>
          <Text style={styles.selectAllText}>
            {Object.values(checked).every(Boolean) ? 'Mark all as overdue' : 'Mark all as done'}
          </Text>
        </Pressable>
        <Pressable style={styles.confirmBtn} onPress={handleConfirm} disabled={saving}>
          {saving
            ? <ActivityIndicator color={colors.engineBlack} />
            : <Text style={styles.confirmText}>Confirm & continue →</Text>
          }
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  label: { ...typography.label, color: colors.orange, marginBottom: spacing.xs },
  title: { ...typography.title, color: colors.text, fontSize: 24, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  overdueChip: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: colors.overdue + '22',
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
  },
  overdueChipText: { ...typography.label, color: colors.overdue, fontSize: 12 },

  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.surface, borderRadius: radii.md,
    borderWidth: 1.5, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.sm,
  },
  rowOverdue: { borderColor: colors.overdue + '66' },
  checkbox: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.orange, borderColor: colors.orange },
  checkmark: { color: colors.engineBlack, fontSize: 13, fontWeight: '700' },
  rowText: { flex: 1 },
  rowName: { ...typography.body, color: colors.text, fontWeight: '600' },
  rowNameOverdue: { color: colors.overdue },
  rowSub: { ...typography.label, color: colors.textMuted, fontSize: 11, marginTop: 2 },

  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.sm },
  selectAll: { alignItems: 'center', paddingVertical: spacing.sm },
  selectAllText: { ...typography.label, color: colors.textMuted, fontSize: 13 },
  confirmBtn: {
    backgroundColor: colors.orange, borderRadius: radii.pill,
    paddingVertical: spacing.md, alignItems: 'center',
  },
  confirmText: { ...typography.button, color: colors.engineBlack },
});
