import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '../components/Button';
import { colors, spacing, typography } from '../constants/theme';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.wordmark}>Valv</Text>
        <Text style={styles.tagline}>Car maintenance,{'\n'}on schedule.</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.sub}>Your car finally has someone paying attention.</Text>
        <Button label="Get started" onPress={() => router.push('/auth')} style={styles.btn} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.espresso, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg },
  wordmark: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.orange,
    letterSpacing: -1,
  },
  tagline: {
    ...typography.title,
    fontSize: 36,
    color: colors.textLight,
    marginTop: spacing.sm,
    lineHeight: 42,
  },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  sub: { ...typography.body, color: colors.textMutedDark },
  btn: { marginTop: spacing.xs },
});
