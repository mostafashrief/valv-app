// Module-level store for items pending confirmation in onboarding services screen.
// Lives only in memory — cleared after use.

export interface PendingItem {
  car_id: string;
  name: string;
  interval_km: number | null;
  interval_days: number | null;
  last_done_at_km: number | null;
  last_done_at: string | null;
  source: 'verified' | 'estimated';
}

let _items: PendingItem[] = [];

export function setPendingItems(items: PendingItem[]) {
  _items = items;
}

export function getPendingItems(): PendingItem[] {
  return _items;
}

export function clearPendingItems() {
  _items = [];
}
