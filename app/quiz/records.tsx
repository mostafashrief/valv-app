import React, { useState, useRef } from 'react';
import {
  View, Text, Pressable, StyleSheet, ActivityIndicator,
  TextInput, ScrollView, Alert, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Audio } from 'expo-av';
import { useTranslation } from 'react-i18next';
import { useQuiz } from '../../lib/quiz-context';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { colors, radii, spacing, typography } from '../../constants/theme';

type Mode = null | 'photos' | 'text' | 'voice';

export default function QuizRecords() {
  const { t } = useTranslation();
  const { setDraft } = useQuiz();
  const { session } = useAuth();

  const [mode, setMode] = useState<Mode>(null);
  const [uploading, setUploading] = useState(false);
  const [textNote, setTextNote] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);

  const goNext = () => {
    setDraft({ hasRecords: mode === null ? 'none' : (mode as any) });
    router.push('/quiz/driving');
  };

  // ── Photo upload ──────────────────────────────────────────────────────────
  const handlePhotos = async () => {
    setMode('photos');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (result.canceled) return;

    setUploading(true);
    try {
      const { data: { session: s } } = await supabase.auth.getSession();
      await Promise.all(result.assets.map(async (asset) => {
        const ext = (asset.uri.split('.').pop() ?? 'jpg').toLowerCase();
        const path = `${session?.user.id}/records/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        await FileSystem.uploadAsync(
          `https://fxziatkzwpzoyhuoumxk.supabase.co/storage/v1/object/receipts/${path}`,
          asset.uri,
          {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            mimeType: `image/${ext}`,
            headers: { Authorization: `Bearer ${s?.access_token}`, 'x-upsert': 'true' },
          }
        );
      }));
    } catch (e) {
      Alert.alert('Upload failed', String(e));
    } finally {
      setUploading(false);
    }
  };

  // ── Voice recording ───────────────────────────────────────────────────────
  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) { Alert.alert('Permission needed', 'Allow microphone access to record.'); return; }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: rec } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(rec);
      setIsRecording(true);
      setMode('voice');
    } catch (e) {
      Alert.alert('Recording failed', String(e));
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    const uri = recording.getURI();
    setRecording(null);
    setRecordingDone(true);
    if (!uri) return;

    // Upload voice note to storage
    setUploading(true);
    try {
      const { data: { session: s } } = await supabase.auth.getSession();
      const path = `${session?.user.id}/voice/${Date.now()}.m4a`;
      await FileSystem.uploadAsync(
        `https://fxziatkzwpzoyhuoumxk.supabase.co/storage/v1/object/receipts/${path}`,
        uri,
        {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'file',
          mimeType: 'audio/m4a',
          headers: { Authorization: `Bearer ${s?.access_token}`, 'x-upsert': 'true' },
        }
      );
    } catch {} finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.step}>{t('quiz.step', { current: 5, total: 6 })}</Text>
        <Text style={styles.title}>What has your car had done recently?</Text>
        <Text style={styles.subtitle}>Tell us what you remember — we'll take it from here.</Text>

        {/* Option 1 — Upload photos */}
        <Pressable
          style={[styles.option, mode === 'photos' && styles.optionActive]}
          onPress={handlePhotos}
          disabled={uploading}
        >
          <View style={styles.optionLeft}>
            <Text style={styles.optionEmoji}>📸</Text>
            <View>
              <Text style={[styles.optionLabel, mode === 'photos' && styles.optionLabelActive]}>
                Upload receipts or photos
              </Text>
              <Text style={styles.optionSub}>Service stamps, invoices, anything</Text>
            </View>
          </View>
          {uploading && mode === 'photos' && <ActivityIndicator color={colors.orange} size="small" />}
          {mode === 'photos' && !uploading && <Text style={styles.check}>✓</Text>}
        </Pressable>

        {/* Option 2 — Type what you remember */}
        <Pressable
          style={[styles.option, mode === 'text' && styles.optionActive]}
          onPress={() => setMode(mode === 'text' ? null : 'text')}
        >
          <View style={styles.optionLeft}>
            <Text style={styles.optionEmoji}>📝</Text>
            <View>
              <Text style={[styles.optionLabel, mode === 'text' && styles.optionLabelActive]}>
                I'll type what I remember
              </Text>
              <Text style={styles.optionSub}>Oil change, brakes, anything you recall</Text>
            </View>
          </View>
        </Pressable>

        {mode === 'text' && (
          <TextInput
            style={styles.textArea}
            value={textNote}
            onChangeText={setTextNote}
            placeholder="e.g. Changed oil 3 months ago, new brakes last year…"
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
            autoFocus
          />
        )}

        {/* Option 3 — Voice note */}
        <Pressable
          style={[styles.option, mode === 'voice' && styles.optionActive]}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={uploading}
        >
          <View style={styles.optionLeft}>
            <Text style={styles.optionEmoji}>{isRecording ? '⏹' : '🎤'}</Text>
            <View>
              <Text style={[styles.optionLabel, mode === 'voice' && styles.optionLabelActive]}>
                {isRecording ? 'Tap to stop recording' : recordingDone ? 'Voice note saved ✓' : 'Tell me by voice'}
              </Text>
              <Text style={styles.optionSub}>
                {isRecording ? 'Speak freely — we\'ll extract what matters' : 'Say what services you remember'}
              </Text>
            </View>
          </View>
          {isRecording && <View style={styles.recDot} />}
          {uploading && mode === 'voice' && <ActivityIndicator color={colors.orange} size="small" />}
        </Pressable>

        {/* Option 4 — Fresh start */}
        <Pressable
          style={[styles.option, mode === null && styles.optionFresh]}
          onPress={() => setMode(null)}
        >
          <View style={styles.optionLeft}>
            <Text style={styles.optionEmoji}>✅</Text>
            <View>
              <Text style={[styles.optionLabel, mode === null && styles.optionLabelFresh]}>
                I don't remember — fresh start
              </Text>
              <Text style={styles.optionSub}>We'll assume services are current and track from now</Text>
            </View>
          </View>
          {mode === null && <Text style={styles.check}>✓</Text>}
        </Pressable>

        <View style={styles.footer}>
          <Button
            label={uploading ? 'Uploading…' : 'Continue →'}
            onPress={goNext}
            disabled={uploading || isRecording}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
  step: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, fontSize: 28 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4, marginBottom: spacing.lg },

  option: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionActive: { borderColor: colors.orange, backgroundColor: colors.orange + '12' },
  optionFresh: { borderColor: colors.healthy, backgroundColor: colors.healthy + '12' },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  optionEmoji: { fontSize: 22 },
  optionLabel: { ...typography.body, color: colors.text, fontWeight: '600', fontSize: 15 },
  optionLabelActive: { color: colors.orange },
  optionLabelFresh: { color: colors.healthy },
  optionSub: { ...typography.body, color: colors.textMuted, fontSize: 12, marginTop: 2 },
  check: { fontSize: 16, color: colors.orange },

  textArea: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.orange + '55',
    padding: spacing.md,
    color: colors.text,
    ...typography.body,
    fontSize: 15,
    minHeight: 100,
    marginBottom: spacing.sm,
    textAlignVertical: 'top',
  },

  recDot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: colors.overdue,
  },

  footer: { marginTop: spacing.lg },
});
