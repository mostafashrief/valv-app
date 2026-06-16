import React, { createContext, useContext, useMemo, useState } from 'react';
import type { OnboardingDraft } from '../types/car';

interface OnboardingContextValue {
  draft: OnboardingDraft;
  setDraft: (patch: Partial<OnboardingDraft>) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<OnboardingDraft>({});

  const value = useMemo<OnboardingContextValue>(
    () => ({
      draft,
      setDraft: (patch) => setDraftState((prev) => ({ ...prev, ...patch })),
      reset: () => setDraftState({}),
    }),
    [draft],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
