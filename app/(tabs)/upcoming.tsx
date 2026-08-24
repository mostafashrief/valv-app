import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SectionList, ActivityIndicator, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useCar } from '../../lib/car-context';
import { calcItemStatus, type MaintenanceItemStatus } from '../../lib/maintenance';
import type { MaintenanceItem, MaintenanceStatus } from '../../types/car';

// ─── types ────────────────────────────────────────────────────────────────────

interface ItemRow {
  id: string; name: string;
  interval_km: number | null; interval_days: number | null;
  last_done_at_km: number | null; last_done_at: string | null;
  source: 'estimated' | 'verified';
}

interface Section {
  title: string;
  accent: string;
  data: MaintenanceItemStatus[];
}

// ─── helpers ──────────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<MaintenanceStatus, string> = {
  overdue: colors.overdue,
  dueSoon: colors.dueSoon,
  healthy: colors.healthy,
};

function buildSections(
  statuses: MaintenanceItemStatus[],
  noHistory: MaintenanceItemStatus[],
): Section[] {
  const sections: Section[] = [];

  const overdue = statuses.filter((s) => s.status === 'overdue');
  const dueSoon = statuses.filter((s) => s.status === 'dueSoon');
  const healthy = statuses.filter((s) => s.status === 'healthy');

  if (overdue.length)   sections.push({ title: 'OVERDUE',      accent: colors.overdue,  data: overdue });
  if (dueSoon.length)   sections.push({ title: 'DUE SOON',     accent: colors.dueSoon,  data: dueSoon });
  if (noHistory.length) sections.push({ title: 'NEVER RECORDED', accent: colors.textMuted, data: noHistory });
  if (healthy.length)   sections.push({ title: 'UPCOMING',     accent: colors.healthy,  data: healthy });

  return sections;
}

function nextMilestoneText(s: MaintenanceItemStatus, currentKm: number): string {
  const parts: string[] = [];

  if (s.item.intervalKm != null && s.item.lastDoneAtKm != null) {
    const dueAt = s.item.lastDoneAtKm + s.item.intervalKm;
    const remaining = dueAt - currentKm;
    if (remaining <= 0) {
      parts.push(`Overdue by ${Math.abs(remaining).toLocaleString()} km`);
    } else {
      parts.push(`Due at ${dueAt.toLocaleString()} km  (+${remaining.toLocaleString()} km)`);
    }
  }

  if (s.item.intervalDays != null && s.item.lastDoneAtDate != null) {
    const due = new Date(s.item.lastDoneAtDate);
    due.setDate(due.getDate() + s.item.intervalDays);
    const days = Math.round((due.getTime() - Date.now()) / 86_400_000);
    if (days <= 0) {
      parts.push(`Overdue by ${Math.abs(days)} days`);
    } else if (days < 30) {
      parts.push(`${days} days left`);
    } else {
      const months = Math.round(days / 30);
      parts.push(`~${months} month${months !== 1 ? 's' : ''} left`);
    }
  }

  return parts.join('  ·  ');
}

function noHistoryText(item: MaintenanceItem): string {
  const parts: string[] = [];
  if (item.intervalKm) parts.push(`Every ${item.intervalKm.toLocaleString()} km`);
  if (item.intervalDays) {
    const months = Math.round(item.intervalDays / 30);
    parts.push(`Every ${months} month${months !== 1 ? 's' : ''}`);
  }
  return parts.join('  ·  ') || 'Check interval';
}

// ─── component ────────────────────────────────────────────────────────────────

export default function Upcoming() {
  const { t } = useTranslation();
  const router = useRouter();
  const { activeCar } = useCar();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!activeCar) return;
    setLoading(true);

    const { data } = await supabase
      .from('maintenance_items')
      .select('*')
      .eq('car_id', activeCar.id);

    const mapped: MaintenanceItem[] = (data ?? []).map((row: ItemRow) => ({
      id: row.id,
      name: row.name,
      intervalKm: row.interval_km ?? undefined,
      intervalDays: row.interval_days ?? undefined,
      lastDoneAtKm: row.last_done_at_km ?? undefined,
      lastDoneAtDate: row.last_done_at ? row.last_done_at.split('T')[0] : undefined,
      source: row.source,
    }));

    // Split: items with history vs items never serviced
    const withHistory = mapped.filter(
      (i) => i.lastDoneAtKm != null || i.lastDoneAtDate != null,
    );
    const neverServiced = mapped.filter(
      (i) => i.lastDoneAtKm == null && i.lastDoneAtDate == null,
    );

    const statuses = withHistory.map((item) =>
      calcItemStatus(item, activeCar.current_mileage_km),
    );

    // Sort upcoming by km remaining ascending (closest first)
    const sorted = [...statuses].sort((a, b) => {
      const aVal = a.kmRemaining ?? a.daysRemaining ?? Infinity;
      const bVal = b.kmRemaining ?? b.daysRemaining ?? Infinity;
      if (a.status !== b.status) {
        const rank = { overdue: 0, dueSoon: 1, healthy: 2 };
        return rank[a.status] - rank[b.status];
      }
      return aVal - bVal;
    });

    const neverStatuses = neverServiced.map((item) =>
      calcItemStatus(item, activeCar.current_mileage_km),
    );

    setSections(buildSections(sorted, neverStatuses));
    setLoading(false);
  }, [activeCar]);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.orange} size="large" />
      </SafeAreaView>
    );
  }

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
        keyExtractor={(s) => s.item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={load}
        refreshing={loading}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.label}>{t('upcoming.label')}</Text>
            <Text style={styles.title}>{t('upcoming.title')}</Text>
            <Text style={styles.carName}>
              {activeCar.brand} {activeCar.model} · {activeCar.current_mileage_km.toLocaleString()} km
            </Text>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: section.accent }]} />
            <Text style={[styles.sectionTitle, { color: section.accent }]}>
              {section.title}
            </Text>
            <Text style={styles.sectionCount}>{section.data.length}</Text>
          </View>
        )}
        renderItem={({ item: s, section }) => {
          const isNever = section.title === 'NEVER RECORDED';
          const accent = isNever ? colors.textMuted : STATUS_COLOR[s.status];
          const milestone = isNever
            ? noHistoryText(s.item)
            : nextMilestoneText(s, activeCar.current_mileage_km);

          return (
            <Pressable
              style={[styles.card, { borderLeftColor: accent }]}
              onPress={() => router.push(`/item/${s.item.id}`)}
            >
              <View style={styles.cardLeft}>
                <Text style={styles.cardName}>{s.item.name}</Text>
                <Text style={[styles.cardMilestone, { color: accent }]}>
                  {milestone || '—'}
                </Text>
              </View>
              {!isNever && s.kmRemaining != null && (
                <View style={[styles.badge, { backgroundColor: accent + '20' }]}>
                  <Text style={[styles.badgeText, { color: accent }]}>
                    {s.kmRemaining > 0
                      ? `+${s.kmRemaining.toLocaleString()} km`
                      : `${s.kmRemaining.toLocaleString()} km`}
                  </Text>
                </View>
              )}
              {isNever && (
                <View style={[styles.badge, { backgroundColor: colors.textMuted + '20' }]}>
                  <Text style={[styles.badgeText, { color: colors.textMuted }]}>Log it</Text>
                </View>
              )}
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>No maintenance items yet.</Text>
        }
      />
    </SafeAreaView>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: 'center', alignItems: 'center' },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  label: { ...typography.label, color: colors.orange },
  title: { ...typography.title, color: colors.text, marginTop: 4 },
  carName: { ...typography.body, color: colors.textMuted, fontSize: 13, marginTop: 4 },

  list: { paddingBottom: spacing.xxl },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  sectionDot: { width: 6, height: 6, borderRadius: 3 },
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
  cardLeft: { flex: 1 },
  cardName: { ...typography.body, color: colors.text, fontWeight: '600', fontSize: 15 },
  cardMilestone: { ...typography.body, fontSize: 12, marginTop: 3 },

  badge: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginLeft: spacing.sm,
  },
  badgeText: { ...typography.label, fontSize: 11 },

  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
