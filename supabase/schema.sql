-- VALV initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push` once you
-- have the CLI + project linked). Assumes Supabase Auth is used for users
-- (auth.users), so app tables reference auth.uid() directly.

create extension if not exists "uuid-ossp";

-- One row per car the user owns. v1 MVP is single-car, but the schema
-- supports multiple from day one (multi-car garage is a planned paid upsell).
create table if not exists public.cars (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  brand text not null,
  model text not null,
  year int not null,
  current_mileage_km int not null default 0,
  mileage_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- The maintenance plan generated for a car: one row per part/service type.
-- `source` distinguishes generic rule-of-thumb defaults from confirmed OEM
-- data so the UI/notifications can be honest about confidence level.
create table if not exists public.maintenance_items (
  id uuid primary key default uuid_generate_v4(),
  car_id uuid not null references public.cars (id) on delete cascade,
  name text not null,
  interval_km int,
  interval_days int,
  last_done_at_km int,
  last_done_at timestamptz,
  source text not null default 'estimated' check (source in ('estimated', 'verified')),
  created_at timestamptz not null default now()
);

-- History of mileage check-ins, used to compute streaks and to recalc
-- maintenance status (due soon / overdue) after each log.
create table if not exists public.mileage_logs (
  id uuid primary key default uuid_generate_v4(),
  car_id uuid not null references public.cars (id) on delete cascade,
  mileage_km int not null,
  logged_at timestamptz not null default now()
);

alter table public.cars enable row level security;
alter table public.maintenance_items enable row level security;
alter table public.mileage_logs enable row level security;

create policy "Users manage their own cars"
  on public.cars for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage maintenance items on their own cars"
  on public.maintenance_items for all
  using (exists (select 1 from public.cars c where c.id = car_id and c.user_id = auth.uid()))
  with check (exists (select 1 from public.cars c where c.id = car_id and c.user_id = auth.uid()));

create policy "Users manage mileage logs on their own cars"
  on public.mileage_logs for all
  using (exists (select 1 from public.cars c where c.id = car_id and c.user_id = auth.uid()))
  with check (exists (select 1 from public.cars c where c.id = car_id and c.user_id = auth.uid()));
