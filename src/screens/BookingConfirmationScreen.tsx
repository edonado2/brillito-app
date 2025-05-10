import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {
  Text,
  Surface,
  Button,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, elevation, textStyles } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types/navigation';
import { AppHeader } from '../components/AppHeader';

type Props = NativeStackScreenProps<HomeStackParamList, 'BookingConfirmation'>;

export const BookingConfirmationScreen: React.FC<Props> = ({ route, navigation }) => {
  const theme = useTheme();
  const { bookingId, serviceName, date, time, address } = route.params;

  const handleViewBookings = () => {
    // TODO: Navigate to bookings screen
    console.log('View bookings');
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Reserva Confirmada" />
      <View style={styles.content}>
        <Surface style={styles.confirmationCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="check-circle"
              size={64}
              color={colors.success.main}
            />
          </View>
          <Text style={[textStyles.headlineMedium, styles.title]}>
            ¡Reserva Confirmada!
          </Text>
          <Text style={[textStyles.bodyLarge, styles.subtitle]}>
            Tu servicio ha sido reservado exitosamente.
          </Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={[textStyles.bodyMedium, styles.detailLabel]}>
                Servicio
              </Text>
              <Text style={[textStyles.bodyMedium, styles.detailValue]}>
                {serviceName}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[textStyles.bodyMedium, styles.detailLabel]}>
                Fecha
              </Text>
              <Text style={[textStyles.bodyMedium, styles.detailValue]}>
                {date}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[textStyles.bodyMedium, styles.detailLabel]}>
                Hora
              </Text>
              <Text style={[textStyles.bodyMedium, styles.detailValue]}>
                {time}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[textStyles.bodyMedium, styles.detailLabel]}>
                Dirección
              </Text>
              <Text style={[textStyles.bodyMedium, styles.detailValue]}>
                {address}
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleViewBookings}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Ver Mis Reservas
            </Button>
            <Button
              mode="outlined"
              onPress={handleBackToHome}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Volver al Inicio
            </Button>
          </View>
        </Surface>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    padding: spacing.layout.screen.horizontal,
    justifyContent: 'center',
  },
  confirmationCard: {
    padding: spacing.layout.card.vertical,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.card,
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  detailsContainer: {
    marginBottom: spacing.xl,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    color: colors.text.secondary,
  },
  detailValue: {
    color: colors.text.primary,
    flex: 1,
    textAlign: 'right',
    marginLeft: spacing.md,
  },
  buttonContainer: {
    gap: spacing.sm,
  },
  button: {
    borderRadius: borderRadius.md,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
}); 