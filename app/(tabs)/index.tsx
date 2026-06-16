import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { DUMMY_CAR, DUMMY_ITEMS } from '../../data/dummy';
import { calcItemStatus, sortByUrgency, type MaintenanceItemStatus } from '../../lib/maintenance';
import type { MaintenanceStatus } from '../../types/car';

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

export default function Home() {
  const car = DUMMY_CAR;

  const statuses = useMemo(
    () => sortByUrgency(DUMMY_ITEMS.map((item) => calcItemStatus(item, car.currentMileageKm))),
    [],
  );

  const overdueCount = statuses.filter((s) => s.status === 'overdue').length;
  const dueSoonCount = statuses.filter((s) => s.status === 'dueSoon').length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.carLabel}>{car.brand} {car.model} · {car.year}</Text>
          <Text style={styles.mileage}>{car.currentMileageKm.toLocaleString()} km</Text>
        </View>
        <Pressable style={styles.logBtn}>
          <Text style={styles.logBtnText}>Log km</Text>
        </Pressable>
      </View>

      {/* Summary bar */}
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
      </View>

      {/* Item list */}
      <FlatList
        data={statuses}
        keyExtractor={(s) => s.item.id}
        renderItem={({ item: s }) => <ItemCard s={s} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },

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
    borderLeftColor: colors.healthy,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: { ...typography.body, color: colors.text, fontWeight: '600', flex: 1 },
  badge: {
    borderRadius: radii.pill,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.sm,
  },
  badgeText: { ...typography.label, fontSize: 10 },
  cardLine: { ...typography.body, color: colors.textMuted, marginTop: 4 },
  estimated: { ...typography.label, color: colors.textMuted, marginTop: 6, fontSize: 9 },
});
