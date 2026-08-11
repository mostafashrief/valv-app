import { Pressable, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography } from '../constants/theme';

export function BackButton() {
  const { t } = useTranslation();
  return (
    <Pressable style={styles.btn} onPress={() => router.back()}>
      <Text style={styles.text}>← {t('common.back')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  text: { ...typography.label, color: colors.textMuted, fontSize: 14 },
});
