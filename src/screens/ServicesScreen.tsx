import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Platform, TouchableOpacity } from 'react-native';
import { Text, Surface, Chip, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, elevation, textStyles } from '../theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { services, Service } from '../data/services';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ServicesStackParamList, 'ServicesMain'>;

type Category = 'home' | 'business' | 'construction';

export const ServicesScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category>('home');

  const categories = [
    { id: 'home', label: 'Hogar', icon: 'home' },
    { id: 'business', label: 'Comercial', icon: 'office-building' },
    { id: 'construction', label: 'Post-Obra', icon: 'hard-hat' },
  ];

  const filteredServices = services.filter(service => service.category === selectedCategory);

  const handleServicePress = (service: Service) => {
    navigation.navigate('ServicesDetails', { serviceId: service.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Nuestros Servicios</Text>
          <Text style={styles.subtitle}>Selecciona el tipo de limpieza que necesitas</Text>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map(category => (
            <Chip
              key={category.id}
              selected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id as Category)}
              style={styles.categoryChip}
              icon={({ size, color }) => (
                <MaterialCommunityIcons name={category.icon as any} size={size} color={color} />
              )}
            >
              {category.label}
            </Chip>
          ))}
        </View>

        <View style={styles.servicesContainer}>
          {filteredServices.map(service => (
            <TouchableOpacity
              key={service.id}
              onPress={() => handleServicePress(service)}
              activeOpacity={0.7}
            >
              <Surface style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <MaterialCommunityIcons
                    name={service.icon}
                    size={32}
                    color={theme.colors.primary}
                  />
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.serviceDuration}>{service.duration}</Text>
                  </View>
                  <Text style={styles.servicePrice}>${service.price}</Text>
                </View>

                <Text style={styles.serviceDescription}>{service.description}</Text>

                <View style={styles.featuresContainer}>
                  {service.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color={theme.colors.secondary}
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </Surface>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary.main,
  },
  title: {
    ...textStyles.headlineLarge,
    color: colors.primary.contrast,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...textStyles.bodyLarge,
    color: colors.primary.contrast,
    opacity: 0.9,
  },
  categoriesContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  categoryChip: {
    marginRight: spacing.sm,
  },
  servicesContainer: {
    padding: spacing.md,
  },
  serviceCard: {
    marginBottom: spacing.md,
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
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  serviceTitle: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
  },
  serviceDuration: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  servicePrice: {
    ...textStyles.titleLarge,
    color: colors.primary.main,
  },
  serviceDescription: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  featuresContainer: {
    gap: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
}); 