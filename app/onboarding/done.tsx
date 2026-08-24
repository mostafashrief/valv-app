import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { useOnboarding } from '../../lib/onboarding-context';
import { supabase } from '../../lib/supabase';
import { setPendingItems } from '../../lib/pending-items';
import type { TransmissionType, TimingSystemType } from '../../types/car';

function buildDefaultItems(
  carId: string,
  transmission: TransmissionType | 'unknown',
  timingSystem: TimingSystemType | 'unknown',
  currentKm: number,
  now: string,
) {
  const base = [
    { name: 'Engine Oil & Filter',  interval_km: 10000, interval_days: 365 },
    { name: 'Engine Air Filter',    interval_km: 40000, interval_days: null },
    { name: 'Cabin Air Filter',     interval_km: 20000, interval_days: 365 },
    { name: 'Spark Plugs',          interval_km: 60000, interval_days: null },
    { name: 'Brake Fluid',          interval_km: null,  interval_days: 730 },
    { name: 'Tire Rotation',        interval_km: 10000, interval_days: 180 },
    { name: 'Coolant',              interval_km: 160000,interval_days: null },
    { name: 'Serpentine Belt',      interval_km: 100000,interval_days: null },
  ];

  if (transmission === 'automatic') {
    base.push({ name: 'Transmission Fluid (AT)', interval_km: 80000, interval_days: null });
  } else if (transmission === 'cvt') {
    base.push({ name: 'CVT Fluid', interval_km: 40000, interval_days: null });
  } else if (transmission === 'dsg') {
    base.push({ name: 'DSG Fluid', interval_km: 60000, interval_days: null });
  } else if (transmission === 'manual') {
    base.push({ name: 'Gearbox Oil', interval_km: 80000, interval_days: null });
  }

  if (timingSystem === 'belt') {
    base.push({ name: 'Timing Belt', interval_km: 60000, interval_days: 1825 });
  }

  const lastCheckpoint = (intervalKm: number) =>
    Math.floor(currentKm / intervalKm) * intervalKm;

  return base.map((item) => ({
    car_id: carId,
    name: item.name,
    interval_km: item.interval_km,
    interval_days: item.interval_days,
    last_done_at_km: item.interval_km ? lastCheckpoint(item.interval_km) : null,
    last_done_at: item.interval_days ? now : null,
    source: 'estimated' as const,
  }));
}
import { colors, spacing, typography } from '../../constants/theme';

export default function DoneStep() {
  const { t } = useTranslation();
  const { draft } = useOnboarding();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (!session?.user || !draft.brand || !draft.model || !draft.year) {
      router.replace('/(tabs)');
      return;
    }

    setLoading(true);
    setError(null);

    const { data: car, error: carError } = await supabase
      .from('cars')
      .insert({
        user_id: session.user.id,
        brand: draft.brand,
        model: draft.model,
        year: draft.year,
        current_mileage_km: draft.mileageKm ?? 0,
        transmission: draft.transmission ?? null,
        timing_system: draft.timingSystem ?? null,
      })
      .select()
      .single();

    if (carError || !car) {
      setLoading(false);
      setError(carError?.message ?? t('errors.generic'));
      return;
    }

    // Check for official OEM schedule first (petrol only, year-filtered)
    const { data: officialSchedule } = await supabase
      .from('maintenance_schedules')
      .select('*')
      .eq('brand', draft.brand)
      .or(`model.eq.${draft.model},model.is.null`)
      .or('engine_type.eq.petrol,engine_type.is.null');

    // Filter to rows that cover the user's model year
    const yearFiltered = (officialSchedule ?? []).filter((s) =>
      (s.year_from == null || s.year_from <= draft.year!) &&
      (s.year_to   == null || s.year_to   >= draft.year!)
    );

    const hasOfficialSchedule = yearFiltered.length > 0;
    const transmission = draft.transmission ?? 'automatic';
    const timingSystem = draft.timingSystem ?? 'unknown';

    // Names of items that only apply to certain configs — used to filter OEM rows
    const TIMING_BELT_NAMES = ['timing belt', 'timing belt tensioner', 'timing belt relay bearing', 'coolant pump drive belt'];
    const CVT_NAMES = ['cvt fluid'];
    const DSG_NAMES = ['dsg fluid', 's-tronic fluid', 'edc fluid'];
    const AT_NAMES = ['transmission fluid (at)', 'transmission fluid (zf 8hp)', 'transmission fluid (9g-tronic)', 'transmission fluid (7g-tronic)', 'transmission fluid (eat8)', 'transmission fluid (eat6)'];

    const filterItem = (name: string): boolean => {
      const n = name.toLowerCase();
      // Timing belt items: only include if user said belt
      if (TIMING_BELT_NAMES.some((t) => n.includes(t))) return timingSystem === 'belt';
      // CVT fluid: only if CVT
      if (CVT_NAMES.some((t) => n.includes(t))) return transmission === 'cvt';
      // DSG fluid: only if DSG
      if (DSG_NAMES.some((t) => n.includes(t))) return transmission === 'dsg';
      // AT fluid: only if automatic
      if (AT_NAMES.some((t) => n.includes(t))) return transmission === 'automatic';
      // Gearbox oil: only if manual
      if (n === 'gearbox oil') return transmission === 'manual';
      return true;
    };

    const now = new Date().toISOString();
    const currentKm = draft.mileageKm ?? 0;

    // Last checkpoint = most recent interval boundary before current mileage
    // e.g. 145,000 km with 10,000 km interval → last done at 140,000 km
    const lastCheckpoint = (intervalKm: number) =>
      Math.floor(currentKm / intervalKm) * intervalKm;

    const itemsToInsert = hasOfficialSchedule
      ? yearFiltered
          .filter((s) => filterItem(s.name))
          .map((s) => ({
            car_id: car.id,
            name: s.name,
            interval_km: s.interval_km ?? null,
            interval_days: s.interval_days ?? null,
            last_done_at_km: s.interval_km ? lastCheckpoint(s.interval_km) : null,
            last_done_at: s.interval_days ? now : null,
            source: 'verified' as const,
          }))
      : buildDefaultItems(car.id, transmission, timingSystem, currentKm, now);

    setLoading(false);

    // Hand items to services screen for user to confirm / uncheck overdue ones
    setPendingItems(itemsToInsert as any);
    router.replace('/onboarding/services');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>{t('onboarding.doneTitle')}</Text>
        <Text style={styles.title}>{t('onboarding.doneSubtitle')}</Text>
        <Text style={styles.carSummary}>
          {draft.brand} {draft.model} · {draft.year}
        </Text>
        <Text style={styles.mileage}>{draft.mileageKm?.toLocaleString()} km</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View style={styles.footer}>
        <Button label="Open my plan" onPress={handleFinish} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg },
  label: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text },
  carSummary: { ...typography.body, color: colors.textMuted, marginTop: spacing.lg },
  mileage: { ...typography.monoLarge, color: colors.text, marginTop: spacing.xs },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.md },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
