export type PlanType = 'basic' | 'standard' | 'premium' | 'business';

export interface CleaningPlan {
  id: string;
  type: PlanType;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  recommended?: boolean;
  icon: string;
}

export const cleaningPlans: CleaningPlan[] = [
  {
    id: 'basic',
    type: 'basic',
    name: 'Limpieza Básica',
    price: 25,
    duration: '1-2 horas',
    description: 'Ideal para apartamentos pequeños y estudios',
    features: [
      'Limpieza general de superficies',
      'Limpieza de baños',
      'Limpieza de cocina básica',
      'Barrido y trapeado de pisos',
      'Organización básica',
    ],
    icon: 'broom',
  },
  {
    id: 'standard',
    type: 'standard',
    name: 'Limpieza Estándar',
    price: 45,
    duration: '2-3 horas',
    description: 'Perfecta para casas medianas y familias',
    features: [
      'Todo lo incluido en Básica',
      'Limpieza profunda de cocina',
      'Limpieza de electrodomésticos',
      'Limpieza de ventanas interiores',
      'Organización de espacios',
      'Limpieza de closets',
    ],
    recommended: true,
    icon: 'broom',
  },
  {
    id: 'premium',
    type: 'premium',
    name: 'Limpieza Premium',
    price: 75,
    duration: '3-4 horas',
    description: 'Para casas grandes que necesitan atención especial',
    features: [
      'Todo lo incluido en Estándar',
      'Limpieza profunda de baños',
      'Limpieza de muebles',
      'Limpieza de alfombras',
      'Limpieza de ventanas exteriores',
      'Organización completa',
      'Limpieza de áreas exteriores',
    ],
    icon: 'broom',
  },
  {
    id: 'business',
    type: 'business',
    name: 'Limpieza Empresarial',
    price: 100,
    duration: '4-6 horas',
    description: 'Servicio completo para espacios comerciales',
    features: [
      'Todo lo incluido en Premium',
      'Limpieza de oficinas',
      'Limpieza de áreas comunes',
      'Limpieza de equipos',
      'Manejo de residuos',
      'Servicio personalizado',
      'Horario flexible',
    ],
    icon: 'office-building',
  },
]; 