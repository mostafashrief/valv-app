import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Pressable,
  ActivityIndicator, Modal, TextInput, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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

// STATUS_LABEL built dynamically via t() in component

interface ItemRow {
  id: string;
  name: string;
  interval_km: number | null;
  interval_days: number | null;
  last_done_at_km: number | null;
  last_done_at: string | null;
  source: 'estimated' | 'verified';
}

function ItemCard({ s, onPress, statusLabel, estimatedLabel, tapLabel }: {
  s: MaintenanceItemStatus;
  onPress: () => void;
  statusLabel: string;
  estimatedLabel: string;
  tapLabel: string;
}) {
  const accent = STATUS_COLOR[s.status];
  return (
    <Pressable
      style={({ pressed }) => [styles.card, { borderLeftColor: accent, opacity: pressed ? 0.85 : 1 }]}
      onPress={onPress}
    >
      <View style={styles.cardTop}>
        <Text style={styles.cardName}>{s.item.name}</Text>
        <View style={[styles.badge, { backgroundColor: accent + '33' }]}>
          <Text style={[styles.badgeText, { color: accent }]}>{statusLabel}</Text>
        </View>
      </View>
      <Text style={styles.cardLine}>{s.overdueLine}</Text>
      <View style={styles.cardBottom}>
        {s.item.source === 'estimated' && (
          <Text style={styles.estimated}>{estimatedLabel}</Text>
        )}
        <Text style={styles.tapHint}>{tapLabel}</Text>
      </View>
    </Pressable>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { activeCar, reloadCars } = useCar();

  const STATUS_LABEL: Record<MaintenanceStatus, string> = {
    overdue: t('home.statusOverdue'),
    dueSoon: t('home.statusDueSoon'),
    healthy: t('home.statusOk'),
  };
  const [statuses, setStatuses] = useState<MaintenanceItemStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [logVisible, setLogVisible] = useState(false);
  const [newMileage, setNewMileage] = useState('');
  const [saving, setSaving] = useState(false);

  const [addVisible, setAddVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemKm, setNewItemKm] = useState('');
  const [newItemDays, setNewItemDays] = useState('');

  useEffect(() => {
    if (!activeCar) return;
    loadItems(activeCar.id, activeCar.current_mileage_km);
  }, [activeCar]);

  const loadItems = async (carId: string, currentKm: number) => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('maintenance_items')
      .select('*')
      .eq('car_id', carId);
    if (err) { setError(err.message); setLoading(false); return; }

    const mapped: MaintenanceItem[] = (data as ItemRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      intervalKm: row.interval_km ?? undefined,
      intervalDays: row.interval_days ?? undefined,
      lastDoneAtKm: row.last_done_at_km ?? undefined,
      lastDoneAtDate: row.last_done_at ? row.last_done_at.split('T')[0] : undefined,
      source: row.source,
    }));

    setStatuses(sortByUrgency(mapped.map((item) => calcItemStatus(item, currentKm))));
    setLoading(false);
  };

  const refresh = () => {
    if (activeCar) loadItems(activeCar.id, activeCar.current_mileage_km);
  };

  const openLogKm = () => {
    setNewMileage(activeCar ? String(activeCar.current_mileage_km) : '');
    setLogVisible(true);
  };

  const saveKm = async () => {
    if (!activeCar) return;
    const km = parseInt(newMileage.replace(/,/g, ''), 10);
    if (isNaN(km) || km <= 0) { Alert.alert(t('home.mileageInvalid')); return; }
    if (km < activeCar.current_mileage_km) {
      Alert.alert(t('home.mileageDownError'), t('home.mileageDownMessage', { mileage: activeCar.current_mileage_km.toLocaleString() }));
      return;
    }
    setSaving(true);
    const now = new Date().toISOString();
    const [updateRes] = await Promise.all([
      supabase.from('cars').update({ current_mileage_km: km, mileage_updated_at: now }).eq('id', activeCar.id),
      supabase.from('mileage_logs').insert({ car_id: activeCar.id, mileage_km: km, logged_at: now }),
    ]);
    setSaving(false);
    if (updateRes.error) { Alert.alert('Error', updateRes.error.message); return; }
    setLogVisible(false);
    reloadCars();
  };

  const saveCustomItem = async () => {
    if (!activeCar) return;
    if (!newItemName.trim()) { Alert.alert('Name required'); return; }
    const km = newItemKm ? parseInt(newItemKm, 10) : null;
    const days = newItemDays ? parseInt(newItemDays, 10) : null;
    if (!km && !days) { Alert.alert(t('home.addCustomIntervalError')); return; }

    setSaving(true);
    const { error: err } = await supabase.from('maintenance_items').insert({
      car_id: activeCar.id,
      name: newItemName.trim(),
      interval_km: km,
      interval_days: days,
      last_done_at_km: null,
      last_done_at: null,
      source: 'estimated',
    });
    setSaving(false);
    if (err) { Alert.alert('Error', err.message); return; }
    setAddVisible(false);
    setNewItemName(''); setNewItemKm(''); setNewItemDays('');
    refresh();
  };

  const overdueCount = statuses.filter((s) => s.status === 'overdue').length;
  const dueSoonCount = statuses.filter((s) => s.status === 'dueSoon').length;
  const isEstimated = statuses.length > 0 && statuses.every((s) => s.item.source === 'estimated');

  if (!activeCar && !loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.emptyText}>{t('home.noCar')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.carLabel}>
            {activeCar ? `${activeCar.brand} ${activeCar.model} · ${activeCar.year}` : '…'}
          </Text>
          <Text style={styles.mileage}>
            {activeCar ? activeCar.current_mileage_km.toLocaleString() : '—'} km
          </Text>
        </View>
        <Pressable style={styles.logBtn} onPress={openLogKm}>
          <Text style={styles.logBtnText}>{t('home.logKm')}</Text>
        </Pressable>
      </View>

      {isEstimated && (
        <View style={styles.estimatedBanner}>
          <Text style={styles.estimatedBannerText}>{t('home.estimatedBanner')}</Text>
        </View>
      )}

      <View style={styles.summaryRow}>
        {overdueCount > 0 && (
          <View style={[styles.chip, { backgroundColor: colors.overdue + '22' }]}>
            <Text style={[styles.chipText, { color: colors.overdue }]}>{t('home.overdueCount', { count: overdueCount })}</Text>
          </View>
        )}
        {dueSoonCount > 0 && (
          <View style={[styles.chip, { backgroundColor: colors.dueSoon + '22' }]}>
            <Text style={[styles.chipText, { color: colors.dueSoon }]}>{t('home.dueSoonCount', { count: dueSoonCount })}</Text>
          </View>
        )}
        {overdueCount === 0 && dueSoonCount === 0 && !loading && (
          <Text style={styles.allClear}>{t('home.allClear')}</Text>
        )}
        {error && <Text style={[styles.chipText, { color: colors.overdue }]}>{error}</Text>}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.orange} size="large" />
        </View>
      ) : (
        <FlatList
          data={statuses}
          keyExtractor={(s) => s.item.id}
          renderItem={({ item: s }) => (
            <ItemCard
              s={s}
              onPress={() => router.push(`/item/${s.item.id}`)}
              statusLabel={STATUS_LABEL[s.status]}
              estimatedLabel={t('home.estimatedInterval')}
              tapLabel={t('home.tapToLog')}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onRefresh={refresh}
          refreshing={loading}
          ListFooterComponent={
            <Pressable style={styles.addItemBtn} onPress={() => setAddVisible(true)}>
              <Text style={styles.addItemText}>{t('home.addCustomItem')}</Text>
            </Pressable>
          }
        />
      )}

      {/* Log km modal */}
      <Modal visible={logVisible} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{t('home.updateMileageTitle')}</Text>
            <Text style={styles.sheetSub}>
              {t('home.updateMileageCurrent', { mileage: activeCar?.current_mileage_km.toLocaleString() })}
            </Text>
            <TextInput
              style={styles.kmInput}
              value={newMileage}
              onChangeText={setNewMileage}
              keyboardType="numeric"
              placeholder={t('home.updateMileagePlaceholder')}
              placeholderTextColor={colors.steel}
              autoFocus
            />
            <View style={styles.actions}>
              <Pressable style={styles.cancelBtn} onPress={() => setLogVisible(false)}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
              <Pressable style={styles.saveBtn} onPress={saveKm} disabled={saving}>
                <Text style={styles.saveText}>{saving ? t('common.loading') : t('home.updateMileageSave')}</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Add custom item modal */}
      <Modal visible={addVisible} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{t('home.addCustomTitle')}</Text>
            <Text style={styles.sheetSub}>{t('home.addCustomSubtitle')}</Text>

            <Text style={styles.fieldLabel}>{t('home.addCustomName')}</Text>
            <TextInput
              style={styles.fieldInput}
              value={newItemName}
              onChangeText={setNewItemName}
              placeholder={t('home.addCustomNamePlaceholder')}
              placeholderTextColor={colors.steel}
              autoFocus
            />
            <Text style={styles.fieldLabel}>{t('home.addCustomKm')}</Text>
            <TextInput
              style={styles.fieldInput}
              value={newItemKm}
              onChangeText={setNewItemKm}
              keyboardType="numeric"
              placeholder={t('home.addCustomKmPlaceholder')}
              placeholderTextColor={colors.steel}
            />
            <Text style={styles.fieldLabel}>{t('home.addCustomDays')}</Text>
            <TextInput
              style={styles.fieldInput}
              value={newItemDays}
              onChangeText={setNewItemDays}
              keyboardType="numeric"
              placeholder={t('home.addCustomDaysPlaceholder')}
              placeholderTextColor={colors.steel}
            />
            <View style={styles.actions}>
              <Pressable style={styles.cancelBtn} onPress={() => setAddVisible(false)}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
              <Pressable style={styles.saveBtn} onPress={saveCustomItem} disabled={saving}>
                <Text style={styles.saveText}>{saving ? t('common.loading') : t('home.addCustomCta')}</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { ...typography.body, color: colors.textMuted },

  header: {
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md,
  },
  carLabel: { ...typography.label, color: colors.textMuted },
  mileage: { ...typography.monoLarge, color: colors.text, marginTop: 2 },
  logBtn: {
    backgroundColor: colors.orange, borderRadius: radii.pill,
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
  },
  logBtnText: { ...typography.button, color: colors.engineBlack, fontSize: 14 },

  summaryRow: {
    flexDirection: 'row', gap: spacing.sm,
    paddingHorizontal: spacing.lg, paddingBottom: spacing.md,
  },
  chip: { borderRadius: radii.pill, paddingVertical: 4, paddingHorizontal: spacing.md },
  chipText: { ...typography.label, fontSize: 12 },
  allClear: { ...typography.body, color: colors.healthy, fontWeight: '600' },

  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.surface, borderRadius: radii.md,
    borderLeftWidth: 4, padding: spacing.md, marginBottom: spacing.sm,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { ...typography.body, color: colors.text, fontWeight: '600', flex: 1 },
  badge: { borderRadius: radii.pill, paddingVertical: 2, paddingHorizontal: spacing.sm, marginLeft: spacing.sm },
  badgeText: { ...typography.label, fontSize: 10 },
  cardLine: { ...typography.body, color: colors.textMuted, marginTop: 4 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  estimated: { ...typography.label, color: colors.steel, fontSize: 9 },
  tapHint: { ...typography.label, color: colors.orange, fontSize: 10, marginLeft: 'auto' },

  estimatedBanner: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  estimatedBannerText: { ...typography.body, color: colors.textMuted, fontSize: 13 },

  addItemBtn: { alignItems: 'center', paddingVertical: spacing.lg },
  addItemText: { ...typography.body, color: colors.textMuted },

  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: colors.carbon, borderTopLeftRadius: 20,
    borderTopRightRadius: 20, padding: spacing.lg, paddingBottom: 40,
  },
  sheetTitle: { ...typography.title, color: colors.text, fontSize: 20, marginBottom: 6 },
  sheetSub: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
  fieldLabel: { ...typography.label, color: colors.textMuted, marginBottom: 4 },
  fieldInput: {
    ...typography.body, color: colors.text,
    borderBottomWidth: 1.5, borderBottomColor: colors.border,
    paddingVertical: spacing.sm, marginBottom: spacing.md,
  },
  kmInput: {
    ...typography.mono, fontSize: 28, color: colors.text,
    borderBottomWidth: 2, borderBottomColor: colors.orange,
    paddingVertical: spacing.sm, marginBottom: spacing.lg,
  },
  actions: { flexDirection: 'row', gap: spacing.sm },
  cancelBtn: {
    flex: 1, borderWidth: 1, borderColor: colors.border,
    borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center',
  },
  cancelText: { ...typography.button, color: colors.textMuted },
  saveBtn: {
    flex: 1, backgroundColor: colors.orange,
    borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center',
  },
  saveText: { ...typography.button, color: colors.engineBlack },
});
