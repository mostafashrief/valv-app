-- maintenance_schedules: OEM reference data per brand/model
-- This is shared reference data, not per-user. Public read, no writes from client.

CREATE TABLE IF NOT EXISTS maintenance_schedules (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand         text NOT NULL,
  model         text,          -- NULL = applies to all models of this brand
  year_from     int,           -- NULL = all years
  year_to       int,           -- NULL = all years
  name          text NOT NULL,
  interval_km   int,
  interval_days int,
  notes         text,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE maintenance_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON maintenance_schedules FOR SELECT USING (true);

CREATE INDEX idx_maintenance_schedules_brand_model ON maintenance_schedules (brand, model);

-- ─── SEAT Ibiza (all years) ───────────────────────────────────────────────────
-- Source: Kayan / SEAT Egypt official service schedule (shared May 2024)
INSERT INTO maintenance_schedules (brand, model, name, interval_km, interval_days) VALUES
  ('SEAT', 'Ibiza', 'Engine oil & inspection',                  10000, NULL),
  ('SEAT', 'Ibiza', 'Engine oil filter',                        10000, NULL),
  ('SEAT', 'Ibiza', 'Engine oil drain plug seal',               10000, NULL),
  ('SEAT', 'Ibiza', 'Intake air filter',                        30000, NULL),
  ('SEAT', 'Ibiza', 'Air conditioner filter',                   30000, NULL),
  ('SEAT', 'Ibiza', 'Spark plugs',                              30000, NULL),
  ('SEAT', 'Ibiza', 'Gearbox oil',                              50000, NULL),
  ('SEAT', 'Ibiza', 'Engine coolant',                           40000, NULL),
  ('SEAT', 'Ibiza', 'Brake fluid',                              40000, NULL),
  ('SEAT', 'Ibiza', 'Accessories belt',                         60000, NULL),
  ('SEAT', 'Ibiza', 'Timing belt',                             120000, NULL),
  ('SEAT', 'Ibiza', 'Timing belt tensioner',                   120000, NULL),
  ('SEAT', 'Ibiza', 'Timing belt relay bearing',               120000, NULL),
  ('SEAT', 'Ibiza', 'Coolant pump drive belt',                 120000, NULL),
  ('SEAT', 'Ibiza', 'Brake fluid check',                        10000, NULL),
  ('SEAT', 'Ibiza', 'Electrical switches & components check',   10000, NULL),
  ('SEAT', 'Ibiza', 'Headlight check',                          10000, NULL),
  ('SEAT', 'Ibiza', 'Seat belts check',                         10000, NULL),
  ('SEAT', 'Ibiza', 'Suspension & power train check',           10000, NULL),
  ('SEAT', 'Ibiza', 'Brake system check',                       10000, NULL),
  ('SEAT', 'Ibiza', 'Exhaust system check',                     10000, NULL),
  ('SEAT', 'Ibiza', 'Tires condition check',                    10000, NULL),
  ('SEAT', 'Ibiza', 'Body interior & exterior check',           10000, NULL),
  ('SEAT', 'Ibiza', 'Engine bay check',                         10000, NULL);
