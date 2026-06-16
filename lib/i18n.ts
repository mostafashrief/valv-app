import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from '../locales/en.json';
import ar from '../locales/ar.json';

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'en';
const initialLanguage: SupportedLanguage = SUPPORTED_LANGUAGES.includes(
  deviceLocale as SupportedLanguage,
)
  ? (deviceLocale as SupportedLanguage)
  : 'en';

export const isRTL = (lang: SupportedLanguage) => lang === 'ar';

// Note: changing I18nManager.forceRTL requires an app reload to fully apply
// (RN caches layout direction at native init). We call it eagerly here so
// it's correct on first launch; the language switcher screen handles reload.
I18nManager.allowRTL(true);
if (I18nManager.isRTL !== isRTL(initialLanguage)) {
  I18nManager.forceRTL(isRTL(initialLanguage));
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

export default i18n;
