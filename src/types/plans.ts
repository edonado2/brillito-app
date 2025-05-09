export type PlanType = 'small' | 'medium' | 'large' | 'business';

export interface CleaningPlan {
  id: string;
  type: PlanType;
  title: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  icon: string;
  recommended?: boolean;
}

export const cleaningPlans: CleaningPlan[] = [
  {
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
  {
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
  {
    id: 'large',
    type: 'large',
    title: 'Large Home',
    description: 'Comprehensive cleaning for large houses up to 3000 sq ft',
    price: 249,
    duration: '4-6 hours',
    features: [
      'Everything in Medium Home plan',
      'Deep cleaning of all rooms',
      'Detailed window cleaning',
      'Baseboard cleaning',
      'Closet organization',
      'Laundry room cleaning',
      'Garage cleaning'
    ],
    icon: 'home-group',
  },
  {
    id: 'business',
    type: 'business',
    title: 'Business',
    description: 'Professional cleaning for offices and commercial spaces',
    price: 299,
    duration: '4-8 hours',
    features: [
      'Complete office cleaning',
      'Reception area cleaning',
      'Conference room cleaning',
      'Restroom sanitization',
      'Kitchen/break room cleaning',
      'Floor care and maintenance',
      'Trash removal',
      'Custom cleaning schedule available'
    ],
    icon: 'office-building',
  },
]; 