import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingsStackParamList } from '../types/navigation';
import { AppHeader } from '../components/AppHeader';
import { colors, spacing, borderRadius, elevation, textStyles } from '../theme/theme';

type Props = NativeStackScreenProps<BookingsStackParamList, 'Bookings'>;

export const BookingsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Mis Reservas" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[textStyles.headlineMedium, styles.title]}>
            Tus Reservas
          </Text>
          <Text style={[textStyles.bodyLarge, styles.subtitle]}>
            Aquí puedes ver y gestionar todas tus reservas
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