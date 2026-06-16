// Starter brand/model list, prioritized for the Egypt launch market.
// This is intentionally small — it's enough to wire up the onboarding UI.
// Replace/expand with the full maintenance-data ruleset in a follow-up pass.
export interface CarBrandSeed {
  brand: string;
  models: string[];
}

export const CAR_BRANDS_SEED: CarBrandSeed[] = [
  { brand: 'Hyundai', models: ['Elantra', 'Accent', 'Tucson', 'i10', 'Verna'] },
  { brand: 'Kia', models: ['Cerato', 'Rio', 'Sportage', 'Picanto'] },
  { brand: 'Chevrolet', models: ['Optra', 'Aveo', 'Captiva', 'Spark'] },
  { brand: 'Nissan', models: ['Sunny', 'Sentra', 'Qashqai', 'Juke'] },
  { brand: 'Toyota', models: ['Corolla', 'Yaris', 'RAV4', 'Fortuner'] },
  { brand: 'MG', models: ['MG5', 'MG ZS', 'MG6'] },
  { brand: 'BYD', models: ['F3', 'Atto 3', 'Song Plus'] },
  { brand: 'Fiat', models: ['Tipo', '500', 'Panda'] },
  { brand: 'Renault', models: ['Logan', 'Sandero', 'Duster'] },
  { brand: 'Other', models: ["I'll type it in"] },
];
