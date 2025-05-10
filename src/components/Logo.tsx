import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { colors, typography, spacing } from '../theme/theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  color = colors.primary.main,
  showText = true,
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return typography.fontSize.lg;
      case 'large':
        return typography.fontSize.xxxl;
      default:
        return typography.fontSize.xxl;
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="broom"
        size={getIconSize()}
        color={color}
        style={styles.icon}
      />
      {showText && (
        <Text
          style={[
            styles.text,
            {
              fontSize: getTextSize(),
              color,
            },
          ]}
        >
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
    gap: spacing.xs,
  },
  icon: {
    ...Platform.select({
      ios: {
        shadowColor: colors.utility.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  text: {
    fontFamily: typography.fontFamily.bold,
    letterSpacing: -0.5,
    ...Platform.select({
      ios: {
        shadowColor: colors.utility.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
}); 