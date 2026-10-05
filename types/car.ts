export type MaintenanceStatus = 'healthy' | 'dueSoon' | 'overdue';

export interface MaintenanceItem {
  id: string;
  name: string;
  /** Distance interval in km, if mileage-based. */
  intervalKm?: number;
  /** Time interval in days, if time-based. */
  intervalDays?: number;
  lastDoneAtKm?: number;
  lastDoneAtDate?: string; // ISO date
  /** "estimated" = generic rule-of-thumb default, "verified" = confirmed OEM data. */
  source: 'estimated' | 'verified' | string; // brand name = official (e.g. 'Toyota', 'MG')
}

export interface CarProfile {
  id: string;
  brand: string;
  model: string;
  year: number;
  currentMileageKm: number;
  mileageUpdatedAt: string; // ISO date
  maintenanceItems: MaintenanceItem[];
}

export type TransmissionType = 'manual' | 'automatic' | 'cvt' | 'dsg';
export type TimingSystemType = 'chain' | 'belt' | 'unknown';

export interface OnboardingDraft {
  brand?: string;
  model?: string;
  year?: number;
  mileageKm?: number;
  transmission?: TransmissionType;
  timingSystem?: TimingSystemType;
}
