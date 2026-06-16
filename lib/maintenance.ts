import type { MaintenanceItem, MaintenanceStatus } from '../types/car';

export interface MaintenanceItemStatus {
  item: MaintenanceItem;
  status: MaintenanceStatus;
  kmRemaining: number | null;
  daysRemaining: number | null;
  overdueLine: string; // one-liner shown in the card
}

export function calcItemStatus(
  item: MaintenanceItem,
  currentKm: number,
): MaintenanceItemStatus {
  const today = new Date();

  // ── Mileage-based ────────────────────────────────────────────────────────────
  let kmRemaining: number | null = null;
  if (item.intervalKm != null && item.lastDoneAtKm != null) {
    const dueAtKm = item.lastDoneAtKm + item.intervalKm;
    kmRemaining = dueAtKm - currentKm;
  }

  // ── Time-based ───────────────────────────────────────────────────────────────
  let daysRemaining: number | null = null;
  if (item.intervalDays != null && item.lastDoneAtDate != null) {
    const dueDate = new Date(item.lastDoneAtDate);
    dueDate.setDate(dueDate.getDate() + item.intervalDays);
    daysRemaining = Math.round((dueDate.getTime() - today.getTime()) / 86_400_000);
  }

  // ── Pick worst status between mileage and time axes ──────────────────────────
  const kmStatus = resolveKmStatus(kmRemaining);
  const timeStatus = resolveTimeStatus(daysRemaining);
  const status = worst(kmStatus, timeStatus);

  return {
    item,
    status,
    kmRemaining,
    daysRemaining,
    overdueLine: buildLine(status, kmRemaining, daysRemaining),
  };
}

function resolveKmStatus(km: number | null): MaintenanceStatus {
  if (km == null) return 'healthy';
  if (km <= 0) return 'overdue';
  if (km <= 1500) return 'dueSoon';
  return 'healthy';
}

function resolveTimeStatus(days: number | null): MaintenanceStatus {
  if (days == null) return 'healthy';
  if (days <= 0) return 'overdue';
  if (days <= 14) return 'dueSoon';
  return 'healthy';
}

const STATUS_RANK: Record<MaintenanceStatus, number> = {
  healthy: 0,
  dueSoon: 1,
  overdue: 2,
};

function worst(a: MaintenanceStatus, b: MaintenanceStatus): MaintenanceStatus {
  return STATUS_RANK[a] >= STATUS_RANK[b] ? a : b;
}

function buildLine(
  status: MaintenanceStatus,
  km: number | null,
  days: number | null,
): string {
  if (status === 'healthy') {
    const parts: string[] = [];
    if (km != null) parts.push(`${km.toLocaleString()} km left`);
    if (days != null) parts.push(`${days}d left`);
    return parts.join(' · ');
  }
  if (status === 'dueSoon') {
    const parts: string[] = [];
    if (km != null && km > 0) parts.push(`Due in ${km.toLocaleString()} km`);
    if (days != null && days > 0) parts.push(`${days} days`);
    return parts.join(' · ') || 'Due soon.';
  }
  // overdue
  if (km != null && km <= 0) return `Overdue by ${Math.abs(km).toLocaleString()} km.`;
  if (days != null && days <= 0) return `Overdue by ${Math.abs(days)} days.`;
  return 'Overdue.';
}

export function sortByUrgency(items: MaintenanceItemStatus[]): MaintenanceItemStatus[] {
  return [...items].sort((a, b) => STATUS_RANK[b.status] - STATUS_RANK[a.status]);
}
