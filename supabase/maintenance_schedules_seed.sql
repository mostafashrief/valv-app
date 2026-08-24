-- OEM Maintenance Schedules — Egypt Market
-- Run in Supabase SQL editor.
-- SEAT Ibiza is excluded from DELETE — it is already seeded correctly from maintenance_schedules.sql

DELETE FROM maintenance_schedules WHERE NOT (brand = 'SEAT' AND model = 'Ibiza');

-- ─────────────────────────────────────────────────────────────
-- TOYOTA
-- Petrol engines: all timing CHAIN (2ZR-FE / 2ZR-FAE / A25A)
-- Diesel (Fortuner/Prado 2.8 1GD-FTV): timing CHAIN
-- Source: Toyota global service manual + Toyota Egypt dealer schedule
-- ─────────────────────────────────────────────────────────────

-- Corolla E170 (2014–2018) — 1.6 ZZR-FE / 2.0 3ZR-FAE
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Corolla', 2014, 2018, 'Engine Oil & Filter', 10000, 365, '5W-30 synthetic — 0W-20 if available', 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2014, 2018, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2014, 2018, 'Engine Air Filter', 40000, 730, 'Inspect at 20k in dusty conditions', 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2014, 2018, 'Spark Plugs (Iridium)', 100000, NULL, 'Denso SK16HR-11', 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2014, 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2014, 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2014, 2018, 'Coolant', 160000, NULL, 'Super Long Life Coolant', 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2014, 2018, 'Transmission Fluid (AT)', 80000, NULL, 'Toyota WS ATF', 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2014, 2018, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- Corolla E210 (2019+) — 1.8 / 2.0
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Corolla', 2019, 'Engine Oil & Filter', 10000, 365, '0W-20 full synthetic', 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2019, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2019, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2019, 'Spark Plugs (Iridium)', 100000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2019, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2019, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2019, 'Coolant', 160000, NULL, 'Super Long Life Coolant', 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2019, 'Transmission Fluid (AT)', 80000, NULL, 'Toyota WS ATF', 'petrol', 'ai_generated'),

('Toyota', 'Corolla', 2019, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- Yaris XP150 (2014–2020) — 1.3 / 1.5
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Yaris', 2014, 2020, 'Engine Oil & Filter', 10000, 365, '5W-30 synthetic', 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2014, 2020, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2014, 2020, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2014, 2020, 'Spark Plugs (Iridium)', 100000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2014, 2020, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2014, 2020, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2014, 2020, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated');


-- Yaris XP210 (2020+)
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Yaris', 2020, 'Engine Oil & Filter', 10000, 365, '0W-20 full synthetic', 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2020, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2020, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2020, 'Spark Plugs (Iridium)', 100000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2020, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2020, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Yaris', 2020, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated');


-- Camry XV70 (2018+) — 2.5 A25A
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Camry', 2018, 'Engine Oil & Filter', 10000, 365, '0W-20 full synthetic', 'petrol', 'ai_generated'),

('Toyota', 'Camry', 2018, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Camry', 2018, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Camry', 2018, 'Spark Plugs (Iridium)', 100000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Camry', 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Camry', 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Camry', 2018, 'Coolant', 160000, NULL, 'Super Long Life Coolant', 'petrol', 'ai_generated'),

('Toyota', 'Camry', 2018, 'Transmission Fluid (AT)', 80000, NULL, 'Toyota WS ATF', 'petrol', 'ai_generated'),

('Toyota', 'Camry', 2018, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- Fortuner N80 (2016+) — 2.7 petrol + 2.8 diesel (1GD-FTV, both timing CHAIN)
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Fortuner', 2016, 'Engine Oil & Filter', 10000, 365, '5W-30 diesel spec for diesel; 5W-30 petrol spec for 2.7', 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Engine Air Filter', 40000, 730, 'Inspect at 20k — desert dust', 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Fuel Filter (Diesel)', 30000, NULL, 'Diesel variant only', 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Spark Plugs (Petrol)', 100000, NULL, 'Petrol 2.7 variant only', 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Transfer Case Fluid', 40000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Differential Fluid', 40000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Fortuner', 2016, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Land Cruiser Prado J150 (2010+) — 2.7 / 4.0 petrol, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Toyota', 'Land Cruiser Prado', 2010, 'Engine Oil & Filter', 10000, 365, '5W-30 synthetic', 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Spark Plugs (Iridium)', 100000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Transfer Case Fluid', 40000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Differential Fluid', 40000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated'),

('Toyota', 'Land Cruiser Prado', 2010, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- HYUNDAI
-- Egypt market: Nu 1.6 MPI / Gamma 1.4 — all timing CHAIN (2016+)
-- Source: Hyundai Egypt official schedule + global owner's manual
-- ─────────────────────────────────────────────────────────────

-- Elantra AD (2016–2020) — 1.6 Nu MPI, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Hyundai', 'Elantra', 2016, 2020, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2016, 2020, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2016, 2020, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2016, 2020, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2016, 2020, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2016, 2020, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2016, 2020, 'Coolant', 200000, NULL, 'Hyundai Long Life Coolant', 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2016, 2020, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2016, 2020, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- Elantra CN7 (2021+) — 1.6 MPI, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Hyundai', 'Elantra', 2021, 'Engine Oil & Filter', 10000, 365, '5W-30 or 0W-20 full synthetic', 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2021, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2021, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2021, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2021, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2021, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2021, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2021, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Elantra', 2021, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- Tucson TL (2016–2020) — 2.0 Nu MPI, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Hyundai', 'Tucson', 2016, 2020, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2016, 2020, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2016, 2020, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2016, 2020, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2016, 2020, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2016, 2020, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2016, 2020, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2016, 2020, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Tucson NX4 (2021+) — 2.0 MPI, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Hyundai', 'Tucson', 2021, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2021, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2021, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2021, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2021, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2021, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2021, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Tucson', 2021, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Accent HC (2018+) — 1.4 Gamma, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Hyundai', 'Accent', 2018, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Hyundai', 'Accent', 2018, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Accent', 2018, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Accent', 2018, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Accent', 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Accent', 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Accent', 2018, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Hyundai', 'Accent', 2018, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- KIA (shares Hyundai engines — same intervals)
-- Egypt: Gamma 1.4 / Nu 1.6 / 2.0 MPI — all timing CHAIN
-- ─────────────────────────────────────────────────────────────

-- Cerato YD (2013–2018) — 1.6 Nu, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Kia', 'Cerato', 2013, 2018, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2013, 2018, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2013, 2018, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2013, 2018, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2013, 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2013, 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2013, 2018, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2013, 2018, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Cerato BD (2019+) — 1.6 Smartstream, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Kia', 'Cerato', 2019, 'Engine Oil & Filter', 10000, 365, '5W-30 or 0W-20 full synthetic', 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2019, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2019, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2019, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2019, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2019, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2019, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Kia', 'Cerato', 2019, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Sportage QL (2016–2021) — 2.0 MPI, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Kia', 'Sportage', 2016, 2021, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Kia', 'Sportage', 2016, 2021, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Kia', 'Sportage', 2016, 2021, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Kia', 'Sportage', 2016, 2021, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Kia', 'Sportage', 2016, 2021, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Kia', 'Sportage', 2016, 2021, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Kia', 'Sportage', 2016, 2021, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Kia', 'Sportage', 2016, 2021, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Picanto JA (2017+) — 1.0 Kappa, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Kia', 'Picanto', 2017, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Kia', 'Picanto', 2017, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Kia', 'Picanto', 2017, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Kia', 'Picanto', 2017, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Kia', 'Picanto', 2017, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Kia', 'Picanto', 2017, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Kia', 'Picanto', 2017, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Kia', 'Picanto', 2017, 'Transmission Fluid (AT)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- NISSAN
-- Egypt Sunny N17/N18: HR15DE engine — timing CHAIN (confirmed)
-- Oil: 10,000km confirmed for HR15DE
-- CVT: Nissan NS-3 fluid, 40,000km
-- ─────────────────────────────────────────────────────────────

-- Sunny N17 (2012–2019) — 1.5 HR15DE, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Nissan', 'Sunny', 2012, 2019, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic — HR15DE', 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2012, 2019, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2012, 2019, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2012, 2019, 'Spark Plugs (Platinum)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2012, 2019, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2012, 2019, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2012, 2019, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2012, 2019, 'CVT Fluid', 40000, NULL, 'Nissan NS-3 only — do not substitute', 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2012, 2019, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- Sunny N18 (2020+)
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Nissan', 'Sunny', 2020, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2020, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2020, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2020, 'Spark Plugs (Platinum)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2020, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2020, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2020, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2020, 'CVT Fluid', 40000, NULL, 'Nissan NS-3 only', 'petrol', 'ai_generated'),

('Nissan', 'Sunny', 2020, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- Qashqai J11 (2014+) — 2.0 MR20DE, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Nissan', 'Qashqai', 2014, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Nissan', 'Qashqai', 2014, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Qashqai', 2014, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Qashqai', 2014, 'Spark Plugs (Platinum)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Qashqai', 2014, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Qashqai', 2014, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Qashqai', 2014, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Nissan', 'Qashqai', 2014, 'CVT Fluid', 40000, NULL, 'Nissan NS-3', 'petrol', 'ai_generated'),

('Nissan', 'Qashqai', 2014, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- X-Trail T32 (2014+) — 2.5 QR25DE, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Nissan', 'X-Trail', 2014, 'Engine Oil & Filter', 10000, 365, '5W-30 full synthetic', 'petrol', 'ai_generated'),

('Nissan', 'X-Trail', 2014, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Nissan', 'X-Trail', 2014, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Nissan', 'X-Trail', 2014, 'Spark Plugs (Platinum)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Nissan', 'X-Trail', 2014, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Nissan', 'X-Trail', 2014, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Nissan', 'X-Trail', 2014, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Nissan', 'X-Trail', 2014, 'CVT Fluid', 40000, NULL, 'Nissan NS-3', 'petrol', 'ai_generated'),

('Nissan', 'X-Trail', 2014, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- MITSUBISHI
-- Egypt Lancer: 4A91 1.5L or 4B11 2.0L — BOTH timing CHAIN (confirmed)
-- ─────────────────────────────────────────────────────────────

-- Lancer CY (2007–2017) — 1.5 / 2.0, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Mitsubishi', 'Lancer', 2007, 2017, 'Engine Oil & Filter', 7500, 180, '5W-30 synthetic — every 6 months or 7,500km', 'petrol', 'ai_generated'),

('Mitsubishi', 'Lancer', 2007, 2017, 'Cabin Air Filter', 15000, 365, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Lancer', 2007, 2017, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Lancer', 2007, 2017, 'Spark Plugs (Platinum)', 30000, NULL, 'Standard platinum — not iridium on base 1.5', 'petrol', 'ai_generated'),

('Mitsubishi', 'Lancer', 2007, 2017, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Lancer', 2007, 2017, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Lancer', 2007, 2017, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Lancer', 2007, 2017, 'Transmission Fluid (AT)', 40000, NULL, 'Mitsubishi ATF SP-III', 'petrol', 'ai_generated'),

('Mitsubishi', 'Lancer', 2007, 2017, 'Serpentine Belt', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Eclipse Cross (2018+) — 1.5 4B40 turbo, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Mitsubishi', 'Eclipse Cross', 2018, 'Engine Oil & Filter', 10000, 365, '0W-20 full synthetic', 'petrol', 'ai_generated'),

('Mitsubishi', 'Eclipse Cross', 2018, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Eclipse Cross', 2018, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Eclipse Cross', 2018, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Eclipse Cross', 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Eclipse Cross', 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Eclipse Cross', 2018, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Mitsubishi', 'Eclipse Cross', 2018, 'CVT Fluid', 40000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- VW
-- Egypt market: Golf/Polo/Tiguan — 1.4 TSI (EA211), timing CHAIN
-- Passat B8 Egypt: 1.4 TSI (NOT TDI diesel — diesel not officially sold in Egypt)
-- DSG: dry 7-speed DQ200 on most Egypt-market VW
-- ─────────────────────────────────────────────────────────────

-- Golf MK7 (2013–2019) — 1.4 TSI EA211, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('VW', 'Golf', 2013, 2019, 'Engine Oil & Filter', 10000, 365, '0W-20 or 5W-30 VW 508.00', 'petrol', 'ai_generated'),

('VW', 'Golf', 2013, 2019, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('VW', 'Golf', 2013, 2019, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('VW', 'Golf', 2013, 2019, 'Spark Plugs', 60000, NULL, 'NGK OE or equivalent', 'petrol', 'ai_generated'),

('VW', 'Golf', 2013, 2019, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('VW', 'Golf', 2013, 2019, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('VW', 'Golf', 2013, 2019, 'Coolant', 200000, NULL, 'G13 pink — do not mix with green', 'petrol', 'ai_generated'),

('VW', 'Golf', 2013, 2019, 'DSG Fluid (dry DQ200)', 60000, NULL, '"Lifelong" claim is wrong — replace at 60k', 'petrol', 'ai_generated'),

('VW', 'Golf', 2013, 2019, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


-- Polo AW (2018+) — 1.0 TSI EA211, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('VW', 'Polo', 2018, 'Engine Oil & Filter', 10000, 365, '0W-20 VW 508.00', 'petrol', 'ai_generated'),

('VW', 'Polo', 2018, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('VW', 'Polo', 2018, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('VW', 'Polo', 2018, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('VW', 'Polo', 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('VW', 'Polo', 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('VW', 'Polo', 2018, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('VW', 'Polo', 2018, 'DSG Fluid (dry DQ200)', 60000, NULL, 'Replace at 60k — not lifelong', 'petrol', 'ai_generated'),

('VW', 'Polo', 2018, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


-- Tiguan AD1 (2016+) — 1.4 TSI, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('VW', 'Tiguan', 2016, 'Engine Oil & Filter', 10000, 365, '0W-20 or 5W-30 VW 508.00', 'petrol', 'ai_generated'),

('VW', 'Tiguan', 2016, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('VW', 'Tiguan', 2016, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('VW', 'Tiguan', 2016, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('VW', 'Tiguan', 2016, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('VW', 'Tiguan', 2016, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('VW', 'Tiguan', 2016, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('VW', 'Tiguan', 2016, 'DSG Fluid (dry DQ200)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('VW', 'Tiguan', 2016, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


-- Passat B8 Egypt (2015+) — 1.4 TSI only (no TDI in Egypt), timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('VW', 'Passat', 2015, 'Engine Oil & Filter', 10000, 365, '0W-20 VW 508.00', 'petrol', 'ai_generated'),

('VW', 'Passat', 2015, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('VW', 'Passat', 2015, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('VW', 'Passat', 2015, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('VW', 'Passat', 2015, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('VW', 'Passat', 2015, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('VW', 'Passat', 2015, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('VW', 'Passat', 2015, 'DSG Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('VW', 'Passat', 2015, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- SKODA
-- Egypt Rapid: 1.6 MPI CFNA engine — timing CHAIN (confirmed)
-- Egypt Octavia: 1.4 TSI EA211 — timing CHAIN
-- Official Skoda Egypt timing belt interval: 100,000 km (for any belt models)
-- ─────────────────────────────────────────────────────────────

-- Octavia 5E (2013–2019) — 1.4 TSI EA211, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Skoda', 'Octavia', 2013, 2019, 'Engine Oil & Filter', 10000, 365, '0W-20 or 5W-30 VW 508.00', 'petrol', 'ai_generated'),

('Skoda', 'Octavia', 2013, 2019, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Octavia', 2013, 2019, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Octavia', 2013, 2019, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Octavia', 2013, 2019, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Octavia', 2013, 2019, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Octavia', 2013, 2019, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('Skoda', 'Octavia', 2013, 2019, 'DSG Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Octavia', 2013, 2019, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


-- Rapid NH (2013–2019) — 1.6 MPI CFNA, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Skoda', 'Rapid', 2013, 2019, 'Engine Oil & Filter', 10000, 365, '5W-30 or 5W-40 VW 502.00', 'petrol', 'ai_generated'),

('Skoda', 'Rapid', 2013, 2019, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Rapid', 2013, 2019, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Rapid', 2013, 2019, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Rapid', 2013, 2019, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Rapid', 2013, 2019, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Rapid', 2013, 2019, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('Skoda', 'Rapid', 2013, 2019, 'Serpentine Belt', 100000, NULL, '1.6 MPI — no DSG, manual or AT only', 'petrol', 'ai_generated');


-- Kodiaq NS (2017+) — 1.4 / 2.0 TSI, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Skoda', 'Kodiaq', 2017, 'Engine Oil & Filter', 10000, 365, '0W-20 VW 508.00', 'petrol', 'ai_generated'),

('Skoda', 'Kodiaq', 2017, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Kodiaq', 2017, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Kodiaq', 2017, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Kodiaq', 2017, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Kodiaq', 2017, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Skoda', 'Kodiaq', 2017, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('Skoda', 'Kodiaq', 2017, 'DSG Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- SEAT Leon (MQB — same as VW Golf intervals)
-- Egypt: 1.4 TSI EA211, timing CHAIN
-- ─────────────────────────────────────────────────────────────

INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('SEAT', 'Leon', 2013, 'Engine Oil & Filter', 10000, 365, '0W-20 or 5W-30 VW 508.00', 'petrol', 'ai_generated'),

('SEAT', 'Leon', 2013, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('SEAT', 'Leon', 2013, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('SEAT', 'Leon', 2013, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('SEAT', 'Leon', 2013, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('SEAT', 'Leon', 2013, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('SEAT', 'Leon', 2013, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('SEAT', 'Leon', 2013, 'DSG Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('SEAT', 'Leon', 2013, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- CUPRA (MQB — same as SEAT/VW)
-- ─────────────────────────────────────────────────────────────

INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Cupra', 'Formentor', 2020, 'Engine Oil & Filter', 10000, 365, '0W-20 VW 508.00', 'petrol', 'ai_generated'),

('Cupra', 'Formentor', 2020, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Formentor', 2020, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Formentor', 2020, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Formentor', 2020, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Formentor', 2020, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Formentor', 2020, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('Cupra', 'Formentor', 2020, 'DSG Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Cupra', 'Leon', 2020, 'Engine Oil & Filter', 10000, 365, '0W-20 VW 508.00', 'petrol', 'ai_generated'),

('Cupra', 'Leon', 2020, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Leon', 2020, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Leon', 2020, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Leon', 2020, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Leon', 2020, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Cupra', 'Leon', 2020, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('Cupra', 'Leon', 2020, 'DSG Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- AUDI (MQB — same platform, same intervals as VW)
-- ─────────────────────────────────────────────────────────────

INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'A3', 2013, 'Engine Oil & Filter', 10000, 365, '0W-20 or 5W-30 VW 508.00', 'petrol', 'ai_generated'),

('Audi', 'A3', 2013, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Audi', 'A3', 2013, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Audi', 'A3', 2013, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Audi', 'A3', 2013, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Audi', 'A3', 2013, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Audi', 'A3', 2013, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('Audi', 'A3', 2013, 'S-Tronic Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Audi', 'A3', 2013, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'Q3', 2018, 'Engine Oil & Filter', 10000, 365, '0W-20 VW 508.00', 'petrol', 'ai_generated'),

('Audi', 'Q3', 2018, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Audi', 'Q3', 2018, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Audi', 'Q3', 2018, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Audi', 'Q3', 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Audi', 'Q3', 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Audi', 'Q3', 2018, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('Audi', 'Q3', 2018, 'S-Tronic Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Audi', 'A4', 2016, 'Engine Oil & Filter', 10000, 365, '0W-20 VW 508.00', 'petrol', 'ai_generated'),

('Audi', 'A4', 2016, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Audi', 'A4', 2016, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Audi', 'A4', 2016, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Audi', 'A4', 2016, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Audi', 'A4', 2016, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Audi', 'A4', 2016, 'Coolant', 200000, NULL, 'G13', 'petrol', 'ai_generated'),

('Audi', 'A4', 2016, 'S-Tronic Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- BMW (F/G series petrol — timing CHAIN, no scheduled replacement)
-- BMW LL-04 oil spec, 15,000km dealer interval
-- ZF 8HP ATF: dealer says "lifelong" — replace at 80k in Egypt heat
-- ─────────────────────────────────────────────────────────────

INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('BMW', '3 Series', 2012, 'Engine Oil & Filter', 15000, 365, '0W-30 or 5W-30 BMW LL-04', 'petrol', 'ai_generated'),

('BMW', '3 Series', 2012, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('BMW', '3 Series', 2012, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('BMW', '3 Series', 2012, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('BMW', '3 Series', 2012, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('BMW', '3 Series', 2012, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('BMW', '3 Series', 2012, 'Coolant', 200000, NULL, 'BMW blue coolant', 'petrol', 'ai_generated'),

('BMW', '3 Series', 2012, 'Transmission Fluid (ZF 8HP)', 80000, NULL, 'Dealer says lifelong — replace at 80k in Egypt heat', 'petrol', 'ai_generated'),

('BMW', '3 Series', 2012, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('BMW', '5 Series', 2010, 'Engine Oil & Filter', 15000, 365, '0W-30 BMW LL-04', 'petrol', 'ai_generated'),

('BMW', '5 Series', 2010, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('BMW', '5 Series', 2010, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('BMW', '5 Series', 2010, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('BMW', '5 Series', 2010, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('BMW', '5 Series', 2010, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('BMW', '5 Series', 2010, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('BMW', '5 Series', 2010, 'Transmission Fluid (ZF 8HP)', 80000, NULL, 'Replace at 80k — not lifelong', 'petrol', 'ai_generated'),

('BMW', '5 Series', 2010, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('BMW', 'X5', 2014, 'Engine Oil & Filter', 15000, 365, '0W-30 BMW LL-04', 'petrol', 'ai_generated'),

('BMW', 'X5', 2014, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('BMW', 'X5', 2014, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('BMW', 'X5', 2014, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('BMW', 'X5', 2014, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('BMW', 'X5', 2014, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('BMW', 'X5', 2014, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('BMW', 'X5', 2014, 'Transfer Case Fluid', 80000, NULL, NULL, 'petrol', 'ai_generated'),

('BMW', 'X5', 2014, 'Transmission Fluid (ZF 8HP)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- MERCEDES-BENZ (W205/W213 — timing CHAIN, no scheduled replacement)
-- MB 229.6 / 229.71 oil spec
-- 9G-Tronic ATF: replace at 80k (dealer says lifelong — not in Egypt heat)
-- ─────────────────────────────────────────────────────────────

INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Mercedes', 'C-Class', 2014, 'Engine Oil & Filter', 10000, 365, '0W-20 or 5W-30 MB 229.6', 'petrol', 'ai_generated'),

('Mercedes', 'C-Class', 2014, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'C-Class', 2014, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'C-Class', 2014, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'C-Class', 2014, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'C-Class', 2014, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'C-Class', 2014, 'Coolant', 200000, NULL, 'MB Coolant 325.0', 'petrol', 'ai_generated'),

('Mercedes', 'C-Class', 2014, 'Transmission Fluid (9G-Tronic)', 80000, NULL, 'Replace at 80k — not lifelong', 'petrol', 'ai_generated'),

('Mercedes', 'C-Class', 2014, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Mercedes', 'E-Class', 2016, 'Engine Oil & Filter', 10000, 365, '0W-20 MB 229.6', 'petrol', 'ai_generated'),

('Mercedes', 'E-Class', 2016, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'E-Class', 2016, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'E-Class', 2016, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'E-Class', 2016, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'E-Class', 2016, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'E-Class', 2016, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'E-Class', 2016, 'Transmission Fluid (9G-Tronic)', 80000, NULL, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'E-Class', 2016, 'Serpentine Belt', 120000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Mercedes', 'GLC', 2016, 'Engine Oil & Filter', 10000, 365, '0W-20 MB 229.6', 'petrol', 'ai_generated'),

('Mercedes', 'GLC', 2016, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'GLC', 2016, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'GLC', 2016, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'GLC', 2016, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'GLC', 2016, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'GLC', 2016, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Mercedes', 'GLC', 2016, 'Transmission Fluid (9G-Tronic)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- RENAULT
-- Logan MK2 Egypt (pre-2018): K4M 1.6 engine — timing BELT 60,000km ← CRITICAL
-- Logan MK2 Egypt (2018+): H4M 1.6 engine — timing CHAIN
-- Megane MK4: 1.3 TCe — timing CHAIN
-- Duster HM: 1.6 SCe — timing CHAIN
-- Source: motorreviewer.com engine specs + mymotorlist.com
-- ─────────────────────────────────────────────────────────────

-- Logan pre-2018 (K4M engine) — timing BELT every 60,000km
INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Renault', 'Logan', 2013, 2017, 'Engine Oil & Filter', 7500, 365, '5W-40 semi-synthetic', 'petrol', 'ai_generated'),

('Renault', 'Logan', 2013, 2017, 'Cabin Air Filter', 15000, 365, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2013, 2017, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2013, 2017, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2013, 2017, 'Timing Belt', 60000, 1825, 'K4M engine — belt + tensioner + rollers. 5 years max. Critical.', 'petrol', 'ai_generated'),

('Renault', 'Logan', 2013, 2017, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2013, 2017, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2013, 2017, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2013, 2017, 'Serpentine Belt', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Logan 2018+ (H4M engine) — timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Renault', 'Logan', 2018, 'Engine Oil & Filter', 10000, 365, '5W-40 or 5W-30 synthetic — H4M engine', 'petrol', 'ai_generated'),

('Renault', 'Logan', 2018, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2018, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2018, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2018, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Renault', 'Logan', 2018, 'Serpentine Belt', 100000, NULL, NULL, 'petrol', 'ai_generated');


-- Megane MK4 (2016+) — 1.3 TCe, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Renault', 'Megane', 2016, 'Engine Oil & Filter', 10000, 365, '5W-30 synthetic', 'petrol', 'ai_generated'),

('Renault', 'Megane', 2016, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Renault', 'Megane', 2016, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Renault', 'Megane', 2016, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Renault', 'Megane', 2016, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Renault', 'Megane', 2016, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Renault', 'Megane', 2016, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Renault', 'Megane', 2016, 'EDC Fluid', 60000, NULL, NULL, 'petrol', 'ai_generated');


-- Duster HM (2018+) — 1.6 SCe H4M, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Renault', 'Duster', 2018, 'Engine Oil & Filter', 10000, 365, '5W-40 synthetic', 'petrol', 'ai_generated'),

('Renault', 'Duster', 2018, 'Cabin Air Filter', 15000, 365, NULL, 'petrol', 'ai_generated'),

('Renault', 'Duster', 2018, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Renault', 'Duster', 2018, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Renault', 'Duster', 2018, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Renault', 'Duster', 2018, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Renault', 'Duster', 2018, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- PEUGEOT
-- PureTech 1.2: known oil dilution issue — max 7,500km oil interval
-- 301: 1.6 VTi EP6 — timing CHAIN
-- 3008: 1.6 THP — timing CHAIN
-- ─────────────────────────────────────────────────────────────

-- 208 MK2 (2019+) — 1.2 PureTech, timing CHAIN but oil dilution risk
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Peugeot', '208', 2019, 'Engine Oil & Filter', 7500, 365, '0W-20 PSA B71 2312 — PureTech oil dilution issue: do not exceed 7,500km or 1 year', 'petrol', 'ai_generated'),

('Peugeot', '208', 2019, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Peugeot', '208', 2019, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Peugeot', '208', 2019, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Peugeot', '208', 2019, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Peugeot', '208', 2019, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Peugeot', '208', 2019, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Peugeot', '208', 2019, 'Transmission Fluid (EAT8)', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- 301 (2013+) — 1.6 VTi EP6, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Peugeot', '301', 2013, 'Engine Oil & Filter', 10000, 365, '5W-30 or 5W-40', 'petrol', 'ai_generated'),

('Peugeot', '301', 2013, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Peugeot', '301', 2013, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Peugeot', '301', 2013, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Peugeot', '301', 2013, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Peugeot', '301', 2013, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Peugeot', '301', 2013, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated');


-- 3008 MK2 (2017+) — 1.6 THP / 1.2 PureTech, timing CHAIN
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Peugeot', '3008', 2017, 'Engine Oil & Filter', 7500, 365, '0W-20 PSA B71 2312 — if PureTech; 5W-30 for 1.6 THP', 'petrol', 'ai_generated'),

('Peugeot', '3008', 2017, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Peugeot', '3008', 2017, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Peugeot', '3008', 2017, 'Spark Plugs', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Peugeot', '3008', 2017, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Peugeot', '3008', 2017, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Peugeot', '3008', 2017, 'Coolant', 200000, NULL, NULL, 'petrol', 'ai_generated'),

('Peugeot', '3008', 2017, 'Transmission Fluid (EAT6)', 60000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- FIAT
-- Tipo / Punto: 1.4 Fire 843A engine — timing BELT
-- Correct interval: first replacement at 45,000km, then every 90,000km
-- 5-year time limit — Egypt heat accelerates rubber degradation
-- Source: fiatworkshop.co.uk official service schedule
-- ─────────────────────────────────────────────────────────────

-- Tipo (2016+) — 1.4 843A Fire
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Fiat', 'Tipo', 2016, 'Engine Oil & Filter', 10000, 365, '5W-40 synthetic', 'petrol', 'ai_generated'),

('Fiat', 'Tipo', 2016, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Tipo', 2016, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Tipo', 2016, 'Spark Plugs', 30000, NULL, 'Fire engine — shorter interval than average', 'petrol', 'ai_generated'),

('Fiat', 'Tipo', 2016, 'Timing Belt', 45000, 1825, 'First replacement at 45,000km, then every 90,000km — 5 years max in Egypt', 'petrol', 'ai_generated'),

('Fiat', 'Tipo', 2016, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Tipo', 2016, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Tipo', 2016, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Tipo', 2016, 'Serpentine Belt', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- Punto (pre-2018) — 1.2 / 1.4 Fire
INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Fiat', 'Punto', 2005, 'Engine Oil & Filter', 10000, 365, '5W-40', 'petrol', 'ai_generated'),

('Fiat', 'Punto', 2005, 'Cabin Air Filter', 20000, 365, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Punto', 2005, 'Engine Air Filter', 40000, 730, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Punto', 2005, 'Spark Plugs', 30000, NULL, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Punto', 2005, 'Timing Belt', 45000, 1825, 'First at 45k, then 90k — 5 years max', 'petrol', 'ai_generated'),

('Fiat', 'Punto', 2005, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Punto', 2005, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Fiat', 'Punto', 2005, 'Serpentine Belt', 80000, NULL, NULL, 'petrol', 'ai_generated');


-- ─────────────────────────────────────────────────────────────
-- SUZUKI (2015+ petrol — timing CHAIN confirmed for Swift/Vitara/Ciaz)
-- ─────────────────────────────────────────────────────────────

INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Suzuki', 'Swift', 2017, 'Engine Oil & Filter', 10000, 365, '0W-20 or 5W-30 synthetic', 'petrol', 'ai_generated'),

('Suzuki', 'Swift', 2017, 'Cabin Air Filter', 15000, 365, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Swift', 2017, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Swift', 2017, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Swift', 2017, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Swift', 2017, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Swift', 2017, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Swift', 2017, 'CVT Fluid', 40000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Suzuki', 'Vitara', 2015, 'Engine Oil & Filter', 10000, 365, '0W-20 or 5W-30 synthetic', 'petrol', 'ai_generated'),

('Suzuki', 'Vitara', 2015, 'Cabin Air Filter', 15000, 365, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Vitara', 2015, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Vitara', 2015, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Vitara', 2015, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Vitara', 2015, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Vitara', 2015, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Vitara', 2015, 'CVT Fluid', 40000, NULL, NULL, 'petrol', 'ai_generated');


INSERT INTO maintenance_schedules (brand, model, year_from, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('Suzuki', 'Ciaz', 2015, 'Engine Oil & Filter', 10000, 365, '5W-30 synthetic', 'petrol', 'ai_generated'),

('Suzuki', 'Ciaz', 2015, 'Cabin Air Filter', 15000, 365, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Ciaz', 2015, 'Engine Air Filter', 30000, 730, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Ciaz', 2015, 'Spark Plugs (Iridium)', 60000, NULL, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Ciaz', 2015, 'Tire Rotation', 10000, 180, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Ciaz', 2015, 'Brake Fluid', NULL, 730, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Ciaz', 2015, 'Coolant', 160000, NULL, NULL, 'petrol', 'ai_generated'),

('Suzuki', 'Ciaz', 2015, 'CVT Fluid', 40000, NULL, NULL, 'petrol', 'ai_generated');

