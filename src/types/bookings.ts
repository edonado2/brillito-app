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
      id: 'medium',
      type: 'medium',
      title: 'Medium Home',
      description: 'Ideal for medium-sized houses up to 2000 sq ft',
      price: 149,
      duration: '3-4 hours',
      features: [
        'Everything in Small Home plan',
        'Deep cleaning of bathrooms',
        'Detailed kitchen cleaning',
        'Floor mopping and polishing',
        'Cabinet cleaning',
        'Appliance cleaning'
      ],
      icon: 'home-city',
      recommended: true,
    },
    date: new Date(2024, 3, 15),
    time: new Date(2024, 3, 15, 10, 0),
    address: '123 Main St, City, State',
    specialInstructions: 'Please bring extra cleaning supplies',
    status: 'scheduled',
    totalAmount: 149,
    createdAt: new Date(2024, 3, 1),
  },
  {
    id: '2',
    plan: {
      id: 'small',
      type: 'small',
      title: 'Small Home',
      description: 'Perfect for apartments and small houses up to 1000 sq ft',
      price: 89,
      duration: '2-3 hours',
      features: [
        'Basic cleaning of all rooms',
        'Bathroom cleaning',
        'Kitchen cleaning',
        'Dusting and vacuuming',
        'Window cleaning (interior)'
      ],
      icon: 'home',
    },
    date: new Date(2024, 2, 20),
    time: new Date(2024, 2, 20, 14, 0),
    address: '123 Main St, City, State',
    status: 'completed',
    totalAmount: 89,
    createdAt: new Date(2024, 2, 5),
  },
]; 