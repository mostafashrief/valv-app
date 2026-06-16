// Generic, rule-of-thumb maintenance intervals used as a starting point for
// every car until brand/model-specific OEM data is added. All rows are
// inserted with source="estimated" so the UI/notifications can be upfront
// about confidence level (see [[valv-app-overview]] for the data strategy).
export interface DefaultMaintenanceItem {
  name: string;
  intervalKm?: number;
  intervalDays?: number;
}

export const DEFAULT_MAINTENANCE_ITEMS: DefaultMaintenanceItem[] = [
  { name: 'Engine oil & filter', intervalKm: 10000, intervalDays: 180 },
  { name: 'Air filter', intervalKm: 20000 },
  { name: 'Cabin (AC) filter', intervalKm: 20000, intervalDays: 365 },
  { name: 'Brake pads', intervalKm: 30000 },
  { name: 'Brake fluid', intervalDays: 730 },
  { name: 'Tires rotation', intervalKm: 10000 },
  { name: 'Battery check', intervalDays: 365 },
  { name: 'Timing belt', intervalKm: 90000, intervalDays: 1825 },
  { name: 'Spark plugs', intervalKm: 40000 },
  { name: 'Coolant', intervalKm: 60000, intervalDays: 1095 },
];
