import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme, Chip, Surface, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Booking, mockBookings, BookingStatus } from '../types/bookings';
import { AppHeader } from '../components/AppHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingHistory'>;

const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case 'scheduled':
      return colors.primary;
    case 'completed':
      return colors.success;
    case 'cancelled':
      return colors.error;
    default:
      return colors.text;
  }
};

const getStatusIcon = (status: BookingStatus) => {
  switch (status) {
    case 'scheduled':
      return 'clock-outline';
    case 'completed':
      return 'check-circle';
    case 'cancelled':
      return 'close-circle';
    default:
      return 'help-circle';
  }
};

export const BookingHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'all'>('all');
  const [bookings] = useState<Booking[]>(mockBookings);

  const filteredBookings = bookings.filter(
    booking => selectedStatus === 'all' || booking.status === selectedStatus
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Mis Reservas" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Chip
              selected={selectedStatus === 'all'}
              onPress={() => setSelectedStatus('all')}
              style={styles.chip}
            >
              All
            </Chip>
            <Chip
              selected={selectedStatus === 'scheduled'}
              onPress={() => setSelectedStatus('scheduled')}
              style={styles.chip}
              icon={() => (
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color={selectedStatus === 'scheduled' ? colors.background : colors.primary}
                />
              )}
            >
              Scheduled
            </Chip>
            <Chip
              selected={selectedStatus === 'completed'}
              onPress={() => setSelectedStatus('completed')}
              style={styles.chip}
              icon={() => (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color={selectedStatus === 'completed' ? colors.background : colors.success}
                />
              )}
            >
              Completed
            </Chip>
            <Chip
              selected={selectedStatus === 'cancelled'}
              onPress={() => setSelectedStatus('cancelled')}
              style={styles.chip}
              icon={() => (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={16}
                  color={selectedStatus === 'cancelled' ? colors.background : colors.error}
                />
              )}
            >
              Cancelled
            </Chip>
          </ScrollView>
        </View>

        {filteredBookings.map((booking) => (
          <Surface key={booking.id} style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <View style={styles.planInfo}>
                <MaterialCommunityIcons
                  name={booking.plan.icon as any}
                  size={24}
                  color={theme.colors.primary}
                />
                <Text variant="titleMedium" style={styles.planTitle}>
                  {booking.plan.title}
                </Text>
              </View>
              <Chip
                mode="flat"
                style={[styles.statusChip, { backgroundColor: getStatusColor(booking.status) }]}
                textStyle={{ color: colors.background }}
                icon={() => (
                  <MaterialCommunityIcons
                    name={getStatusIcon(booking.status)}
                    size={16}
                    color={colors.background}
                  />
                )}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Chip>
            </View>

            <View style={styles.bookingDetails}>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color={colors.text}
                  style={styles.detailIcon}
                />
                <Text variant="bodyMedium">
                  {formatDate(booking.date)} at {formatTime(booking.time)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color={colors.text}
                  style={styles.detailIcon}
                />
                <Text variant="bodyMedium" numberOfLines={2}>
                  {booking.address}
                </Text>
              </View>

              {booking.specialInstructions && (
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="note-text"
                    size={20}
                    color={colors.text}
                    style={styles.detailIcon}
                  />
                  <Text variant="bodyMedium" numberOfLines={2}>
                    {booking.specialInstructions}
                  </Text>
                </View>
              )}

              <View style={styles.priceRow}>
                <Text variant="titleMedium" style={styles.price}>
                  ${booking.totalAmount}
                </Text>
                <IconButton
                  icon="chevron-right"
                  size={24}
                  onPress={() => {
                    // TODO: Navigate to booking details
                  }}
                />
              </View>
            </View>
          </Surface>
        ))}
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
  filterContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  chip: {
    marginRight: 8,
  },
  bookingCard: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planTitle: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  statusChip: {
    height: 28,
  },
  bookingDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
  },
}); 