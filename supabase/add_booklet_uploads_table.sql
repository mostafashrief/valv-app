CREATE TABLE IF NOT EXISTS booklet_uploads (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_id      uuid NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_urls  text[] NOT NULL DEFAULT '{}',
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE booklet_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own booklet uploads"
  ON booklet_uploads FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
