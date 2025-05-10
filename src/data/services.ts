import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  price: number;
  duration: string;
  features: string[];
  category: 'home' | 'business' | 'construction';
  type: 'basic' | 'standard' | 'deep';
}

export const services: Service[] = [
  // Home Basic Cleaning
  {
    id: 'home-basic',
    title: 'Limpieza Básica',
    description: 'Limpieza general de tu hogar incluyendo áreas comunes, baños y cocina.',
    icon: 'broom',
    price: 35,
    duration: '3 horas',
    features: [
      'Limpieza de pisos y superficies',
      'Limpieza de baños',
      'Limpieza básica de cocina',
      'Limpieza de áreas comunes',
      'Organización básica'
    ],
    category: 'home',
    type: 'basic'
  },
  // Home Standard Cleaning
  {
    id: 'home-standard',
    title: 'Limpieza Estándar',
    description: 'Limpieza profunda de tu hogar con atención a detalles y áreas específicas.',
    icon: 'broom',
    price: 50,
    duration: '4 horas',
    features: [
      'Todo lo incluido en la limpieza básica',
      'Limpieza de electrodomésticos',
      'Limpieza de ventanas',
      'Limpieza de muebles',
      'Organización detallada'
    ],
    category: 'home',
    type: 'standard'
  },
  // Home Deep Cleaning
  {
    id: 'home-deep',
    title: 'Limpieza Profunda',
    description: 'Limpieza exhaustiva de tu hogar con atención a cada detalle y área.',
    icon: 'broom',
    price: 75,
    duration: '6 horas',
    features: [
      'Todo lo incluido en la limpieza estándar',
      'Limpieza de cortinas y persianas',
      'Limpieza de gabinetes y closets',
      'Limpieza de áreas de difícil acceso',
      'Organización completa'
    ],
    category: 'home',
    type: 'deep'
  },
  // Business Basic Cleaning
  {
    id: 'business-basic',
    title: 'Limpieza Comercial Básica',
    description: 'Limpieza general para oficinas y espacios comerciales pequeños.',
    icon: 'office-building',
    price: 45,
    duration: '3 horas',
    features: [
      'Limpieza de áreas de trabajo',
      'Limpieza de baños',
      'Limpieza de áreas comunes',
      'Limpieza de pisos',
      'Recolección de basura'
    ],
    category: 'business',
    type: 'basic'
  },
  // Business Standard Cleaning
  {
    id: 'business-standard',
    title: 'Limpieza Comercial Estándar',
    description: 'Limpieza completa para oficinas y espacios comerciales medianos.',
    icon: 'office-building',
    price: 65,
    duration: '4 horas',
    features: [
      'Todo lo incluido en la limpieza básica',
      'Limpieza de ventanas',
      'Limpieza de muebles de oficina',
      'Limpieza de equipos',
      'Organización de espacios'
    ],
    category: 'business',
    type: 'standard'
  },
  // Business Deep Cleaning
  {
    id: 'business-deep',
    title: 'Limpieza Comercial Profunda',
    description: 'Limpieza exhaustiva para oficinas y espacios comerciales grandes.',
    icon: 'office-building',
    price: 95,
    duration: '6 horas',
    features: [
      'Todo lo incluido en la limpieza estándar',
      'Limpieza de áreas de almacenamiento',
      'Limpieza de equipos especializados',
      'Limpieza de áreas de difícil acceso',
      'Organización completa'
    ],
    category: 'business',
    type: 'deep'
  },
  // Post Construction Basic Cleaning
  {
    id: 'construction-basic',
    title: 'Limpieza Post-Obra Básica',
    description: 'Limpieza inicial después de trabajos de construcción o remodelación.',
    icon: 'hard-hat',
    price: 55,
    duration: '4 horas',
    features: [
      'Eliminación de escombros',
      'Limpieza de polvo y residuos',
      'Limpieza de pisos',
      'Limpieza de superficies',
      'Recolección de materiales'
    ],
    category: 'construction',
    type: 'basic'
  },
  // Post Construction Standard Cleaning
  {
    id: 'construction-standard',
    title: 'Limpieza Post-Obra Estándar',
    description: 'Limpieza completa después de trabajos de construcción o remodelación.',
    icon: 'hard-hat',
    price: 85,
    duration: '6 horas',
    features: [
      'Todo lo incluido en la limpieza básica',
      'Limpieza de ventanas',
      'Limpieza de gabinetes',
      'Limpieza de electrodomésticos',
      'Limpieza de áreas específicas'
    ],
    category: 'construction',
    type: 'standard'
  },
  // Post Construction Deep Cleaning
  {
    id: 'construction-deep',
    title: 'Limpieza Post-Obra Profunda',
    description: 'Limpieza exhaustiva y detallada después de trabajos de construcción.',
    icon: 'hard-hat',
    price: 120,
    duration: '8 horas',
    features: [
      'Todo lo incluido en la limpieza estándar',
      'Limpieza de sistemas de ventilación',
      'Limpieza de áreas técnicas',
      'Limpieza de áreas de difícil acceso',
      'Inspección final'
    ],
    category: 'construction',
    type: 'deep'
  }
]; 