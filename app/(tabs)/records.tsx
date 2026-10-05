import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  ActivityIndicator, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useCar } from '../../lib/car-context';

const MILESTONE_STEP = 10000;

type Period = 'year' | 'last_year' | 'all';

interface ServiceLog {
  id: string;
  item_id: string;
  done_at_km: number | null;
  done_at: string;
  cost_egp: number | null;
  notes: string | null;
  receipt_url: string | null;
  item_name: string;
}

interface MilestoneGroup {
  milestone: number;
  logs: ServiceLog[];
  totalCost: number;
  earliestDate: string;
  latestDate: string;
}

const NO_KM_MILESTONE = -1; // sentinel for logs with no km reading

function getMilestone(km: number | null): number {
  if (km == null) return NO_KM_MILESTONE;
  return Math.floor(km / MILESTONE_STEP) * MILESTONE_STEP;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-EG', { day: 'numeric', month: 'short', year: 'numeric' });
}

function filterByPeriod(logs: ServiceLog[], period: Period): ServiceLog[] {
  if (period === 'all') return logs;
  const now = new Date();
  const cutoff = new Date(
    period === 'year'
      ? new Date(now.getFullYear(), 0, 1)
      : new Date(now.getFullYear() - 1, 0, 1),
  );
  const end = period === 'last_year' ? new Date(now.getFullYear(), 0, 1) : now;
  return logs.filter((l) => {
    const d = new Date(l.done_at);
    return d >= cutoff && d < end;
  });
}

function groupByMilestone(logs: ServiceLog[]): MilestoneGroup[] {
  const map = new Map<number, ServiceLog[]>();
  for (const log of logs) {
    const m = getMilestone(log.done_at_km);
    if (!map.has(m)) map.set(m, []);
    map.get(m)!.push(log);
  }

  return Array.from(map.entries())
    .map(([milestone, items]) => {
      const sorted = items.sort(
        (a, b) => new Date(b.done_at).getTime() - new Date(a.done_at).getTime(),
      );
      return {
        milestone,
        logs: sorted,
        totalCost: items.reduce((s, l) => s + (l.cost_egp ?? 0), 0),
        earliestDate: sorted[sorted.length - 1].done_at,
        latestDate: sorted[0].done_at,
      };
    })
    .sort((a, b) => b.milestone - a.milestone); // newest milestone first
}

export default function Records() {
  const { activeCar } = useCar();
  const [allLogs, setAllLogs] = useState<ServiceLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>('all');
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const load = useCallback(async () => {
    if (!activeCar) return;
    setLoading(true);

    const { data } = await supabase
      .from('service_logs')
      .select('*, maintenance_items(name)')
      .eq('car_id', activeCar.id)
      .order('done_at', { ascending: false });

    const mapped: ServiceLog[] = (data ?? []).map((r: any) => ({
      id: r.id,
      item_id: r.item_id,
      done_at_km: r.done_at_km,
      done_at: r.done_at,
      cost_egp: r.cost_egp,
      notes: r.notes,
      receipt_url: r.receipt_url,
      item_name: r.maintenance_items?.name ?? 'Service',
    }));

    setAllLogs(mapped);
    setLoading(false);
  }, [activeCar]);

  useEffect(() => { load(); }, [load]);

  const filtered = filterByPeriod(allLogs, period);
  const groups = groupByMilestone(filtered);
  const totalSpent = filtered.reduce((s, l) => s + (l.cost_egp ?? 0), 0);
  const loggedCount = filtered.length;

  const toggleExpand = (milestone: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(milestone) ? next.delete(milestone) : next.add(milestone);
      return next;
    });

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
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>RECORDS</Text>
          <Text style={styles.title}>{activeCar.brand} {activeCar.model}</Text>
        </View>

        {/* Spending card */}
        <View style={styles.spendCard}>
          <View style={styles.spendTop}>
            <View>
              <Text style={styles.spendAmount}>
                {totalSpent > 0 ? `${totalSpent.toLocaleString()} EGP` : '—'}
              </Text>
              <Text style={styles.spendSub}>
                {loggedCount} service{loggedCount !== 1 ? 's' : ''} logged
              </Text>
            </View>
            <Text style={styles.spendLabel}>TOTAL SPENT</Text>
          </View>

          {/* Period filter */}
          <View style={styles.periodRow}>
            {([
              ['year', 'This Year'],
              ['last_year', 'Last Year'],
              ['all', 'All Time'],
            ] as [Period, string][]).map(([key, label]) => (
              <Pressable
                key={key}
                style={[styles.pill, period === key && styles.pillActive]}
                onPress={() => setPeriod(key)}
              >
                <Text style={[styles.pillText, period === key && styles.pillTextActive]}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Empty state */}
        {groups.length === 0 && (
          <View style={styles.emptyWrap}>
            <Text style={styles.empty}>No services recorded yet.</Text>
            <Text style={styles.emptySub}>
              Log a service from the Home tab — it'll show up here grouped by milestone.
            </Text>
          </View>
        )}

        {/* Milestone groups */}
        {groups.map((group) => {
          const isOpen = expanded.has(group.milestone);
          return (
            <View key={group.milestone} style={styles.milestoneWrap}>
              <Pressable
                style={styles.milestoneHeader}
                onPress={() => toggleExpand(group.milestone)}
              >
                <View style={styles.milestoneLeft}>
                  <View style={styles.milestoneDot} />
                  <View>
                    <Text style={styles.milestoneKm}>
                      {group.milestone === NO_KM_MILESTONE ? 'No km recorded' : `${group.milestone.toLocaleString()} KM`}
                    </Text>
                    <Text style={styles.milestoneMeta}>
                      {group.logs.length} service{group.logs.length !== 1 ? 's' : ''}
                      {' · '}
                      {formatDate(group.latestDate)}
                    </Text>
                  </View>
                </View>
                <View style={styles.milestoneRight}>
                  {group.totalCost > 0 && (
                    <Text style={styles.milestoneCost}>
                      {group.totalCost.toLocaleString()} EGP
                    </Text>
                  )}
                  <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
                </View>
              </Pressable>

              {isOpen && (
                <View style={styles.logList}>
                  {group.logs.map((log) => (
                    <View key={log.id} style={styles.logCard}>
                      <View style={styles.logTop}>
                        <Text style={styles.logName}>{log.item_name}</Text>
                        {log.cost_egp != null
                          ? <Text style={styles.logCost}>{log.cost_egp.toLocaleString()} EGP</Text>
                          : <Text style={styles.logCostNone}>—</Text>
                        }
                      </View>
                      <View style={styles.logMeta}>
                        <Text style={styles.logDetail}>
                          {log.done_at_km != null
                            ? `${log.done_at_km.toLocaleString()} km`
                            : 'km not logged'}
                          {' · '}
                          {formatDate(log.done_at)}
                        </Text>
                        {log.done_at_km != null && getMilestone(log.done_at_km) !== log.done_at_km && (
                          <Text style={styles.logMilestoneNote}>
                            grouped under {group.milestone.toLocaleString()} km milestone
                          </Text>
                        )}
                      </View>
                      {log.notes ? (
                        <Text style={styles.logNotes}>{log.notes}</Text>
                      ) : null}
                      {log.receipt_url ? (
                        <Image
                          source={{ uri: log.receipt_url }}
                          style={styles.receiptThumb}
                          resizeMode="cover"
                        />
                      ) : null}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center:    { justifyContent: 'center', alignItems: 'center' },
  scroll:    { paddingBottom: spacing.xxl },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  label: { ...typography.label, color: colors.orange, letterSpacing: 1.5 },
  title: { ...typography.title, color: colors.text, marginTop: 4 },

  spendCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  spendTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  spendAmount: { ...typography.mono, color: colors.text, fontSize: 28, fontWeight: '700' },
  spendSub:    { ...typography.label, color: colors.textMuted, fontSize: 12, marginTop: 2 },
  spendLabel:  { ...typography.label, color: colors.orange, fontSize: 10, letterSpacing: 1.5 },

  periodRow: { flexDirection: 'row', gap: spacing.sm },
  pill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  pillActive:     { borderColor: colors.orange, backgroundColor: colors.orange + '18' },
  pillText:       { ...typography.label, color: colors.textMuted, fontSize: 11 },
  pillTextActive: { color: colors.orange },

  emptyWrap: { paddingTop: spacing.xxl, paddingHorizontal: spacing.lg, alignItems: 'center' },
  empty:     { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  emptySub:  { ...typography.body, color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: spacing.sm, lineHeight: 20 },

  milestoneWrap: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  milestoneLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  milestoneDot:  {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.orange,
  },
  milestoneKm:   { ...typography.mono, color: colors.text, fontSize: 15, fontWeight: '700' },
  milestoneMeta: { ...typography.label, color: colors.textMuted, fontSize: 11, marginTop: 2 },
  milestoneRight:{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  milestoneCost: { ...typography.mono, color: colors.orange, fontSize: 13, fontWeight: '700' },
  chevron:       { color: colors.textMuted, fontSize: 10 },

  logList: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  logCard: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '88',
  },
  logTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  logName:          { ...typography.body, color: colors.text, fontWeight: '600', flex: 1, marginRight: spacing.sm },
  logCost:          { ...typography.mono, color: colors.text, fontSize: 13, fontWeight: '700' },
  logCostNone:      { ...typography.mono, color: colors.textMuted, fontSize: 13 },
  logMeta:          { gap: 2 },
  logDetail:        { ...typography.label, color: colors.textMuted, fontSize: 11 },
  logMilestoneNote: { ...typography.label, color: colors.textMuted, fontSize: 10, fontStyle: 'italic' },
  logNotes:         { ...typography.body, color: colors.textMuted, fontSize: 12, marginTop: spacing.sm, lineHeight: 18 },
  receiptThumb:     { width: '100%', height: 120, borderRadius: radii.sm, marginTop: spacing.sm },
});
