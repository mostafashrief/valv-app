CREATE TABLE IF NOT EXISTS profiles (
  user_id              uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name           text,
  age_range            text,
  ownership_duration   text,
  has_service_records  text,
  drives_daily         text,
  daily_trip           text,
  intercity_travel     text,
  monthly_km_estimate  int,
  reminder_frequency   text,
  quiz_completed_at    timestamptz,
  created_at           timestamptz DEFAULT now(),
  updated_at           timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users manage own profile" ON profiles
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
