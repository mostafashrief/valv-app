// Playful but clean palette — bright primary, soft surfaces, friendly status colors.
export const colors = {
  background: '#F7F9FC',
  surface: '#FFFFFF',
  primary: '#2E6BFF',
  primaryDark: '#1B49C2',
  text: '#16213A',
  textMuted: '#6B7587',
  border: '#E6EAF2',
  healthy: '#2BB673',
  dueSoon: '#F5A623',
  overdue: '#E5484D',
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
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
};

export const typography = {
  title: { fontSize: 28, fontWeight: '700' as const },
  subtitle: { fontSize: 16, fontWeight: '400' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
};
