import '../lib/i18n';
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
import { AuthProvider } from '../lib/auth-context';
import { OnboardingProvider } from '../lib/onboarding-context';
import { CarProvider } from '../lib/car-context';
import { QuizProvider } from '../lib/quiz-context';
import { colors } from '../constants/theme';

export default function RootLayout() {
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
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.background },
                }}
              />
            </QuizProvider>
          </OnboardingProvider>
        </CarProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
