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
import { useEffect } from 'react';
import { requestNotificationPermission } from '../lib/notifications';
import { AuthProvider, useAuth } from '../lib/auth-context';
import { OnboardingProvider } from '../lib/onboarding-context';
import { CarProvider } from '../lib/car-context';
import { QuizProvider } from '../lib/quiz-context';
import { RevenueCatProvider, useRevenueCat } from '../lib/revenue-cat';
import { colors } from '../constants/theme';
import { router, useSegments } from 'expo-router';

// Paywall gate — disabled until RevenueCat API key is configured
function PaywallGate() {
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
                <PaywallGate />
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
