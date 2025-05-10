import { MD3LightTheme } from 'react-native-paper';

// Color System
export const colors = {
  primary: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#FF4081',
    light: '#FF80AB',
    dark: '#F50057',
  },
  accent: '#FFC107',
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    card: '#FFFFFF',
    variant: '#E3F2FD',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E',
    inverse: '#FFFFFF',
  },
  border: '#E0E0E0',
  error: '#B00020',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
  bubble: '#E3F2FD',
  glow: '#2196F3',
  shadow: '#000000',
  utility: {
    shadow: '#000000',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    divider: '#E0E0E0',
  },
};

// Spacing System
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  layout: {
    section: {
      vertical: 24,
      horizontal: 16,
    },
    container: {
      padding: 16,
    },
    screen: {
      padding: 16,
      horizontal: 16,
    },
    card: {
      vertical: 16,
      horizontal: 16,
    },
  },
};

// Border Radius System
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

// Elevation System
export const elevation = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 16,
  xxl: 24,
};

// Typography System
export const typography = {
  fontFamily: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Text Styles System
export const textStyles = {
  displayLarge: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelLarge: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
};

// Create and export the theme
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.main,
    secondary: colors.secondary.main,
    error: colors.error,
    success: colors.success,
    background: colors.background.primary,
    surface: colors.surface.primary,
    text: colors.text.primary,
    onSurface: colors.text.primary,
    onSurfaceVariant: colors.text.secondary,
    onSurfaceDisabled: colors.text.disabled,
    surfaceDisabled: colors.text.disabled,
    backdrop: colors.utility.backdrop,
    elevation: {
      level0: 'transparent',
      level1: colors.surface.primary,
      level2: colors.surface.primary,
      level3: colors.surface.primary,
      level4: colors.surface.primary,
      level5: colors.surface.primary,
    },
  },
  roundness: borderRadius.md,
  dark: false,
  version: 3,
  isV3: true,
  fonts: {
    ...MD3LightTheme.fonts,
    labelMedium: {
      fontFamily: typography.fontFamily.medium,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
    },
  },
  animation: {
    scale: 1.0,
  },
};

export default theme;
