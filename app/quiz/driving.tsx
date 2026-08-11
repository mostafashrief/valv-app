import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useQuiz, type DrivesDaily, type DailyTrip, type IntercityTravel } from '../../lib/quiz-context';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { colors, radii, spacing, typography } from '../../constants/theme';

function OptionRow({ label, sub, selected, onPress }: {
  label: string; sub?: string; selected: boolean; onPress: () => void;
}) {
  return (
    <Pressable style={[styles.option, selected && styles.optionActive]} onPress={onPress}>
      <Text style={[styles.optionLabel, selected && styles.optionLabelActive]}>{label}</Text>
      {sub && <Text style={styles.optionSub}>{sub}</Text>}
    </Pressable>
  );
}

export default function QuizDriving() {
  const { t } = useTranslation();
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

  const DRIVES_DAILY: { value: DrivesDaily; label: string }[] = [
    { value: 'every_day',  label: t('quiz.driving.every_day') },
    { value: 'most_days',  label: t('quiz.driving.most_days') },
    { value: 'few_times',  label: t('quiz.driving.few_times') },
    { value: 'weekends',   label: t('quiz.driving.weekends') },
  ];

  const DAILY_TRIP: { value: DailyTrip; label: string; sub: string }[] = [
    { value: 'under_10', label: t('quiz.driving.under_10'), sub: t('quiz.driving.under_10Sub') },
    { value: '10_30',    label: t('quiz.driving.10_30'),    sub: t('quiz.driving.10_30Sub') },
    { value: '30_60',    label: t('quiz.driving.30_60'),    sub: t('quiz.driving.30_60Sub') },
    { value: '60_plus',  label: t('quiz.driving.60_plus'),  sub: t('quiz.driving.60_plusSub') },
  ];

  const INTERCITY: { value: IntercityTravel; label: string }[] = [
    { value: 'rarely',   label: t('quiz.driving.rarely') },
    { value: 'few_year', label: t('quiz.driving.few_year') },
    { value: 'monthly',  label: t('quiz.driving.monthly') },
    { value: 'weekly',   label: t('quiz.driving.weekly') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.step}>{t('quiz.step', { current: 6, total: 6 })}</Text>
        <Text style={styles.title}>{t('quiz.driving.title')}</Text>
        <Text style={styles.subtitle}>{t('quiz.driving.subtitle')}</Text>

        <Text style={styles.sectionLabel}>{t('quiz.driving.frequencyLabel')}</Text>
        <View style={styles.options}>
          {DRIVES_DAILY.map((o) => (
            <OptionRow key={o.value} label={o.label}
              selected={drivesDaily === o.value} onPress={() => setDrivesDaily(o.value)} />
          ))}
        </View>

        <Text style={styles.sectionLabel}>{t('quiz.driving.tripLabel')}</Text>
        <View style={styles.options}>
          {DAILY_TRIP.map((o) => (
            <OptionRow key={o.value} label={o.label} sub={o.sub}
              selected={dailyTrip === o.value} onPress={() => setDailyTrip(o.value)} />
          ))}
        </View>

        <Text style={styles.sectionLabel}>{t('quiz.driving.intercityLabel')}</Text>
        <View style={styles.options}>
          {INTERCITY.map((o) => (
            <OptionRow key={o.value} label={o.label}
              selected={intercity === o.value} onPress={() => setIntercity(o.value)} />
          ))}
        </View>

        <View style={styles.footer}>
          <Button label={t('quiz.driving.next')} onPress={handleNext} disabled={!canContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
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
