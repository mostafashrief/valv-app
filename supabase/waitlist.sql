create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text unique,
  car_brand text,
  language text not null default 'en',
  created_at timestamptz default now()
);

alter table waitlist enable row level security;

create policy "Anyone can join waitlist"
  on waitlist for insert
  with check (true);

create table if not exists language_choices (
  id uuid primary key default gen_random_uuid(),
  language text not null,
  chosen_at timestamptz default now()
);

alter table language_choices enable row level security;

create policy "Anyone can log language choice"
  on language_choices for insert
  with check (true);
