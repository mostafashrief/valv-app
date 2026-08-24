import React, { createContext, useContext, useState } from 'react';

export type AgeRange = 'under_20' | '20_30' | '30_45' | '45_plus';
export type OwnershipDuration = 'under_6m' | '6m_2y' | '2_5y' | 'over_5y' | 'new';
export type HasRecords = 'receipts' | 'booklet' | 'none';
export type MileageReminderFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export interface QuizDraft {
  firstName?: string;
  ageRange?: AgeRange;
  ownershipDuration?: OwnershipDuration;
  hasRecords?: HasRecords;
  mileageReminderFrequency?: MileageReminderFrequency;
}

interface QuizContextValue {
  draft: QuizDraft;
  setDraft: (patch: Partial<QuizDraft>) => void;
  reset: () => void;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<QuizDraft>({});

  const setDraft = (patch: Partial<QuizDraft>) =>
    setDraftState((prev) => ({ ...prev, ...patch }));

  const reset = () => setDraftState({});

  return (
    <QuizContext.Provider value={{ draft, setDraft, reset }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}
