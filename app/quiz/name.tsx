import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuiz } from '../../lib/quiz-context';
import { Button } from '../../components/Button';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function QuizName() {
  const { setDraft } = useQuiz();
  const [name, setName] = useState('');

  const handleNext = () => {
    if (!name.trim()) return;
    setDraft({ firstName: name.trim() });
    router.push('/quiz/age');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.content}>
          <Text style={styles.step}>1 of 6</Text>
          <Text style={styles.title}>ما اسمك؟</Text>
          <Text style={styles.subtitle}>What's your name?</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your first name"
            placeholderTextColor={colors.steel}
            autoFocus
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={handleNext}
          />
        </View>
        <View style={styles.footer}>
          <Button label="Next →" onPress={handleNext} disabled={!name.trim()} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1, justifyContent: 'space-between' },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, justifyContent: 'center' },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 32 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: spacing.xl },
  input: {
    ...typography.title, fontSize: 28, color: colors.text,
    borderBottomWidth: 2, borderBottomColor: colors.orange,
    paddingVertical: spacing.sm,
  },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
