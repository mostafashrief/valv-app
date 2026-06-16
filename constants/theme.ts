import { Platform } from 'react-native';

// ─── Primary palette ──────────────────────────────────────────────────────────
// These three carry the brand on every surface: logo, splash, buttons, nav.
export const colors = {
  espresso: '#1A1410',   // dark background, headings on light
  orange: '#FF8A3D',     // CTA buttons, links, accents
  cream: '#F4EFE6',      // light screen backgrounds, cards

  // Derived surfaces
  background: '#F4EFE6', // cream for content screens
  backgroundDark: '#1A1410', // espresso for splash/auth
  surface: '#FFFFFF',
  surfaceDark: '#2A2018', // slightly lighter than espresso for cards on dark bg

  text: '#1A1410',
  textLight: '#F4EFE6',  // text on dark backgrounds
  textMuted: '#8A7D6E',  // muted on cream
  textMutedDark: '#9A8E82', // muted on espresso
  border: '#E2D9CC',     // subtle on cream
  borderDark: '#3A2E22',

  primary: '#FF8A3D',    // alias for orange

  // ─── Status colors (functional only — never in marketing) ─────────────────
  overdue: '#E24B4A',
  dueSoon: '#FFD166',
  healthy: '#2EC4B6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
};

// SF Pro is the iOS system font — no fontFamily needed on iOS; it's the default.
// On Android we use the system sans-serif which maps to Roboto.
export const typography = {
  title: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, fontWeight: '400' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  label: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.8, textTransform: 'uppercase' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
  // SF Mono / monospace — mileage readings, dates, EGP amounts only
  mono: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 15,
    fontWeight: '400' as const,
  },
  monoLarge: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 32,
    fontWeight: '700' as const,
    letterSpacing: -1,
  },
};
