import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useQuiz, type AgeRange } from '../../lib/quiz-context';
import { BackButton } from '../../components/BackButton';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function QuizAge() {
  const { t } = useTranslation();
  const { draft, setDraft } = useQuiz();

  const OPTIONS: { value: AgeRange; label: string }[] = [
    { value: 'under_20', label: t('quiz.age.under20') },
    { value: '20_30',    label: t('quiz.age.20_30') },
    { value: '30_45',    label: t('quiz.age.30_45') },
    { value: '45_plus',  label: t('quiz.age.45plus') },
  ];

  const handleSelect = (value: AgeRange) => {
    setDraft({ ageRange: value });
    router.push('/onboarding/brand');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <Text style={styles.step}>{t('quiz.step', { current: 2, total: 6 })}</Text>
        <Text style={styles.title}>{t('quiz.age.title')}</Text>
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
  content: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center' },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 32, marginBottom: spacing.xl },
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
