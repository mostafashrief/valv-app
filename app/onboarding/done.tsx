import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { useCar } from '../../lib/car-context';
import { useOnboarding } from '../../lib/onboarding-context';
import { useQuiz } from '../../lib/quiz-context';
import { supabase } from '../../lib/supabase';
import { setPendingItems } from '../../lib/pending-items';
import { colors, spacing, typography } from '../../constants/theme';

// Items that only apply to specific drivetrain configs
const TIMING_BELT_NAMES = ['timing belt', 'coolant pump drive belt'];
const DSG_NAMES   = ['dsg fluid', 's-tronic fluid', 'edc fluid'];
const CVT_NAMES   = ['cvt fluid', 'cvt oil'];
const AT_NAMES    = ['transmission fluid (at)'];
const MANUAL_NAMES = ['gearbox oil', 'manual transmission oil'];

function filterItem(name: string, transmission: string, timingSystem: string): boolean {
  const n = name.toLowerCase();
  if (TIMING_BELT_NAMES.some((t) => n.includes(t))) return timingSystem === 'belt';
  if (DSG_NAMES.some((t) => n.includes(t)))         return transmission === 'dsg';
  if (CVT_NAMES.some((t) => n.includes(t)))         return transmission === 'cvt';
  if (AT_NAMES.some((t) => n.includes(t)))          return transmission === 'automatic';
  if (MANUAL_NAMES.some((t) => n.includes(t)))      return transmission === 'manual';
  return true;
}

export default function DoneStep() {
  const { t } = useTranslation();
  const { draft } = useOnboarding();
  const { session } = useAuth();
  const { setActiveCar } = useCar();
  const { draft: quizDraft } = useQuiz();
  // If quiz profile data is in context, we're mid initial-setup → continue to quiz after saving car
  const isInitialQuiz = !!quizDraft.firstName;
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

    // Immediately set active car so home screen loads without waiting for context reload
    await setActiveCar(car as any);

    const { data: schedule } = await supabase
      .from('maintenance_schedules')
      .select('*')
      .eq('brand', draft.brand)
      .or(`model.eq.${draft.model},model.is.null`)
      .or('engine_type.eq.petrol,engine_type.is.null');

    const items = (schedule ?? [])
      .filter((s) =>
        (s.year_from == null || s.year_from <= draft.year!) &&
        (s.year_to   == null || s.year_to   >= draft.year!)
      )
      .filter((s) => filterItem(s.name, draft.transmission ?? 'automatic', draft.timingSystem ?? 'chain'));

    const currentKm = draft.mileageKm ?? 0;
    const now = new Date().toISOString();
    const lastCheckpoint = (km: number) => Math.floor(currentKm / km) * km;

    const itemsToInsert = items.map((s) => ({
      car_id: car.id,
      name: s.name,
      interval_km: s.interval_km ?? null,
      interval_days: s.interval_days ?? null,
      last_done_at_km: s.interval_km ? lastCheckpoint(s.interval_km) : null,
      last_done_at: s.interval_days ? now : null,
      source: draft.brand as string,
    }));

    setLoading(false);
    setPendingItems(itemsToInsert as any, currentKm);
    // Initial quiz: continue to records step; adding extra car: go to services review
    router.replace(isInitialQuiz ? '/quiz/records' : '/onboarding/services');
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
