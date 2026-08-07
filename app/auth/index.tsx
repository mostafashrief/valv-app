import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { colors, spacing, typography } from '../../constants/theme';

async function userHasCar(userId: string): Promise<boolean> {
  const { data } = await supabase.from('cars').select('id').eq('user_id', userId).limit(1);
  return (data?.length ?? 0) > 0;
}

export default function AuthChoice() {
  const { t } = useTranslation();
  const { signInWithGoogle, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error: err } = await signInWithGoogle();
    setLoading(false);
    if (err && err !== 'Google sign-in cancelled') { setError(err); return; }
    // routing handled by _layout via session change
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('auth.choiceTitle')}</Text>
      </View>
      <View style={styles.footer}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          label={loading ? t('common.loading') : t('auth.withGoogle')}
          onPress={handleGoogle}
          disabled={loading}
        />
        {loading && <ActivityIndicator color={colors.orange} style={{ marginTop: spacing.sm }} />}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>
        <Button
          label={t('auth.withEmail')}
          variant="secondary"
          onPress={() => router.push('/auth/email')}
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
  error: { ...typography.body, color: colors.overdue, marginBottom: spacing.sm },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.md },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { ...typography.label, color: colors.textMuted, marginHorizontal: spacing.sm },
});
