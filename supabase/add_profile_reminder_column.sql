ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS mileage_reminder_frequency text DEFAULT 'weekly';
