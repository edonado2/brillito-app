import React from 'react';
import { StyleSheet, ScrollView, View, Platform, TouchableOpacity } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { colors, spacing, borderRadius, elevation, textStyles } from '../theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { services, Service } from '../data/services';
import type { NavigationProp } from '@react-navigation/native';
import { MainTabParamList } from '../types/navigation';

type Props = {
  navigation: NavigationProp<MainTabParamList>;
};

export const HomeServices: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const featuredServices = services;

  const handleServicePress = (service: Service) => {
    navigation.navigate('Home', {
      screen: 'HomeServiceDetails',
      params: { serviceId: service.id }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Servicios Populares</Text>
        <Text style={styles.subtitle}>Descubre nuestros servicios más solicitados</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {featuredServices.map(service => (
          <TouchableOpacity
            key={service.id}
            onPress={() => handleServicePress(service)}
            activeOpacity={0.7}
          >
            <Surface style={styles.serviceCard}>
              <View style={styles.serviceIconContainer}>
                <MaterialCommunityIcons
                  name={service.icon}
                  size={32}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription} numberOfLines={2}>
                {service.description}
              </Text>
              <View style={styles.serviceFooter}>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
                <Text style={styles.servicePrice}>${service.price}</Text>
              </View>
            </Surface>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  serviceCard: {
    width: 280,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.utility.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: elevation.md,
      },
    }),
  },
  serviceIconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  serviceTitle: {
    ...textStyles.titleMedium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceDuration: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  servicePrice: {
    ...textStyles.titleMedium,
    color: colors.primary.main,
  },
}); 