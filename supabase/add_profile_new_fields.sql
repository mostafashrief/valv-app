-- Add new profile fields collected in the onboarding quiz
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS last_name          text,
  ADD COLUMN IF NOT EXISTS age                int,          -- exact age (better for SQL bucketing than text range)
  ADD COLUMN IF NOT EXISTS city               text,         -- Egypt city for geo segmentation
  ADD COLUMN IF NOT EXISTS phone              text,         -- E.164-ish, optional
  ADD COLUMN IF NOT EXISTS gender             text,         -- 'male' | 'female' | 'prefer_not_to_say'
  ADD COLUMN IF NOT EXISTS acquisition_source text;         -- 'friend' | 'social_media' | 'search' | 'app_store' | 'other'

-- Useful indexes for analytics queries
-- GROUP BY city, COUNT users per city
CREATE INDEX IF NOT EXISTS profiles_city_idx     ON profiles (city);
-- AGE brackets in WHERE clauses
CREATE INDEX IF NOT EXISTS profiles_age_idx      ON profiles (age);
-- Cohort analysis: quiz completion over time
CREATE INDEX IF NOT EXISTS profiles_quiz_done_idx ON profiles (quiz_completed_at);
