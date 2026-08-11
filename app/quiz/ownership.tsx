import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useQuiz, type OwnershipDuration } from '../../lib/quiz-context';
import { BackButton } from '../../components/BackButton';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function QuizOwnership() {
  const { t } = useTranslation();
  const { setDraft } = useQuiz();

  const OPTIONS: { value: OwnershipDuration; label: string; sub: string }[] = [
    { value: 'new',      label: t('quiz.ownership.new'),    sub: t('quiz.ownership.newSub') },
    { value: 'under_6m', label: t('quiz.ownership.under6m'), sub: t('quiz.ownership.under6mSub') },
    { value: '6m_2y',    label: t('quiz.ownership.6m2y'),   sub: t('quiz.ownership.6m2ySub') },
    { value: '2_5y',     label: t('quiz.ownership.2_5y'),   sub: t('quiz.ownership.2_5ySub') },
    { value: 'over_5y',  label: t('quiz.ownership.over5y'), sub: t('quiz.ownership.over5ySub') },
  ];

  const handleSelect = (value: OwnershipDuration) => {
    setDraft({ ownershipDuration: value });
    router.push('/quiz/records');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <Text style={styles.step}>{t('quiz.step', { current: 4, total: 6 })}</Text>
        <Text style={styles.title}>{t('quiz.ownership.title')}</Text>
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
  content: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center' },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 32, marginBottom: spacing.xl },
  options: { gap: spacing.sm },
  option: {
    backgroundColor: colors.surface, borderRadius: radii.md,
    borderWidth: 1.5, borderColor: colors.border,
    paddingVertical: spacing.md, paddingHorizontal: spacing.lg,
  },
  optionLabel: { ...typography.body, color: colors.text, fontSize: 16, fontWeight: '600' },
  optionSub: { ...typography.body, color: colors.textMuted, fontSize: 13, marginTop: 2 },
});
