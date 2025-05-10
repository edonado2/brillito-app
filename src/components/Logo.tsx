import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, textStyles } from '../theme';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
};

export const Logo = ({ size = 'medium', showText = true }: LogoProps) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { icon: 24, text: textStyles.titleMedium };
      case 'large':
        return { icon: 48, text: textStyles.displayMedium };
      default:
        return { icon: 32, text: textStyles.titleLarge };
    }
  };

  const { icon, text } = getSize();

  return (
    <View style={styles.container}>
      <View style={[styles.icon, { width: icon, height: icon }]}>
        <Text style={[styles.iconText, { fontSize: icon * 0.6 }]}>✨</Text>
      </View>
      {showText && (
        <Text style={[styles.text, text, { color: colors.primary }]}>
          Brillito
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: colors.surface,
  },
  text: {
    fontWeight: 'bold',
  },
}); 