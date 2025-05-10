import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingsStackParamList } from '../types/navigation';
import { AppHeader } from '../components/AppHeader';
import { colors, spacing, borderRadius, elevation, textStyles } from '../theme/theme';

type Props = NativeStackScreenProps<BookingsStackParamList, 'BookingDetails'>;

export const BookingDetailsScreen: React.FC<Props> = ({ route }) => {
  const { bookingId } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Detalles de la Reserva" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[textStyles.headlineMedium, styles.title]}>
            Detalles de la Reserva
          </Text>
          <Text style={[textStyles.bodyLarge, styles.subtitle]}>
            Información completa de tu reserva
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.layout.screen.horizontal,
  },
  title: {
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
}); 