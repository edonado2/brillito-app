import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Text,
  Button,
  Surface,
  TextInput,
  useTheme,
  Portal,
  Dialog,
  IconButton,
  Chip,
  Divider,
  HelperText,
  SegmentedButtons,
  Modal,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, borderRadius, elevation, textStyles, typography } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';
import { AppHeader } from '../components/AppHeader';
import { Calendar } from 'react-native-calendars';

type Props = NativeStackScreenProps<HomeStackParamList, 'Booking'>;

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

export const BookingScreen: React.FC<Props> = ({ route, navigation }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { serviceId, serviceName } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTimeModal, setShowTimeModal] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowTimeModal(true);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowTimeModal(false);
  };

  const handleBooking = () => {
    // TODO: Implement booking logic
    const bookingId = '123'; // Replace with actual booking ID
    navigation.navigate('BookingConfirmation', {
      bookingId,
      serviceName,
      date: selectedDate,
      time: selectedTime,
      address,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedTime) {
      newErrors.time = 'Por favor selecciona una hora';
    }
    if (!address.trim()) {
      newErrors.address = 'Por favor ingresa una dirección';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = () => {
    setShowConfirmation(false);
    // Handle booking submission
    navigation.navigate('BookingConfirmation', {
      bookingId: '123', // Replace with actual booking ID
      serviceName: serviceName,
      date: selectedDate,
      time: selectedTime,
      address,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <AppHeader title="Reservar Servicio" />
        <ScrollView style={styles.scrollView} bounces={false}>
          <View style={styles.content}>
            <Surface style={styles.serviceCard}>
              <Text style={[textStyles.titleLarge, styles.serviceName]}>
                {serviceName}
              </Text>
              <Text style={[textStyles.bodyMedium, styles.serviceDescription]}>
                Selecciona la fecha y hora que mejor te convenga para tu servicio de limpieza.
              </Text>
            </Surface>

            <Surface style={styles.formCard}>
              <Text style={[textStyles.titleMedium, styles.sectionTitle]}>
                Fecha
              </Text>
              <Calendar
                onDayPress={(day) => handleDateSelect(day.dateString)}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: colors.primary.main,
                  },
                }}
                minDate={new Date().toISOString().split('T')[0]}
                theme={{
                  calendarBackground: colors.surface.primary,
                  textSectionTitleColor: colors.text.primary,
                  selectedDayBackgroundColor: colors.primary.main,
                  selectedDayTextColor: colors.primary.contrast,
                  todayTextColor: colors.primary.main,
                  dayTextColor: colors.text.primary,
                  textDisabledColor: colors.text.disabled,
                  dotColor: colors.primary.main,
                  selectedDotColor: colors.primary.contrast,
                  arrowColor: colors.primary.main,
                  monthTextColor: colors.text.primary,
                  indicatorColor: colors.primary.main,
                }}
              />

              <Text style={[textStyles.titleMedium, styles.sectionTitle]}>
                Hora
              </Text>
              <View style={styles.timeSlotsContainer}>
                {TIME_SLOTS.map((time) => (
                  <Chip
                    key={time}
                    selected={selectedTime === time}
                    onPress={() => handleTimeSelect(time)}
                    style={styles.timeChip}
                    textStyle={[
                      styles.timeChipText,
                      selectedTime === time && styles.timeChipTextSelected,
                    ]}
                  >
                    {time}
                  </Chip>
                ))}
              </View>

              <Text style={[textStyles.titleMedium, styles.sectionTitle]}>
                Dirección
              </Text>
              <TextInput
                mode="outlined"
                label="Ingresa la dirección del servicio"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
                multiline
                numberOfLines={3}
              />

              <Text style={[textStyles.titleMedium, styles.sectionTitle]}>
                Notas Adicionales
              </Text>
              <TextInput
                mode="outlined"
                label="Agrega notas o instrucciones especiales"
                value={notes}
                onChangeText={setNotes}
                style={styles.input}
                multiline
                numberOfLines={4}
              />
            </Surface>

            <Button
              mode="contained"
              onPress={handleBooking}
              style={styles.bookButton}
              contentStyle={styles.bookButtonContent}
            >
              Reservar Ahora
            </Button>
          </View>
        </ScrollView>

        {/* Confirmation Dialog */}
        <Portal>
          <Dialog
            visible={showConfirmation}
            onDismiss={() => setShowConfirmation(false)}
            style={styles.dialog}
          >
            <Dialog.Title style={[textStyles.headlineMedium, styles.dialogTitle]}>
              Confirmar Reserva
            </Dialog.Title>
            <Dialog.Content>
              <Text style={[textStyles.bodyLarge, styles.dialogText]}>
                ¿Estás seguro que deseas confirmar tu reserva para el servicio de {serviceName}?
              </Text>
              <View style={styles.dialogSummary}>
                <Text style={[textStyles.bodyMedium, styles.dialogSummaryText]}>
                  {selectedDate} a las {selectedTime}
                </Text>
                <Text style={[textStyles.displayMedium, styles.dialogPrice]}>
                  ${serviceName}
                </Text>
              </View>
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogActions}>
              <Button
                onPress={() => setShowConfirmation(false)}
                textColor={colors.text.secondary}
                style={styles.dialogButton}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={handleConfirmBooking}
                buttonColor={colors.primary.main}
                textColor={colors.primary.contrast}
                style={styles.dialogButton}
              >
                Confirmar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {selectedDate && (
          <Surface style={styles.selectedDateTime}>
            <Text style={styles.sectionTitle}>
              Horario seleccionado
            </Text>
            <View style={styles.selectedDateTime}>
              <View style={styles.dateTimeItem}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={24}
                  color={colors.primary.main}
                />
                <Text style={styles.dateTimeText}>
                  {new Date(selectedDate).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              {selectedTime && (
                <View style={styles.dateTimeItem}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={24}
                    color={colors.primary.main}
                  />
                  <Text style={styles.dateTimeText}>
                    {selectedTime}
                  </Text>
                </View>
              )}
            </View>
          </Surface>
        )}

        <Portal>
          <Modal
            visible={showTimeModal}
            onDismiss={() => setShowTimeModal(false)}
            contentContainerStyle={styles.timeModal}
          >
            <Text style={styles.modalTitle}>
              Selecciona un horario
            </Text>
            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((time) => (
                <Chip
                  key={time}
                  selected={selectedTime === time}
                  onPress={() => handleTimeSelect(time)}
                  style={styles.timeChip}
                  selectedColor={colors.primary.main}
                >
                  {time}
                </Chip>
              ))}
            </View>
          </Modal>
        </Portal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.layout.screen.horizontal,
  },
  serviceCard: {
    padding: spacing.layout.card.vertical,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.card,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: elevation.md,
      },
    }),
  },
  serviceName: {
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    color: colors.text.secondary,
  },
  formCard: {
    padding: spacing.layout.card.vertical,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.card,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: elevation.md,
      },
    }),
  },
  sectionTitle: {
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.background.primary,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  timeChip: {
    backgroundColor: colors.background.secondary,
  },
  timeChipText: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  timeChipTextSelected: {
    color: colors.primary.main,
  },
  bookButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  bookButtonContent: {
    paddingVertical: spacing.sm,
  },
  dialog: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.modal,
    margin: spacing.xl,
  },
  dialogTitle: {
    color: colors.text.primary,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  dialogText: {
    color: colors.text.primary,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  dialogSummary: {
    backgroundColor: colors.surface.secondary,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginHorizontal: spacing.xl,
  },
  dialogSummaryText: {
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  dialogPrice: {
    color: colors.primary.main,
  },
  dialogActions: {
    padding: spacing.lg,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.utility.divider,
  },
  dialogButton: {
    minWidth: 120,
    marginHorizontal: spacing.xs,
  },
  selectedDateTime: {
    gap: spacing.sm,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dateTimeText: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
  },
  timeModal: {
    backgroundColor: colors.surface.primary,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  modalTitle: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.surface.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  confirmButton: {
    borderRadius: borderRadius.md,
  },
}); 