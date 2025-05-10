import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, textStyles } from '../theme/theme';
import { Logo } from '../components/Logo';

export const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Logo size="large" showText={true} />
        <Text style={styles.subtitle}>Tu limpieza, nuestra pasión</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...textStyles.headlineLarge,
    color: colors.text.primary,
    marginTop: 16,
  },
  subtitle: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
    marginTop: 8,
  },
}); 