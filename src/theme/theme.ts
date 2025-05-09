import { MD3LightTheme, configureFonts } from 'react-native-paper';

// Color palette
export const colors = {
  primary: '#4A90E2', // Professional blue
  secondary: '#50C878', // Emerald green
  accent: '#FFB74D', // Warm orange
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#2C3E50',
  error: '#E57373',
  success: '#81C784',
  warning: '#FFB74D',
  info: '#64B5F6',
  disabled: '#BDBDBD',
  placeholder: '#9E9E9E',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

// Typography configuration
const fontConfig = {
  fontFamily: 'System',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

export type AppTheme = typeof theme; 