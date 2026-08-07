import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth-context';
import { useCar, type Car } from '../../lib/car-context';

function calcCompletion(profile: any): number {
  if (!profile) return 20; // just account
  const fields = ['first_name', 'age_range', 'ownership_duration', 'has_service_records', 'drives_daily', 'daily_trip', 'intercity_travel'];
  const filled = fields.filter((f) => profile[f] != null).length;
  return Math.round(20 + (filled / fields.length) * 80);
}

export default function Profile() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session, signOut } = useAuth();
  const { cars, activeCar, setActiveCar, reloadCars } = useCar();
  const [signingOut, setSigningOut] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [completion, setCompletion] = useState(20);

  useEffect(() => {
    if (!session?.user) return;
    supabase.from('profiles').select('*').eq('user_id', session.user.id).single()
      .then(({ data }) => {
        setProfile(data);
        setCompletion(calcCompletion(data));
      });
  }, [session?.user]);

  const handleSignOut = async () => {
    Alert.alert(t('profile.signOutTitle'), t('profile.signOutMessage'), [
      { text: t('profile.signOutCancel'), style: 'cancel' },
      {
        text: t('profile.signOutConfirm'), style: 'destructive', onPress: async () => {
          setSigningOut(true);
          await signOut();
          setSigningOut(false);
          router.replace('/');
        },
      },
    ]);
  };

  const switchCar = (car: Car) => {
    setActiveCar(car);
    reloadCars();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <Text style={styles.label}>{t('profile.label')}</Text>
        <Text style={styles.title}>{t('profile.title')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('profile.emailLabel')}</Text>
          <Text style={styles.sectionValue}>{session?.user.email ?? '—'}</Text>
        </View>

        {completion < 100 && (
          <Pressable style={styles.completionBanner} onPress={() => router.push('/quiz/name')}>
            <View style={styles.completionTop}>
              <Text style={styles.completionTitle}>{completion}% of your profile is done</Text>
              <Text style={styles.completionCta}>Continue →</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${completion}%` }]} />
            </View>
            <Text style={styles.completionSub}>Help us personalize your maintenance reminders.</Text>
          </Pressable>
        )}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>{t('profile.myCars')}</Text>
        {cars.map((car) => {
          const isActive = activeCar?.id === car.id;
          return (
            <Pressable
              key={car.id}
              style={[styles.carCard, isActive && styles.carCardActive]}
              onPress={() => switchCar(car)}
            >
              <View style={styles.carInfo}>
                <Text style={styles.carName}>{car.brand} {car.model}</Text>
                <Text style={styles.carMeta}>{car.year} · {car.current_mileage_km.toLocaleString()} km</Text>
              </View>
              {isActive && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>{t('profile.activeBadge')}</Text>
                </View>
              )}
            </Pressable>
          );
        })}

        <Pressable style={styles.addCarBtn} onPress={() => router.push('/onboarding/brand')}>
          <Text style={styles.addCarText}>{t('profile.addCar')}</Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable style={styles.signOutBtn} onPress={handleSignOut} disabled={signingOut}>
          {signingOut
            ? <ActivityIndicator color={colors.overdue} size="small" />
            : <Text style={styles.signOutText}>{t('profile.signOut')}</Text>
          }
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl },

  label: { ...typography.label, color: colors.orange },
  title: { ...typography.title, color: colors.text, marginTop: 4, marginBottom: spacing.lg },

  section: { marginBottom: spacing.md },
  sectionLabel: { ...typography.label, color: colors.textMuted, marginBottom: 4 },
  sectionValue: { ...typography.body, color: colors.text },

  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.lg },

  sectionTitle: { ...typography.label, color: colors.textMuted, marginBottom: spacing.sm },

  carCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carCardActive: { borderColor: colors.orange },
  carInfo: { flex: 1 },
  carName: { ...typography.body, color: colors.text, fontWeight: '600' },
  carMeta: { ...typography.body, color: colors.textMuted, fontSize: 13, marginTop: 2 },
  activeBadge: {
    backgroundColor: colors.orange + '22',
    borderRadius: radii.pill,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
  },
  activeBadgeText: { ...typography.label, color: colors.orange, fontSize: 10 },

  addCarBtn: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  addCarText: { ...typography.body, color: colors.textMuted },

  completionBanner: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.orange + '55',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  completionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  completionTitle: { ...typography.body, color: colors.text, fontWeight: '600' },
  completionCta: { ...typography.label, color: colors.orange },
  progressBar: { height: 4, backgroundColor: colors.border, borderRadius: 2, marginBottom: spacing.sm },
  progressFill: { height: 4, backgroundColor: colors.orange, borderRadius: 2 },
  completionSub: { ...typography.body, color: colors.textMuted, fontSize: 13 },

  signOutBtn: {
    borderWidth: 1.5,
    borderColor: colors.overdue + '44',
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  signOutText: { ...typography.button, color: colors.overdue },
});
