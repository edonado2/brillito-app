import { NavigatorScreenParams } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CleaningPlan } from './plans';

// Root Stack Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Services: NavigatorScreenParams<ServicesStackParamList>;
  Bookings: NavigatorScreenParams<BookingsStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// Home Stack Navigator
export type HomeStackParamList = {
  HomeMain: undefined;
  HomeServiceDetails: { serviceId: string };
  HomeBooking: { serviceId: string };
  HomeBookingConfirmation: { bookingId: string };
};

// Services Stack Navigator
export type ServicesStackParamList = {
  ServicesMain: undefined;
  ServicesDetails: { serviceId: string };
  ServicesBooking: { serviceId: string };
  ServicesBookingConfirmation: { bookingId: string };
};

// Bookings Stack Navigator
export type BookingsStackParamList = {
  BookingsMain: undefined;
  BookingsDetails: { bookingId: string };
};

// Profile Stack Navigator
export type ProfileStackParamList = {
  ProfileMain: undefined;
  ProfileEdit: undefined;
  ProfileSettings: undefined;
  ProfileNotifications: undefined;
  ProfileHelp: undefined;
};

// Drawer Navigator (using MainStackParamList as base)
export type MainDrawerParamList = HomeStackParamList & ServicesStackParamList & BookingsStackParamList & ProfileStackParamList & {
  Settings: undefined;
};

// Navigation prop types
export type DrawerNavigationProps = DrawerNavigationProp<HomeStackParamList | ServicesStackParamList | BookingsStackParamList | ProfileStackParamList>;

// Helper type for nested navigation
export type NestedDrawerNavigationProps = {
  navigation: DrawerNavigationProps;
}; 