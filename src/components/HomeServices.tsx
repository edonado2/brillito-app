import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, HomeStackParamList } from '../types/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import { services } from '../data/services';

type HomeServicesNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<MainTabParamList, 'HomeStack'>
>;

type Props = {
  navigation: HomeServicesNavigationProp;
};

export const HomeServices: React.FC<Props> = ({ navigation }) => {
  const handleServicePress = (service: typeof services[0]) => {
    navigation.navigate('HomeServiceDetails', {
      serviceId: service.id,
      serviceName: service.title
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Services</Text>
        <TouchableOpacity 
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('ServicesStack')}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <MaterialCommunityIcons name="chevron-right" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.card}
            onPress={() => handleServicePress(service)}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <View style={styles.serviceIconContainer}>
                <MaterialCommunityIcons name={service.icon} size={32} color={colors.primary} />
              </View>
              <Text style={styles.serviceName}>{service.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {service.description}
              </Text>
              <View style={styles.footer}>
                <Text style={styles.duration}>{service.duration}</Text>
                <Text style={styles.price}>${service.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    width: 300,
    backgroundColor: colors.surface,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: colors.text.secondary,
    marginBottom: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 15,
    color: colors.text.secondary,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
}); 