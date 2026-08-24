import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useRevenueCat } from '../lib/revenue-cat';
import { colors, radii, spacing, typography } from '../constants/theme';

const PERKS = [
  'Full maintenance schedule for your car',
  'AI kilometers scanning',
  'Push notifications & reminders',
  'Service history & receipt logging',
  'Unlimited mileage tracking',
];

export default function Paywall() {
  const { offering, purchaseMonthly, purchaseYearly, restorePurchases, status } = useRevenueCat();
  const [selected, setSelected] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    const result = selected === 'yearly' ? await purchaseYearly() : await purchaseMonthly();
    setLoading(false);
    if (result.error) {
      Alert.alert('Something went wrong', result.error);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    const result = await restorePurchases();
    setLoading(false);
    if (result.error) {
      Alert.alert('Could not restore', result.error);
    } else if (status === 'active' || status === 'trial') {
      router.replace('/(tabs)');
    } else {
      Alert.alert('No active subscription found');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.badge}>3 MONTHS FREE</Text>
          <Text style={styles.title}>Know your car.{'\n'}Before it knows you don't.</Text>
          <Text style={styles.subtitle}>
            Full access free for 3 months. Cancel anytime before the trial ends.
          </Text>
        </View>

        {/* Perks */}
        <View style={styles.perks}>
          {PERKS.map((p) => (
            <View key={p} style={styles.perkRow}>
              <Text style={styles.perkCheck}>✓</Text>
              <Text style={styles.perkText}>{p}</Text>
            </View>
          ))}
        </View>

        {/* Plan selector */}
        <View style={styles.plans}>
          <Pressable
            style={[styles.plan, selected === 'yearly' && styles.planActive]}
            onPress={() => setSelected('yearly')}
          >
            <View style={styles.planLeft}>
              <Text style={[styles.planName, selected === 'yearly' && styles.planNameActive]}>Yearly</Text>
              <Text style={styles.planSub}>399 EGP / year — save 45%</Text>
            </View>
            <View style={styles.planRight}>
              <View style={styles.bestValueBadge}>
                <Text style={styles.bestValueText}>BEST VALUE</Text>
              </View>
              {selected === 'yearly' && <Text style={styles.planCheck}>✓</Text>}
            </View>
          </Pressable>

          <Pressable
            style={[styles.plan, selected === 'monthly' && styles.planActive]}
            onPress={() => setSelected('monthly')}
          >
            <View style={styles.planLeft}>
              <Text style={[styles.planName, selected === 'monthly' && styles.planNameActive]}>Monthly</Text>
              <Text style={styles.planSub}>39 EGP / month</Text>
            </View>
            {selected === 'monthly' && <Text style={styles.planCheck}>✓</Text>}
          </Pressable>
        </View>

        {/* CTA */}
        <Pressable style={styles.cta} onPress={handleSubscribe} disabled={loading}>
          {loading
            ? <ActivityIndicator color={colors.engineBlack} />
            : <Text style={styles.ctaText}>Start 3-month free trial</Text>
          }
        </Pressable>
        <Text style={styles.ctaHint}>
          No charge today. {selected === 'yearly' ? '399 EGP/year' : '39 EGP/month'} after trial ends.
        </Text>

        {/* Restore */}
        <Pressable style={styles.restore} onPress={handleRestore} disabled={loading}>
          <Text style={styles.restoreText}>Restore purchases</Text>
        </Pressable>

        <Text style={styles.legal}>
          Subscription automatically renews unless cancelled at least 24 hours before the end of the trial period.
          Manage in iPhone Settings → Apple ID → Subscriptions.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  header: { paddingTop: spacing.xl, alignItems: 'center', marginBottom: spacing.xl },
  badge: {
    backgroundColor: colors.orange, borderRadius: radii.pill,
    paddingVertical: 4, paddingHorizontal: spacing.md,
    ...typography.label, color: colors.engineBlack, fontSize: 11, letterSpacing: 1,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title, color: colors.text, fontSize: 30,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body, color: colors.textMuted,
    textAlign: 'center', fontSize: 14, lineHeight: 20,
  },

  perks: {
    backgroundColor: colors.surface, borderRadius: radii.md,
    padding: spacing.md, gap: spacing.sm, marginBottom: spacing.lg,
  },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  perkCheck: { color: colors.orange, fontSize: 14, fontWeight: '700', width: 18 },
  perkText: { ...typography.body, color: colors.text, fontSize: 14, flex: 1 },

  plans: { gap: spacing.sm, marginBottom: spacing.lg },
  plan: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.surface, borderRadius: radii.md,
    borderWidth: 1.5, borderColor: colors.border,
    padding: spacing.md,
  },
  planActive: { borderColor: colors.orange, backgroundColor: colors.orange + '12' },
  planLeft: { flex: 1 },
  planRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  planName: { ...typography.body, color: colors.text, fontWeight: '600', fontSize: 16 },
  planNameActive: { color: colors.orange },
  planSub: { ...typography.label, color: colors.textMuted, fontSize: 12, marginTop: 2 },
  planCheck: { color: colors.orange, fontSize: 16, fontWeight: '700' },
  bestValueBadge: {
    backgroundColor: colors.orange + '22', borderRadius: radii.pill,
    paddingVertical: 2, paddingHorizontal: 8,
  },
  bestValueText: { ...typography.label, color: colors.orange, fontSize: 9, letterSpacing: 0.5 },

  cta: {
    backgroundColor: colors.orange, borderRadius: radii.pill,
    paddingVertical: spacing.md + 2, alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ctaText: { ...typography.button, color: colors.engineBlack, fontSize: 16 },
  ctaHint: { ...typography.label, color: colors.textMuted, textAlign: 'center', fontSize: 12, marginBottom: spacing.lg },

  restore: { alignItems: 'center', paddingVertical: spacing.sm, marginBottom: spacing.md },
  restoreText: { ...typography.label, color: colors.textMuted, fontSize: 13 },

  legal: { ...typography.label, color: colors.steel, fontSize: 10, textAlign: 'center', lineHeight: 14 },
});
