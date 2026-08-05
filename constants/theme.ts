// carvalv brand palette — dark-first
export const colors = {
  // Core
  engineBlack: '#111110',
  orange: '#FF7A1A',       // Ignition Orange
  iconWhite: '#F4F2EE',    // Icon White
  carbon: '#2E2E2C',       // Carbon Gray — cards, surfaces
  steel: '#5C5C5A',        // muted labels

  // Semantic aliases
  background: '#111110',
  surface: '#2E2E2C',
  text: '#F4F2EE',
  textMuted: '#5C5C5A',
  border: '#3E3E3C',
  primary: '#FF7A1A',

  // Status — functional only
  overdue: '#FF2D2D',      // Redline Red
  dueSoon: '#FF7A1A',      // same orange (urgency, not alarm)
  healthy: '#2EC4B6',

  // legacy aliases kept so old references don't break during transition
  espresso: '#111110',
  cream: '#111110',
  textLight: '#F4F2EE', // was "text on dark bg" — now same as text (app is dark-first)
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

// Space Grotesk — body copy
// Chakra Petch — headings / subheads
// Space Mono — mileage, cost, numeric labels
export const typography = {
  title: {
    fontFamily: 'ChakraPetch_700Bold',
    fontSize: 28,
    letterSpacing: -0.5,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 16,
    fontWeight: '400' as const,
  },
  body: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 15,
    fontWeight: '400' as const,
  },
  label: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  button: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  mono: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 15,
    fontWeight: '400' as const,
  },
  monoLarge: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 32,
    fontWeight: '700' as const,
    letterSpacing: -1,
  },
};
