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
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, elevation, textStyles, typography } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';
import { services } from '../data/services';

type Props = NativeStackScreenProps<ServicesStackParamList, 'ServicesDetails'>;

const { width } = Dimensions.get('window');
const HERO_HEIGHT = width * 0.45;
const PRICE_CARD_OFFSET = -spacing.xxl;

export const ServiceDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
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

  const handleBookNow = () => {
    setShowBookingDialog(true);
  };

  const handleConfirmBooking = () => {
    setShowBookingDialog(false);
    navigation.navigate('ServicesBooking', {
      serviceId: service.id,
    });
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
            {service.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Incluye</Text>
            {[
              'Productos de limpieza profesionales',
              'Equipo especializado',
              'Personal capacitado',
              'Garantía de satisfacción',
            ].map((item, index) => (
              <View key={index} style={styles.featureRow}>
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
              ¿Estás seguro que deseas reservar este servicio?
            </Text>
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
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  backButton: {
    backgroundColor: colors.utility.backdrop,
    margin: 0,
    borderRadius: borderRadius.full,
  },
  favoriteButton: {
    backgroundColor: colors.utility.backdrop,
    margin: 0,
    borderRadius: borderRadius.full,
  },
  heroInfo: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
  heroTitle: {
    color: colors.text.inverse,
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
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
    padding: spacing.lg,
    gap: spacing.xl,
  },
  priceCard: {
    padding: spacing.lg,
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
  },
  priceLabel: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
  },
  description: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
  },
  bottomBar: {
    padding: spacing.md,
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
}); 