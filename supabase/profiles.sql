CREATE TABLE IF NOT EXISTS profiles (
  user_id                      uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Identity
  first_name                   text,
  last_name                    text,
  age                          int,                    -- exact age; use in SQL as: WHERE age BETWEEN 18 AND 25
  gender                       text,                   -- 'male' | 'female' | 'prefer_not_to_say'

  -- Contact & geo
  city                         text,                   -- Egypt city; group by city for geo marketing
  phone                        text,

  -- Acquisition
  acquisition_source           text,                   -- 'friend' | 'social_media' | 'search' | 'app_store' | 'other'

  -- Car context
  has_service_records          text,                   -- 'receipts' | 'booklet' | 'none'

  -- Engagement settings
  mileage_reminder_frequency   text DEFAULT 'weekly',  -- 'daily' | 'weekly' | 'biweekly' | 'monthly'

  -- Free-text from onboarding
  service_notes                text,

  -- Timestamps (use quiz_completed_at for cohort analysis)
  quiz_completed_at            timestamptz,
  created_at                   timestamptz DEFAULT now(),
  updated_at                   timestamptz DEFAULT now()
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS profiles_city_idx      ON profiles (city);
CREATE INDEX IF NOT EXISTS profiles_age_idx       ON profiles (age);
CREATE INDEX IF NOT EXISTS profiles_gender_idx    ON profiles (gender);
CREATE INDEX IF NOT EXISTS profiles_source_idx    ON profiles (acquisition_source);
CREATE INDEX IF NOT EXISTS profiles_quiz_done_idx ON profiles (quiz_completed_at);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users manage own profile" ON profiles
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
