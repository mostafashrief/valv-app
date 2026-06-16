import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth-context';
import { calcItemStatus, sortByUrgency, type MaintenanceItemStatus } from '../../lib/maintenance';
import type { MaintenanceItem, MaintenanceStatus } from '../../types/car';

const STATUS_COLOR: Record<MaintenanceStatus, string> = {
  overdue: colors.overdue,
  dueSoon: colors.dueSoon,
  healthy: colors.healthy,
};

const STATUS_LABEL: Record<MaintenanceStatus, string> = {
  overdue: 'OVERDUE',
  dueSoon: 'DUE SOON',
  healthy: 'OK',
};

function ItemCard({ s }: { s: MaintenanceItemStatus }) {
  const accent = STATUS_COLOR[s.status];
  return (
    <View style={[styles.card, { borderLeftColor: accent }]}>
      <View style={styles.cardTop}>
        <Text style={styles.cardName}>{s.item.name}</Text>
        <View style={[styles.badge, { backgroundColor: accent + '22' }]}>
          <Text style={[styles.badgeText, { color: accent }]}>
            {STATUS_LABEL[s.status]}
          </Text>
        </View>
      </View>
      <Text style={styles.cardLine}>{s.overdueLine}</Text>
      {s.item.source === 'estimated' && (
        <Text style={styles.estimated}>Estimated interval</Text>
      )}
    </View>
  );
}

interface CarRow {
  id: string;
  brand: string;
  model: string;
  year: number;
  current_mileage_km: number;
}

interface ItemRow {
  id: string;
  name: string;
  interval_km: number | null;
  interval_days: number | null;
  last_done_at_km: number | null;
  last_done_at: string | null;
  source: 'estimated' | 'verified';
}

export default function Home() {
  const { session } = useAuth();
  const [car, setCar] = useState<CarRow | null>(null);
  const [statuses, setStatuses] = useState<MaintenanceItemStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;
    loadData();
  }, [session]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    const { data: cars, error: carErr } = await supabase
      .from('cars')
      .select('*')
      .eq('user_id', session!.user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (carErr || !cars?.length) {
      setError(carErr?.message ?? null);
      setLoading(false);
      return;
    }

    const activeCar = cars[0] as CarRow;
    setCar(activeCar);

    const { data: items, error: itemsErr } = await supabase
      .from('maintenance_items')
      .select('*')
      .eq('car_id', activeCar.id);

    if (itemsErr) { setError(itemsErr.message); setLoading(false); return; }

    const mapped: MaintenanceItem[] = (items as ItemRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      intervalKm: row.interval_km ?? undefined,
      intervalDays: row.interval_days ?? undefined,
      lastDoneAtKm: row.last_done_at_km ?? undefined,
      lastDoneAtDate: row.last_done_at ? row.last_done_at.split('T')[0] : undefined,
      source: row.source,
    }));

    setStatuses(sortByUrgency(mapped.map((item) => calcItemStatus(item, activeCar.current_mileage_km))));
    setLoading(false);
  };

  const overdueCount = statuses.filter((s) => s.status === 'overdue').length;
  const dueSoonCount = statuses.filter((s) => s.status === 'dueSoon').length;

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.orange} size="large" />
      </SafeAreaView>
    );
  }

  if (!car) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.emptyText}>No car found. Complete onboarding first.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.carLabel}>{car.brand} {car.model} · {car.year}</Text>
          <Text style={styles.mileage}>{car.current_mileage_km.toLocaleString()} km</Text>
        </View>
        <Pressable style={styles.logBtn}>
          <Text style={styles.logBtnText}>Log km</Text>
        </Pressable>
      </View>

      <View style={styles.summaryRow}>
        {overdueCount > 0 && (
          <View style={[styles.summaryChip, { backgroundColor: colors.overdue + '22' }]}>
            <Text style={[styles.summaryChipText, { color: colors.overdue }]}>
              {overdueCount} overdue
            </Text>
          </View>
        )}
        {dueSoonCount > 0 && (
          <View style={[styles.summaryChip, { backgroundColor: colors.dueSoon + '33' }]}>
            <Text style={[styles.summaryChipText, { color: '#A07000' }]}>
              {dueSoonCount} due soon
            </Text>
          </View>
        )}
        {overdueCount === 0 && dueSoonCount === 0 && (
          <Text style={styles.allClear}>All clear.</Text>
        )}
        {error && <Text style={[styles.summaryChipText, { color: colors.overdue }]}>{error}</Text>}
      </View>

      <FlatList
        data={statuses}
        keyExtractor={(s) => s.item.id}
        renderItem={({ item: s }) => <ItemCard s={s} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={loadData}
        refreshing={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  center: { justifyContent: 'center', alignItems: 'center' },
  emptyText: { ...typography.body, color: colors.textMuted },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  carLabel: { ...typography.label, color: colors.textMuted },
  mileage: { ...typography.monoLarge, color: colors.text, marginTop: 2 },
  logBtn: {
    backgroundColor: colors.orange,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  logBtnText: { ...typography.button, color: colors.espresso, fontSize: 14 },

  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  summaryChip: {
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
  },
  summaryChipText: { ...typography.label, fontSize: 12 },
  allClear: { ...typography.body, color: colors.healthy, fontWeight: '600' },

  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderLeftWidth: 4,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { ...typography.body, color: colors.text, fontWeight: '600', flex: 1 },
  badge: { borderRadius: radii.pill, paddingVertical: 2, paddingHorizontal: spacing.sm, marginLeft: spacing.sm },
  badgeText: { ...typography.label, fontSize: 10 },
  cardLine: { ...typography.body, color: colors.textMuted, marginTop: 4 },
  estimated: { ...typography.label, color: colors.textMuted, marginTop: 6, fontSize: 9 },
});
