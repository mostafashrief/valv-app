import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useQuiz } from '../../lib/quiz-context';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { colors, spacing, typography } from '../../constants/theme';

export default function QuizName() {
  const { t } = useTranslation();
  const { setDraft } = useQuiz();
  const [name, setName] = useState('');

  const handleNext = () => {
    if (!name.trim()) return;
    setDraft({ firstName: name.trim() });
    router.push('/quiz/age');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <View style={styles.content}>
          <Text style={styles.step}>{t('quiz.step', { current: 1, total: 6 })}</Text>
          <Text style={styles.title}>{t('quiz.name.title')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={t('quiz.name.placeholder')}
            placeholderTextColor={colors.textMuted}
            autoFocus
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleNext}
          />
        </View>
        <View style={styles.footer}>
          <Button label={t('common.next') + ' →'} onPress={handleNext} disabled={!name.trim()} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  kav: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center' },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 32, marginBottom: spacing.xl },
  input: {
    ...typography.title, fontSize: 28, color: colors.text,
    borderBottomWidth: 2, borderBottomColor: colors.orange,
    paddingVertical: spacing.sm,
  },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
