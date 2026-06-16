import type { CarProfile, MaintenanceItem } from '../types/car';

export const DUMMY_CAR: CarProfile = {
  id: 'dummy-car-1',
  brand: 'Hyundai',
  model: 'Elantra',
  year: 2021,
  currentMileageKm: 48200,
  mileageUpdatedAt: new Date().toISOString(),
  maintenanceItems: [],
};

export const DUMMY_ITEMS: MaintenanceItem[] = [
  {
    id: '1',
    name: 'Engine oil & filter',
    intervalKm: 10000,
    intervalDays: 180,
    lastDoneAtKm: 40000,
    lastDoneAtDate: '2025-12-01',
    source: 'estimated',
  },
  {
    id: '2',
    name: 'Air filter',
    intervalKm: 20000,
    lastDoneAtKm: 30000,
    source: 'estimated',
  },
  {
    id: '3',
    name: 'Brake pads',
    intervalKm: 30000,
    lastDoneAtKm: 20000,
    source: 'estimated',
  },
  {
    id: '4',
    name: 'Tires rotation',
    intervalKm: 10000,
    lastDoneAtKm: 45000,
    source: 'estimated',
  },
  {
    id: '5',
    name: 'Cabin (AC) filter',
    intervalKm: 20000,
    intervalDays: 365,
    lastDoneAtKm: 38000,
    source: 'estimated',
  },
  {
    id: '6',
    name: 'Battery check',
    intervalDays: 365,
    lastDoneAtDate: '2025-06-01',
    source: 'estimated',
  },
  {
    id: '7',
    name: 'Timing belt',
    intervalKm: 90000,
    lastDoneAtKm: 0,
    source: 'estimated',
  },
  {
    id: '8',
    name: 'Spark plugs',
    intervalKm: 40000,
    lastDoneAtKm: 10000,
    source: 'estimated',
  },
];
