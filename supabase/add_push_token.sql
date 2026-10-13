-- Add push_token column to profiles for Expo remote push notifications
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS push_token text;

CREATE INDEX IF NOT EXISTS profiles_push_token_idx ON profiles (push_token)
  WHERE push_token IS NOT NULL;
