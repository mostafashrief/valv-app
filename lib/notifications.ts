import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MaintenanceItem } from '../types/car';
import { calcItemStatus } from './maintenance';
import { supabase } from './supabase';

// Show notification banners when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export type MileageReminderFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

const FREQUENCY_DAYS: Record<MileageReminderFrequency, number> = {
  daily:    1,
  weekly:   7,
  biweekly: 14,
  monthly:  30,
};

// ─── permissions ──────────────────────────────────────────────────────────────

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('maintenance', {
      name: 'Maintenance Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
    await Notifications.setNotificationChannelAsync('mileage', {
      name: 'Mileage Updates',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  return true;
}

// ─── maintenance notifications ────────────────────────────────────────────────

export async function scheduleMaintenceNotifications(
  items: MaintenanceItem[],
  currentKm: number,
) {
  // Cancel existing maintenance notifications before rescheduling
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const n of scheduled) {
    if ((n.content.data as any)?.type === 'maintenance') {
      await Notifications.cancelScheduledNotificationAsync(n.identifier);
    }
  }

  const overdueItems: string[] = [];
  const dueSoonItems: string[] = [];

  for (const item of items) {
    const s = calcItemStatus(item, currentKm);
    if (s.status === 'overdue') overdueItems.push(item.name);
    else if (s.status === 'dueSoon') dueSoonItems.push(item.name);
  }

  // Fire overdue notification immediately (well, in 2 seconds)
  if (overdueItems.length > 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: overdueItems.length === 1
          ? `${overdueItems[0]} is overdue`
          : `${overdueItems.length} services are overdue`,
        body: overdueItems.length === 1
          ? 'Open the app to log the service and reset your reminder.'
          : overdueItems.slice(0, 3).join(', ') + (overdueItems.length > 3 ? ' and more.' : '.'),
        sound: true,
        data: { type: 'maintenance', status: 'overdue' },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 2, repeats: false },
    });
  }

  // Fire due-soon notification immediately if no overdue
  if (overdueItems.length === 0 && dueSoonItems.length > 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: dueSoonItems.length === 1
          ? `${dueSoonItems[0]} is coming up`
          : `${dueSoonItems.length} services due soon`,
        body: 'Update your mileage to see exact timing.',
        sound: false,
        data: { type: 'maintenance', status: 'dueSoon' },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 3, repeats: false },
    });
  }
}

// ─── mileage reminder ─────────────────────────────────────────────────────────

export async function scheduleMileageReminder(frequency: MileageReminderFrequency) {
  // Cancel any existing mileage reminders
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const n of scheduled) {
    if ((n.content.data as any)?.type === 'mileage') {
      await Notifications.cancelScheduledNotificationAsync(n.identifier);
    }
  }

  const days = FREQUENCY_DAYS[frequency];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Update your mileage 🚗',
      body: 'Keep your maintenance plan accurate — takes 5 seconds.',
      sound: false,
      data: { type: 'mileage' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: days * 24 * 60 * 60,
      repeats: true,
    },
  });
}

// ─── foreground reschedule ────────────────────────────────────────────────────

const RESCHEDULE_KEY = 'last_maintenance_reschedule';
const RESCHEDULE_INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 hours

export async function rescheduleMaintenanceIfNeeded() {
  try {
    const raw = await AsyncStorage.getItem(RESCHEDULE_KEY);
    const last = raw ? parseInt(raw, 10) : 0;
    if (Date.now() - last < RESCHEDULE_INTERVAL_MS) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: cars } = await supabase
      .from('cars')
      .select('id, current_mileage_km')
      .eq('user_id', user.id)
      .limit(1);
    if (!cars || cars.length === 0) return;

    const car = cars[0];
    const { data: items } = await supabase
      .from('maintenance_items')
      .select('*')
      .eq('car_id', car.id);
    if (!items || items.length === 0) return;

    await scheduleMaintenceNotifications(items as MaintenanceItem[], car.current_mileage_km ?? 0);
    await AsyncStorage.setItem(RESCHEDULE_KEY, String(Date.now()));
  } catch {
    // non-critical — silently skip
  }
}

export async function cancelMileageReminder() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const n of scheduled) {
    if ((n.content.data as any)?.type === 'mileage') {
      await Notifications.cancelScheduledNotificationAsync(n.identifier);
    }
  }
}
