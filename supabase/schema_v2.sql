-- Run this in Supabase SQL Editor

create table if not exists service_logs (
  id uuid primary key default gen_random_uuid(),
  car_id uuid references cars(id) on delete cascade not null,
  item_id uuid references maintenance_items(id) on delete cascade not null,
  done_at_km integer,
  done_at date not null default current_date,
  cost_egp numeric(10,2),
  notes text,
  receipt_url text,
  created_at timestamptz default now()
);

alter table service_logs enable row level security;

create policy "user owns service logs" on service_logs
  for all using (
    car_id in (select id from cars where user_id = auth.uid())
  );

-- Storage bucket for receipts (run separately in Storage settings or via this)
-- insert into storage.buckets (id, name, public) values ('receipts', 'receipts', true)
-- on conflict do nothing;

create policy "user can upload receipts" on storage.objects
  for insert with check (bucket_id = 'receipts' and auth.role() = 'authenticated');

create policy "receipts are public" on storage.objects
  for select using (bucket_id = 'receipts');
