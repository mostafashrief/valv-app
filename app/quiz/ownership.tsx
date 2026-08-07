import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuiz, type OwnershipDuration } from '../../lib/quiz-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

const OPTIONS: { value: OwnershipDuration; label: string; sub: string }[] = [
  { value: 'new',      label: 'Brand new',           sub: 'Just got it' },
  { value: 'under_6m', label: 'Less than 6 months',  sub: 'Still getting to know it' },
  { value: '6m_2y',    label: '6 months – 2 years',  sub: 'Getting comfortable' },
  { value: '2_5y',     label: '2 – 5 years',         sub: 'You know this car' },
  { value: 'over_5y',  label: 'More than 5 years',   sub: 'Old friends' },
];

export default function QuizOwnership() {
  const { setDraft } = useQuiz();

  const handleSelect = (value: OwnershipDuration) => {
    setDraft({ ownershipDuration: value });
    router.push('/quiz/records');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.step}>4 of 6</Text>
        <Text style={styles.title}>اشتريتها امتى؟</Text>
        <Text style={styles.subtitle}>How long have you owned this car?</Text>
        <View style={styles.options}>
          {OPTIONS.map((o) => (
            <Pressable key={o.value} style={styles.option} onPress={() => handleSelect(o.value)}>
              <Text style={styles.optionLabel}>{o.label}</Text>
              <Text style={styles.optionSub}>{o.sub}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, justifyContent: 'center' },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 32 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: spacing.xl },
  options: { gap: spacing.sm },
  option: {
    backgroundColor: colors.surface, borderRadius: radii.md,
    borderWidth: 1.5, borderColor: colors.border,
    paddingVertical: spacing.md, paddingHorizontal: spacing.lg,
  },
  optionLabel: { ...typography.body, color: colors.text, fontSize: 16, fontWeight: '600' },
  optionSub: { ...typography.body, color: colors.textMuted, fontSize: 13, marginTop: 2 },
});
