import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, Surface, Text, Appbar } from 'react-native-paper';
import { colors, spacing, borderRadius, elevation, typography, textStyles } from '../theme/theme';
import { Logo } from '../components/Logo';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { BookingConfirmationScreen } from '../screens/BookingConfirmationScreen';
import { ServiceDetailsScreen, HomeServiceDetailsScreen } from '../screens/ServiceDetailsScreen';
import { BookingDetailsScreen } from '../screens/BookingDetailsScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { BookingsScreen } from '../screens/BookingsScreen';
import { HomeStackParamList, ServicesStackParamList, BookingsStackParamList, ProfileStackParamList, HomeStackScreenProps, ServicesStackScreenProps, BookingsStackScreenProps, ProfileStackScreenProps } from '../types/navigation';
import { CustomHeader } from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenProps } from '../types/navigation';
import { ScreenComponentType } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ServicesStack = createNativeStackNavigator<ServicesStackParamList>();
const BookingsStack = createNativeStackNavigator<BookingsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const HomeStackNavigator = () => {
  const theme = useTheme();
  
  return (
    <HomeStack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        animation: 'slide_from_right',
      }}
    >
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen as ScreenComponentType<'Home'>}
        options={{ title: 'Inicio' }}
      />
      <HomeStack.Screen 
        name="HomeServiceDetails" 
        component={HomeServiceDetailsScreen as ScreenComponentType<'HomeServiceDetails'>}
        options={{ title: 'Detalles del Servicio' }}
      />
      <HomeStack.Screen 
        name="HomeBooking" 
        component={BookingScreen as ScreenComponentType<'HomeBooking'>}
        options={{ title: 'Nueva Reserva' }}
      />
      <HomeStack.Screen 
        name="HomeBookingConfirmation" 
        component={BookingConfirmationScreen as ScreenComponentType<'HomeBookingConfirmation'>}
        options={{ title: 'Confirmación' }}
      />
    </HomeStack.Navigator>
  );
};

const ServicesStackNavigator = () => {
  const theme = useTheme();
  
  return (
    <ServicesStack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        animation: 'slide_from_right',
      }}
    >
      <ServicesStack.Screen 
        name="Services" 
        component={ServicesScreen as ScreenComponentType<'Services'>}
        options={{ title: 'Servicios' }}
      />
      <ServicesStack.Screen 
        name="ServicesDetails" 
        component={ServiceDetailsScreen as ScreenComponentType<'ServicesDetails'>}
        options={{ title: 'Detalles del Servicio' }}
      />
      <ServicesStack.Screen 
        name="ServicesBooking" 
        component={BookingScreen as ScreenComponentType<'ServicesBooking'>}
        options={{ title: 'Nueva Reserva' }}
      />
      <ServicesStack.Screen 
        name="ServicesBookingConfirmation" 
        component={BookingConfirmationScreen as ScreenComponentType<'ServicesBookingConfirmation'>}
        options={{ title: 'Confirmación' }}
      />
    </ServicesStack.Navigator>
  );
};

const BookingsStackNavigator = () => {
  const theme = useTheme();
  
  return (
    <BookingsStack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        animation: 'slide_from_right',
      }}
    >
      <BookingsStack.Screen 
        name="Bookings" 
        component={BookingsScreen as ScreenComponentType<'Bookings'>}
        options={{ title: 'Mis Reservas' }}
      />
      <BookingsStack.Screen 
        name="BookingsDetails" 
        component={BookingDetailsScreen as ScreenComponentType<'BookingsDetails'>}
        options={{ title: 'Detalles de la Reserva' }}
      />
    </BookingsStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  const theme = useTheme();
  
  return (
    <ProfileStack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        animation: 'slide_from_right',
      }}
    >
      <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen as ScreenComponentType<'Profile'>}
        options={{ title: 'Mi Perfil' }}
      />
      <ProfileStack.Screen 
        name="ProfileEdit" 
        component={EditProfileScreen as ScreenComponentType<'ProfileEdit'>}
        options={{ title: 'Editar Perfil' }}
      />
      <ProfileStack.Screen 
        name="ProfileSettings" 
        component={SettingsScreen as ScreenComponentType<'ProfileSettings'>}
        options={{ title: 'Configuración' }}
      />
      <ProfileStack.Screen 
        name="ProfileNotifications" 
        component={NotificationsScreen as ScreenComponentType<'ProfileNotifications'>}
        options={{ title: 'Notificaciones' }}
      />
      <ProfileStack.Screen 
        name="ProfileHelp" 
        component={HelpScreen as ScreenComponentType<'ProfileHelp'>}
        options={{ title: 'Ayuda' }}
      />
    </ProfileStack.Navigator>
  );
};

export const MainNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ServicesStack"
        component={ServicesStackNavigator}
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color, size }) => (
            <Icon name="broom-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BookingsStack"
        component={BookingsStackNavigator}
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 64,
    elevation: 0,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerAction: {
    margin: 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
}); 