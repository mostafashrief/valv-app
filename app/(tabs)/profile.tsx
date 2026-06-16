import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Account</Text>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.sub}>
          Language, subscription, and notification settings coming here.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: spacing.lg },
  content: { flex: 1, justifyContent: 'center' },
  label: { ...typography.label, color: colors.orange },
  title: { ...typography.title, color: colors.text, marginTop: spacing.xs },
  sub: { ...typography.body, color: colors.textMuted, marginTop: spacing.md },
});
