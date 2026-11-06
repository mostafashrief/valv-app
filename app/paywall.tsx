import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useRevenueCat } from '../lib/revenue-cat';
import { colors, radii, spacing, typography } from '../constants/theme';

const PERKS = [
  { icon: '📋', text: 'Know exactly when your car needs service — no guessing' },
  { icon: '🤖', text: 'AI reads your receipts in seconds — you just tap' },
  { icon: '🔔', text: 'Reminders before breakdowns — not after' },
  { icon: '📊', text: 'Full service history that protects your resale value' },
  { icon: '📍', text: 'Live odometer — always know where your car stands' },
];

export default function Paywall() {
  const { offering, purchaseMonthly, purchaseYearly, restorePurchases, status, isProActive } = useRevenueCat();
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
      {isProActive && (
        <Pressable style={styles.closeBtn} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
      )}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>6 MONTHS FREE</Text>
          </View>
          <Text style={styles.title}>Know your car.{'\n'}Before it surprises you.</Text>
          <Text style={styles.subtitle}>
            Start free. Full access for 6 months.{'\n'}Cancel anytime — no questions asked.
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.perks}>
          {PERKS.map((p) => (
            <View key={p.text} style={styles.perkRow}>
              <Text style={styles.perkIcon}>{p.icon}</Text>
              <Text style={styles.perkText}>{p.text}</Text>
            </View>
          ))}
        </View>

        {/* Plan selector */}
        <View style={styles.plans}>
          {/* Yearly — prominent, default */}
          <Pressable
            style={[styles.plan, styles.planYearly, selected === 'yearly' && styles.planActive]}
            onPress={() => setSelected('yearly')}
          >
            <View style={styles.planBestBadge}>
              <Text style={styles.planBestText}>BEST VALUE — SAVE 31%</Text>
            </View>
            <View style={styles.planContent}>
              <View style={styles.planLeft}>
                <Text style={[styles.planName, selected === 'yearly' && styles.planNameActive]}>
                  Yearly
                </Text>
                <Text style={styles.planPrice}>249.99 EGP / year</Text>
                <Text style={styles.planPriceMonthly}>Only 20.83 EGP/month</Text>
              </View>
              <View style={[styles.radio, selected === 'yearly' && styles.radioActive]}>
                {selected === 'yearly' && <View style={styles.radioDot} />}
              </View>
            </View>
          </Pressable>

          {/* Monthly */}
          <Pressable
            style={[styles.plan, selected === 'monthly' && styles.planActive]}
            onPress={() => setSelected('monthly')}
          >
            <View style={styles.planContent}>
              <View style={styles.planLeft}>
                <Text style={[styles.planName, selected === 'monthly' && styles.planNameActive]}>
                  Monthly
                </Text>
                <Text style={styles.planPrice}>29.99 EGP / month</Text>
              </View>
              <View style={[styles.radio, selected === 'monthly' && styles.radioActive]}>
                {selected === 'monthly' && <View style={styles.radioDot} />}
              </View>
            </View>
          </Pressable>
        </View>

        {/* CTA */}
        <Pressable style={[styles.cta, loading && styles.ctaLoading]} onPress={handleSubscribe} disabled={loading}>
          {loading
            ? <ActivityIndicator color={colors.engineBlack} />
            : <Text style={styles.ctaText}>Start my free 6-month trial →</Text>
          }
        </Pressable>

        <Text style={styles.ctaHint}>
          No charge today.{' '}
          {selected === 'yearly' ? '249.99 EGP/year' : '29.99 EGP/month'} after trial ends.
        </Text>

        {/* Trust signals */}
        <View style={styles.trustRow}>
          <Text style={styles.trustItem}>✓ No credit card now</Text>
          <Text style={styles.trustItem}>✓ Cancel anytime</Text>
          <Text style={styles.trustItem}>✓ 🔒 Secure</Text>
        </View>

        {/* Restore */}
        <Pressable style={styles.restore} onPress={handleRestore} disabled={loading}>
          <Text style={styles.restoreText}>Already subscribed? Restore</Text>
        </Pressable>

        <Text style={styles.legal}>
          Subscription renews automatically unless cancelled at least 24 hours before the end of the trial period.
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
  badgeRow: { marginBottom: spacing.md },
  badge: {
    backgroundColor: colors.orange,
    borderRadius: radii.pill,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    ...typography.label,
    color: colors.engineBlack,
    fontSize: 11,
    letterSpacing: 1,
    overflow: 'hidden',
  },
  title: {
    ...typography.title,
    color: colors.text,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 38,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },

  perks: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  perkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  perkIcon: { fontSize: 18, width: 28 },
  perkText: { ...typography.body, color: colors.text, fontSize: 14, flex: 1, lineHeight: 20 },

  plans: { gap: spacing.sm, marginBottom: spacing.lg },
  plan: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  planYearly: {},
  planActive: { borderColor: colors.orange },
  planBestBadge: {
    backgroundColor: colors.orange,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  planBestText: {
    ...typography.label,
    color: colors.engineBlack,
    fontSize: 10,
    letterSpacing: 0.8,
  },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  planLeft: { flex: 1 },
  planName: { ...typography.body, color: colors.text, fontWeight: '600', fontSize: 16 },
  planNameActive: { color: colors.orange },
  planPrice: { ...typography.mono, color: colors.textMuted, fontSize: 13, marginTop: 2 },
  planPriceMonthly: { ...typography.label, color: colors.healthy, fontSize: 11, marginTop: 2 },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: colors.orange },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.orange,
  },

  cta: {
    backgroundColor: colors.orange,
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 4,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ctaLoading: { opacity: 0.7 },
  ctaText: { ...typography.button, color: colors.engineBlack, fontSize: 16 },
  ctaHint: {
    ...typography.label,
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: spacing.md,
  },

  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  trustItem: { ...typography.label, color: colors.textMuted, fontSize: 11 },

  restore: { alignItems: 'center', paddingVertical: spacing.sm, marginBottom: spacing.md },
  restoreText: { ...typography.label, color: colors.textMuted, fontSize: 13 },

  legal: {
    ...typography.label,
    color: colors.steel,
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },

  closeBtn: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.lg,
    zIndex: 10,
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: colors.textMuted, fontSize: 14, fontWeight: '600' },
});
