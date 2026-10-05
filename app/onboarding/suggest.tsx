import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Pressable,
  Alert, FlatList, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { supabase } from '../../lib/supabase';
import { colors, radii, spacing, typography } from '../../constants/theme';

// Master list of world car brands — filtered at runtime against what's already in the app
const ALL_WORLD_BRANDS = [
  'Acura', 'Alfa Romeo', 'Alpina', 'Alpine', 'Aston Martin',
  'BAIC', 'Bentley', 'BMW', 'BYD', 'Bugatti',
  'Cadillac', 'Changan', 'Chery', 'Chevrolet', 'Chrysler', 'Citroën', 'Cupra',
  'Dacia', 'Daewoo', 'Daihatsu', 'Dodge', 'Dongfeng',
  'FAW', 'Ferrari', 'Fiat', 'Ford', 'Foton',
  'GAC', 'Geely', 'Genesis', 'GMC', 'Great Wall',
  'Haval', 'Honda', 'Hummer', 'Hyundai',
  'Infiniti', 'Isuzu',
  'Jaguar', 'Jeep',
  'Kia',
  'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lincoln',
  'Maserati', 'Maxus', 'Mazda', 'McLaren', 'Mercedes-Benz', 'Mini', 'Mitsubishi',
  'Nissan',
  'Opel',
  'Peugeot', 'Porsche',
  'RAM', 'Renault', 'Rolls-Royce',
  'Saab', 'Seres', 'Smart', 'Subaru', 'Suzuki',
  'Tesla', 'Trumpchi',
  'Volvo',
  'Wuling',
  'Xpeng',
  'Zotye',
].sort();

export default function SuggestStep() {
  const { session } = useAuth();
  const [appBrands, setAppBrands] = useState<string[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  // Fetch brands already in the app from the DB — dynamic: updates when we add new ones
  useEffect(() => {
    supabase
      .from('maintenance_schedules')
      .select('brand')
      .then(({ data }) => {
        const unique = [...new Set((data ?? []).map((r: any) => r.brand as string))];
        setAppBrands(unique);
        setLoadingBrands(false);
      });
  }, []);

  // Filter world brands: remove ones already in the app, apply search query
  const suggestions = useMemo(() => {
    const appSet = new Set(appBrands.map((b) => b.toLowerCase()));
    const available = ALL_WORLD_BRANDS.filter((b) => !appSet.has(b.toLowerCase()));
    if (!query.trim()) return available;
    return available.filter((b) =>
      b.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [appBrands, query]);

  const handleSend = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase.from('car_suggestions').insert({
      user_id: session?.user.id ?? null,
      car_name: selected,
    });
    setSaving(false);
    if (error) {
      Alert.alert('Error', 'Could not send suggestion. Please try again.');
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <View style={styles.successBox}>
            <Text style={styles.successTitle}>Got it — thanks.</Text>
            <Text style={styles.successSub}>
              We've noted {selected}. We'll add it as soon as we have the official dealer schedule.
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button label="Back to car selection" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.label}>NOT LISTED YET</Text>
        <Text style={styles.title}>Which brand is your car?</Text>
        <Text style={styles.sub}>
          We're adding brands monthly — suggest yours and we'll prioritize it.
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search brands…"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={(v) => { setQuery(v); setSelected(null); }}
          autoFocus
          clearButtonMode="while-editing"
        />
      </View>

      {loadingBrands ? (
        <ActivityIndicator color={colors.orange} style={{ marginTop: spacing.xl }} />
      ) : (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.noResults}>
              {query.trim()
                ? `"${query}" not in our list — it may already be supported or not yet catalogued.`
                : 'All world brands are already in the app.'}
            </Text>
          }
          renderItem={({ item }) => {
            const isSelected = selected === item;
            return (
              <Pressable
                style={[styles.brandRow, isSelected && styles.brandRowSelected]}
                onPress={() => setSelected(isSelected ? null : item)}
              >
                <Text style={[styles.brandName, isSelected && styles.brandNameSelected]}>
                  {item}
                </Text>
                {isSelected && <Text style={styles.check}>✓</Text>}
              </Pressable>
            );
          }}
        />
      )}

      {selected && (
        <View style={styles.footer}>
          <Button
            label={saving ? 'Sending…' : `Suggest ${selected}`}
            onPress={handleSend}
            disabled={saving}
            loading={saving}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topSection: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  back: { marginBottom: spacing.lg },
  backText: { ...typography.body, color: colors.textMuted },
  label: { ...typography.label, color: colors.orange, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.sm },
  sub: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg, lineHeight: 20 },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...typography.body,
    color: colors.text,
    fontSize: 15,
  },
  list: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: 120 },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  brandRowSelected: { borderColor: colors.orange, backgroundColor: colors.orange + '12' },
  brandName: { ...typography.body, color: colors.text, fontSize: 15 },
  brandNameSelected: { color: colors.orange, fontWeight: '600' },
  check: { fontSize: 16, color: colors.orange },
  noResults: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl, lineHeight: 22 },
  successBox: {
    backgroundColor: colors.healthy + '18',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.healthy + '44',
    padding: spacing.lg,
    marginTop: spacing.xxl,
  },
  successTitle: { ...typography.body, color: colors.healthy, fontWeight: '700', marginBottom: 4 },
  successSub: { ...typography.body, color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, paddingTop: spacing.sm },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
});
