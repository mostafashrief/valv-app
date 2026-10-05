import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView, Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { useOnboarding } from '../../lib/onboarding-context';
import { useQuiz } from '../../lib/quiz-context';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { CAR_BRANDS_SEED, MODEL_YEAR_RANGES } from '../../data/cars-seed';
import { colors, radii, spacing, typography } from '../../constants/theme';
import type { TransmissionType, TimingSystemType } from '../../types/car';

const CURRENT_YEAR = new Date().getFullYear();

async function inferEngineConfig(brand: string, model: string) {
  const { data } = await supabase
    .from('maintenance_schedules')
    .select('name')
    .eq('brand', brand)
    .eq('model', model)
    .eq('data_source', 'official_dealer');

  if (!data || data.length === 0) return null;
  const names = data.map((r: any) => r.name.toLowerCase());

  let transmission: TransmissionType = 'automatic';
  if (names.some((n: string) => n.includes('dsg') || n.includes('dct'))) transmission = 'dsg';
  else if (names.some((n: string) => n.includes('cvt'))) transmission = 'cvt';
  else if (names.some((n: string) => n.includes('gearbox oil'))) transmission = 'manual';

  const timingSystem: TimingSystemType = names.some((n: string) =>
    n.includes('timing belt'),
  ) ? 'belt' : 'chain';

  return { transmission, timingSystem };
}

function SectionLabel({ label }: { label: string }) {
  return <Text style={styles.sectionLabel}>{label}</Text>;
}

function Chip({
  label, active, onPress,
}: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export default function CarDetailsStep() {
  const { setDraft } = useOnboarding();
  const { draft: quizDraft } = useQuiz();
  const isInitialQuiz = !!quizDraft.firstName;

  const [brand, setBrand]   = useState('');
  const [model, setModel]   = useState('');
  const [year,  setYear]    = useState<number | null>(null);
  const [km,    setKm]      = useState('');
  const [loading, setLoading] = useState(false);

  const brandObj  = CAR_BRANDS_SEED.find((b) => b.brand === brand);
  const models    = brandObj?.models ?? [];

  const yearRange = MODEL_YEAR_RANGES.find((r) => r.brand === brand && r.model === model);
  const yearFrom  = yearRange?.yearFrom ?? 2000;
  const yearTo    = yearRange?.yearTo   ?? CURRENT_YEAR;
  const years     = Array.from({ length: yearTo - yearFrom + 1 }, (_, i) => yearTo - i);

  const mileage   = parseInt(km.replace(/,/g, ''), 10);
  const isValid   = !!brand && !!model && year != null && !Number.isNaN(mileage) && mileage >= 0;

  const handleNext = async () => {
    if (!isValid) return;
    setLoading(true);
    setDraft({ brand, model, year: year!, mileageKm: mileage });

    const inferred = await inferEngineConfig(brand, model);
    if (inferred) {
      setDraft({ brand, model, year: year!, mileageKm: mileage, ...inferred });
      setLoading(false);
      router.push('/onboarding/confirm');
    } else {
      setLoading(false);
      router.push('/onboarding/engine');
    }
  };

  const handleBrandSelect = (b: string) => {
    setBrand(b);
    setModel('');
    setYear(null);
  };

  const handleModelSelect = (m: string) => {
    setModel(m);
    setYear(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.step}>2 / 5</Text>
        <Text style={styles.title}>Your car</Text>
        <Text style={styles.sub}>Tell us what you drive.</Text>

        {/* ── Brand ── */}
        <SectionLabel label="Brand" />
        <View style={styles.chipRow}>
          {CAR_BRANDS_SEED.map((b) => (
            <Chip
              key={b.brand}
              label={b.brand}
              active={brand === b.brand}
              onPress={() => handleBrandSelect(b.brand)}
            />
          ))}
          <Pressable
            style={[styles.chip, styles.chipSuggest]}
            onPress={() => router.push('/onboarding/suggest')}
          >
            <Text style={[styles.chipText, { color: colors.orange }]}>My car isn't here →</Text>
          </Pressable>
        </View>

        {/* ── Model ── */}
        {brand !== '' && (
          <>
            <SectionLabel label="Model" />
            <View style={styles.chipRow}>
              {models.map((m) => (
                <Chip
                  key={m}
                  label={m}
                  active={model === m}
                  onPress={() => handleModelSelect(m)}
                />
              ))}
            </View>
          </>
        )}

        {/* ── Year ── */}
        {model !== '' && (
          <>
            <SectionLabel label="Year" />
            <View style={styles.chipRow}>
              {years.map((y) => (
                <Chip
                  key={y}
                  label={String(y)}
                  active={year === y}
                  onPress={() => setYear(y)}
                />
              ))}
            </View>
          </>
        )}

        {/* ── Mileage ── */}
        {year != null && (
          <>
            <SectionLabel label="Current mileage (km)" />
            <TextInput
              style={styles.mileageInput}
              keyboardType="number-pad"
              placeholder="e.g. 48200"
              placeholderTextColor={colors.textMuted}
              value={km}
              onChangeText={setKm}
              autoFocus={false}
            />
          </>
        )}

        <View style={styles.footer}>
          <Button
            label="Next →"
            onPress={handleNext}
            disabled={!isValid}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: colors.background },
  scroll:       { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
  step:         { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title:        { ...typography.title, color: colors.text, fontSize: 28, marginBottom: 6 },
  sub:          { ...typography.body, color: colors.textMuted, fontSize: 14, marginBottom: spacing.lg },
  sectionLabel: { ...typography.label, color: colors.textMuted, fontSize: 11, marginTop: spacing.lg, marginBottom: spacing.sm },
  chipRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive:      { borderColor: colors.orange, backgroundColor: colors.orange + '18' },
  chipSuggest:     { borderStyle: 'dashed' },
  chipText:        { ...typography.body, color: colors.text, fontSize: 13 },
  chipTextActive:  { color: colors.orange, fontWeight: '600' },
  mileageInput: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...typography.body,
    color: colors.text,
    fontSize: 22,
    fontFamily: 'Courier',
  },
  footer: { marginTop: spacing.xl },
});
