-- Add transmission and timing system columns to cars table
-- Run in Supabase SQL editor

ALTER TABLE cars
  ADD COLUMN IF NOT EXISTS transmission text,         -- 'manual' | 'automatic' | 'cvt' | 'dsg'
  ADD COLUMN IF NOT EXISTS timing_system text;        -- 'chain' | 'belt' | 'unknown'
