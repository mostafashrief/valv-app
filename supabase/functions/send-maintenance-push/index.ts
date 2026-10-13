import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

interface MaintenanceItem {
  id: string;
  name: string;
  interval_km: number | null;
  interval_days: number | null;
  last_done_at_km: number | null;
  last_done_at: string | null;
}

function calcStatus(item: MaintenanceItem, currentKm: number): 'overdue' | 'dueSoon' | 'healthy' {
  let kmStatus: 'overdue' | 'dueSoon' | 'healthy' = 'healthy';
  let dayStatus: 'overdue' | 'dueSoon' | 'healthy' = 'healthy';

  if (item.interval_km && item.last_done_at_km != null) {
    const nextKm = item.last_done_at_km + item.interval_km;
    const remaining = nextKm - currentKm;
    if (remaining <= 0) kmStatus = 'overdue';
    else if (remaining <= 1500) kmStatus = 'dueSoon';
  }

  if (item.interval_days && item.last_done_at) {
    const lastDate = new Date(item.last_done_at).getTime();
    const nextDate = lastDate + item.interval_days * 86400000;
    const remainingMs = nextDate - Date.now();
    const remainingDays = remainingMs / 86400000;
    if (remainingDays <= 0) dayStatus = 'overdue';
    else if (remainingDays <= 14) dayStatus = 'dueSoon';
  }

  const rank = { overdue: 2, dueSoon: 1, healthy: 0 };
  return rank[kmStatus] >= rank[dayStatus] ? kmStatus : dayStatus;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Fetch all profiles that have a push token
  const { data: profiles, error: profilesErr } = await supabase
    .from('profiles')
    .select('id, push_token')
    .not('push_token', 'is', null);

  if (profilesErr) {
    return new Response(JSON.stringify({ error: profilesErr.message }), { status: 500, headers: cors });
  }

  const messages: object[] = [];
  let sent = 0;

  for (const profile of profiles ?? []) {
    // Get their active car
    const { data: cars } = await supabase
      .from('cars')
      .select('id, current_mileage_km')
      .eq('user_id', profile.id)
      .limit(1);

    if (!cars || cars.length === 0) continue;
    const car = cars[0];

    // Get maintenance items
    const { data: items } = await supabase
      .from('maintenance_items')
      .select('id, name, interval_km, interval_days, last_done_at_km, last_done_at')
      .eq('car_id', car.id);

    if (!items || items.length === 0) continue;

    const overdue = items.filter((i) => calcStatus(i, car.current_mileage_km ?? 0) === 'overdue');
    const dueSoon = items.filter((i) => calcStatus(i, car.current_mileage_km ?? 0) === 'dueSoon');

    if (overdue.length === 0 && dueSoon.length === 0) continue;

    const title = overdue.length > 0
      ? overdue.length === 1
        ? `${overdue[0].name} is overdue`
        : `${overdue.length} services are overdue`
      : dueSoon.length === 1
        ? `${dueSoon[0].name} is coming up`
        : `${dueSoon.length} services due soon`;

    const body = overdue.length > 0
      ? overdue.slice(0, 3).map((i) => i.name).join(', ') + (overdue.length > 3 ? ' and more.' : '.')
      : 'Open VALV to see your maintenance timeline.';

    messages.push({
      to: profile.push_token,
      title,
      body,
      sound: overdue.length > 0 ? 'default' : undefined,
      data: { type: 'maintenance', status: overdue.length > 0 ? 'overdue' : 'dueSoon' },
    });
    sent++;
  }

  if (messages.length === 0) {
    return new Response(JSON.stringify({ sent: 0, message: 'No users with pending items' }), { headers: cors });
  }

  // Send to Expo Push API in batches of 100
  const results = [];
  for (let i = 0; i < messages.length; i += 100) {
    const batch = messages.slice(i, i + 100);
    const res = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(batch),
    });
    results.push(await res.json());
  }

  return new Response(JSON.stringify({ sent, results }), { headers: cors });
});
