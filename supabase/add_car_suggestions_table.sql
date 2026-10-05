CREATE TABLE IF NOT EXISTS car_suggestions (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  car_name    text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE car_suggestions ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can insert; only they can read their own
CREATE POLICY "Users insert own suggestions"
  ON car_suggestions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own suggestions"
  ON car_suggestions FOR SELECT
  USING (auth.uid() = user_id);
