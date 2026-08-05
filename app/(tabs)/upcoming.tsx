import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useCar } from '../../lib/car-context';
import { calcItemStatus, sortByUrgency, type MaintenanceItemStatus } from '../../lib/maintenance';
import type { MaintenanceItem, MaintenanceStatus } from '../../types/car';

const STATUS_COLOR: Record<MaintenanceStatus, string> = {
  overdue: colors.overdue,
  dueSoon: colors.dueSoon,
  healthy: colors.healthy,
};

interface ItemRow {
  id: string; name: string;
  interval_km: number | null; interval_days: number | null;
  last_done_at_km: number | null; last_done_at: string | null;
  source: 'estimated' | 'verified';
}

interface Group { label: string; data: MaintenanceItemStatus[]; }

function groupItems(statuses: MaintenanceItemStatus[]): Group[] {
  const overdue = statuses.filter((s) => s.status === 'overdue');
  const dueSoon = statuses.filter((s) => s.status === 'dueSoon');
  const healthy = statuses.filter((s) => s.status === 'healthy');
  const groups: Group[] = [];
  if (overdue.length) groups.push({ label: 'sectionOverdue', data: overdue });
  if (dueSoon.length) groups.push({ label: 'sectionDueSoon', data: dueSoon });
  if (healthy.length) groups.push({ label: 'sectionOnSchedule', data: healthy });
  return groups;
}

export default function Upcoming() {
  const { t } = useTranslation();
  const { activeCar } = useCar();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeCar) return;
    load();
  }, [activeCar]);

  const load = async () => {
    if (!activeCar) return;
    setLoading(true);
    const { data } = await supabase
      .from('maintenance_items')
      .select('*')
      .eq('car_id', activeCar.id);

    const mapped: MaintenanceItem[] = (data ?? []).map((row: ItemRow) => ({
      id: row.id, name: row.name,
      intervalKm: row.interval_km ?? undefined,
      intervalDays: row.interval_days ?? undefined,
      lastDoneAtKm: row.last_done_at_km ?? undefined,
      lastDoneAtDate: row.last_done_at ? row.last_done_at.split('T')[0] : undefined,
      source: row.source,
    }));

    const statuses = sortByUrgency(mapped.map((item) => calcItemStatus(item, activeCar.current_mileage_km)));
    setGroups(groupItems(statuses));
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.orange} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{t('upcoming.label')}</Text>
        <Text style={styles.title}>{t('upcoming.title')}</Text>
      </View>
      <FlatList
        data={groups}
        keyExtractor={(g) => g.label}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={load}
        refreshing={loading}
        renderItem={({ item: group }) => (
          <View style={styles.group}>
            <Text style={[styles.groupLabel, {
              color: group.label === 'sectionOverdue' ? colors.overdue
                : group.label === 'sectionDueSoon' ? colors.dueSoon
                : colors.healthy,
            }]}>
              {t(`upcoming.${group.label}`)}
            </Text>
            {group.data.map((s) => {
              const accent = STATUS_COLOR[s.status];
              return (
                <View key={s.item.id} style={[styles.row, { borderLeftColor: accent }]}>
                  <View style={styles.rowLeft}>
                    <Text style={styles.rowName}>{s.item.name}</Text>
                    <Text style={styles.rowLine}>{s.overdueLine || '—'}</Text>
                  </View>
                  {s.kmRemaining != null && (
                    <Text style={[styles.rowKm, { color: accent }]}>
                      {s.kmRemaining > 0 ? `+${s.kmRemaining.toLocaleString()}` : s.kmRemaining.toLocaleString()} km
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: 'center', alignItems: 'center' },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  label: { ...typography.label, color: colors.orange },
  title: { ...typography.title, color: colors.text, marginTop: 4 },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  group: { marginBottom: spacing.lg },
  groupLabel: { ...typography.label, marginBottom: spacing.sm },
  row: {
    backgroundColor: colors.surface, borderRadius: radii.md, borderLeftWidth: 3,
    padding: spacing.md, marginBottom: spacing.sm,
    flexDirection: 'row', alignItems: 'center',
  },
  rowLeft: { flex: 1 },
  rowName: { ...typography.body, color: colors.text, fontWeight: '600' },
  rowLine: { ...typography.body, color: colors.textMuted, fontSize: 13, marginTop: 2 },
  rowKm: { ...typography.mono, fontSize: 13, marginLeft: spacing.sm },
});
