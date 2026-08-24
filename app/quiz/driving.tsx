import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuiz, type MileageReminderFrequency } from '../../lib/quiz-context';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { colors, radii, spacing, typography } from '../../constants/theme';

const OPTIONS: { value: MileageReminderFrequency; label: string; sub: string }[] = [
  { value: 'daily',    label: 'Every day',     sub: 'I drive a lot — I want it always accurate' },
  { value: 'weekly',   label: 'Every week',    sub: 'Regular driver, ~1,000–2,000 km/month' },
  { value: 'biweekly', label: 'Every 2 weeks', sub: 'Average driver, ~500–1,000 km/month' },
  { value: 'monthly',  label: 'Once a month',  sub: 'I don\'t drive much — a monthly check is fine' },
];

export default function QuizDriving() {
  const { setDraft } = useQuiz();
  const [selected, setSelected] = useState<MileageReminderFrequency | null>(null);

  const handleNext = () => {
    if (!selected) return;
    setDraft({ mileageReminderFrequency: selected });
    router.push('/quiz/done');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <Text style={styles.step}>Step 6 of 6</Text>
        <Text style={styles.title}>How often should we remind you to update your mileage?</Text>
        <Text style={styles.subtitle}>
          The more you drive, the more often you should update — it keeps your reminders accurate.
        </Text>

        <View style={styles.options}>
          {OPTIONS.map((o) => (
            <Pressable
              key={o.value}
              style={[styles.option, selected === o.value && styles.optionActive]}
              onPress={() => setSelected(o.value)}
            >
              <View style={styles.optionInner}>
                <Text style={[styles.optionLabel, selected === o.value && styles.optionLabelActive]}>
                  {o.label}
                </Text>
                <Text style={styles.optionSub}>{o.sub}</Text>
              </View>
              {selected === o.value && <Text style={styles.check}>✓</Text>}
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Finish →" onPress={handleNext} disabled={!selected} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 28, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textMuted, fontSize: 14, marginBottom: spacing.xl, lineHeight: 20 },
  options: { gap: spacing.sm },
  option: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionActive: { borderColor: colors.orange, backgroundColor: colors.orange + '12' },
  optionInner: { flex: 1 },
  optionLabel: { ...typography.body, color: colors.text, fontWeight: '600', fontSize: 15 },
  optionLabelActive: { color: colors.orange },
  optionSub: { ...typography.body, color: colors.textMuted, fontSize: 12, marginTop: 2 },
  check: { fontSize: 16, color: colors.orange, marginLeft: spacing.sm },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
