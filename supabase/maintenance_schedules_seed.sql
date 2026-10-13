-- OEM Maintenance Schedules — Toyota Egypt Official
-- Source: Toyota Egypt official dealer maintenance schedule document
-- data_source = 'official_dealer' → directly from Toyota Egypt document
-- data_source = 'estimated'       → general best practice / Egypt climate (NOT in official doc)
--
-- Models: Corolla, Yaris, Fortuner, Land Cruiser, Land Cruiser Prado, Hilux (petrol only)
-- Run in Supabase SQL editor.

DELETE FROM maintenance_schedules WHERE NOT (brand = 'SEAT' AND model = 'Ibiza');

-- ═══════════════════════════════════════════════════════════════
-- TOYOTA COROLLA
-- ═══════════════════════════════════════════════════════════════

-- Corolla E140 (2007–2013) — 1ZR-FE engine
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Corolla', 2007, 2013, 'Engine Oil & Filter',        10000, 365,  'Toyota Genuine Motor Oil 5W-30', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2007, 2013, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2007, 2013, 'Cabin Air Filter',           15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2007, 2013, 'Spark Plugs (Iridium)',      100000, 60,  'Iridium long-life plugs', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2007, 2013, 'Engine Coolant',             80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2007, 2013, 'Drive Belt',                 100000, NULL,'Inspect at 60,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2007, 2013, 'Brake Fluid',                NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2007, 2013, 'AT Fluid',                   80000, NULL, 'Toyota ATF WS — U341F/U341E transmission', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2007, 2013, 'Battery',                    NULL,  36,  'Egypt heat degrades battery faster — inspect annually', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2007, 2013, 'Tires',                      NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2007, 2013, 'Wiper Blades',               NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2007, 2013, 'Brake Pads & Discs',         NULL,  NULL,'Inspect every 20,000 km; typical pad life 40,000–60,000 km', 'petrol', 'estimated');

-- Corolla E170 (2014–2018) — 1ZR-FE / 2ZR-FE engine
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Corolla', 2014, 2018, 'Engine Oil & Filter',        10000, 365,  'Toyota Genuine Motor Oil 5W-30', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'Cabin Air Filter',           15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'Spark Plugs (Iridium)',      100000, 60,  'Iridium long-life plugs', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'Engine Coolant',             80000, 48,  'Toyota SLLC (Super Long Life Coolant)', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'Drive Belt',                 100000, NULL, 'Inspect at 60,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'Brake Fluid',                NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'AT Fluid',                   80000, NULL, 'Toyota ATF WS (World Standard) — sealed unit', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'CVT Fluid',                  80000, NULL, 'Toyota CVTF FE — sealed unit', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2014, 2018, 'Battery',                    NULL,  36,  'Egypt heat degrades battery faster — inspect annually', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2014, 2018, 'Tires',                      NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2014, 2018, 'Wiper Blades',               NULL,  12,  'Every 12 months — desert dust and summer heat degrade blades faster', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2014, 2018, 'Brake Pads & Discs',         NULL,  NULL,'Inspect every 20,000 km; typical pad life 40,000–60,000 km', 'petrol', 'estimated');

-- Corolla E210 (2019+) — M20A-FKS engine (still current in Egypt)
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Corolla', 2019, NULL, 'Engine Oil & Filter',        10000, 365,  'Toyota Genuine Motor Oil 0W-16 or 5W-30', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'Cabin Air Filter',           15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'Spark Plugs (Iridium)',      100000, 60,  'Iridium long-life plugs — do not use copper', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'Engine Coolant',             80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'Drive Belt',                 100000, NULL, 'Inspect at 60,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'Brake Fluid',                NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'CVT Fluid',                  80000, NULL, 'Toyota CVTF FE — sealed unit', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'AT Fluid',                   80000, NULL, 'Toyota ATF WS — sealed unit', 'petrol', 'official_dealer'),
('Toyota', 'Corolla', 2019, NULL, 'Battery',                    NULL,  36,  'Egypt heat degrades battery faster — inspect annually', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2019, NULL, 'Tires',                      NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2019, NULL, 'Wiper Blades',               NULL,  12,  'Every 12 months — desert dust and summer heat degrade blades faster', 'petrol', 'estimated'),
('Toyota', 'Corolla', 2019, NULL, 'Brake Pads & Discs',         NULL,  NULL,'Inspect every 20,000 km; typical pad life 40,000–60,000 km', 'petrol', 'estimated');

-- ═══════════════════════════════════════════════════════════════
-- TOYOTA YARIS
-- ═══════════════════════════════════════════════════════════════

-- Yaris XP90 (2006–2011) — 1SZ-FE / 2SZ-FE engine
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Yaris', 2006, 2011, 'Engine Oil & Filter',          5000, 365,  '5W-30 — short interval for small engine', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'Engine Air Filter',            30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'Cabin Air Filter',             15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'Spark Plugs',                  40000, NULL, 'Standard plugs — earlier replacement than iridium', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'Engine Coolant',               40000, 24,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'Drive Belt',                   80000, NULL, 'Inspect at 40,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'Timing Belt',                  80000, 48,  'CRITICAL — 1SZ-FE has timing belt, not chain. Replace on schedule.', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'Brake Fluid',                  NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'AT Fluid',                     40000, NULL, 'Toyota ATF T-IV', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2006, 2011, 'Battery',                      NULL,  36,  'Egypt heat degrades battery faster — inspect annually', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2006, 2011, 'Tires',                        NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2006, 2011, 'Wiper Blades',                 NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2006, 2011, 'Brake Pads & Discs',           NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- Yaris XP130 (2012–2019) — 1NR-FE engine (timing CHAIN)
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Yaris', 2012, 2019, 'Engine Oil & Filter',          10000, 365,  '5W-30 synthetic', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'Engine Air Filter',            30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'Cabin Air Filter',             15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'Spark Plugs (Iridium)',        100000, 60,  'Iridium long-life — timing chain so no belt concern', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'Engine Coolant',               80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'Drive Belt',                   100000, NULL,'Inspect at 60,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'Brake Fluid',                  NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'AT Fluid',                     80000, NULL, 'Toyota ATF WS', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'CVT Fluid',                    80000, NULL, 'Toyota CVTF FE', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2012, 2019, 'Battery',                      NULL,  36,  'Egypt heat degrades battery faster — inspect annually', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2012, 2019, 'Tires',                        NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2012, 2019, 'Wiper Blades',                 NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2012, 2019, 'Brake Pads & Discs',           NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- Yaris XP210 (2020+) — 1NZ-FE / 2NZ-FE engine (timing CHAIN)
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Yaris', 2020, NULL, 'Engine Oil & Filter',          10000, 365,  '0W-20 or 5W-30 full synthetic', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'Engine Air Filter',            30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'Cabin Air Filter',             15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'Spark Plugs (Iridium)',        100000, 60,  'Iridium long-life plugs', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'Engine Coolant',               80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'Drive Belt',                   100000, NULL,'Inspect at 60,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'Brake Fluid',                  NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'CVT Fluid',                    80000, NULL, 'Toyota CVTF FE', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'AT Fluid',                     80000, NULL, 'Toyota ATF WS', 'petrol', 'official_dealer'),
('Toyota', 'Yaris', 2020, NULL, 'Battery',                      NULL,  36,  'Egypt heat degrades battery faster — inspect annually', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2020, NULL, 'Tires',                        NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2020, NULL, 'Wiper Blades',                 NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Yaris', 2020, NULL, 'Brake Pads & Discs',           NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ═══════════════════════════════════════════════════════════════
-- TOYOTA FORTUNER
-- ═══════════════════════════════════════════════════════════════

-- Fortuner AN50/60 (2005–2015) — 2TR-FE engine
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Fortuner', 2005, 2015, 'Engine Oil & Filter',       10000, 365,  '5W-30 or 10W-30 synthetic', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Engine Air Filter',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Cabin Air Filter',          15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Spark Plugs (Iridium)',     90000, 60,  'Iridium/Platinum', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Engine Coolant',            80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Drive Belt',                80000, 48,  'Inspect at 40,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Fuel Filter',               60000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Brake Fluid',               NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'AT Fluid',                  80000, 48,  'Toyota ATF WS — AC60F transmission', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Transfer Case Oil',         80000, 48,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Front Differential Oil',    40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Rear Differential Oil',     40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2005, 2015, 'Battery',                   NULL,  36,  'Egypt heat degrades battery faster — inspect annually', 'petrol', 'estimated'),
('Toyota', 'Fortuner', 2005, 2015, 'Tires',                     NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 60,000 km', 'petrol', 'estimated'),
('Toyota', 'Fortuner', 2005, 2015, 'Wiper Blades',              NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Fortuner', 2005, 2015, 'Brake Pads & Discs',        NULL,  NULL,'Inspect every 20,000 km; heavier vehicle = faster pad wear', 'petrol', 'estimated');

-- Fortuner AN150/160 (2016+) — 2TR-FE / 1GR-FE engine
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Fortuner', 2016, NULL, 'Engine Oil & Filter',       10000, 365,  '5W-30 full synthetic', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Engine Air Filter',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Cabin Air Filter',          15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Spark Plugs (Iridium)',     90000, 60,  'Iridium/Platinum long-life', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Engine Coolant',            80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Drive Belt',                80000, 48,  'Inspect at 40,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Brake Fluid',               NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'AT Fluid',                  80000, 48,  'Toyota ATF WS — 6-speed transmission', 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Transfer Case Oil',         80000, 48,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Front Differential Oil',    40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Rear Differential Oil',     40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Fortuner', 2016, NULL, 'Battery',                   NULL,  36,  'Egypt heat degrades battery faster — inspect annually', 'petrol', 'estimated'),
('Toyota', 'Fortuner', 2016, NULL, 'Tires',                     NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 60,000 km', 'petrol', 'estimated'),
('Toyota', 'Fortuner', 2016, NULL, 'Wiper Blades',              NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Fortuner', 2016, NULL, 'Brake Pads & Discs',        NULL,  NULL,'Inspect every 20,000 km; heavier vehicle = faster pad wear', 'petrol', 'estimated');

-- ═══════════════════════════════════════════════════════════════
-- TOYOTA LAND CRUISER
-- ═══════════════════════════════════════════════════════════════

-- Land Cruiser 200 (2008–2021) — 1UR-FE / 3UR-FE engine (V8)
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Land Cruiser', 2008, 2021, 'Engine Oil & Filter',      10000, 365,  '5W-30 full synthetic — V8 uses more oil, check level regularly', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Engine Air Filter',        30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Cabin Air Filter',         15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Spark Plugs (Iridium)',    100000, 60, '8 plugs total — iridium long-life', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Engine Coolant',           80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Drive Belt',               100000, NULL,'Inspect at 60,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Brake Fluid',              NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'AT Fluid',                 80000, 48,  'Toyota ATF WS — AB60F 6-speed', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Transfer Case Oil',        80000, 48,  'Toyota ATF WS', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Front Differential Oil',   40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Rear Differential Oil',    40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Battery',                  NULL,  36,  'V8 draws higher current — inspect annually; Egypt heat cuts lifespan', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Tires',                    NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 60,000 km', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Wiper Blades',             NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser', 2008, 2021, 'Brake Pads & Discs',       NULL,  NULL,'Inspect every 20,000 km; heavy vehicle = faster wear', 'petrol', 'estimated');

-- Land Cruiser 300 (2022+) — F33A-FTV / 3.5L twin-turbo V6
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Land Cruiser', 2022, NULL, 'Engine Oil & Filter',      10000, 365,  '0W-20 or 5W-30 full synthetic — twin-turbo requires quality oil', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Engine Air Filter',        30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Cabin Air Filter',         15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Spark Plugs (Iridium)',    100000, 60, '6 plugs — twin-turbo V6', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Engine Coolant',           80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Brake Fluid',              NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'AT Fluid',                 80000, 48,  'Toyota ATF WS — 10-speed transmission', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Transfer Case Oil',        80000, 48,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Front Differential Oil',   40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Rear Differential Oil',    40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Battery',                  NULL,  36,  'Inspect annually — Egypt heat cuts lifespan', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Tires',                    NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 60,000 km', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Wiper Blades',             NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser', 2022, NULL, 'Brake Pads & Discs',       NULL,  NULL,'Inspect every 20,000 km; heavy vehicle = faster wear', 'petrol', 'estimated');

-- ═══════════════════════════════════════════════════════════════
-- TOYOTA LAND CRUISER PRADO
-- ═══════════════════════════════════════════════════════════════

-- Prado 150 (2010+) — 1GR-FE / 2TR-FE engine
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Engine Oil & Filter',      10000, 365,  '5W-30 full synthetic', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Engine Air Filter',        30000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Cabin Air Filter',         15000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Spark Plugs (Iridium)',    90000, 60,  'Iridium/Platinum long-life', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Engine Coolant',           80000, 48,  'Toyota SLLC', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Drive Belt',               80000, 48,  'Inspect at 40,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Fuel Filter',              60000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Brake Fluid',              NULL,  24,  'DOT 3 / replace every 2 years', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'AT Fluid',                 80000, 48,  'Toyota ATF WS — A750F/A750E 5-speed', 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Transfer Case Oil',        80000, 48,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Front Differential Oil',   40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Rear Differential Oil',    40000, 24,  NULL, 'petrol', 'official_dealer'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Battery',                  NULL,  36,  'Inspect annually — Egypt heat cuts lifespan', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Tires',                    NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 60,000 km', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Wiper Blades',             NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('Toyota', 'Land Cruiser Prado', 2010, NULL, 'Brake Pads & Discs',       NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ═══════════════════════════════════════════════════════════════
-- TOYOTA HILUX (PETROL ONLY)
-- TGN16/26/12 — 2TR-FE engine (~2005–2015)
-- DIESEL VARIANTS (KUN, GUN) ARE EXCLUDED — petrol app only
-- ═══════════════════════════════════════════════════════════════
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Hilux', 2005, 2015, 'Engine Oil & Filter',          10000, 365,  '5W-30 synthetic — can use 5,000 km interval in severe conditions', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Engine Air Filter',            30000, NULL, 'Inspect more frequently in dusty/sandy conditions', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Spark Plugs (Platinum)',       90000, 60,  'Platinum/Iridium long-life — 2TR-FE, 4 plugs', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Engine Coolant',               80000, 48,  'Toyota SLLC (Super Long Life Coolant)', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Drive Belt',                   80000, 48,  'Inspect at 40,000 km — includes AC & alternator belt', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Fuel Filter',                  60000, NULL, NULL, 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Brake Fluid',                  40000, 24,  'DOT 3 / replace every 2 years or 40,000 km', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'AT Fluid',                     80000, 48,  'Toyota ATF WS — AC60E/AC60F automatic transmission', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Manual Transmission Oil',      80000, 48,  'Toyota Gear Oil MT-90 — manual gearbox only', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Transfer Case Oil',            80000, 48,  '4WD models only — Toyota Gear Oil', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Front Differential Oil',       40000, 24,  '4WD models only', 'petrol', 'official_dealer'),
('Toyota', 'Hilux', 2005, 2015, 'Cabin Air Filter',             NULL,  NULL, 'Not listed in Toyota official schedule — recommended general practice', 'petrol', 'estimated'),
('Toyota', 'Hilux', 2005, 2015, 'Battery',                      NULL,  36,  'Inspect annually — Egypt heat cuts lifespan significantly', 'petrol', 'estimated'),
('Toyota', 'Hilux', 2005, 2015, 'Tires',                        NULL,  60,  'Inspect tread & pressure monthly; replace by 5 years or 60,000 km', 'petrol', 'estimated'),
('Toyota', 'Hilux', 2005, 2015, 'Wiper Blades',                 NULL,  12,  'Every 12 months — desert dust degrades blades faster', 'petrol', 'estimated'),
('Toyota', 'Hilux', 2005, 2015, 'Brake Pads & Discs',           NULL,  NULL,'Inspect every 20,000 km; work & load use = faster pad wear', 'petrol', 'estimated');

-- ═══════════════════════════════════════════════════════════════
-- MG EGYPT — Official Dealer Maintenance Schedule
-- Source: MG Service Schedule Aug 2026 (official dealer PPTX)
-- data_source = 'official_dealer' → directly from MG Egypt document
-- data_source = 'estimated'       → general best practice (not in official doc)
-- Skipped: MG 4 EV, MG Cyberster (electric — petrol app only)
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────
-- MG 5 (2021+) — 1.5T CVT
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG 5', 2021, NULL, 'Engine Oil & Filter',       10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'Cabin Air Filter',           20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'Spark Plugs',                40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'Fuel Filter',                40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'Brake Fluid',                40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'CVT Oil & Filter Kit',       60000, 36,  'Includes upper filter, oil seal, silicone, inner filter — every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'Engine Coolant',             100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'Drive Belt Kit',             100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG 5', 2021, NULL, 'Battery',                    NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG 5', 2021, NULL, 'Tires',                      NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG 5', 2021, NULL, 'Wiper Blades',               NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG 5', 2021, NULL, 'Brake Pads & Discs',         NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG 6 (2016+) — 1.5T / 2.0T CVT
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG 6', 2016, NULL, 'Engine Oil & Filter',        10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'Engine Air Filter',           30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'Cabin Air Filter',            20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'Fuel Filter',                 40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'Spark Plugs',                 40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'Brake Fluid',                 40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'CVT Oil',                     60000, 36,  '3 litres — every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'Engine Coolant',              100000, NULL,'5 litres', 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'Drive Belt Kit',              100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG 6', 2016, NULL, 'Battery',                     NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG 6', 2016, NULL, 'Tires',                       NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG 6', 2016, NULL, 'Wiper Blades',                NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG 6', 2016, NULL, 'Brake Pads & Discs',          NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG 7 / MG 7 Trophy (2023+) — 2.0T / 3.0T
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG 7', 2023, NULL, 'Engine Oil & Filter',        10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Cabin Air Filter',           20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Brake Fluid',                40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Spark Plugs',                60000, NULL, 'Higher-output engine — longer plug interval', 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'CVT Oil & Filter Kit',       90000, 36,  'Includes sump gasket — every 90,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Clutch Cooler Oil',          90000, 36,  'Replaced with CVT service', 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Fuel Injector Cleaner',      40000, NULL, 'Fuel cleaner additive every 40,000 km', 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Engine Coolant',             100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Drive Belt Kit',             100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG 7', 2023, NULL, 'Battery',                    NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG 7', 2023, NULL, 'Tires',                      NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG 7', 2023, NULL, 'Wiper Blades',               NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG 7', 2023, NULL, 'Brake Pads & Discs',         NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG ZS (2018–2020) — 1.5T / 1.0T CVT
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG ZS', 2018, 2020, 'Engine Oil & Filter',       10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'Cabin Air Filter',           20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'Fuel Filter',                40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'Spark Plugs',                40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'Brake Fluid',                40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'CVT Oil',                    60000, 36,  'Every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'Engine Coolant',             100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'Drive Belt Kit',             100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG ZS', 2018, 2020, 'Battery',                    NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG ZS', 2018, 2020, 'Tires',                      NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG ZS', 2018, 2020, 'Wiper Blades',               NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG ZS', 2018, 2020, 'Brake Pads & Discs',         NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG ZS FL — Facelift (2021+) — 1.5T CVT
-- More comprehensive CVT filter kit vs original ZS
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG ZS FL', 2021, NULL, 'Engine Oil & Filter',    10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'Engine Air Filter',       30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'Cabin Air Filter',        20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'Fuel Filter',             40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'Spark Plugs',             40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'Brake Fluid',             40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'CVT Oil & Filter Kit',    60000, 36,  'Full kit: upper filter, oil seal, silicone, inner filter — every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'Engine Coolant',          100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'Drive Belt Kit',          100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG ZS FL', 2021, NULL, 'Battery',                 NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG ZS FL', 2021, NULL, 'Tires',                   NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG ZS FL', 2021, NULL, 'Wiper Blades',            NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG ZS FL', 2021, NULL, 'Brake Pads & Discs',      NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG HS (2019+) — 1.5T / 2.0T CVT
-- Covers HS, HS+ (current gen) from slide: HS & HS+
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG HS', 2019, NULL, 'Engine Oil & Filter',        10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'Engine Air Filter',           30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'Cabin Air Filter',            20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'Carbon Air Purifier Filter',  20000, NULL, 'HS+ trim — activated carbon cabin filter', 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'Spark Plugs',                 40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'Brake Fluid',                 40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'CVT Oil',                     60000, 36,  'Every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'Engine Coolant',              100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'Drive Belt Kit',              100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG HS', 2019, NULL, 'Battery',                     NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG HS', 2019, NULL, 'Tires',                       NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG HS', 2019, NULL, 'Wiper Blades',                NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG HS', 2019, NULL, 'Brake Pads & Discs',          NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG One (2022+) — 1.5T CVT
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG One', 2022, NULL, 'Engine Oil & Filter',       10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG One', 2022, NULL, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG One', 2022, NULL, 'Cabin Air Filter',           20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG One', 2022, NULL, 'Spark Plugs',                40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG One', 2022, NULL, 'Brake Fluid',                40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG One', 2022, NULL, 'CVT Oil & Filter Kit',       60000, 36,  'CVT oil + filters — every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG One', 2022, NULL, 'Engine Coolant',             100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG One', 2022, NULL, 'Drive Belt Kit',             100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG One', 2022, NULL, 'Battery',                    NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG One', 2022, NULL, 'Tires',                      NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG One', 2022, NULL, 'Wiper Blades',               NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG One', 2022, NULL, 'Brake Pads & Discs',         NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG RX5 (2017–2022) — 1.5T CVT
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG RX5', 2017, 2022, 'Engine Oil & Filter',       10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'Cabin Air Filter',           20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'Fuel Filter',                40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'Spark Plugs',                40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'Brake Fluid',                40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'CVT Oil',                    60000, 36,  'Every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'Engine Coolant',             100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'Drive Belt Kit',             100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG RX5', 2017, 2022, 'Battery',                    NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG RX5', 2017, 2022, 'Tires',                      NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG RX5', 2017, 2022, 'Wiper Blades',               NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG RX5', 2017, 2022, 'Brake Pads & Discs',         NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG RX5+ (2021+) — 2.0T — upgraded gearbox vs RX5
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG RX5+', 2021, NULL, 'Engine Oil & Filter',      10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'Engine Air Filter',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'Cabin Air Filter',          20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'Spark Plugs',               40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'Brake Fluid',               40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'CVT Oil & Filter Kit',      60000, 36,  'Includes sump gasket and filter — every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'Clutch Oil',                60000, 36,  '3 litres — replaced with CVT service', 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'Engine Coolant',            100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'Drive Belt Kit',            100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG RX5+', 2021, NULL, 'Battery',                   NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG RX5+', 2021, NULL, 'Tires',                     NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG RX5+', 2021, NULL, 'Wiper Blades',              NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG RX5+', 2021, NULL, 'Brake Pads & Discs',        NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG GT (2016+) — 1.5T CVT / DCT
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG GT', 2016, NULL, 'Engine Oil & Filter',         10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('MG', 'MG GT', 2016, NULL, 'Engine Air Filter',            30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG GT', 2016, NULL, 'Cabin Air Filter',             20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG GT', 2016, NULL, 'Spark Plugs',                  40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG GT', 2016, NULL, 'Brake Fluid',                  40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG GT', 2016, NULL, 'CVT Oil & Filter Kit',         60000, 36,  'Includes gearbox filter and clutch oil — every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG GT', 2016, NULL, 'Engine Coolant',               100000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG GT', 2016, NULL, 'Drive Belt Kit',               100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG GT', 2016, NULL, 'Battery',                      NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG GT', 2016, NULL, 'Tires',                        NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG GT', 2016, NULL, 'Wiper Blades',                 NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG GT', 2016, NULL, 'Brake Pads & Discs',           NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG G50 Plus (2022+) — 1.5T CVT
-- Has 3,000 km initial break-in service + dual cooling system
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG G50 Plus', 2022, NULL, 'Engine Oil & Filter — Initial', 3000, NULL, 'First service at 3,000 km only (break-in)', 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Engine Oil & Filter',    10000, 183, 'Every 10,000 km or 6 months after initial service', 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Engine Air Filter',       30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Cabin Air Filter',        20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Fuel Filter',             40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Spark Plugs',             40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Brake Fluid',             40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'CVT Oil & Filter Kit',    80000, 36,  'Every 80,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Clutch Oil',              80000, 36,  'Replaced with CVT service', 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Engine Coolant',          100000, NULL,'Two cooling circuits — engine + HVAC', 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Drive Belt Kit',          100000, 36,  'Every 100,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG G50 Plus', 2022, NULL, 'Battery',                 NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG G50 Plus', 2022, NULL, 'Tires',                   NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG G50 Plus', 2022, NULL, 'Wiper Blades',            NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG G50 Plus', 2022, NULL, 'Brake Pads & Discs',      NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- MG RX9 (2024+) — 1.5T Hybrid / PHEV
-- Still has full petrol engine maintenance
-- ─────────────────────────────────────────────────────────────
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('MG', 'MG RX9', 2024, NULL, 'Engine Oil & Filter',        10000, 183, 'Every 10,000 km or 6 months — first service at 5,000 km', 'petrol', 'official_dealer'),
('MG', 'MG RX9', 2024, NULL, 'Engine Air Filter',           30000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX9', 2024, NULL, 'Cabin Air Filter',            20000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX9', 2024, NULL, 'Spark Plugs',                 40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX9', 2024, NULL, 'Fuel Filter',                 40000, NULL, NULL, 'petrol', 'official_dealer'),
('MG', 'MG RX9', 2024, NULL, 'Brake Fluid',                 40000, 24,  'Every 40,000 km or 2 years', 'petrol', 'official_dealer'),
('MG', 'MG RX9', 2024, NULL, 'CVT Oil & Filter Kit',        60000, 36,  'Every 60,000 km or 3 years', 'petrol', 'official_dealer'),
('MG', 'MG RX9', 2024, NULL, 'Engine Coolant',              100000, NULL,'Includes electric drive cooling system', 'petrol', 'official_dealer'),
('MG', 'MG RX9', 2024, NULL, 'Battery',                     NULL,  36,  'Inspect annually', 'petrol', 'estimated'),
('MG', 'MG RX9', 2024, NULL, 'Tires',                       NULL,  60,  'Inspect monthly; replace by 5 years or 50,000 km', 'petrol', 'estimated'),
('MG', 'MG RX9', 2024, NULL, 'Wiper Blades',                NULL,  12,  'Every 12 months', 'petrol', 'estimated'),
('MG', 'MG RX9', 2024, NULL, 'Brake Pads & Discs',          NULL,  NULL,'Inspect every 20,000 km', 'petrol', 'estimated');

-- ─────────────────────────────────────────────────────────────
-- SKODA — Official Kayan Egypt dealer maintenance schedules
-- Source: Kayan Egypt for Trading & Investment official documents
-- Models: Kodiaq (2025+), Octavia (2021+), Superb (2025+)
-- ─────────────────────────────────────────────────────────────

-- Kodiaq (2025+) — 1.4L TSI DJKA, 7-Speed DSG, Timing Belt
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Skoda', 'Kodiaq', 2025, NULL, 'Engine Oil & Filter',    10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('Skoda', 'Kodiaq', 2025, NULL, 'Engine Air Filter',      30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('Skoda', 'Kodiaq', 2025, NULL, 'Cabin Air Filter',       20000, NULL, NULL, 'petrol', 'official_dealer'),
('Skoda', 'Kodiaq', 2025, NULL, 'Spark Plugs',            30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('Skoda', 'Kodiaq', 2025, NULL, 'Serpentine Belt',        60000, NULL, 'Accessory belt + pulley', 'petrol', 'official_dealer'),
('Skoda', 'Kodiaq', 2025, NULL, 'Timing Belt',           100000, NULL, 'Includes coolant pump belt, tensioner, fixed pulley, screw', 'petrol', 'official_dealer'),
('Skoda', 'Kodiaq', 2025, NULL, 'DSG Fluid',             120000, NULL, 'ATF 6L Q381 + filter, seal, plug washer', 'petrol', 'official_dealer'),
('Skoda', 'Kodiaq', 2025, NULL, 'Brake Fluid',            50000, 730, 'Every 50,000 km or 2 years', 'petrol', 'official_dealer'),
('Skoda', 'Kodiaq', 2025, NULL, 'Coolant',                50000, NULL, NULL, 'petrol', 'official_dealer');

-- Octavia (2021+) — 1.4L TSI DJKA, 8-Speed Automatic, Timing Belt
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Skoda', 'Octavia', 2021, NULL, 'Engine Oil & Filter',    10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('Skoda', 'Octavia', 2021, NULL, 'Engine Air Filter',      30000, 365, 'Every 30,000 km or 12 months', 'petrol', 'official_dealer'),
('Skoda', 'Octavia', 2021, NULL, 'Cabin Air Filter',       20000, 365, 'Every 20,000 km or 12 months', 'petrol', 'official_dealer'),
('Skoda', 'Octavia', 2021, NULL, 'Spark Plugs',            30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('Skoda', 'Octavia', 2021, NULL, 'Serpentine Belt',        60000, NULL, 'Accessory belt + pulley', 'petrol', 'official_dealer'),
('Skoda', 'Octavia', 2021, NULL, 'Timing Belt',           100000, NULL, 'Includes coolant pump belt + seal, tensioner, fixed pulley, screw', 'petrol', 'official_dealer'),
('Skoda', 'Octavia', 2021, NULL, 'Transmission Fluid (AT)', 50000, NULL, 'ATF 3L', 'petrol', 'official_dealer'),
('Skoda', 'Octavia', 2021, NULL, 'Brake Fluid',            50000, 730, 'Every 50,000 km or 2 years', 'petrol', 'official_dealer'),
('Skoda', 'Octavia', 2021, NULL, 'Coolant',                50000, NULL, NULL, 'petrol', 'official_dealer');

-- Superb (2025+) — 2.0L TSI DLBC, 7-Speed DSG, Timing Chain
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Skoda', 'Superb', 2025, NULL, 'Engine Oil & Filter',    10000, 183, 'Every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('Skoda', 'Superb', 2025, NULL, 'Engine Air Filter',      30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('Skoda', 'Superb', 2025, NULL, 'Cabin Air Filter',       20000, NULL, NULL, 'petrol', 'official_dealer'),
('Skoda', 'Superb', 2025, NULL, 'Spark Plugs',            30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('Skoda', 'Superb', 2025, NULL, 'Serpentine Belt',        60000, NULL, 'Accessory belt + pulley', 'petrol', 'official_dealer'),
('Skoda', 'Superb', 2025, NULL, 'DSG Fluid',             120000, NULL, 'ATF 6L Q381 + filter, seal, plug washer', 'petrol', 'official_dealer'),
('Skoda', 'Superb', 2025, NULL, 'Brake Fluid',            50000, 730, 'Every 50,000 km or 2 years', 'petrol', 'official_dealer'),
('Skoda', 'Superb', 2025, NULL, 'Coolant',                50000, NULL, NULL, 'petrol', 'official_dealer');

-- ─────────────────────────────────────────────────────────────
-- VOLKSWAGEN — Official Kayan Egypt dealer maintenance schedules
-- Source: Kayan Egypt for Trading & Investment official documents
-- 14 model variants covering Golf, Tiguan, Jetta, Passat, T-ROC, Touareg, Tayron
-- ─────────────────────────────────────────────────────────────

-- Golf MK6 · 1.6 MPI (2009–2013) — 7-speed DSG dry clutch, Timing Belt 100k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Golf MK6 · 1.6 MPI', 2009, 2013, 'Engine Oil & Filter',   10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.6 MPI', 2009, 2013, 'Engine Air Filter',     30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.6 MPI', 2009, 2013, 'Cabin Air Filter',      30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.6 MPI', 2009, 2013, 'Spark Plugs',           30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.6 MPI', 2009, 2013, 'Serpentine Belt',       60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.6 MPI', 2009, 2013, 'Timing Belt',          100000, NULL, 'Camshaft drive toothed belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.6 MPI', 2009, 2013, 'Brake Fluid',           50000, 730, NULL, 'petrol', 'official_dealer');

-- Golf MK6 · 1.4T TSI (2009–2011) — 7-speed DSG dry clutch, Timing Belt 60k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Golf MK6 · 1.4T TSI', 2009, 2011, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.4T TSI', 2009, 2011, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.4T TSI', 2009, 2011, 'Cabin Air Filter',     30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.4T TSI', 2009, 2011, 'Spark Plugs',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.4T TSI', 2009, 2011, 'Serpentine Belt',      60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.4T TSI', 2009, 2011, 'Timing Belt',          60000, NULL, 'Belt kit — includes tensioner, idler', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.4T TSI', 2009, 2011, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK6 · 1.4T TSI', 2009, 2011, 'Brake Fluid',          50000, 730, NULL, 'petrol', 'official_dealer');

-- Golf MK7 · 1.6 MPI (2013+) — 6-speed conventional automatic, Timing Belt 100k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Engine Oil & Filter',   10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Engine Air Filter',     30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Cabin Air Filter',      30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Spark Plugs',           30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Serpentine Belt',       60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Timing Belt',          100000, NULL, 'Camshaft drive toothed belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Transmission Fluid (AT)', 60000, NULL, 'Gearbox oil 09G + strainer', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Brake Fluid',           50000, 730, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.6 MPI', 2013, NULL, 'Coolant',               90000, NULL, NULL, 'petrol', 'official_dealer');

-- Golf MK7 · 1.2T TSI (2013+) — 7-speed DSG, Timing Belt 100k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'Cabin Air Filter',     30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'Spark Plugs',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'Serpentine Belt',      60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'Timing Belt',         100000, NULL, 'Camshaft drive toothed belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'Brake Fluid',          50000, 730, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.2T TSI', 2013, NULL, 'Coolant',              90000, NULL, NULL, 'petrol', 'official_dealer');

-- Golf MK7 · 1.4T TSI (2013+) — 7-speed DSG, Timing Belt 100k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'Cabin Air Filter',     30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'Spark Plugs',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'Serpentine Belt',      60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'Timing Belt',         100000, NULL, 'Camshaft drive toothed belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'Brake Fluid',          50000, 730, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK7 · 1.4T TSI', 2013, NULL, 'Coolant',              90000, NULL, NULL, 'petrol', 'official_dealer');

-- Golf MK8 · 1.6 MPI (2022+) — 6-speed automatic, Timing Belt 100k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Golf MK8 · 1.6 MPI', 2022, NULL, 'Engine Oil & Filter',   10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK8 · 1.6 MPI', 2022, NULL, 'Engine Air Filter',     30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK8 · 1.6 MPI', 2022, NULL, 'Cabin Air Filter',      30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK8 · 1.6 MPI', 2022, NULL, 'Spark Plugs',           30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK8 · 1.6 MPI', 2022, NULL, 'Serpentine Belt',       60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK8 · 1.6 MPI', 2022, NULL, 'Timing Belt',          100000, NULL, 'Camshaft drive toothed belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK8 · 1.6 MPI', 2022, NULL, 'Transmission Fluid (AT)', 50000, 730, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Golf MK8 · 1.6 MPI', 2022, NULL, 'Brake Fluid',           50000, 730, NULL, 'petrol', 'official_dealer');

-- Tiguan MK2 · 1.4T DSG (2013+) — 6-speed DSG wet clutch, Timing Chain (no belt)
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Tiguan MK2 · 1.4T DSG', 2013, NULL, 'Engine Oil & Filter', 10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK2 · 1.4T DSG', 2013, NULL, 'Engine Air Filter',   60000, NULL, 'Every 60,000 km per official schedule', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK2 · 1.4T DSG', 2013, NULL, 'Cabin Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK2 · 1.4T DSG', 2013, NULL, 'Spark Plugs',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK2 · 1.4T DSG', 2013, NULL, 'Serpentine Belt',     60000, NULL, 'Poly V-belt kit', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK2 · 1.4T DSG', 2013, NULL, 'DSG Fluid',           50000, NULL, 'DSG 09G/02E — gearbox oil + strainer', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK2 · 1.4T DSG', 2013, NULL, 'Brake Fluid',         30000, NULL, 'Every 30,000 km per official schedule', 'petrol', 'official_dealer');

-- Tiguan MK3 · 1.4T DSG (2015+) — 6-speed DSG wet clutch ACT, Timing Belt 100k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'Engine Oil & Filter', 10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'Engine Air Filter',   30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'Cabin Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'Spark Plugs',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'Serpentine Belt',     60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'Timing Belt',        100000, NULL, 'Camshaft drive toothed belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'DSG Fluid',           50000, NULL, 'DSG 09G/02E + gearbox strainer', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'Brake Fluid',         50000, 730, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan MK3 · 1.4T DSG', 2015, NULL, 'Coolant',             90000, NULL, NULL, 'petrol', 'official_dealer');

-- Tiguan 2024 · 1.4T DSG (2024+) — 7-speed DSG DQ381, Timing Belt 120k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'Engine Oil & Filter', 10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'Engine Air Filter',   30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'Cabin Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'Spark Plugs',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'Serpentine Belt',     60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'Timing Belt',        120000, NULL, 'Camshaft drive toothed belt + coolant pump belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'DSG Fluid',          100000, NULL, 'DSG DQ381 — ATF + filter + seal ring', 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'Brake Fluid',         50000, 730, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tiguan 2024 · 1.4T DSG', 2024, NULL, 'Coolant',             80000, NULL, NULL, 'petrol', 'official_dealer');

-- Jetta MK6 · 1.4T DSG (2013+) — 7-speed DSG dry clutch, Timing Belt 60k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Jetta MK6 · 1.4T DSG', 2013, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Jetta MK6 · 1.4T DSG', 2013, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Jetta MK6 · 1.4T DSG', 2013, NULL, 'Cabin Air Filter',     30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Jetta MK6 · 1.4T DSG', 2013, NULL, 'Spark Plugs',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Jetta MK6 · 1.4T DSG', 2013, NULL, 'Serpentine Belt',      60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Jetta MK6 · 1.4T DSG', 2013, NULL, 'Timing Belt',          60000, NULL, 'Belt kit — timing belt + tensioner + idler', 'petrol', 'official_dealer'),
('Volkswagen', 'Jetta MK6 · 1.4T DSG', 2013, NULL, 'DSG Fluid',            60000, NULL, 'Included in belt kit service interval', 'petrol', 'official_dealer'),
('Volkswagen', 'Jetta MK6 · 1.4T DSG', 2013, NULL, 'Brake Fluid',          50000, 730, NULL, 'petrol', 'official_dealer');

-- Passat B7 · 1.4T DSG (2013+) — 7-speed DSG dry clutch, Timing Belt 60k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Passat B7 · 1.4T DSG', 2013, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Passat B7 · 1.4T DSG', 2013, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Passat B7 · 1.4T DSG', 2013, NULL, 'Cabin Air Filter',     30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Passat B7 · 1.4T DSG', 2013, NULL, 'Spark Plugs',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Passat B7 · 1.4T DSG', 2013, NULL, 'Serpentine Belt',      60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Passat B7 · 1.4T DSG', 2013, NULL, 'Timing Belt',          60000, NULL, 'Belt kit — timing belt + tensioner + idler', 'petrol', 'official_dealer'),
('Volkswagen', 'Passat B7 · 1.4T DSG', 2013, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Passat B7 · 1.4T DSG', 2013, NULL, 'Brake Fluid',          50000, 730, NULL, 'petrol', 'official_dealer');

-- T-ROC · 1.4T (2022+) — 8-speed automatic, Timing Belt 100k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Engine Oil & Filter',         10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Engine Air Filter',           30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Cabin Air Filter',            30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Spark Plugs',                 30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Serpentine Belt',             60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Timing Belt',                100000, NULL, 'Camshaft drive toothed belt', 'petrol', 'official_dealer'),
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Transmission Fluid (AT)',     50000, NULL, 'Automatic gearbox ATF', 'petrol', 'official_dealer'),
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Brake Fluid',                 50000, 730, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'T-ROC · 1.4T',  2022, NULL, 'Coolant',                     90000, NULL, NULL, 'petrol', 'official_dealer');

-- Touareg · 2.0T (2024+) — 8-speed automatic, Timing Belt 100k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Touareg · 2.0T', 2024, NULL, 'Engine Oil & Filter',        10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Touareg · 2.0T', 2024, NULL, 'Engine Air Filter',          30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Touareg · 2.0T', 2024, NULL, 'Cabin Air Filter',           20000, NULL, 'Every 20,000 km per official schedule', 'petrol', 'official_dealer'),
('Volkswagen', 'Touareg · 2.0T', 2024, NULL, 'Spark Plugs',                30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Touareg · 2.0T', 2024, NULL, 'Serpentine Belt',            60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Touareg · 2.0T', 2024, NULL, 'Timing Belt',               100000, NULL, 'Camshaft drive toothed belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Touareg · 2.0T', 2024, NULL, 'Transmission Fluid (AT)',    50000, 730, 'Automatic gearbox 0D9 ATF', 'petrol', 'official_dealer'),
('Volkswagen', 'Touareg · 2.0T', 2024, NULL, 'Brake Fluid',                50000, 730, NULL, 'petrol', 'official_dealer');

-- Tayron · 1.4T DSG (2026+) — 7-speed DSG DQ381, Timing Belt 120k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Volkswagen', 'Tayron · 1.4T DSG', 2026, NULL, 'Engine Oil & Filter',     10000, 365, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tayron · 1.4T DSG', 2026, NULL, 'Engine Air Filter',       30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tayron · 1.4T DSG', 2026, NULL, 'Cabin Air Filter',        20000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tayron · 1.4T DSG', 2026, NULL, 'Spark Plugs',             30000, NULL, NULL, 'petrol', 'official_dealer'),
('Volkswagen', 'Tayron · 1.4T DSG', 2026, NULL, 'Serpentine Belt',         60000, NULL, 'Poly V-belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Tayron · 1.4T DSG', 2026, NULL, 'Timing Belt',            120000, NULL, 'Camshaft drive toothed belt + coolant pump belt', 'petrol', 'official_dealer'),
('Volkswagen', 'Tayron · 1.4T DSG', 2026, NULL, 'DSG Fluid',              100000, NULL, 'DSG DQ381 — ATF + filter + seal ring', 'petrol', 'official_dealer'),
('Volkswagen', 'Tayron · 1.4T DSG', 2026, NULL, 'Brake Fluid',             50000, 730, NULL, 'petrol', 'official_dealer');

-- ─────────────────────────────────────────────────────────────
-- AUDI — Official Kayan Egypt dealer maintenance schedules
-- Source: Kayan Egypt for Trading & Investment official documents
-- 10k–60k service cycle; belt only on 1.0T/1.4T engines
-- ─────────────────────────────────────────────────────────────

-- A3 · 1.4T TSI · DSG (2013+) — 7-speed DSG dry clutch, Timing Belt 60k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'Cabin Air Filter',     20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'Spark Plugs',          60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'Serpentine Belt',      60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'Timing Belt',          60000, NULL, 'Belt kit — critical replacement', 'petrol', 'official_dealer'),
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'Brake Fluid',          40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'A3 · 1.4T TSI · DSG', 2013, NULL, 'Coolant',              60000, NULL, NULL, 'petrol', 'official_dealer');

-- A4 · 2.0T TFSI · DSG (2016+) — 7-speed DSG, Timing Chain (no belt)
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'A4 · 2.0T TFSI · DSG', 2016, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'A4 · 2.0T TFSI · DSG', 2016, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A4 · 2.0T TFSI · DSG', 2016, NULL, 'Cabin Air Filter',     20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A4 · 2.0T TFSI · DSG', 2016, NULL, 'Spark Plugs',          60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A4 · 2.0T TFSI · DSG', 2016, NULL, 'Serpentine Belt',      60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'A4 · 2.0T TFSI · DSG', 2016, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A4 · 2.0T TFSI · DSG', 2016, NULL, 'Brake Fluid',          40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'A4 · 2.0T TFSI · DSG', 2016, NULL, 'Coolant',              60000, NULL, NULL, 'petrol', 'official_dealer');

-- A5 · 2.0T TFSI · DSG (2017+) — 7-speed DSG, Timing Chain
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'A5 · 2.0T TFSI · DSG', 2017, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'A5 · 2.0T TFSI · DSG', 2017, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A5 · 2.0T TFSI · DSG', 2017, NULL, 'Cabin Air Filter',     20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A5 · 2.0T TFSI · DSG', 2017, NULL, 'Spark Plugs',          60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A5 · 2.0T TFSI · DSG', 2017, NULL, 'Serpentine Belt',      60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'A5 · 2.0T TFSI · DSG', 2017, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A5 · 2.0T TFSI · DSG', 2017, NULL, 'Brake Fluid',          40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'A5 · 2.0T TFSI · DSG', 2017, NULL, 'Coolant',              60000, NULL, NULL, 'petrol', 'official_dealer');

-- A6 · 2.0T TFSI · Automatic (2016+) — 8-speed AT, Timing Chain
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'A6 · 2.0T TFSI · Automatic', 2016, NULL, 'Engine Oil & Filter',       10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'A6 · 2.0T TFSI · Automatic', 2016, NULL, 'Engine Air Filter',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A6 · 2.0T TFSI · Automatic', 2016, NULL, 'Cabin Air Filter',          20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A6 · 2.0T TFSI · Automatic', 2016, NULL, 'Spark Plugs',               60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A6 · 2.0T TFSI · Automatic', 2016, NULL, 'Serpentine Belt',           60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'A6 · 2.0T TFSI · Automatic', 2016, NULL, 'Transmission Fluid (AT)',   60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'A6 · 2.0T TFSI · Automatic', 2016, NULL, 'Brake Fluid',               40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'A6 · 2.0T TFSI · Automatic', 2016, NULL, 'Coolant',                   60000, NULL, NULL, 'petrol', 'official_dealer');

-- Q2 · 1.0T TFSI · DSG (2021+) — 7-speed DSG dry clutch, Timing Belt 60k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'Cabin Air Filter',     20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'Spark Plugs',          60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'Serpentine Belt',      60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'Timing Belt',          60000, NULL, 'Belt kit — critical replacement', 'petrol', 'official_dealer'),
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'Brake Fluid',          40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q2 · 1.0T TFSI · DSG', 2021, NULL, 'Coolant',              60000, NULL, NULL, 'petrol', 'official_dealer');

-- Q3 · 1.4T TFSI · DSG (2012+) — 6-speed DSG, Timing Belt 60k
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'Cabin Air Filter',     20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'Spark Plugs',          60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'Serpentine Belt',      60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'Timing Belt',          60000, NULL, 'Belt kit — critical replacement', 'petrol', 'official_dealer'),
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'Brake Fluid',          40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 1.4T TFSI · DSG', 2012, NULL, 'Coolant',              60000, NULL, NULL, 'petrol', 'official_dealer');

-- Q3 · 2.0T TFSI · Automatic (2015+) — 6-speed AT, Timing Chain
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'Q3 · 2.0T TFSI · Automatic', 2015, NULL, 'Engine Oil & Filter',       10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 2.0T TFSI · Automatic', 2015, NULL, 'Engine Air Filter',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 2.0T TFSI · Automatic', 2015, NULL, 'Cabin Air Filter',          20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 2.0T TFSI · Automatic', 2015, NULL, 'Spark Plugs',               60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 2.0T TFSI · Automatic', 2015, NULL, 'Serpentine Belt',           60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'Q3 · 2.0T TFSI · Automatic', 2015, NULL, 'Transmission Fluid (AT)',   60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 2.0T TFSI · Automatic', 2015, NULL, 'Brake Fluid',               40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q3 · 2.0T TFSI · Automatic', 2015, NULL, 'Coolant',                   60000, NULL, NULL, 'petrol', 'official_dealer');

-- Q5 · 2.0T TFSI · DSG (2017+) — 7-speed DSG, Timing Chain
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'Q5 · 2.0T TFSI · DSG', 2017, NULL, 'Engine Oil & Filter',  10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q5 · 2.0T TFSI · DSG', 2017, NULL, 'Engine Air Filter',    30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q5 · 2.0T TFSI · DSG', 2017, NULL, 'Cabin Air Filter',     20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q5 · 2.0T TFSI · DSG', 2017, NULL, 'Spark Plugs',          60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q5 · 2.0T TFSI · DSG', 2017, NULL, 'Serpentine Belt',      60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'Q5 · 2.0T TFSI · DSG', 2017, NULL, 'DSG Fluid',            60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q5 · 2.0T TFSI · DSG', 2017, NULL, 'Brake Fluid',          40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q5 · 2.0T TFSI · DSG', 2017, NULL, 'Coolant',              60000, NULL, NULL, 'petrol', 'official_dealer');

-- Q7 · 2.0T TFSI · Automatic (2015+) — 8-speed AT, Timing Chain
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'Q7 · 2.0T TFSI · Automatic', 2015, NULL, 'Engine Oil & Filter',       10000, 365, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q7 · 2.0T TFSI · Automatic', 2015, NULL, 'Engine Air Filter',         30000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q7 · 2.0T TFSI · Automatic', 2015, NULL, 'Cabin Air Filter',          20000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q7 · 2.0T TFSI · Automatic', 2015, NULL, 'Spark Plugs',               60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q7 · 2.0T TFSI · Automatic', 2015, NULL, 'Serpentine Belt',           60000, NULL, 'Accessory belt', 'petrol', 'official_dealer'),
('Audi', 'Q7 · 2.0T TFSI · Automatic', 2015, NULL, 'Transmission Fluid (AT)',   60000, NULL, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q7 · 2.0T TFSI · Automatic', 2015, NULL, 'Brake Fluid',               40000, 730, NULL, 'petrol', 'official_dealer'),
('Audi', 'Q7 · 2.0T TFSI · Automatic', 2015, NULL, 'Coolant',                   60000, NULL, NULL, 'petrol', 'official_dealer');
