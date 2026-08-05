import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { colors, spacing, typography } from '../../constants/theme';

export default function AuthChoice() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('auth.choiceTitle')}</Text>
      </View>
      <View style={styles.footer}>
        <Button label={t('auth.withEmail')} onPress={() => router.push('/auth/email')} />
        <Button
          label={t('auth.withPhone')}
          variant="secondary"
          onPress={() => router.push('/auth/phone')}
          style={{ marginTop: spacing.sm }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg },
  title: { ...typography.title, color: colors.text },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
