import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';
import { useAuth } from './auth-context';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  current_mileage_km: number;
}

interface CarContextValue {
  cars: Car[];
  activeCar: Car | null;
  setActiveCar: (car: Car) => void;
  reloadCars: () => Promise<void>;
}

const CarContext = createContext<CarContextValue>({
  cars: [],
  activeCar: null,
  setActiveCar: () => {},
  reloadCars: async () => {},
});

export function CarProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [activeCar, setActiveCarState] = useState<Car | null>(null);

  const reloadCars = async () => {
    if (!session?.user) return;
    const { data } = await supabase
      .from('cars')
      .select('id, brand, model, year, current_mileage_km')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (!data?.length) return;
    setCars(data as Car[]);

    const storedId = await AsyncStorage.getItem('active_car_id');
    const found = (data as Car[]).find((c) => c.id === storedId);
    setActiveCarState(found ?? (data[0] as Car));
  };

  const setActiveCar = async (car: Car) => {
    setActiveCarState(car);
    await AsyncStorage.setItem('active_car_id', car.id);
  };

  useEffect(() => { reloadCars(); }, [session]);

  return (
    <CarContext.Provider value={{ cars, activeCar, setActiveCar, reloadCars }}>
      {children}
    </CarContext.Provider>
  );
}

export const useCar = () => useContext(CarContext);
