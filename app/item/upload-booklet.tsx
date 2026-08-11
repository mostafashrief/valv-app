import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { colors, spacing, typography } from '../../constants/theme';

export default function UploadBooklet() {
  const { t } = useTranslation();
  const { session } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const handlePick = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Allow photo access to upload your booklet.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (result.canceled) return;

    setUploading(true);
    try {
      const uploads = result.assets.map(async (asset) => {
        const ext = (asset.uri.split('.').pop() ?? 'jpg').toLowerCase();
        const path = `booklets/${session?.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const form = new FormData();
        form.append('file', { uri: asset.uri, name: `upload.${ext}`, type: `image/${ext}` } as any);
        const { data: { session: s } } = await supabase.auth.getSession();
        await fetch(`https://fxziatkzwpzoyhuoumxk.supabase.co/storage/v1/object/receipts/${path}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${s?.access_token}`, 'x-upsert': 'true' },
          body: form,
        });
      });
      await Promise.all(uploads);
      setDone(true);
    } catch (err) {
      Alert.alert('Upload failed', String(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <Text style={styles.emoji}>📋</Text>
        <Text style={styles.title}>{t('quiz.booklet.title')}</Text>
        <Text style={styles.subtitle}>{t('quiz.booklet.subtitle')}</Text>
        {done && (
          <View style={styles.successBadge}>
            <Text style={styles.successText}>{t('quiz.booklet.done')}</Text>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        {uploading ? (
          <View style={styles.uploadingRow}>
            <ActivityIndicator color={colors.orange} />
            <Text style={styles.uploadingText}>{t('quiz.booklet.uploading')}</Text>
          </View>
        ) : done ? (
          <Button label={t('common.back')} onPress={() => router.back()} />
        ) : (
          <>
            <Button label={t('quiz.booklet.pick')} onPress={handlePick} />
            <Text style={styles.skip} onPress={() => router.back()}>{t('quiz.booklet.skip')}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: spacing.lg },
  title: { ...typography.title, color: colors.text, fontSize: 28, textAlign: 'center', marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  successBadge: {
    marginTop: spacing.lg,
    backgroundColor: colors.healthy + '22',
    borderRadius: 8,
    padding: spacing.md,
  },
  successText: { ...typography.body, color: colors.healthy, textAlign: 'center' },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  uploadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  uploadingText: { ...typography.body, color: colors.textMuted },
  skip: { ...typography.body, color: colors.textMuted, textAlign: 'center', paddingVertical: spacing.sm },
});
