import { CleaningPlan } from './plans';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Booking: { plan: CleaningPlan };
  BookingHistory: undefined;
  Profile: undefined;
}; 