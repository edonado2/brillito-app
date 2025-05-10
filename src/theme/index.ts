import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#FF4B91',
  secondary: '#FF8DC7',
  surface: '#FFFFFF',
  background: '#F8F9FA',
  error: '#FF4B4B',
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    disabled: '#999999',
  },
  outline: '#E0E0E0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const textStyles = StyleSheet.create({
  displayLarge: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  displayMedium: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  displaySmall: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  titleLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
  },
  labelLarge: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 14,
  },
}); 