import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme, HelperText, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { CleaningPlan } from '../types/plans';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

export const BookingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { plan } = route.params;
  const theme = useTheme();
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [address, setAddress] = useState(user?.address || '');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleBooking = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual booking logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      navigation.navigate('BookingHistory');
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Surface style={styles.planSummary}>
            <View style={styles.planHeader}>
              <MaterialCommunityIcons
                name={plan.icon as any}
                size={32}
                color={theme.colors.primary}
              />
              <Text variant="titleLarge" style={styles.planTitle}>
                {plan.title}
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.planDescription}>
              {plan.description}
            </Text>
            <View style={styles.priceContainer}>
              <Text variant="headlineMedium" style={styles.price}>
                ${plan.price}
              </Text>
              <Text variant="bodySmall" style={styles.duration}>
                / {plan.duration}
              </Text>
            </View>
          </Surface>

          <View style={styles.form}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Schedule Your Cleaning
            </Text>

            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
            >
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color={theme.colors.primary}
                style={styles.buttonIcon}
              />
              {formatDate(date)}
            </Button>

            <Button
              mode="outlined"
              onPress={() => setShowTimePicker(true)}
              style={styles.dateButton}
            >
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color={theme.colors.primary}
                style={styles.buttonIcon}
              />
              {formatTime(time)}
            </Button>

            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={styles.input}
            />

            <TextInput
              label="Special Instructions (optional)"
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

            <Button
              mode="contained"
              onPress={handleBooking}
              loading={isLoading}
              disabled={isLoading}
              style={styles.bookButton}
            >
              Book Now
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  planSummary: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planTitle: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
  planDescription: {
    color: colors.text,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  duration: {
    color: colors.placeholder,
    marginLeft: 4,
  },
  form: {
    gap: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  input: {
    backgroundColor: colors.background,
  },
  bookButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
}); 