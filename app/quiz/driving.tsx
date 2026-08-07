import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuiz, type DrivesDaily, type DailyTrip, type IntercityTravel } from '../../lib/quiz-context';
import { Button } from '../../components/Button';
import { colors, radii, spacing, typography } from '../../constants/theme';

const DRIVES_DAILY: { value: DrivesDaily; label: string }[] = [
  { value: 'every_day',  label: 'Every day' },
  { value: 'most_days',  label: 'Most days (4–5 days/week)' },
  { value: 'few_times',  label: 'A few times a week' },
  { value: 'weekends',   label: 'Mostly weekends' },
];

const DAILY_TRIP: { value: DailyTrip; label: string; sub: string }[] = [
  { value: 'under_10', label: 'Short errands',        sub: 'Under 10 km a day' },
  { value: '10_30',    label: 'Work or school',        sub: '10 – 30 km a day' },
  { value: '30_60',    label: 'Longer commute',        sub: '30 – 60 km a day' },
  { value: '60_plus',  label: 'Heavy daily use',       sub: 'More than 60 km a day' },
];

const INTERCITY: { value: IntercityTravel; label: string }[] = [
  { value: 'rarely',   label: 'Rarely or never' },
  { value: 'few_year', label: 'A few times a year' },
  { value: 'monthly',  label: 'Once a month or so' },
  { value: 'weekly',   label: 'Every week' },
];

function OptionRow({ label, sub, selected, onPress }: {
  label: string; sub?: string; selected: boolean; onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.option, selected && styles.optionActive]}
      onPress={onPress}
    >
      <Text style={[styles.optionLabel, selected && styles.optionLabelActive]}>{label}</Text>
      {sub && <Text style={styles.optionSub}>{sub}</Text>}
    </Pressable>
  );
}

export default function QuizDriving() {
  const { draft, setDraft } = useQuiz();
  const [drivesDaily, setDrivesDaily] = useState<DrivesDaily | null>(draft.drivesDaily ?? null);
  const [dailyTrip, setDailyTrip] = useState<DailyTrip | null>(draft.dailyTrip ?? null);
  const [intercity, setIntercity] = useState<IntercityTravel | null>(draft.intercityTravel ?? null);

  const canContinue = drivesDaily && dailyTrip && intercity;

  const handleNext = () => {
    if (!canContinue) return;
    setDraft({ drivesDaily, dailyTrip, intercityTravel: intercity });
    router.push('/quiz/done');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.step}>6 of 6</Text>
        <Text style={styles.title}>بتمشي إزاي؟</Text>
        <Text style={styles.subtitle}>Tell us about how you use your car.</Text>

        <Text style={styles.sectionLabel}>How often do you drive?</Text>
        <View style={styles.options}>
          {DRIVES_DAILY.map((o) => (
            <OptionRow
              key={o.value} label={o.label}
              selected={drivesDaily === o.value}
              onPress={() => setDrivesDaily(o.value)}
            />
          ))}
        </View>

        <Text style={styles.sectionLabel}>What's your typical daily trip?</Text>
        <View style={styles.options}>
          {DAILY_TRIP.map((o) => (
            <OptionRow
              key={o.value} label={o.label} sub={o.sub}
              selected={dailyTrip === o.value}
              onPress={() => setDailyTrip(o.value)}
            />
          ))}
        </View>

        <Text style={styles.sectionLabel}>Do you travel between cities?</Text>
        <View style={styles.options}>
          {INTERCITY.map((o) => (
            <OptionRow
              key={o.value} label={o.label}
              selected={intercity === o.value}
              onPress={() => setIntercity(o.value)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Button label="Almost done →" onPress={handleNext} disabled={!canContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 32 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: spacing.xl },
  sectionLabel: { ...typography.label, color: colors.textMuted, marginBottom: spacing.sm, marginTop: spacing.lg },
  options: { gap: spacing.sm },
  option: {
    backgroundColor: colors.surface, borderRadius: radii.md,
    borderWidth: 1.5, borderColor: colors.border,
    paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.md,
  },
  optionActive: { borderColor: colors.orange, backgroundColor: colors.orange + '18' },
  optionLabel: { ...typography.body, color: colors.text, fontSize: 15 },
  optionLabelActive: { color: colors.orange, fontWeight: '600' },
  optionSub: { ...typography.body, color: colors.textMuted, fontSize: 12, marginTop: 2 },
  footer: { marginTop: spacing.xl },
});
