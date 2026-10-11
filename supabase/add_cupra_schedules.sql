-- CUPRA Maintenance Schedules — Kayan Egypt for Trading & Inv. (Official Dealer)
-- Source: CUPRA LEON 2024 dealer maintenance schedule (Kayan Egypt)
-- data_source = 'official_dealer'
-- Models: Leon (2024+), Terramar (2024+)
-- Note: Both models share the same schedule per Kayan Egypt document.
-- Run in Supabase SQL editor.

-- ═══════════════════════════════════════════════════════════════
-- CUPRA LEON 2024+
-- ═══════════════════════════════════════════════════════════════

INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('CUPRA', 'Leon', 2024, NULL, 'Engine Oil',                      10000, 182, '4.0L capacity — every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Oil Filter',                      10000, 182, 'Replace at every oil change', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Oil Drain Plug & Seal Ring',      10000, 182, 'Replace sealing ring at every oil change', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Air Filter',                      30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Air Conditioning Filter',         20000, 365, 'Every 20,000 km or 12 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Spark Plugs',                     30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Gear Oil (DSG/Gearbox)',          60000, 1095,'Every 60,000 km or 36 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Poly V Belt',                     50000, 1095,'Every 50,000 km or 36 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Belt Tensioner Damper',           50000, 1095,'Every 50,000 km or 36 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Timing Belt (Toothed Belt)',      NULL,  1825,'Every 60 months — replace with tensioning roller, idler pulley & coolant pump belt', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Tensioning Roller',               NULL,  1825,'Replace with timing belt — every 60 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Idler Pulley',                    NULL,  1825,'Replace with timing belt — every 60 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Coolant Pump Belt',               NULL,  1825,'Toothed belt drive for coolant pump — every 60 months', 'petrol', 'official_dealer'),
('CUPRA', 'Leon', 2024, NULL, 'Brake Fluid',                     40000, 730, 'Every 40,000 km or 24 months — 2.0L capacity', 'petrol', 'official_dealer');

-- ═══════════════════════════════════════════════════════════════
-- CUPRA TERRAMAR 2024+
-- Same schedule as Leon per Kayan Egypt dealer document
-- ═══════════════════════════════════════════════════════════════

INSERT INTO maintenance_schedules (brand, model, year_from, year_to, name, interval_km, interval_days, notes, engine_type, data_source) VALUES
('CUPRA', 'Terramar', 2024, NULL, 'Engine Oil',                      10000, 182, '4.0L capacity — every 10,000 km or 6 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Oil Filter',                      10000, 182, 'Replace at every oil change', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Oil Drain Plug & Seal Ring',      10000, 182, 'Replace sealing ring at every oil change', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Air Filter',                      30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Air Conditioning Filter',         20000, 365, 'Every 20,000 km or 12 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Spark Plugs',                     30000, 730, 'Every 30,000 km or 24 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Gear Oil (DSG/Gearbox)',          60000, 1095,'Every 60,000 km or 36 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Poly V Belt',                     50000, 1095,'Every 50,000 km or 36 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Belt Tensioner Damper',           50000, 1095,'Every 50,000 km or 36 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Timing Belt (Toothed Belt)',      NULL,  1825,'Every 60 months — replace with tensioning roller, idler pulley & coolant pump belt', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Tensioning Roller',               NULL,  1825,'Replace with timing belt — every 60 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Idler Pulley',                    NULL,  1825,'Replace with timing belt — every 60 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Coolant Pump Belt',               NULL,  1825,'Toothed belt drive for coolant pump — every 60 months', 'petrol', 'official_dealer'),
('CUPRA', 'Terramar', 2024, NULL, 'Brake Fluid',                     40000, 730, 'Every 40,000 km or 24 months — 2.0L capacity', 'petrol', 'official_dealer');
