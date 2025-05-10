import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
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
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, borderRadius, elevation, textStyles, typography } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';
import { AppHeader } from '../components/AppHeader';
import { Calendar } from 'react-native-calendars';

type Props = NativeStackScreenProps<ServicesStackParamList, 'ServicesBooking'>;

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
    if (validateForm()) {
      setShowConfirmation(true);
    }
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
    navigation.navigate('ServicesBookingConfirmation', {
      bookingId: '123', // Replace with actual booking ID
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
              <TouchableOpacity 
                style={styles.timeSelector}
                onPress={() => setShowTimeModal(true)}
              >
                <Text>{selectedTime || 'Seleccionar hora'}</Text>
              </TouchableOpacity>
              {errors.time && (
                <Text style={styles.errorText}>{errors.time}</Text>
              )}

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
                error={!!errors.address}
              />
              {errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}

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
              Confirmar Reserva
            </Button>
          </View>
        </ScrollView>

        <Modal
          visible={showTimeModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowTimeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.timeModal}>
              <Text style={styles.modalTitle}>Seleccionar Hora</Text>
              <View style={styles.timeGrid}>
                {TIME_SLOTS.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeChip,
                      selectedTime === time && styles.selectedTimeChip
                    ]}
                    onPress={() => handleTimeSelect(time)}
                  >
                    <Text style={[
                      styles.timeChipText,
                      selectedTime === time && styles.selectedTimeChipText
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button
                mode="contained"
                onPress={() => setShowTimeModal(false)}
                style={styles.modalButton}
              >
                Cerrar
              </Button>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showConfirmation}
          transparent
          animationType="fade"
          onRequestClose={() => setShowConfirmation(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.confirmationModal}>
              <Text style={styles.modalTitle}>Confirmar Reserva</Text>
              <Text style={styles.confirmationText}>
                ¿Estás seguro de que deseas reservar este servicio?
              </Text>
              <View style={styles.modalButtons}>
                <Button
                  mode="outlined"
                  onPress={() => setShowConfirmation(false)}
                  style={styles.modalButton}
                >
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={handleConfirmBooking}
                  style={styles.modalButton}
                >
                  Confirmar
                </Button>
              </View>
            </View>
          </View>
        </Modal>

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
  timeSelector: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    backgroundColor: colors.surface.primary,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  timeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedTimeChip: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  timeChipText: {
    color: colors.text.primary,
  },
  selectedTimeChipText: {
    color: colors.surface.primary,
  },
  bookButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  bookButtonContent: {
    paddingVertical: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeModal: {
    backgroundColor: colors.surface.primary,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    width: '90%',
  },
  confirmationModal: {
    backgroundColor: colors.surface.primary,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: spacing.lg,
    color: colors.text.primary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  modalButton: {
    minWidth: 100,
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
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
}); 