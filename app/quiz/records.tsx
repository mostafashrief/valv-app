import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { useQuiz, type HasRecords } from '../../lib/quiz-context';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { BackButton } from '../../components/BackButton';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function QuizRecords() {
  const { t } = useTranslation();
  const { setDraft } = useQuiz();
  const { session } = useAuth();
  const [selected, setSelected] = useState<HasRecords | null>(null);
  const [uploading, setUploading] = useState(false);

  const OPTIONS: { value: HasRecords; label: string; sub: string; cta?: string }[] = [
    { value: 'receipts', label: t('quiz.records.receipts'), sub: t('quiz.records.receiptsSub'), cta: t('quiz.records.upload') },
    { value: 'booklet',  label: t('quiz.records.booklet'),  sub: t('quiz.records.bookletSub'),  cta: t('quiz.records.upload') },
    { value: 'none',     label: t('quiz.records.none'),     sub: t('quiz.records.noneSub') },
  ];

  const handleSelect = async (value: HasRecords) => {
    setSelected(value);
    setDraft({ hasRecords: value });

    if (value === 'none') { router.push('/quiz/driving'); return; }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (result.canceled) { router.push('/quiz/driving'); return; }

    setUploading(true);
    const uploads = result.assets.map(async (asset) => {
      const ext = (asset.uri.split('.').pop() ?? 'jpg').toLowerCase();
      const path = `${session?.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
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
    setUploading(false);
    router.push('/quiz/driving');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <Text style={styles.step}>{t('quiz.step', { current: 5, total: 6 })}</Text>
        <Text style={styles.title}>{t('quiz.records.title')}</Text>
        <Text style={styles.subtitle}>{t('quiz.records.subtitle')}</Text>
        <View style={styles.options}>
          {OPTIONS.map((o) => (
            <Pressable
              key={o.value}
              style={[styles.option, selected === o.value && styles.optionActive]}
              onPress={() => handleSelect(o.value)}
              disabled={uploading}
            >
              <View style={styles.optionRow}>
                <View style={styles.optionLeft}>
                  <Text style={[styles.optionLabel, selected === o.value && styles.optionLabelActive]}>
                    {o.label}
                  </Text>
                  <Text style={styles.optionSub}>{o.sub}</Text>
                </View>
                {o.cta && (
                  <View style={styles.ctaTag}>
                    <Text style={styles.ctaText}>
                      {uploading && selected === o.value ? '…' : o.cta}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
        {uploading && (
          <View style={styles.uploadingRow}>
            <ActivityIndicator color={colors.orange} size="small" />
            <Text style={styles.uploadingText}>{t('quiz.records.uploading')}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center' },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 32 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: spacing.xl },
  options: { gap: spacing.sm },
  option: {
    backgroundColor: colors.surface, borderRadius: radii.md,
    borderWidth: 1.5, borderColor: colors.border, padding: spacing.md,
  },
  optionActive: { borderColor: colors.orange, backgroundColor: colors.orange + '18' },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionLeft: { flex: 1 },
  optionLabel: { ...typography.body, color: colors.text, fontSize: 16, fontWeight: '600' },
  optionLabelActive: { color: colors.orange },
  optionSub: { ...typography.body, color: colors.textMuted, fontSize: 13, marginTop: 2 },
  ctaTag: {
    backgroundColor: colors.orange + '22', borderRadius: radii.pill,
    paddingVertical: 4, paddingHorizontal: spacing.sm, marginLeft: spacing.sm,
  },
  ctaText: { ...typography.label, color: colors.orange, fontSize: 11 },
  uploadingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg },
  uploadingText: { ...typography.body, color: colors.textMuted },
});
