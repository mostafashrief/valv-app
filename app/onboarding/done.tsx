import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { useOnboarding } from '../../lib/onboarding-context';
import { supabase } from '../../lib/supabase';
import { DEFAULT_MAINTENANCE_ITEMS } from '../../data/default-maintenance-items';
import { colors, spacing, typography } from '../../constants/theme';

export default function DoneStep() {
  const { t } = useTranslation();
  const { draft } = useOnboarding();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (!session?.user || !draft.brand || !draft.model || !draft.year) {
      router.replace('/(tabs)');
      return;
    }

    setLoading(true);
    setError(null);

    const { data: car, error: carError } = await supabase
      .from('cars')
      .insert({
        user_id: session.user.id,
        brand: draft.brand,
        model: draft.model,
        year: draft.year,
        current_mileage_km: draft.mileageKm ?? 0,
      })
      .select()
      .single();

    if (carError || !car) {
      setLoading(false);
      setError(carError?.message ?? 'Could not save your car. Please try again.');
      return;
    }

    const { error: itemsError } = await supabase.from('maintenance_items').insert(
      DEFAULT_MAINTENANCE_ITEMS.map((item) => ({
        car_id: car.id,
        name: item.name,
        interval_km: item.intervalKm ?? null,
        interval_days: item.intervalDays ?? null,
        source: 'estimated' as const,
      })),
    );

    setLoading(false);
    if (itemsError) {
      setError(itemsError.message);
      return;
    }

    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>{t('onboarding.doneTitle')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.doneSubtitle')}</Text>
        <Text style={styles.summary}>
          {draft.brand} {draft.model} · {draft.year} · {draft.mileageKm} km
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View style={styles.footer}>
        <Button label={t('common.getStarted')} onPress={handleFinish} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xl },
  emoji: { fontSize: 64, marginBottom: spacing.lg },
  title: { ...typography.title, color: colors.text, textAlign: 'center' },
  subtitle: {
    ...typography.subtitle,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  summary: { ...typography.body, color: colors.text, marginTop: spacing.xl, fontWeight: '600' },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.md, textAlign: 'center' },
  footer: { padding: spacing.lg },
});
