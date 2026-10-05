import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import ar from '../locales/ar.json';

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const LANG_KEY = 'app_language';

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'en';
const fallbackLanguage: SupportedLanguage = SUPPORTED_LANGUAGES.includes(
  deviceLocale as SupportedLanguage,
) ? (deviceLocale as SupportedLanguage) : 'en';

// Read persisted language synchronously from a module-level cache
// (AsyncStorage is async; we prime the cache in initLanguage below)
let cachedLanguage: SupportedLanguage = fallbackLanguage;

export const isRTL = (lang: SupportedLanguage) => lang === 'ar';

I18nManager.allowRTL(true);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: cachedLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

// Call this once at app startup (in _layout.tsx) to load the saved language
export async function initLanguage() {
  try {
    const saved = await AsyncStorage.getItem(LANG_KEY) as SupportedLanguage | null;
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      cachedLanguage = saved;
      await i18n.changeLanguage(saved);
      if (I18nManager.isRTL !== isRTL(saved)) {
        I18nManager.forceRTL(isRTL(saved));
      }
    }
  } catch {}
}

export async function setLanguage(lang: SupportedLanguage) {
  await AsyncStorage.setItem(LANG_KEY, lang);
  await i18n.changeLanguage(lang);
  const needsRTLChange = I18nManager.isRTL !== isRTL(lang);
  if (needsRTLChange) {
    I18nManager.forceRTL(isRTL(lang));
    // RTL layout change requires a full JS bundle reload
    try {
      const Updates = require('expo-updates');
      await Updates.reloadAsync();
    } catch {
      // In Expo Go or dev client, reloadAsync may not work — fall back to a no-op;
      // the user will see RTL apply on next cold launch.
    }
  }
}

export default i18n;
