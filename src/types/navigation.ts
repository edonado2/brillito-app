import { NavigatorScreenParams } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CleaningPlan } from './plans';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Root Stack Navigator
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  HomeStack: undefined;
  ServicesStack: undefined;
  BookingsStack: undefined;
  ProfileStack: undefined;
};

// Home Stack Navigator
export type HomeStackParamList = {
  Home: undefined;
  HomeServiceDetails: {
    serviceId: string;
    serviceName: string;
  };
  HomeBooking: {
    serviceId: string;
    serviceName: string;
    selectedDate: string;
    selectedTime: string;
  };
  HomeBookingConfirmation: {
    serviceId: string;
    serviceName: string;
    selectedDate: string;
    selectedTime: string;
    address: string;
  };
};

// Services Stack Navigator
export type ServicesStackParamList = {
  Services: undefined;
  ServicesDetails: {
    serviceId: string;
    serviceName: string;
  };
  ServicesBooking: {
    serviceId: string;
    serviceName: string;
    selectedDate: string;
    selectedTime: string;
  };
  ServicesBookingConfirmation: {
    serviceId: string;
    serviceName: string;
    selectedDate: string;
    selectedTime: string;
    address: string;
  };
};

// Bookings Stack Navigator
export type BookingsStackParamList = {
  Bookings: undefined;
  BookingsDetails: {
    bookingId: string;
  };
};

// Profile Stack Navigator
export type ProfileStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
  ProfileSettings: undefined;
  ProfileNotifications: undefined;
};

// Drawer Navigator
export type MainDrawerParamList = HomeStackParamList & ServicesStackParamList & BookingsStackParamList & ProfileStackParamList & {
  Settings: undefined;
};

// Navigation prop types
export type DrawerNavigationProps = DrawerNavigationProp<HomeStackParamList | ServicesStackParamList | BookingsStackParamList | ProfileStackParamList>;

// Helper type for nested navigation
export type NestedDrawerNavigationProps = {
  navigation: DrawerNavigationProps;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

export type ServicesStackScreenProps<T extends keyof ServicesStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ServicesStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

export type BookingsStackScreenProps<T extends keyof BookingsStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

export type ScreenProps = 
  | RootStackScreenProps<keyof RootStackParamList>
  | MainTabScreenProps<keyof MainTabParamList>
  | HomeStackScreenProps<keyof HomeStackParamList>
  | ServicesStackScreenProps<keyof ServicesStackParamList>
  | BookingsStackScreenProps<keyof BookingsStackParamList>
  | ProfileStackScreenProps<keyof ProfileStackParamList>;

export type ScreenComponentType<T extends keyof (RootStackParamList | MainTabParamList | HomeStackParamList | ServicesStackParamList | BookingsStackParamList | ProfileStackParamList)> = 
  React.ComponentType<ScreenProps>; 