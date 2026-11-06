import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Pressable,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuiz, type Gender, type AcquisitionSource } from '../../lib/quiz-context';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { colors, radii, spacing, typography } from '../../constants/theme';

const EGYPT_CITIES = [
  'Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said',
  'Suez', 'Luxor', 'Mansoura', 'El Mahalla El Kubra', 'Tanta',
  'Asyut', 'Ismailia', 'Faiyum', 'Zagazig', 'Aswan',
  'Damietta', 'Damanhur', 'Al Minya', 'Beni Suef', 'Hurghada',
  'Qena', 'Sohag', 'Shibin El Kom', 'Banha', '10th of Ramadan City',
  'New Cairo', 'Sixth of October City', 'Sharm El Sheikh',
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male',              label: 'Male' },
  { value: 'female',            label: 'Female' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const ACQUISITION_OPTIONS: { value: AcquisitionSource; label: string }[] = [
  { value: 'friend',       label: 'A friend' },
  { value: 'social_media', label: 'Social media' },
  { value: 'search',       label: 'Google' },
  { value: 'app_store',    label: 'App Store' },
  { value: 'other',        label: 'Other' },
];

function Field({
  label, placeholder, value, onChangeText, keyboardType, autoCapitalize, optional,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  keyboardType?: any;
  autoCapitalize?: 'none' | 'words' | 'sentences';
  optional?: boolean;
}) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldLabelRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {optional && <Text style={styles.optionalTag}>optional</Text>}
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType ?? 'default'}
        autoCapitalize={autoCapitalize ?? 'words'}
      />
    </View>
  );
}

function ChipRow<T extends string>({
  label,
  options,
  selected,
  onSelect,
  optional,
}: {
  label: string;
  options: { value: T; label: string }[];
  selected: T | undefined;
  onSelect: (v: T) => void;
  optional?: boolean;
}) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldLabelRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {optional && <Text style={styles.optionalTag}>optional</Text>}
      </View>
      <View style={styles.chips}>
        {options.map((o) => (
          <Pressable
            key={o.value}
            style={[styles.chip, selected === o.value && styles.chipActive]}
            onPress={() => onSelect(o.value)}
          >
            <Text style={[styles.chipText, selected === o.value && styles.chipTextActive]}>
              {o.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function CityPicker({ value, onSelect }: { value: string; onSelect: (c: string) => void }) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);

  const filtered = query.trim()
    ? EGYPT_CITIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : EGYPT_CITIES;

  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>City</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={(v) => { setQuery(v); setOpen(true); if (v !== value) onSelect(''); }}
        onFocus={() => setOpen(true)}
        placeholder="Search your city…"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="words"
      />
      {open && query.trim().length > 0 && (
        <View style={styles.cityDropdown}>
          {filtered.slice(0, 5).map((c) => (
            <Pressable
              key={c}
              style={styles.cityOption}
              onPress={() => { onSelect(c); setQuery(c); setOpen(false); }}
            >
              <Text style={styles.cityOptionText}>{c}</Text>
            </Pressable>
          ))}
          {filtered.length === 0 && (
            <Pressable
              style={styles.cityOption}
              onPress={() => { onSelect(query.trim()); setOpen(false); }}
            >
              <Text style={styles.cityOptionText}>Use "{query.trim()}"</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

export default function QuizName() {
  const { setDraft } = useQuiz();

  const [firstName,         setFirstName]         = useState('');
  const [lastName,          setLastName]           = useState('');
  const [age,               setAge]               = useState('');
  const [city,              setCity]              = useState('');
  const [phone,             setPhone]             = useState('');
  const [gender,            setGender]            = useState<Gender | undefined>();
  const [acquisitionSource, setAcquisitionSource] = useState<AcquisitionSource | undefined>();

  const ageNum = parseInt(age, 10);
  const isValid =
    firstName.trim().length > 0 &&
    city.trim().length > 0 &&
    gender != null;

  const handleNext = () => {
    if (!isValid) return;
    setDraft({
      firstName:         firstName.trim(),
      lastName:          lastName.trim() || undefined,
      age:               (!Number.isNaN(ageNum) && ageNum >= 16 && ageNum <= 100) ? ageNum : undefined,
      city:              city.trim(),
      phone:             phone.trim() || undefined,
      gender,
      acquisitionSource,
    });
    router.push('/onboarding/car-details');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.step}>1 of 5</Text>
          <Text style={styles.title}>Quick — tell us your name.</Text>
          <Text style={styles.sub}>We personalise the app to you. Takes a minute.</Text>

          {/* Required fields */}
          <View style={styles.section}>
            <Field
              label="First name"
              placeholder="e.g. Ahmed"
              value={firstName}
              onChangeText={setFirstName}
            />

            <ChipRow
              label="Gender"
              options={GENDER_OPTIONS}
              selected={gender}
              onSelect={setGender}
            />

            <CityPicker value={city} onSelect={setCity} />
          </View>

          {/* Optional section */}
          <View style={styles.optionalSection}>
            <Text style={styles.optionalSectionLabel}>The more you tell us, the better we can help</Text>

            <Field
              label="Last name"
              placeholder="e.g. Hassan"
              value={lastName}
              onChangeText={setLastName}
              optional
            />
            <Field
              label="Age"
              placeholder="e.g. 28"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              autoCapitalize="none"
              optional
            />
            <Field
              label="Phone number"
              placeholder="e.g. 01012345678"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              optional
            />

            <ChipRow
              label="How did you hear about Carvalv?"
              options={ACQUISITION_OPTIONS}
              selected={acquisitionSource}
              onSelect={setAcquisitionSource}
              optional
            />
          </View>

          <View style={styles.footer}>
            <Button
              label={isValid ? 'Next — add your car →' : 'Fill in the required fields above'}
              onPress={handleNext}
              disabled={!isValid}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: colors.background },
  kav:        { flex: 1 },
  scroll:     { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },
  step:       { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title:      { ...typography.title, color: colors.text, fontSize: 26, marginBottom: 6 },
  sub:        { ...typography.body, color: colors.textMuted, fontSize: 14, marginBottom: spacing.lg, lineHeight: 20 },

  section:    { marginBottom: spacing.lg },
  optionalSection: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  optionalSectionLabel: {
    ...typography.label,
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: spacing.xs,
  },

  field:      { marginBottom: spacing.md },
  fieldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 6 },
  fieldLabel: { ...typography.label, color: colors.textMuted, fontSize: 11 },
  optionalTag: {
    ...typography.label,
    color: colors.textMuted,
    fontSize: 10,
    backgroundColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...typography.body,
    color: colors.text,
    fontSize: 16,
  },

  chips:    { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive:     { borderColor: colors.orange, backgroundColor: colors.orange + '18' },
  chipText:       { ...typography.body, color: colors.textMuted, fontSize: 13 },
  chipTextActive: { color: colors.orange, fontWeight: '600' },

  cityDropdown: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 4,
    overflow: 'hidden',
    zIndex: 10,
  },
  cityOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cityOptionText: { ...typography.body, color: colors.text, fontSize: 15 },

  footer: { marginTop: spacing.sm },
});
