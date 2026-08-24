@AGENTS.md

# VALV — Car Maintenance App

## What this app is
VALV is a mobile-first car maintenance tracker for Egypt (then MENA, then global). Users enter their car details, the app loads a maintenance schedule, tracks mileage, and reminds them when services are due. Think Duolingo for car maintenance — direct, dry, a little cheeky, never mean.

## Stack
- **React Native / Expo SDK 56** — single codebase, iOS + Android
- **expo-router** — file-based routing
- **Supabase** — Postgres + Auth + Storage + Edge Functions
- **RevenueCat** — subscriptions (not yet wired, waiting on store accounts)
- **Claude AI** — receipt parsing via Supabase Edge Function

## Supabase project
- URL: `https://fxziatkzwpzoyhuoumxk.supabase.co`
- Anon key: in `.env` as `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Storage bucket: `receipts` (public)
- Edge Function: `parse-receipt` (calls Claude Haiku to parse receipt images)

## Database schema
- `cars` — user's cars (brand, model, year, current_mileage_km, mileage_updated_at)
- `maintenance_items` — items per car (name, interval_km, interval_days, last_done_at_km, last_done_at, source)
- `mileage_logs` — odometer history (car_id, mileage_km, logged_at)
- `service_logs` — full service history (car_id, item_id, done_at_km, done_at, cost_egp, notes, receipt_url)

All tables have RLS enabled. Users only see their own data.

## Brand
- **Colors**: Espresso `#1A1410` · Orange `#FF8A3D` · Cream `#F4EFE6`
- **Status**: Overdue `#E24B4A` · Due Soon `#FFD166` · Healthy `#2EC4B6`
- **Typography**: SF Pro system font for all copy; Courier New / monospace only for mileage and numeric data
- **Voice**: Direct, dry, escalating roast — never mean. Plain facts, no "CRITICAL THRESHOLD" language.
- All styles live in `constants/theme.ts`

## App structure
```
app/
  index.tsx              — Splash screen
  _layout.tsx            — Root layout (AuthProvider > CarProvider > OnboardingProvider > Stack)
  auth/
    index.tsx            — Choose email or phone
    email.tsx            — Email + password
    phone.tsx            — Egyptian phone OTP
    verify.tsx           — OTP verification
  onboarding/
    brand.tsx / model.tsx / year.tsx / mileage.tsx / done.tsx
  (tabs)/
    index.tsx            — Home: maintenance cards, log km, add custom item
    upcoming.tsx         — Timeline grouped by urgency
    profile.tsx          — Cars, switch active car, sign out
  item/[id].tsx          — Item detail: service history, log service, receipt upload

lib/
  supabase.ts            — Supabase client
  auth-context.tsx       — Auth state + signIn/signUp/signOut
  car-context.tsx        — Active car + all cars, persisted via AsyncStorage
  onboarding-context.tsx — Draft state during onboarding
  maintenance.ts         — Status engine: calcItemStatus, sortByUrgency
  i18n.ts                — i18next en/ar, RTL detection

data/
  cars-seed.ts           — 10 Egypt-priority brands
  default-maintenance-items.ts — 10 generic items inserted at onboarding

supabase/
  functions/parse-receipt/index.ts — Edge Function: image → Claude → JSON
```

## Key logic
- **Status engine** (`lib/maintenance.ts`): two-axis evaluation (km + time), picks worst. Overdue ≤0, Due Soon ≤1500km or ≤14 days.
- **Active car** persisted in AsyncStorage under key `active_car_id`.
- **Receipt AI flow**: pick image → upload to Supabase Storage → call `parse-receipt` function → auto-fill log form.

## Test credentials
- Email: `seed2@valv.app` / password: `valv1234seed`
- Car: Hyundai Elantra 2021 @ 48,200 km

## What's NOT done yet
- Push notifications (logic, not just config)
- RevenueCat paywall
- Phone OTP (needs Twilio in Supabase Auth settings)
- Arabic RTL full QA
- Real OEM maintenance data (all intervals are "estimated")
- EAS build / App Store submission (waiting on Apple Developer account activation)

## Monetization
Free 1-month trial → 39 EGP/month or 399 EGP/year. RevenueCat handles billing.

## Running locally
```bash
cd /Users/mostafashreif/Desktop/Apps/VALV-app
npx expo start --web   # web preview (iOS 26 incompatible with Expo Go)
```
