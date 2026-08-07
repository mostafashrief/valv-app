import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useQuiz, type HasRecords } from '../../lib/quiz-context';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { colors, radii, spacing, typography } from '../../constants/theme';

const OPTIONS: { value: HasRecords; label: string; sub: string; cta?: string }[] = [
  { value: 'receipts', label: 'Yes — I have receipts',      sub: 'Photos, invoices, anything', cta: 'Upload receipts' },
  { value: 'booklet',  label: 'Yes — I have the booklet',   sub: 'The service book from the dealer', cta: 'Upload booklet' },
  { value: 'none',     label: 'No records',                  sub: "We'll start fresh with estimates" },
];

export default function QuizRecords() {
  const { setDraft } = useQuiz();
  const { session } = useAuth();
  const [selected, setSelected] = useState<HasRecords | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSelect = async (value: HasRecords) => {
    setSelected(value);
    setDraft({ hasRecords: value });

    if (value === 'none') {
      router.push('/quiz/driving');
      return;
    }

    // Pick images
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (result.canceled) {
      router.push('/quiz/driving');
      return;
    }

    setUploading(true);
    // Upload each image to Supabase storage — parse-receipt Edge Function handles the rest
    const uploads = result.assets.map(async (asset) => {
      const ext = asset.uri.split('.').pop() ?? 'jpg';
      const path = `${session?.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const blob = await fetch(asset.uri).then((r) => r.blob());
      await supabase.storage.from('receipts').upload(path, blob, { contentType: `image/${ext}` });
      return path;
    });

    await Promise.all(uploads);
    setUploading(false);
    router.push('/quiz/driving');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.step}>5 of 6</Text>
        <Text style={styles.title}>عندك فواتير؟</Text>
        <Text style={styles.subtitle}>Any service records or a maintenance booklet?</Text>
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
                    <Text style={styles.ctaText}>{uploading && selected === o.value ? '…' : 'Upload'}</Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
        {uploading && (
          <View style={styles.uploadingRow}>
            <ActivityIndicator color={colors.orange} size="small" />
            <Text style={styles.uploadingText}>Uploading your records…</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, justifyContent: 'center' },
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
