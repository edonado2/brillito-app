import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  Surface,
  Chip,
  IconButton,
  Divider,
  useTheme,
  Portal,
  Dialog,
  Modal,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, elevation, textStyles, typography } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ServicesStackParamList, HomeStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';
import { services } from '../data/services';
import { Calendar } from 'react-native-calendars';

type ServicesProps = NativeStackScreenProps<ServicesStackParamList, 'ServicesDetails'>;
type HomeProps = NativeStackScreenProps<HomeStackParamList, 'HomeServiceDetails'>;

const { width } = Dimensions.get('window');
const HERO_HEIGHT = width * 0.6;
const PRICE_CARD_OFFSET = -spacing.xxl;

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

const ServiceDetailsContent: React.FC<{
  navigation: ServicesProps['navigation'] | HomeProps['navigation'];
  route: ServicesProps['route'] | HomeProps['route'];
}> = ({ navigation, route }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { serviceId } = route.params;

  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Servicio no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
    setShowTimeModal(true);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowTimeModal(false);
    setShowBookingDialog(true);
  };

  const handleBookNow = () => {
    setShowCalendar(true);
  };

  const handleConfirmBooking = () => {
    setShowBookingDialog(false);
    if (service) {
      if ('ServicesBooking' in navigation) {
        (navigation as ServicesProps['navigation']).navigate('ServicesBooking', {
          serviceId: service.id,
          serviceName: service.title,
          selectedDate,
          selectedTime,
        });
      } else {
        (navigation as HomeProps['navigation']).navigate('HomeBooking', {
          serviceId: service.id,
          selectedDate,
          selectedTime,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://example.com/cleaning.jpg' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.heroGradient}
        />
        <View style={styles.heroContent}>
          <View style={styles.heroHeader}>
            <IconButton
              icon="arrow-left"
              iconColor={colors.text.inverse}
              size={24}
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
            <IconButton
              icon="heart-outline"
              iconColor={colors.text.inverse}
              size={24}
              style={styles.favoriteButton}
            />
          </View>
          <View style={styles.heroInfo}>
            <Text style={[textStyles.displaySmall, styles.heroTitle]}>
              {service.title}
            </Text>
            <View style={styles.heroMeta}>
              <Chip
                icon="star"
                style={styles.ratingChip}
                textStyle={styles.ratingText}
              >
                4.8 (124 reseñas)
              </Chip>
              <Chip
                icon="clock-outline"
                style={styles.durationChip}
                textStyle={styles.durationText}
              >
                {service.duration}
              </Chip>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Surface style={styles.priceCard}>
            <Text style={styles.price}>${service.price}</Text>
            <Text style={styles.priceLabel}>por servicio</Text>
          </Surface>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{service.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Características</Text>
            <View style={styles.featuresGrid}>
              {service.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Incluye</Text>
            <View style={styles.featuresGrid}>
              {[
                'Productos de limpieza profesionales',
                'Equipo especializado',
                'Personal capacitado',
                'Garantía de satisfacción',
              ].map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
            <View style={styles.scheduleContainer}>
              <Button
                mode="outlined"
                onPress={() => setShowCalendar(true)}
                style={styles.scheduleButton}
                icon="calendar"
              >
                {selectedDate || 'Seleccionar Fecha'}
              </Button>
              <Button
                mode="outlined"
                onPress={() => setShowTimeModal(true)}
                style={styles.scheduleButton}
                icon="clock-outline"
              >
                {selectedTime || 'Seleccionar Hora'}
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <Surface style={styles.bottomBar}>
        <Button
          mode="contained"
          onPress={handleBookNow}
          style={styles.bookButton}
          contentStyle={styles.bookButtonContent}
        >
          Reservar Ahora
        </Button>
      </Surface>

      {/* Calendar Modal */}
      <Portal>
        <Modal
          visible={showCalendar}
          onDismiss={() => setShowCalendar(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una fecha</Text>
            <Calendar
              onDayPress={(day) => handleDateSelect(day.dateString)}
              minDate={new Date().toISOString().split('T')[0]}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: colors.primary.main }
              }}
              theme={{
                todayTextColor: colors.primary.main,
                selectedDayBackgroundColor: colors.primary.main,
                selectedDayTextColor: colors.primary.contrast,
              }}
            />
          </View>
        </Modal>
      </Portal>

      {/* Time Selection Modal */}
      <Portal>
        <Modal
          visible={showTimeModal}
          onDismiss={() => setShowTimeModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una hora</Text>
            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((time) => (
                <Chip
                  key={time}
                  selected={selectedTime === time}
                  onPress={() => handleTimeSelect(time)}
                  style={styles.timeChip}
                  textStyle={[
                    styles.timeChipText,
                    selectedTime === time && styles.timeChipTextSelected
                  ]}
                >
                  {time}
                </Chip>
              ))}
            </View>
          </View>
        </Modal>
      </Portal>

      {/* Booking Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={showBookingDialog}
          onDismiss={() => setShowBookingDialog(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Confirmar Reserva</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              ¿Estás seguro que deseas reservar el servicio de {service.title}?
            </Text>
            <View style={styles.dialogSummary}>
              <Text style={styles.dialogSummaryText}>
                Fecha: {selectedDate}
              </Text>
              <Text style={styles.dialogSummaryText}>
                Hora: {selectedTime}
              </Text>
              <Text style={styles.dialogSummaryText}>
                Precio: ${service.price}
              </Text>
              <Text style={styles.dialogSummaryText}>
                Duración: {service.duration}
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowBookingDialog(false)}>Cancelar</Button>
            <Button onPress={handleConfirmBooking}>Confirmar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export const ServiceDetailsScreen: React.FC<ServicesProps> = (props) => {
  return <ServiceDetailsContent {...props} />;
};

export const HomeServiceDetailsScreen: React.FC<HomeProps> = (props) => {
  return <ServiceDetailsContent {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  heroContainer: {
    height: HERO_HEIGHT,
    position: 'relative',
    backgroundColor: colors.primary.main,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    backgroundColor: 'transparent',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.xl,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  backButton: {
    backgroundColor: colors.utility.backdrop,
    margin: 0,
    borderRadius: borderRadius.full,
    opacity: 0.9,
  },
  favoriteButton: {
    backgroundColor: colors.utility.backdrop,
    margin: 0,
    borderRadius: borderRadius.full,
    opacity: 0.9,
  },
  heroInfo: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
  heroTitle: {
    color: colors.text.inverse,
    marginBottom: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ratingChip: {
    backgroundColor: colors.utility.backdrop,
    height: 32,
  },
  ratingText: {
    ...textStyles.labelMedium,
    color: colors.text.inverse,
  },
  durationChip: {
    backgroundColor: colors.utility.backdrop,
    height: 32,
  },
  durationText: {
    ...textStyles.labelMedium,
    color: colors.text.inverse,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  priceCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.primary,
    alignItems: 'center',
    marginTop: PRICE_CARD_OFFSET,
    ...Platform.select({
      ios: {
        shadowColor: colors.utility.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: elevation.md,
      },
    }),
  },
  price: {
    ...textStyles.displaySmall,
    color: colors.primary.main,
    marginBottom: spacing.xs,
  },
  priceLabel: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  section: {
    gap: spacing.lg,
    backgroundColor: colors.surface.primary,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
  },
  sectionTitle: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  description: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureText: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 24,
  },
  scheduleContainer: {
    gap: spacing.md,
  },
  scheduleButton: {
    borderColor: colors.primary.main,
  },
  bottomBar: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface.primary,
  },
  bookButton: {
    borderRadius: borderRadius.md,
  },
  bookButtonContent: {
    height: 48,
  },
  dialog: {
    borderRadius: borderRadius.lg,
  },
  dialogText: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
  },
  dialogSummary: {
    marginTop: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface.secondary,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  dialogSummaryText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  modalContainer: {
    backgroundColor: colors.surface.primary,
    margin: spacing.xl,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
  },
  modalContent: {
    gap: spacing.lg,
  },
  modalTitle: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  timeChip: {
    marginBottom: spacing.sm,
  },
  timeChipText: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  timeChipTextSelected: {
    color: colors.primary.main,
  },
}); 