import React, { createContext, useContext, useState } from 'react';

export type AgeRange = 'under_20' | '20_30' | '30_45' | '45_plus';
export type OwnershipDuration = 'under_6m' | '6m_2y' | '2_5y' | 'over_5y' | 'new';
export type HasRecords = 'receipts' | 'booklet' | 'none';
export type DrivesDaily = 'every_day' | 'most_days' | 'few_times' | 'weekends';
export type DailyTrip = 'under_10' | '10_30' | '30_60' | '60_plus';
export type IntercityTravel = 'rarely' | 'few_year' | 'monthly' | 'weekly';
export type ReminderFrequency = 'monthly' | 'biweekly' | 'weekly';

export interface QuizDraft {
  firstName?: string;
  ageRange?: AgeRange;
  ownershipDuration?: OwnershipDuration;
  hasRecords?: HasRecords;
  drivesDaily?: DrivesDaily;
  dailyTrip?: DailyTrip;
  intercityTravel?: IntercityTravel;
}

function estimateMonthlyKm(draft: QuizDraft): number {
  const baseMap: Record<DailyTrip, number> = {
    under_10: 150,
    '10_30': 600,
    '30_60': 1350,
    '60_plus': 2400,
  };
  const frequencyMultiplier: Record<DrivesDaily, number> = {
    every_day: 1,
    most_days: 0.75,
    few_times: 0.4,
    weekends: 0.2,
  };
  const intercityBonus: Record<IntercityTravel, number> = {
    rarely: 0,
    few_year: 100,
    monthly: 400,
    weekly: 1000,
  };

  const base = baseMap[draft.dailyTrip ?? 'under_10'];
  const multiplier = frequencyMultiplier[draft.drivesDaily ?? 'few_times'];
  const bonus = intercityBonus[draft.intercityTravel ?? 'rarely'];
  return Math.round((base * multiplier + bonus) / 100) * 100;
}

function estimateReminderFrequency(monthlyKm: number): ReminderFrequency {
  if (monthlyKm >= 1500) return 'weekly';
  if (monthlyKm >= 700) return 'biweekly';
  return 'monthly';
}

interface QuizContextValue {
  draft: QuizDraft;
  setDraft: (patch: Partial<QuizDraft>) => void;
  getMonthlyKm: () => number;
  getReminderFrequency: () => ReminderFrequency;
  reset: () => void;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<QuizDraft>({});

  const setDraft = (patch: Partial<QuizDraft>) =>
    setDraftState((prev) => ({ ...prev, ...patch }));

  const getMonthlyKm = () => estimateMonthlyKm(draft);
  const getReminderFrequency = () => estimateReminderFrequency(estimateMonthlyKm(draft));
  const reset = () => setDraftState({});

  return (
    <QuizContext.Provider value={{ draft, setDraft, getMonthlyKm, getReminderFrequency, reset }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}
