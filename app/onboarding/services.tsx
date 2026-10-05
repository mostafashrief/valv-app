import React, { useEffect, useState } from 'react';
import {
  View, Text, Pressable, StyleSheet, FlatList, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { getPendingItems, getPendingCurrentKm, clearPendingItems } from '../../lib/pending-items';
import { colors, radii, spacing, typography } from '../../constants/theme';

const MILESTONE_STEP = 10000;

export default function ServicesStep() {
  const allItems = getPendingItems();
  const currentKm = getPendingCurrentKm();
  const lastMilestone = Math.floor(currentKm / MILESTONE_STEP) * MILESTONE_STEP;

  // Only ask about items the schedule placed at this milestone
  const milestoneItems = allItems.filter(
    (i) => i.interval_km != null && i.last_done_at_km === lastMilestone,
  );
  const otherItems = allItems.filter(
    (i) => !milestoneItems.includes(i),
  );

  // Default: all checked — assume milestone service was done, user unchecks what wasn't
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(milestoneItems.map((i) => [i.name, true])),
  );
  const [saving, setSaving] = useState(false);

  const toggle = (name: string) =>
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }));

  const handleConfirm = async () => {
    if (allItems.length === 0) { router.replace('/quiz/ownership'); return; }
    setSaving(true);

    const milestoneInserts = milestoneItems.map((item) => {
      const done = checked[item.name] ?? false;
      return {
        ...item,
        last_done_at_km: done ? item.last_done_at_km : null,
        last_done_at: done ? item.last_done_at : null,
      };
    });

    const toInsert = [...milestoneInserts, ...otherItems];

    const { error } = await supabase.from('maintenance_items').insert(toInsert as any);
    setSaving(false);
    if (error) { Alert.alert('Error', error.message); return; }
    clearPendingItems();
    router.replace('/quiz/ownership');
  };

  const doneCount = Object.values(checked).filter(Boolean).length;

  // If no items fell on the last milestone (or mileage is 0), skip this screen entirely
  useEffect(() => {
    let mounted = true;
    if (allItems.length > 0 && (milestoneItems.length === 0 || currentKm === 0)) {
      handleConfirm().finally(() => { /* no-op, guard via mounted */ });
    }
    return () => { mounted = false; };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Last service</Text>
        <Text style={styles.title}>
          What was done at{'\n'}{lastMilestone.toLocaleString()} km?
        </Text>
        <Text style={styles.subtitle}>
          Your schedule calls for these at the {lastMilestone.toLocaleString()} km mark.
          Tick what was done — we'll flag what wasn't.
        </Text>
      </View>

      <FlatList
        data={milestoneItems}
        keyExtractor={(i) => i.name}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isDone = checked[item.name] ?? false;
          return (
            <Pressable
              style={[styles.row, isDone && styles.rowDone]}
              onPress={() => toggle(item.name)}
            >
              <View style={[styles.checkbox, isDone && styles.checkboxChecked]}>
                {isDone && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowName, isDone && styles.rowNameDone]}>{item.name}</Text>
                <Text style={styles.rowSub}>
                  {isDone ? `Logged — due again at ${((item.last_done_at_km ?? 0) + (item.interval_km ?? 0)).toLocaleString()} km` : 'Not logged — will show as overdue'}
                </Text>
              </View>
            </Pressable>
          );
        }}
        ListFooterComponent={
          <Text style={styles.uploadText}>📎  Have receipts? Upload them from the Records tab after setup.</Text>
        }
      />

      <View style={styles.footer}>
        {doneCount < milestoneItems.length && (
          <Text style={styles.noneNote}>
            {milestoneItems.length - doneCount} item{milestoneItems.length - doneCount > 1 ? 's' : ''} will show as overdue.
          </Text>
        )}
        <Pressable style={styles.confirmBtn} onPress={handleConfirm} disabled={saving}>
          {saving
            ? <ActivityIndicator color={colors.engineBlack} />
            : <Text style={styles.confirmText}>
                {doneCount === milestoneItems.length ? 'All done — open my plan →' : `Done (${doneCount}/${milestoneItems.length}) — open my plan →`}
              </Text>
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
  title: { ...typography.title, color: colors.text, fontSize: 26, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textMuted, fontSize: 14, lineHeight: 20 },

  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.surface, borderRadius: radii.md,
    borderWidth: 1.5, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.sm,
  },
  rowDone: { borderColor: colors.orange + '66' },
  checkbox: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.orange, borderColor: colors.orange },
  checkmark: { color: colors.engineBlack, fontSize: 13, fontWeight: '700' },
  rowText: { flex: 1 },
  rowName: { ...typography.body, color: colors.textMuted, fontWeight: '600' },
  rowNameDone: { color: colors.text },
  rowSub: { ...typography.label, color: colors.textMuted, fontSize: 11, marginTop: 2 },

  uploadText: { ...typography.body, color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: spacing.md, paddingBottom: spacing.sm },

  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.sm },
  noneNote: {
    ...typography.body, color: colors.overdue, fontSize: 13,
    textAlign: 'center', paddingVertical: spacing.xs,
  },
  confirmBtn: {
    backgroundColor: colors.orange, borderRadius: radii.pill,
    paddingVertical: spacing.md, alignItems: 'center',
  },
  confirmText: { ...typography.button, color: colors.engineBlack },
});
