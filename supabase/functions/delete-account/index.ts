import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

  // Client with user's JWT — for RLS-protected deletes
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  // Admin client — for deleting the auth user
  const adminClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Verify JWT and get user id
  const { data: { user }, error: userError } = await userClient.auth.getUser();
  if (userError || !user) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

  const userId = user.id;

  // Delete in FK order: service_logs → mileage_logs → maintenance_items → cars → profiles
  const { data: userCars } = await userClient.from('cars').select('id').eq('user_id', userId);
  const carIds = (userCars ?? []).map((c: any) => c.id);

  if (carIds.length > 0) {
    await userClient.from('service_logs').delete().in('car_id', carIds);
    await userClient.from('mileage_logs').delete().in('car_id', carIds);
    await userClient.from('maintenance_items').delete().in('car_id', carIds);
    await userClient.from('cars').delete().in('id', carIds);
  }

  await userClient.from('profiles').delete().eq('user_id', userId);

  // Delete auth user — requires service role
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId);
  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
