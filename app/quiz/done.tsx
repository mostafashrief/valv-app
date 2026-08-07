import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuiz } from '../../lib/quiz-context';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../constants/theme';

export default function QuizDone() {
  const { draft, getMonthlyKm, getReminderFrequency, reset } = useQuiz();
  const { session } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (!session?.user) { router.replace('/(tabs)'); return; }

    setSaving(true);
    const monthlyKm = getMonthlyKm();
    const reminderFreq = getReminderFrequency();

    const { error: err } = await supabase.from('profiles').upsert({
      user_id: session.user.id,
      first_name: draft.firstName ?? null,
      age_range: draft.ageRange ?? null,
      ownership_duration: draft.ownershipDuration ?? null,
      has_service_records: draft.hasRecords ?? null,
      drives_daily: draft.drivesDaily ?? null,
      daily_trip: draft.dailyTrip ?? null,
      intercity_travel: draft.intercityTravel ?? null,
      monthly_km_estimate: monthlyKm,
      reminder_frequency: reminderFreq,
      quiz_completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

    setSaving(false);
    if (err) { setError(err.message); return; }
    reset();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🚗</Text>
        <Text style={styles.title}>
          {draft.firstName ? `${draft.firstName}, سيارتك في إيدنا.` : 'سيارتك في إيدنا.'}
        </Text>
        <Text style={styles.subtitle}>
          {draft.firstName ? `${draft.firstName}, your car is in good hands.` : 'Your car is in good hands.'}
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View style={styles.footer}>
        <Button label={saving ? 'Setting up…' : 'Open my plan'} onPress={handleFinish} loading={saving} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: spacing.lg },
  title: { ...typography.title, color: colors.text, fontSize: 28, textAlign: 'center', marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.md },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
