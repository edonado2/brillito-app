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
import { ServicesStackParamList, HomeStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';
import { AppHeader } from '../components/AppHeader';
import { Calendar } from 'react-native-calendars';

type ServicesProps = NativeStackScreenProps<ServicesStackParamList, 'ServicesBooking'>;
type HomeProps = NativeStackScreenProps<HomeStackParamList, 'HomeBooking'>;
type Props = ServicesProps | HomeProps;

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

export const BookingScreen: React.FC<Props> = ({ route, navigation }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const isServicesStack = 'ServicesBookingConfirmation' in navigation;
  const { serviceId, selectedDate, selectedTime } = route.params;
  const serviceName = isServicesStack ? (route.params as ServicesProps['route']['params']).serviceName : 'Servicio';
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBooking = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!address.trim()) {
      newErrors.address = 'Por favor ingresa una dirección';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = () => {
    setShowConfirmation(false);
    if (isServicesStack) {
      (navigation as ServicesProps['navigation']).navigate('ServicesBookingConfirmation', {
        bookingId: '123', // Replace with actual booking ID
        serviceName,
        date: selectedDate,
        time: selectedTime,
        address,
      });
    } else {
      (navigation as HomeProps['navigation']).navigate('HomeBookingConfirmation', {
        bookingId: '123', // Replace with actual booking ID
        serviceName,
        date: selectedDate,
        time: selectedTime,
        address,
      });
    }
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
                Confirma los detalles de tu reserva y proporciona la dirección del servicio.
              </Text>
            </Surface>

            <Surface style={styles.formCard}>
              <View style={styles.selectedDateTime}>
                <View style={styles.dateTimeItem}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.dateTimeText}>{selectedDate}</Text>
                </View>
                <View style={styles.dateTimeItem}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.dateTimeText}>{selectedTime}</Text>
                </View>
              </View>

              <Text style={[textStyles.titleMedium, styles.sectionTitle]}>
                Dirección
              </Text>
              <TextInput
                mode="outlined"
                label="Dirección del servicio"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
                error={!!errors.address}
              />
              {errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}

              <Text style={[textStyles.titleMedium, styles.sectionTitle]}>
                Notas Adicionales (Opcional)
              </Text>
              <TextInput
                mode="outlined"
                label="Instrucciones especiales o notas"
                value={notes}
                onChangeText={setNotes}
                style={styles.input}
                multiline
                numberOfLines={4}
              />

              <Button
                mode="contained"
                onPress={handleBooking}
                style={styles.bookButton}
                contentStyle={styles.bookButtonContent}
              >
                Confirmar Reserva
              </Button>
            </Surface>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog
          visible={showConfirmation}
          onDismiss={() => setShowConfirmation(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Confirmar Reserva</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              ¿Estás seguro de que deseas reservar este servicio?
            </Text>
            <View style={styles.dialogSummary}>
              <Text style={styles.dialogSummaryText}>
                Fecha: {selectedDate}
              </Text>
              <Text style={styles.dialogSummaryText}>
                Hora: {selectedTime}
              </Text>
              <Text style={styles.dialogSummaryText}>
                Dirección: {address}
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowConfirmation(false)}>Cancelar</Button>
            <Button onPress={handleConfirmBooking}>Confirmar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  dialog: {
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  dialogText: {
    fontSize: 16,
    marginBottom: spacing.lg,
    color: colors.text.primary,
  },
  dialogSummary: {
    marginBottom: spacing.lg,
  },
  dialogSummaryText: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
  },
}); 