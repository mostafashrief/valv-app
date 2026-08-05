import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator,
  Modal, TextInput, KeyboardAvoidingView, Platform, Alert, ScrollView, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useCar } from '../../lib/car-context';
import { calcItemStatus } from '../../lib/maintenance';
import type { MaintenanceItem, MaintenanceStatus } from '../../types/car';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const PARSE_RECEIPT_FN = `${SUPABASE_URL}/functions/v1/parse-receipt`;

const STATUS_COLOR: Record<MaintenanceStatus, string> = {
  overdue: colors.overdue,
  dueSoon: colors.dueSoon,
  healthy: colors.healthy,
};
const STATUS_LABEL: Record<MaintenanceStatus, string> = {
  overdue: 'Overdue',
  dueSoon: 'Due soon',
  healthy: 'OK',
};

interface ServiceLog {
  id: string;
  done_at_km: number | null;
  done_at: string;
  cost_egp: number | null;
  notes: string | null;
  receipt_url: string | null;
}

export default function ItemDetail() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { activeCar, reloadCars } = useCar();

  const [item, setItem] = useState<MaintenanceItem | null>(null);
  const [logs, setLogs] = useState<ServiceLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Log modal
  const [logVisible, setLogVisible] = useState(false);
  const [doneAtKm, setDoneAtKm] = useState('');
  const [doneAtDate, setDoneAtDate] = useState('');
  const [costEgp, setCostEgp] = useState('');
  const [notes, setNotes] = useState('');
  const [receiptUri, setReceiptUri] = useState<string | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    const [{ data: itemData }, { data: logData }] = await Promise.all([
      supabase.from('maintenance_items').select('*').eq('id', id).single(),
      supabase.from('service_logs').select('*').eq('item_id', id).order('done_at', { ascending: false }),
    ]);

    if (itemData) {
      setItem({
        id: itemData.id,
        name: itemData.name,
        intervalKm: itemData.interval_km ?? undefined,
        intervalDays: itemData.interval_days ?? undefined,
        lastDoneAtKm: itemData.last_done_at_km ?? undefined,
        lastDoneAtDate: itemData.last_done_at ? itemData.last_done_at.split('T')[0] : undefined,
        source: itemData.source,
      });
    }

    setLogs((logData ?? []) as ServiceLog[]);
    setLoading(false);
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const openLog = () => {
    setDoneAtKm(String(activeCar?.current_mileage_km ?? ''));
    setDoneAtDate(new Date().toISOString().split('T')[0]);
    setCostEgp('');
    setNotes('');
    setReceiptUri(null);
    setReceiptUrl(null);
    setLogVisible(true);
  };

  // ── Receipt upload + AI parse ─────────────────────────────────────────────
  const pickAndParseReceipt = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('Permission needed', 'Allow photo access to upload receipts.'); return; }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (result.canceled || !result.assets[0]) return;

    const asset = result.assets[0];
    setReceiptUri(asset.uri);
    setParsing(true);

    try {
      // Upload to Supabase Storage
      const ext = asset.uri.split('.').pop() ?? 'jpg';
      const path = `receipts/${Date.now()}.${ext}`;
      const blob = await (await fetch(asset.uri)).blob();

      const { error: uploadErr } = await supabase.storage
        .from('receipts')
        .upload(path, blob, { contentType: `image/${ext}`, upsert: true });

      if (uploadErr) throw uploadErr;

      const { data: urlData } = supabase.storage.from('receipts').getPublicUrl(path);
      const publicUrl = urlData.publicUrl;
      setReceiptUrl(publicUrl);

      // Call AI parse function
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(PARSE_RECEIPT_FN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ image_url: publicUrl }),
      });

      if (res.ok) {
        const parsed = await res.json();
        if (parsed.done_at_km) setDoneAtKm(String(parsed.done_at_km));
        if (parsed.done_at_date) setDoneAtDate(parsed.done_at_date);
        if (parsed.cost_egp) setCostEgp(String(parsed.cost_egp));
        if (parsed.notes) setNotes(parsed.notes);
      }
    } catch (err) {
      Alert.alert('Upload failed', String(err));
    } finally {
      setParsing(false);
    }
  };

  // ── Save service log ──────────────────────────────────────────────────────
  const saveLog = async () => {
    if (!item || !activeCar) return;
    const km = doneAtKm ? parseInt(doneAtKm.replace(/,/g, ''), 10) : null;
    const cost = costEgp ? parseFloat(costEgp) : null;

    if (km !== null && isNaN(km)) { Alert.alert('Invalid km', 'Enter a valid number.'); return; }

    setSaving(true);

    const logDate = doneAtDate || new Date().toISOString().split('T')[0];

    const [{ error: logErr }, { error: itemErr }] = await Promise.all([
      supabase.from('service_logs').insert({
        car_id: activeCar.id,
        item_id: item.id,
        done_at_km: km,
        done_at: logDate,
        cost_egp: cost,
        notes: notes || null,
        receipt_url: receiptUrl,
      }),
      supabase.from('maintenance_items').update({
        last_done_at_km: km ?? activeCar.current_mileage_km,
        last_done_at: new Date(logDate).toISOString(),
      }).eq('id', item.id),
    ]);

    setSaving(false);
    if (logErr || itemErr) { Alert.alert('Error', (logErr ?? itemErr)!.message); return; }
    setLogVisible(false);
    loadData();
    reloadCars();
  };

  if (loading || !item) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.orange} size="large" />
      </SafeAreaView>
    );
  }

  const status = activeCar ? calcItemStatus(item, activeCar.current_mileage_km) : null;
  const accent = status ? STATUS_COLOR[status.status] : colors.textMuted;
  const totalSpent = logs.reduce((sum, l) => sum + (l.cost_egp ?? 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          {status && (
            <View style={[styles.statusBadge, { backgroundColor: accent + '22' }]}>
              <Text style={[styles.statusBadgeText, { color: accent }]}>
                {STATUS_LABEL[status.status]}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Status card */}
      {status && (
        <View style={[styles.statusCard, { borderLeftColor: accent }]}>
          <Text style={styles.statusLine}>{status.overdueLine || t('itemDetail.upToDate')}</Text>
          {item.intervalKm && (
            <Text style={styles.statusSub}>Every {item.intervalKm.toLocaleString()} km</Text>
          )}
          {item.intervalDays && (
            <Text style={styles.statusSub}>Every {item.intervalDays} days</Text>
          )}
          {totalSpent > 0 && (
            <Text style={styles.statusSub}>Total spent: {totalSpent.toLocaleString()} EGP</Text>
          )}
        </View>
      )}

      {/* History */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>{t('itemDetail.serviceHistory')}</Text>
      </View>

      {logs.length === 0 ? (
        <View style={styles.emptyHistory}>
          <Text style={styles.emptyText}>{t('itemDetail.noHistory')}</Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(l) => l.id}
          contentContainerStyle={styles.logList}
          renderItem={({ item: log }) => (
            <View style={styles.logCard}>
              <View style={styles.logRow}>
                <Text style={styles.logDate}>{log.done_at}</Text>
                {log.cost_egp != null && (
                  <Text style={styles.logCost}>{log.cost_egp.toLocaleString()} EGP</Text>
                )}
              </View>
              {log.done_at_km != null && (
                <Text style={styles.logKm}>{log.done_at_km.toLocaleString()} km</Text>
              )}
              {log.notes && <Text style={styles.logNotes}>{log.notes}</Text>}
              {log.receipt_url && (
                <Image source={{ uri: log.receipt_url }} style={styles.receiptThumb} resizeMode="cover" />
              )}
            </View>
          )}
        />
      )}

      {/* Log service FAB */}
      <Pressable style={styles.fab} onPress={openLog}>
        <Text style={styles.fabText}>{t('itemDetail.logService')}</Text>
      </Pressable>

      {/* Log modal */}
      <Modal visible={logVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.overlay}
        >
          <ScrollView style={styles.sheet} contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
            <Text style={styles.sheetTitle}>{item.name}</Text>
            <Text style={styles.sheetSub}>{t('itemDetail.logTitle')}</Text>

            <Text style={styles.fieldLabel}>{t('itemDetail.doneAtKm')}</Text>
            <TextInput
              style={styles.fieldInput}
              value={doneAtKm}
              onChangeText={setDoneAtKm}
              keyboardType="numeric"
              placeholder={t('itemDetail.odometerPlaceholder')}
              placeholderTextColor={colors.textMuted}
            />

            <Text style={styles.fieldLabel}>{t('itemDetail.doneAtDate')}</Text>
            <TextInput
              style={styles.fieldInput}
              value={doneAtDate}
              onChangeText={setDoneAtDate}
              placeholder={t('itemDetail.datePlaceholder')}
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
            />

            <Text style={styles.fieldLabel}>{t('itemDetail.cost')}</Text>
            <TextInput
              style={styles.fieldInput}
              value={costEgp}
              onChangeText={setCostEgp}
              keyboardType="numeric"
              placeholder={t('itemDetail.costPlaceholder')}
              placeholderTextColor={colors.textMuted}
            />

            <Text style={styles.fieldLabel}>{t('itemDetail.notes')}</Text>
            <TextInput
              style={[styles.fieldInput, { height: 72, textAlignVertical: 'top' }]}
              value={notes}
              onChangeText={setNotes}
              placeholder={t('itemDetail.notesPlaceholder')}
              placeholderTextColor={colors.textMuted}
              multiline
            />

            {/* Receipt upload */}
            <Pressable style={styles.receiptBtn} onPress={pickAndParseReceipt} disabled={parsing}>
              {parsing ? (
                <ActivityIndicator color={colors.orange} size="small" />
              ) : receiptUri ? (
                <Image source={{ uri: receiptUri }} style={styles.receiptPreview} resizeMode="cover" />
              ) : (
                <Text style={styles.receiptBtnText}>{t('addService.receiptUpload')}</Text>
              )}
            </Pressable>

            <View style={styles.actions}>
              <Pressable style={styles.cancelBtn} onPress={() => setLogVisible(false)}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
              <Pressable style={styles.saveBtn} onPress={saveLog} disabled={saving}>
                <Text style={styles.saveText}>{saving ? t('common.loading') : t('common.save')}</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  backBtn: { padding: 4 },
  backText: { fontSize: 24, color: colors.text },
  headerInfo: { flex: 1, gap: 6 },
  itemName: { ...typography.title, color: colors.text, fontSize: 22 },
  statusBadge: { alignSelf: 'flex-start', borderRadius: radii.pill, paddingVertical: 3, paddingHorizontal: spacing.md },
  statusBadgeText: { ...typography.label, fontSize: 11 },

  statusCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderLeftWidth: 4,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statusLine: { ...typography.body, color: colors.text, fontWeight: '600' },
  statusSub: { ...typography.body, color: colors.textMuted, fontSize: 13, marginTop: 4 },

  sectionHeader: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  sectionLabel: { ...typography.label, color: colors.textMuted },

  emptyHistory: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { ...typography.body, color: colors.textMuted },

  logList: { paddingHorizontal: spacing.lg, paddingBottom: 100 },
  logCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  logRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  logDate: { ...typography.label, color: colors.textMuted },
  logCost: { ...typography.mono, color: colors.orange, fontSize: 13 },
  logKm: { ...typography.mono, color: colors.text, fontSize: 13 },
  logNotes: { ...typography.body, color: colors.textMuted, fontSize: 13, marginTop: 4 },
  receiptThumb: { width: '100%', height: 120, borderRadius: radii.sm, marginTop: 8 },

  fab: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    backgroundColor: colors.orange,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  fabText: { ...typography.button, color: colors.espresso },

  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: colors.carbon,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    maxHeight: '90%',
  },
  sheetTitle: { ...typography.title, color: colors.text, fontSize: 20, marginBottom: 4 },
  sheetSub: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
  fieldLabel: { ...typography.label, color: colors.textMuted, marginBottom: 4 },
  fieldInput: {
    ...typography.body,
    color: colors.text,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  receiptBtn: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    minHeight: 56,
    justifyContent: 'center',
  },
  receiptBtnText: { ...typography.body, color: colors.textMuted },
  receiptPreview: { width: '100%', height: 140, borderRadius: radii.sm },
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
  saveText: { ...typography.button, color: colors.espresso },
});
