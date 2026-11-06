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
import { colors, radii, spacing, typography } from '../../constants/theme';

const PREVIEW_ITEMS = [
  { icon: '🛢', label: 'Oil & filter change' },
  { icon: '🔋', label: 'Battery health check' },
  { icon: '🛞', label: 'Tire rotation & pressure' },
  { icon: '🧊', label: 'Coolant level' },
  { icon: '🔧', label: '+ 6 more for your car' },
];

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

    await scheduleMileageReminder(freq);

    setSaving(false);
    if (err) { setError(err.message); return; }
    reset();
    router.replace('/paywall');
  };

  const name = draft.firstName;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.title}>
          {name ? t('quiz.done.titleWithName', { name }) : t('quiz.done.title')}
        </Text>
        <Text style={styles.subtitle}>{t('quiz.done.subtitle')}</Text>

        {/* Preview of what's ready */}
        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>YOUR MAINTENANCE SCHEDULE INCLUDES</Text>
          {PREVIEW_ITEMS.map((item) => (
            <View key={item.label} style={styles.previewRow}>
              <Text style={styles.previewIcon}>{item.icon}</Text>
              <Text style={styles.previewText}>{item.label}</Text>
              <Text style={styles.previewCheck}>✓</Text>
            </View>
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <View style={styles.footer}>
        <Button
          label={saving ? t('quiz.done.saving') : t('quiz.done.cta')}
          onPress={handleFinish}
          loading={saving}
        />
        <Text style={styles.hint}>Free for 6 months — no card needed</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg },
  emoji: { fontSize: 52, marginBottom: spacing.md },
  title: { ...typography.title, color: colors.text, fontSize: 28, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textMuted, fontSize: 15, marginBottom: spacing.lg, lineHeight: 22 },

  previewCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  previewLabel: {
    ...typography.label,
    color: colors.orange,
    fontSize: 10,
    marginBottom: spacing.xs,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  previewIcon: { fontSize: 18, width: 28 },
  previewText: { ...typography.body, color: colors.text, flex: 1, fontSize: 14 },
  previewCheck: { color: colors.healthy, fontSize: 14, fontWeight: '700' },

  error: { ...typography.body, color: colors.overdue, marginTop: spacing.md },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.sm },
  hint: { ...typography.label, color: colors.textMuted, textAlign: 'center', fontSize: 12 },
});
