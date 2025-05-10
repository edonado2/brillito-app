import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, Surface, Text, Appbar } from 'react-native-paper';
import { colors, spacing, borderRadius, elevation, typography, textStyles } from '../theme/theme';
import { Logo } from '../components/Logo';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

// Screens
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

// Types
import { MainTabParamList, HomeStackParamList, ServicesStackParamList, BookingsStackParamList, ProfileStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ServicesStack = createNativeStackNavigator<ServicesStackParamList>();
const BookingsStack = createNativeStackNavigator<BookingsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const CustomHeader = ({ navigation, route, options, back }: any) => {
  const showBackButton = back !== undefined;
  const showLogo = !showBackButton;

  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.headerLeft}>
        {showBackButton ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : showLogo && (
          <View style={styles.logoContainer}>
            <Logo size="small" showText={true} />
          </View>
        )}
      </View>

      {!showLogo && (
        <Appbar.Content 
          title={options.title || route.name}
          titleStyle={[
            textStyles.titleLarge,
            { color: colors.text.primary }
          ]}
        />
      )}

      <View style={styles.headerRight}>
        {route.name === 'HomeMain' && (
          <Appbar.Action 
            icon="bell-outline" 
            onPress={() => navigation.navigate('Notifications')}
            style={styles.headerAction}
          />
        )}
        <Appbar.Action 
          icon="account" 
          onPress={() => navigation.navigate('ProfileMain')}
          style={styles.headerAction}
        />
      </View>
    </Appbar.Header>
  );
};

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
        name="HomeMain" 
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <HomeStack.Screen 
        name="HomeServiceDetails" 
        component={HomeServiceDetailsScreen}
        options={{ title: 'Detalles del Servicio' }}
      />
      <HomeStack.Screen 
        name="HomeBooking" 
        component={BookingScreen}
        options={{ title: 'Nueva Reserva' }}
      />
      <HomeStack.Screen 
        name="HomeBookingConfirmation" 
        component={BookingConfirmationScreen}
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
        name="ServicesMain" 
        component={ServicesScreen}
        options={{ title: 'Servicios' }}
      />
      <ServicesStack.Screen 
        name="ServicesDetails" 
        component={ServiceDetailsScreen}
        options={{ title: 'Detalles del Servicio' }}
      />
      <ServicesStack.Screen 
        name="ServicesBooking" 
        component={BookingScreen}
        options={{ title: 'Nueva Reserva' }}
      />
      <ServicesStack.Screen 
        name="ServicesBookingConfirmation" 
        component={BookingConfirmationScreen}
        options={{ title: 'Confirmación' }}
      />
    </ServicesStack.Navigator>
  );
};

const BookingsStackNavigator = () => (
  <BookingsStack.Navigator
    screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}
  >
    <BookingsStack.Screen 
      name="BookingsMain" 
      component={BookingsScreen}
      options={{ title: 'Reservas' }}
    />
    <BookingsStack.Screen 
      name="BookingsDetails" 
      component={BookingDetailsScreen}
      options={{ title: 'Detalles de la Reserva' }}
    />
  </BookingsStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}
  >
    <ProfileStack.Screen 
      name="ProfileMain" 
      component={ProfileScreen}
      options={{ title: 'Perfil' }}
    />
    <ProfileStack.Screen 
      name="ProfileEdit" 
      component={EditProfileScreen}
      options={{ title: 'Editar Perfil' }}
    />
    <ProfileStack.Screen 
      name="ProfileSettings" 
      component={SettingsScreen}
      options={{ title: 'Configuración' }}
    />
    <ProfileStack.Screen 
      name="ProfileNotifications" 
      component={NotificationsScreen}
      options={{ title: 'Notificaciones' }}
    />
    <ProfileStack.Screen 
      name="ProfileHelp" 
      component={HelpScreen}
      options={{ title: 'Ayuda' }}
    />
  </ProfileStack.Navigator>
);

export const MainNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface.primary,
          height: 72,
          paddingBottom: spacing.sm,
          paddingTop: spacing.sm,
          paddingHorizontal: spacing.md,
          marginHorizontal: spacing.md,
          marginBottom: spacing.md,
          borderRadius: borderRadius.lg,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: colors.utility.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: theme.fonts.labelMedium.fontFamily,
          marginTop: spacing.xs,
        },
        tabBarItemStyle: {
          height: 48,
          paddingVertical: spacing.xs,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesStackNavigator}
        options={{
          tabBarLabel: 'Servicios',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="broom" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsStackNavigator}
        options={{
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
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