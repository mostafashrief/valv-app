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
import { View } from 'react-native';
import { useEffect, useRef } from 'react';
import { requestNotificationPermission } from '../lib/notifications';
import { AuthProvider, useAuth } from '../lib/auth-context';
import { OnboardingProvider } from '../lib/onboarding-context';
import { CarProvider } from '../lib/car-context';
import { QuizProvider } from '../lib/quiz-context';
import { RevenueCatProvider } from '../lib/revenue-cat';
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
    const onPublicScreen = !inTabs && !inOnboarding && !inQuiz && segments[0] !== 'item';
    if (!onPublicScreen) return;

    userHasCar(session.user.id).then((hasCar) => {
      router.replace(hasCar ? '/(tabs)' : '/quiz/name');
    });
  }, [session, initializing]);

  return null;
}

function AppProviders({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  return (
    <RevenueCatProvider userId={session?.user.id ?? ''}>
      {children}
    </RevenueCatProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    initLanguage();
    requestNotificationPermission();
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
