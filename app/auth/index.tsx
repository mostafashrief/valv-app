import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../constants/theme';

export default function AuthChoice() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>How do you want to sign in?</Text>
      </View>
      <View style={styles.footer}>
        <Button label="Continue with email" onPress={() => router.push('/auth/email')} />
        <Button
          label="Continue with phone number"
          variant="secondary"
          onPress={() => router.push('/auth/phone')}
          style={{ marginTop: spacing.sm }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.espresso, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg },
  title: { ...typography.title, color: colors.textLight },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
