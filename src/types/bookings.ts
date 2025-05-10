import { CleaningPlan } from './plans';

export type BookingStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  plan: CleaningPlan;
  date: Date;
  time: Date;
  address: string;
  specialInstructions?: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: Date;
}

// Mock data for development
export const mockBookings: Booking[] = [
  {
    id: '1',
    plan: {
      id: 'standard',
      type: 'standard',
      title: 'Limpieza Estándar',
      description: 'Ideal para casas y apartamentos medianos hasta 100m²',
      price: 45,
      duration: '2-3 horas',
      features: [
        'Todo lo incluido en Limpieza Básica',
        'Limpieza profunda de baños',
        'Limpieza detallada de cocina',
        'Limpieza de muebles',
        'Limpieza de electrodomésticos',
        'Organización básica'
      ],
      icon: 'home-city',
      recommended: true,
    },
    date: new Date(2024, 3, 15),
    time: new Date(2024, 3, 15, 10, 0),
    address: 'Av. Principal #123, Caracas',
    specialInstructions: 'Por favor traer productos de limpieza adicionales',
    status: 'scheduled',
    totalAmount: 45,
    createdAt: new Date(2024, 3, 1),
  },
  {
    id: '2',
    plan: {
      id: 'basic',
      type: 'basic',
      title: 'Limpieza Básica',
      description: 'Perfecta para apartamentos pequeños y estudios hasta 50m²',
      price: 25,
      duration: '1-2 horas',
      features: [
        'Limpieza general de habitaciones',
        'Limpieza de baño',
        'Limpieza básica de cocina',
        'Barrido y trapeado',
        'Limpieza de ventanas (interior)'
      ],
      icon: 'home',
    },
    date: new Date(2024, 2, 20),
    time: new Date(2024, 2, 20, 14, 0),
    address: 'Calle Los Mangos #45, Valencia',
    status: 'completed',
    totalAmount: 25,
    createdAt: new Date(2024, 2, 5),
  },
]; 