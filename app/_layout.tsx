import '../lib/i18n';
import { initLanguage } from '../lib/i18n';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
} from '@expo-google-fonts/space-grotesk';
import {
  ChakraPetch_600SemiBold,
  ChakraPetch_700Bold,
} from '@expo-google-fonts/chakra-petch';
import {
  SpaceMono_400Regular,
} from '@expo-google-fonts/space-mono';
import { View, AppState, AppStateStatus, Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import {
  requestNotificationPermission,
  rescheduleMaintenanceIfNeeded,
} from '../lib/notifications';
import { AuthProvider, useAuth } from '../lib/auth-context';
import { OnboardingProvider } from '../lib/onboarding-context';
import { CarProvider } from '../lib/car-context';
import { QuizProvider } from '../lib/quiz-context';
import { RevenueCatProvider, useRevenueCat } from '../lib/revenue-cat';
import { colors } from '../constants/theme';
import { router, useSegments } from 'expo-router';
import { supabase } from '../lib/supabase';

async function userHasCar(userId: string): Promise<boolean> {
  const { data } = await supabase.from('cars').select('id').eq('user_id', userId).limit(1);
  return (data?.length ?? 0) > 0;
}

// Routes every session change to the right screen.
// Runs once on mount (cold launch) and again whenever the user signs in or out.
function AuthGate() {
  const { session, initializing } = useAuth();
  const segments = useSegments();
  const didRoute = useRef(false);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === 'auth';
    const inOnboarding = segments[0] === 'onboarding';
    const inQuiz = segments[0] === 'quiz';
    const inTabs = segments[0] === '(tabs)';

    if (!session) {
      // Not signed in — send to welcome unless already there or in auth
      if (!inAuthGroup && segments[0] !== undefined && segments[0] !== 'index') {
        router.replace('/');
      }
      didRoute.current = false;
      return;
    }

    // Signed in — figure out where to send them
    // Only reroute if we haven't already done so for this session, or they're
    // stuck on a screen they shouldn't be on (welcome, auth)
    const onPublicScreen = !inTabs && !inOnboarding && !inQuiz && segments[0] !== 'item' && segments[0] !== 'paywall';
    if (!onPublicScreen) return;

    userHasCar(session.user.id).then((hasCar) => {
      router.replace(hasCar ? '/(tabs)' : '/quiz/name');
    });
  }, [session, initializing]);

  return null;
}

// Redirects expired users to /paywall whenever they land on the tabs.
// Runs inside RevenueCatProvider so it has access to subscription status.
function PaywallGate() {
  const { status } = useRevenueCat();
  const segments = useSegments();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'expired' && segments[0] === '(tabs)') {
      router.replace('/paywall');
    }
  }, [status, segments[0]]);

  return null;
}

function AppProviders({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  return (
    <RevenueCatProvider userId={session?.user.id ?? ''}>
      <PaywallGate />
      {children}
    </RevenueCatProvider>
  );
}

function routeFromNotification(response: Notifications.NotificationResponse) {
  const type = (response.notification.request.content.data as any)?.type;
  if (type === 'maintenance') {
    router.push('/(tabs)/upcoming');
  } else if (type === 'mileage') {
    router.push('/(tabs)');
  }
}

export default function RootLayout() {
  useEffect(() => {
    initLanguage();
    requestNotificationPermission();

    if (Platform.OS === 'web') return;

    // Gap 2: cold launch — app was closed and opened via notification tap
    try {
      Notifications.getLastNotificationResponseAsync()
        .then((response) => { if (response) routeFromNotification(response); })
        .catch(() => {});
    } catch {}

    let tapSub: { remove: () => void } | null = null;
    try {
      // Gap 1: tap handler while app is running or backgrounded
      tapSub = Notifications.addNotificationResponseReceivedListener(routeFromNotification);
    } catch {}

    // Gap 3: reschedule maintenance notifications when app returns to foreground
    const appStateSub = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'active') rescheduleMaintenanceIfNeeded();
    });

    return () => {
      tapSub?.remove();
      appStateSub.remove();
    };
  }, []);

  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    ChakraPetch_600SemiBold,
    ChakraPetch_700Bold,
    SpaceMono_400Regular,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CarProvider>
          <OnboardingProvider>
            <QuizProvider>
              <AppProviders>
                <AuthGate />
                <StatusBar style="light" />
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background },
                  }}
                />
              </AppProviders>
            </QuizProvider>
          </OnboardingProvider>
        </CarProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
