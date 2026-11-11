@AGENTS.md

# Carvalv — Car Maintenance App

## What this app is
Carvalv is a mobile-first car maintenance tracker for Egypt (then MENA, then global). Users add their car, the app loads a maintenance schedule from a Supabase database, tracks mileage, and sends reminders when services are due. Think Duolingo for car maintenance — direct, dry, a little cheeky, never mean.

## Stack
- **React Native / Expo SDK 56** — single codebase, iOS + Android
- **expo-router** — file-based routing
- **Supabase** — Postgres + Auth + Storage + Edge Functions
- **RevenueCat** — subscriptions wired (iOS only, Android pending)
- **Claude AI** — receipt parsing + odometer scanning via Supabase Edge Functions

## Supabase project
- URL: `https://fxziatkzwpzoyhuoumxk.supabase.co`
- Anon key: in `.env` as `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Storage bucket: `receipts` (public)
- Edge Functions: `parse-receipt`, `parse-odometer`, `send-maintenance-push`, `delete-account`

## Database schema
- `cars` — user's cars (brand, model, year, current_mileage_km, transmission, timing_system)
- `maintenance_items` — items per car (name, interval_km, interval_days, last_done_at_km, last_done_at, source)
- `mileage_logs` — odometer history (car_id, mileage_km, logged_at)
- `service_logs` — full service history (car_id, item_id, done_at_km, done_at, cost_egp, notes, receipt_url)
- `profiles` — user profile (first_name, last_name, age, city, gender, push_token, mileage_reminder_frequency, quiz_completed_at)
- `maintenance_schedules` — OEM/dealer schedules per brand/model/year

All tables have RLS enabled. Users only see their own data.

## Brand
- **Colors**: Background `#111110` · Orange `#FF7A1A` · Icon White `#F4F2EE` · Carbon `#2E2E2C` · Steel `#5C5C5A`
- **Status**: Overdue `#FF2D2D` · Due Soon `#FF7A1A` (same orange) · Healthy `#2EC4B6`
- **Typography**: ChakraPetch Bold — headings; Space Grotesk — body; Space Mono — mileage/numbers
- **Voice**: Direct, dry, escalating roast — never mean. Plain facts, no "CRITICAL THRESHOLD" language.
- All styles live in `constants/theme.ts`

## App structure
```
app/
  index.tsx              — Welcome/splash screen
  _layout.tsx            — Root layout (AuthProvider > CarProvider > OnboardingProvider > QuizProvider > RevenueCatProvider > Stack)
  auth/
    index.tsx            — Apple / Google / email choice
    email.tsx            — Email + password (with show/hide toggle)
    phone.tsx            — Egyptian phone OTP (broken — Twilio not connected)
    verify.tsx           — OTP verification
  quiz/
    name.tsx             — Step 1/5: name, gender, city (+ optional fields)
    driving.tsx          — Step 5/5: mileage reminder frequency
    records.tsx          — Step 4/5: upload receipts or type service history
    done.tsx             — Transition to paywall
  onboarding/
    brand.tsx            — Step 1/4: pick car brand
    model.tsx            — Step 2/4: pick model
    year.tsx             — Step 3/4: pick year
    mileage.tsx          — Step 4/4: enter odometer
    engine.tsx           — Transmission + timing system (shown if not auto-detected)
    confirm.tsx          — Review engine config before saving
    done.tsx             — Car saved, schedule loaded, → quiz/records or services
    car-details.tsx      — Detailed car info step in quiz flow
    services.tsx         — Review loaded maintenance items
    suggest.tsx          — Suggest a brand/model not in the seed
  (tabs)/
    index.tsx            — Home: maintenance cards, log km, add custom item
    upcoming.tsx         — Timeline grouped by urgency
    records.tsx          — Full service history
    profile.tsx          — Cars, switch active car, language toggle, sign out, delete account
  item/[id].tsx          — Item detail: service history, log service, receipt upload + AI parse
  item/upload-booklet.tsx — Upload service booklet
  paywall.tsx            — RevenueCat paywall (6-month trial, 29.99 EGP/mo, 249.99 EGP/yr)

lib/
  supabase.ts            — Supabase client
  auth-context.tsx       — Auth state + signIn/signUp/signOut/signInWithApple/signInWithGoogle
  car-context.tsx        — Active car + all cars, persisted via AsyncStorage
  onboarding-context.tsx — Draft state during onboarding
  quiz-context.tsx       — Draft state during quiz
  maintenance.ts         — Status engine: calcItemStatus, sortByUrgency
  notifications.ts       — Local + remote push, permission request, mileage reminders
  revenue-cat.tsx        — RevenueCat provider, purchase/restore, status (trial/active/expired)
  i18n.ts                — i18next en/ar, Arabic default for new users
  pending-items.ts       — Buffer for maintenance items while car is being created
  phone.ts               — Egyptian phone number validation + E.164 formatting

data/
  cars-seed.ts           — Egypt-priority car brands + models + year ranges
  default-maintenance-items.ts — Fallback items if no schedule in DB

supabase/
  functions/parse-receipt/        — image → Claude Haiku → JSON service log fields
  functions/parse-odometer/       — image → Claude Haiku → km reading
  functions/send-maintenance-push/ — scheduled push notifications via Expo Push API
  functions/delete-account/       — hard-delete user data + auth record
```

## Key logic
- **Status engine** (`lib/maintenance.ts`): two-axis evaluation (km + time), picks worst. Overdue ≤0%, Due Soon ≤1500km or ≤14 days remaining.
- **Active car** persisted in AsyncStorage under key `active_car_id`.
- **Receipt AI flow**: pick image → upload to Supabase Storage → call `parse-receipt` → auto-fill log form.
- **AuthGate** (`app/_layout.tsx`): routes signed-in users to `/(tabs)` if they have a car, `/quiz/name` if not. Unsigned users go to welcome.
- **PaywallGate**: if RevenueCat status is `expired`, redirects to `/paywall` from any tab.
- **Onboarding engine inference**: if `maintenance_schedules` has official dealer data, transmission + timing system are inferred automatically — skips the `engine.tsx` step.

## Auth providers configured
- Apple Sign In — native (`expo-apple-authentication`) + `signInWithIdToken`
- Google Sign In — `expo-auth-session` + `signInWithIdToken`, Skip nonce checks ON in Supabase
- Email/password — Supabase Auth
- Phone OTP — code exists but **broken** (Twilio not connected to Supabase)

## Monetization
- **Trial**: 6 months free
- **Monthly**: 29.99 EGP/month
- **Yearly**: 249.99 EGP/year (shown as "Only 20.83 EGP/month")
- RevenueCat entitlement: `pro`
- Product IDs: `com.carvalv.app.monthly`, `com.carvalv.app.yearly`
- ⚠️ App Store Connect products not yet created — RevenueCat shows "Could not check"

## Git workflow
- `master` — production branch, protected, requires PR approval
- `dev` — Malek's working branch. All changes go dev → PR → master
- Never push directly to master

## Test credentials
- Email: `seed2@valv.app` / password: `valv1234seed`
- Car: Hyundai Elantra 2021 @ 48,200 km

## What still needs doing before App Store launch
1. Create subscription products in App Store Connect (unblocks RevenueCat)
2. Remove or hide phone OTP auth (broken)
3. Fill in App Store listing: screenshots, description, keywords, support URL
4. Arabic RTL full QA
5. Android build + Google Play (post iOS launch)

## Running locally
```bash
cd /Users/mostafashreif/Desktop/Apps/VALV-app
npx expo start --web   # quick UI preview (Apple/Google Sign In won't work on web)
```

## Building for TestFlight
```bash
eas build --platform ios --profile production   # builds on Expo servers (~15 min)
eas submit --platform ios --latest              # submits to TestFlight
```
