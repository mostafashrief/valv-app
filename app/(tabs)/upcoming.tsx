import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SectionList, ActivityIndicator, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useCar } from '../../lib/car-context';

const MILESTONE_STEP = 10000;

interface RawItem {
  id: string;
  name: string;
  interval_km: number | null;
  interval_days: number | null;
  last_done_at_km: number | null;
  last_done_at: string | null;
  source: string;
}

interface DisplayItem {
  id: string;
  name: string;
  dueAtKm: number | null;
  dueLabel: string;
  overdueKm: number | null;    // positive = overdue by this many km
  overdueDays: number | null;  // positive = overdue by this many days
}

interface Section {
  key: 'carried' | 'next' | 'after';
  title: string;
  subtitle: string;
  accent: string;
  data: DisplayItem[];
}

function computeItems(rows: RawItem[], currentKm: number): Section[] {
  const lastMilestone = Math.floor(currentKm / MILESTONE_STEP) * MILESTONE_STEP;
  const nextMilestone = lastMilestone + MILESTONE_STEP;
  const nextNextMilestone = nextMilestone + MILESTONE_STEP;
  const now = Date.now();

  const carried: DisplayItem[] = [];
  const next: DisplayItem[] = [];
  const after: DisplayItem[] = [];

  for (const row of rows) {
    // Time-only items (no km interval)
    if (row.interval_km == null && row.interval_days != null && row.last_done_at) {
      const doneAt = new Date(row.last_done_at).getTime();
      const dueMs = doneAt + row.interval_days * 86_400_000;
      const daysLeft = Math.round((dueMs - now) / 86_400_000);

      const item: DisplayItem = {
        id: row.id,
        name: row.name,
        dueAtKm: null,
        dueLabel: daysLeft <= 0
          ? `Overdue by ${Math.abs(daysLeft)} days`
          : daysLeft < 30
            ? `${daysLeft} days left`
            : `~${Math.round(daysLeft / 30)} months left`,
        overdueKm: null,
        overdueDays: daysLeft <= 0 ? Math.abs(daysLeft) : null,
      };

      if (daysLeft <= 0) carried.push(item);
      else if (daysLeft <= 60) next.push(item);
      else after.push(item);
      continue;
    }

    if (row.interval_km == null) continue;

    // last_done_at_km null = never done, treat as overdue from 0
    const baseline = row.last_done_at_km ?? 0;
    const dueAtKm = baseline + row.interval_km;
    const kmLeft = dueAtKm - currentKm;

    const item: DisplayItem = {
      id: row.id,
      name: row.name,
      dueAtKm,
      dueLabel: kmLeft <= 0
        ? `Overdue by ${Math.abs(kmLeft).toLocaleString()} km`
        : `Due at ${dueAtKm.toLocaleString()} km`,
      overdueKm: kmLeft <= 0 ? Math.abs(kmLeft) : null,
      overdueDays: null,
    };

    if (dueAtKm <= lastMilestone) {
      carried.push(item);
    } else if (dueAtKm <= nextMilestone) {
      next.push(item);
    } else if (dueAtKm <= nextNextMilestone) {
      after.push(item);
    }
  }

  // Sort each section: overdue first, then by dueAtKm ascending
  const sort = (arr: DisplayItem[]) =>
    arr.sort((a, b) => {
      if (a.overdueKm != null && b.overdueKm != null) return b.overdueKm - a.overdueKm;
      if (a.overdueKm != null) return -1;
      if (b.overdueKm != null) return 1;
      return (a.dueAtKm ?? Infinity) - (b.dueAtKm ?? Infinity);
    });

  const sections: Section[] = [];

  if (carried.length) {
    sections.push({
      key: 'carried',
      title: `CARRIED FROM ${lastMilestone.toLocaleString()} KM`,
      subtitle: 'These were due at your last milestone and haven\'t been logged.',
      accent: colors.overdue,
      data: sort(carried),
    });
  }

  if (next.length) {
    sections.push({
      key: 'next',
      title: `AT ${nextMilestone.toLocaleString()} KM`,
      subtitle: `${(nextMilestone - currentKm).toLocaleString()} km away — your next pit stop.`,
      accent: colors.orange,
      data: sort(next),
    });
  }

  if (after.length) {
    sections.push({
      key: 'after',
      title: `AT ${nextNextMilestone.toLocaleString()} KM`,
      subtitle: `${(nextNextMilestone - currentKm).toLocaleString()} km away — plan ahead.`,
      accent: colors.dueSoon,
      data: sort(after),
    });
  }

  return sections;
}

export default function PitStop() {
  const router = useRouter();
  const { activeCar } = useCar();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const currentKm = activeCar?.current_mileage_km ?? 0;
  const lastMilestone = Math.floor(currentKm / MILESTONE_STEP) * MILESTONE_STEP;
  const nextMilestone = lastMilestone + MILESTONE_STEP;
  const nextNextMilestone = nextMilestone + MILESTONE_STEP;
  const kmToNext = nextMilestone - currentKm;

  const load = useCallback(async () => {
    if (!activeCar) return;
    setLoading(true);
    const { data } = await supabase
      .from('maintenance_items')
      .select('*')
      .eq('car_id', activeCar.id);
    setSections(computeItems(data ?? [], activeCar.current_mileage_km));
    setLoading(false);
  }, [activeCar]);

  useEffect(() => { load(); }, [load]);

  if (!activeCar) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.empty}>No car selected.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={load}
        refreshing={loading}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.label}>PIT STOP</Text>
            <Text style={styles.title}>
              {activeCar.brand} {activeCar.model}
            </Text>
            <View style={styles.meterRow}>
              <View style={styles.meterBlock}>
                <Text style={styles.meterValue}>{currentKm.toLocaleString()}</Text>
                <Text style={styles.meterLabel}>current km</Text>
              </View>
              <View style={styles.meterDivider} />
              <View style={styles.meterBlock}>
                <Text style={[styles.meterValue, { color: colors.orange }]}>
                  {nextMilestone.toLocaleString()}
                </Text>
                <Text style={styles.meterLabel}>next stop</Text>
              </View>
              <View style={styles.meterDivider} />
              <View style={styles.meterBlock}>
                <Text style={[styles.meterValue, { color: colors.orange }]}>
                  {kmToNext.toLocaleString()}
                </Text>
                <Text style={styles.meterLabel}>km away</Text>
              </View>
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionWrap}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, { backgroundColor: section.accent }]} />
              <Text style={[styles.sectionTitle, { color: section.accent }]}>
                {section.title}
              </Text>
              <Text style={styles.sectionCount}>{section.data.length}</Text>
            </View>
            <Text style={styles.sectionSub}>{section.subtitle}</Text>
          </View>
        )}
        renderItem={({ item, section }) => (
          <Pressable
            style={[styles.card, { borderLeftColor: section.accent }]}
            onPress={() => router.push(`/item/${item.id}`)}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={[styles.cardDue, { color: section.accent }]}>
                {item.dueLabel}
              </Text>
            </View>
            {item.dueAtKm != null && (
              <Text style={[styles.cardKm, { color: section.accent }]}>
                {item.dueAtKm.toLocaleString()} km
              </Text>
            )}
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            {loading
              ? <ActivityIndicator color={colors.orange} size="large" />
              : <Text style={styles.empty}>All clear — nothing due at your next two stops.</Text>
            }
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center:    { justifyContent: 'center', alignItems: 'center' },
  list:      { paddingBottom: spacing.xxl },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  label: { ...typography.label, color: colors.orange, letterSpacing: 1.5 },
  title: { ...typography.title, color: colors.text, marginTop: 4, marginBottom: spacing.md },

  meterRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
  },
  meterBlock: { flex: 1, alignItems: 'center' },
  meterDivider: { width: 1, backgroundColor: colors.border },
  meterValue: { ...typography.mono, color: colors.text, fontSize: 18, fontWeight: '700' },
  meterLabel: { ...typography.label, color: colors.textMuted, fontSize: 10, marginTop: 2 },

  sectionWrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 4 },
  sectionDot:   { width: 6, height: 6, borderRadius: 3 },
  sectionTitle: { ...typography.label, fontSize: 11, letterSpacing: 1, flex: 1 },
  sectionCount: {
    ...typography.label,
    fontSize: 11,
    color: colors.textMuted,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  sectionSub: { ...typography.body, color: colors.textMuted, fontSize: 12 },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderLeftWidth: 3,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLeft:  { flex: 1 },
  cardName:  { ...typography.body, color: colors.text, fontWeight: '600', fontSize: 15 },
  cardDue:   { ...typography.body, fontSize: 12, marginTop: 3 },
  cardKm:    { ...typography.mono, fontSize: 13, fontWeight: '700', marginLeft: spacing.sm },

  emptyWrap: { paddingTop: spacing.xxl, paddingHorizontal: spacing.lg },
  empty:     { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
