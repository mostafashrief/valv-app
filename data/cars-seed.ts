export interface CarBrandSeed {
  brand: string;
  models: string[];
}

export interface ModelYearRange {
  brand: string;
  model: string;
  yearFrom: number;
  yearTo: number | null; // null = current year
}

// Only brands & models with a certified official dealer maintenance schedule.
// Do NOT add a model here unless its schedule exists in maintenance_schedules
// with data_source = 'official_dealer'.
export const CAR_BRANDS_SEED: CarBrandSeed[] = [
  {
    brand: 'Toyota',
    models: [
      'Corolla',
      'Yaris',
      'Fortuner',
      'Land Cruiser',
      'Land Cruiser Prado',
      'Hilux',
    ],
  },
  {
    brand: 'MG',
    models: [
      'MG 5',
      'MG 6',
      'MG 7',
      'MG ZS',
      'MG ZS FL',
      'MG HS',
      'MG One',
      'MG RX5',
      'MG RX5+',
      'MG GT',
      'MG G50 Plus',
      'MG RX9',
    ],
  },
  {
    brand: 'SEAT',
    models: ['Ibiza'],
  },
  {
    brand: 'Skoda',
    models: ['Kodiaq', 'Octavia', 'Superb'],
  },
  {
    brand: 'Volkswagen',
    models: [
      'Golf MK6 · 1.6 MPI',
      'Golf MK6 · 1.4T TSI',
      'Golf MK7 · 1.6 MPI',
      'Golf MK7 · 1.2T TSI',
      'Golf MK7 · 1.4T TSI',
      'Golf MK8 · 1.6 MPI',
      'Tiguan MK2 · 1.4T DSG',
      'Tiguan MK3 · 1.4T DSG',
      'Tiguan 2024 · 1.4T DSG',
      'Jetta MK6 · 1.4T DSG',
      'Passat B7 · 1.4T DSG',
      'T-ROC · 1.4T',
      'Touareg · 2.0T',
      'Tayron · 1.4T DSG',
    ],
  },
  {
    brand: 'Audi',
    models: [
      'A3 · 1.4T TSI · DSG',
      'A4 · 2.0T TFSI · DSG',
      'A5 · 2.0T TFSI · DSG',
      'A6 · 2.0T TFSI · Automatic',
      'Q2 · 1.0T TFSI · DSG',
      'Q3 · 1.4T TFSI · DSG',
      'Q3 · 2.0T TFSI · Automatic',
      'Q5 · 2.0T TFSI · DSG',
      'Q7 · 2.0T TFSI · Automatic',
    ],
  },
];

// Year ranges covered by official maintenance schedules.
// Users can only pick years within these bounds — no schedule exists outside them.
export const MODEL_YEAR_RANGES: ModelYearRange[] = [
  // Toyota
  { brand: 'Toyota', model: 'Corolla',             yearFrom: 2007, yearTo: null  },
  { brand: 'Toyota', model: 'Yaris',               yearFrom: 2006, yearTo: null  },
  { brand: 'Toyota', model: 'Fortuner',            yearFrom: 2005, yearTo: null  },
  { brand: 'Toyota', model: 'Land Cruiser',        yearFrom: 2008, yearTo: null  },
  { brand: 'Toyota', model: 'Land Cruiser Prado',  yearFrom: 2010, yearTo: null  },
  { brand: 'Toyota', model: 'Hilux',               yearFrom: 2005, yearTo: 2015  },
  // MG
  { brand: 'MG', model: 'MG 5',       yearFrom: 2021, yearTo: null  },
  { brand: 'MG', model: 'MG 6',       yearFrom: 2016, yearTo: null  },
  { brand: 'MG', model: 'MG 7',       yearFrom: 2023, yearTo: null  },
  { brand: 'MG', model: 'MG ZS',      yearFrom: 2018, yearTo: 2020  },
  { brand: 'MG', model: 'MG ZS FL',   yearFrom: 2021, yearTo: null  },
  { brand: 'MG', model: 'MG HS',      yearFrom: 2019, yearTo: null  },
  { brand: 'MG', model: 'MG One',     yearFrom: 2022, yearTo: null  },
  { brand: 'MG', model: 'MG RX5',     yearFrom: 2017, yearTo: 2022  },
  { brand: 'MG', model: 'MG RX5+',    yearFrom: 2021, yearTo: null  },
  { brand: 'MG', model: 'MG GT',      yearFrom: 2016, yearTo: null  },
  { brand: 'MG', model: 'MG G50 Plus',yearFrom: 2022, yearTo: null  },
  { brand: 'MG', model: 'MG RX9',     yearFrom: 2024, yearTo: null  },
  // SEAT
  { brand: 'SEAT',   model: 'Ibiza',               yearFrom: 2008, yearTo: null  },
  // Skoda
  { brand: 'Skoda',  model: 'Kodiaq',              yearFrom: 2025, yearTo: null  },
  { brand: 'Skoda',  model: 'Octavia',             yearFrom: 2021, yearTo: null  },
  { brand: 'Skoda',  model: 'Superb',              yearFrom: 2025, yearTo: null  },
  // Volkswagen
  { brand: 'Volkswagen', model: 'Golf MK6 · 1.6 MPI',      yearFrom: 2009, yearTo: 2013 },
  { brand: 'Volkswagen', model: 'Golf MK6 · 1.4T TSI',     yearFrom: 2009, yearTo: 2011 },
  { brand: 'Volkswagen', model: 'Golf MK7 · 1.6 MPI',      yearFrom: 2013, yearTo: null },
  { brand: 'Volkswagen', model: 'Golf MK7 · 1.2T TSI',     yearFrom: 2013, yearTo: null },
  { brand: 'Volkswagen', model: 'Golf MK7 · 1.4T TSI',     yearFrom: 2013, yearTo: null },
  { brand: 'Volkswagen', model: 'Golf MK8 · 1.6 MPI',      yearFrom: 2022, yearTo: null },
  { brand: 'Volkswagen', model: 'Tiguan MK2 · 1.4T DSG',   yearFrom: 2013, yearTo: null },
  { brand: 'Volkswagen', model: 'Tiguan MK3 · 1.4T DSG',   yearFrom: 2015, yearTo: null },
  { brand: 'Volkswagen', model: 'Tiguan 2024 · 1.4T DSG',  yearFrom: 2024, yearTo: null },
  { brand: 'Volkswagen', model: 'Jetta MK6 · 1.4T DSG',    yearFrom: 2013, yearTo: null },
  { brand: 'Volkswagen', model: 'Passat B7 · 1.4T DSG',    yearFrom: 2013, yearTo: null },
  { brand: 'Volkswagen', model: 'T-ROC · 1.4T',            yearFrom: 2022, yearTo: null },
  { brand: 'Volkswagen', model: 'Touareg · 2.0T',          yearFrom: 2024, yearTo: null },
  { brand: 'Volkswagen', model: 'Tayron · 1.4T DSG',       yearFrom: 2026, yearTo: null },
  // Audi
  { brand: 'Audi', model: 'A3 · 1.4T TSI · DSG',          yearFrom: 2013, yearTo: null },
  { brand: 'Audi', model: 'A4 · 2.0T TFSI · DSG',         yearFrom: 2016, yearTo: null },
  { brand: 'Audi', model: 'A5 · 2.0T TFSI · DSG',         yearFrom: 2017, yearTo: null },
  { brand: 'Audi', model: 'A6 · 2.0T TFSI · Automatic',   yearFrom: 2016, yearTo: null },
  { brand: 'Audi', model: 'Q2 · 1.0T TFSI · DSG',         yearFrom: 2021, yearTo: null },
  { brand: 'Audi', model: 'Q3 · 1.4T TFSI · DSG',         yearFrom: 2012, yearTo: null },
  { brand: 'Audi', model: 'Q3 · 2.0T TFSI · Automatic',   yearFrom: 2015, yearTo: null },
  { brand: 'Audi', model: 'Q5 · 2.0T TFSI · DSG',         yearFrom: 2017, yearTo: null },
  { brand: 'Audi', model: 'Q7 · 2.0T TFSI · Automatic',   yearFrom: 2015, yearTo: null },
];
