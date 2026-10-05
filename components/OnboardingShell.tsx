import React from 'react';
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radii, spacing, typography } from '../constants/theme';

interface OnboardingShellProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Override default router.back() */
  onBack?: () => void;
  /** Hide the back button (e.g. first step) */
  hideBack?: boolean;
}

export function OnboardingShell({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  footer,
  onBack,
  hideBack = false,
}: OnboardingShellProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Back button row */}
      <View style={styles.topBar}>
        {!hideBack ? (
          <Pressable style={styles.backBtn} onPress={onBack ?? (() => router.back())} hitSlop={12}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
        ) : <View style={styles.backBtn} />}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(100, (step / totalSteps) * 100)}%` }]} />
        </View>
        <Text style={styles.stepCounter}>{step}/{totalSteps}</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.kav}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          <View style={styles.body}>{children}</View>
        </View>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  backBtn: { width: 32, alignItems: 'flex-start' },
  backText: { fontSize: 22, color: colors.text },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: colors.border,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.orange,
    borderRadius: radii.pill,
  },
  stepCounter: { ...typography.label, color: colors.textMuted, fontSize: 11 },
  kav: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  body: { marginTop: spacing.xl, flex: 1 },
  footer: { padding: spacing.lg },
});
