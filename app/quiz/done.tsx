import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useQuiz } from '../../lib/quiz-context';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { scheduleMileageReminder } from '../../lib/notifications';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../constants/theme';

export default function QuizDone() {
  const { t } = useTranslation();
  const { draft, reset } = useQuiz();
  const { session } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (!session?.user) { router.replace('/(tabs)'); return; }

    setSaving(true);
    const freq = draft.mileageReminderFrequency ?? 'weekly';

    const { error: err } = await supabase.from('profiles').upsert({
      user_id:                    session.user.id,
      first_name:                 draft.firstName ?? null,
      last_name:                  draft.lastName ?? null,
      age:                        draft.age ?? null,
      city:                       draft.city ?? null,
      phone:                      draft.phone ?? null,
      gender:                     draft.gender ?? null,
      acquisition_source:         draft.acquisitionSource ?? null,
      has_service_records:        draft.hasRecords ?? null,
      mileage_reminder_frequency: freq,
      quiz_completed_at:          new Date().toISOString(),
    }, { onConflict: 'user_id' });

    // Schedule the mileage reminder notification
    await scheduleMileageReminder(freq);

    setSaving(false);
    if (err) { setError(err.message); return; }
    reset();
    router.replace('/(tabs)');
  };

  const title = draft.firstName
    ? t('quiz.done.titleWithName', { name: draft.firstName })
    : t('quiz.done.title');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🚗</Text>
        <Text style={styles.title}>{title}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View style={styles.footer}>
        <Button
          label={saving ? t('quiz.done.saving') : t('quiz.done.cta')}
          onPress={handleFinish}
          loading={saving}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: spacing.lg },
  title: { ...typography.title, color: colors.text, fontSize: 28, textAlign: 'center' },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.md },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
