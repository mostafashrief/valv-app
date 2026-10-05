import React, { createContext, useContext, useState } from 'react';

export type HasRecords = 'receipts' | 'booklet' | 'none';
export type MileageReminderFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export type Gender = 'male' | 'female' | 'prefer_not_to_say';
export type AcquisitionSource = 'friend' | 'social_media' | 'search' | 'app_store' | 'other';

export interface QuizDraft {
  firstName?: string;
  lastName?: string;
  age?: number;
  city?: string;
  phone?: string;
  gender?: Gender;
  acquisitionSource?: AcquisitionSource;
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
