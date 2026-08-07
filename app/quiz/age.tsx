import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuiz, type AgeRange } from '../../lib/quiz-context';
import { colors, radii, spacing, typography } from '../../constants/theme';

const OPTIONS: { value: AgeRange; label: string }[] = [
  { value: 'under_20', label: 'Under 20' },
  { value: '20_30',    label: '20 – 30' },
  { value: '30_45',    label: '30 – 45' },
  { value: '45_plus',  label: '45+' },
];

export default function QuizAge() {
  const { draft, setDraft } = useQuiz();

  const handleSelect = (value: AgeRange) => {
    setDraft({ ageRange: value });
    router.push('/onboarding/brand');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.step}>2 of 6</Text>
        <Text style={styles.title}>عندك كام سنة؟</Text>
        <Text style={styles.subtitle}>How old are you?</Text>
        <View style={styles.options}>
          {OPTIONS.map((o) => (
            <Pressable
              key={o.value}
              style={[styles.option, draft.ageRange === o.value && styles.optionActive]}
              onPress={() => handleSelect(o.value)}
            >
              <Text style={[styles.optionText, draft.ageRange === o.value && styles.optionTextActive]}>
                {o.label}
              </Text>
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
  optionActive: { borderColor: colors.orange, backgroundColor: colors.orange + '18' },
  optionText: { ...typography.body, color: colors.text, fontSize: 17 },
  optionTextActive: { color: colors.orange, fontWeight: '600' },
});
