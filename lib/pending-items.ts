// Module-level store for items pending confirmation in onboarding services screen.
// Lives only in memory — cleared after use.

export interface PendingItem {
  car_id: string;
  name: string;
  interval_km: number | null;
  interval_days: number | null;
  last_done_at_km: number | null;
  last_done_at: string | null;
  source: string;
}

let _items: PendingItem[] = [];
let _currentKm = 0;

export function setPendingItems(items: PendingItem[], currentKm: number) {
  _items = items;
  _currentKm = currentKm;
}

export function getPendingItems(): PendingItem[] {
  return _items;
}

export function getPendingCurrentKm(): number {
  return _currentKm;
}

export function clearPendingItems() {
  _items = [];
  _currentKm = 0;
}
