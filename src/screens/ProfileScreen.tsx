import React from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Text, Surface, Avatar, List, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types/navigation';
import { AppHeader } from '../components/AppHeader';
import { colors, spacing, borderRadius, elevation, textStyles } from '../theme/theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Perfil" />
      <ScrollView style={styles.scrollView}>
        <Surface style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={80}
                source={{ uri: 'https://i.pravatar.cc/300' }}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
            </View>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => {}}
              style={styles.editButton}
            />
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>
            Account Settings
          </Text>
          <List.Item
            title="Personal Information"
            left={props => (
              <List.Icon
                {...props}
                icon="account"
                color={colors.primary.main}
              />
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={colors.text.secondary}
              />
            )}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Payment Methods"
            left={props => (
              <List.Icon
                {...props}
                icon="credit-card"
                color={colors.primary.main}
              />
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={colors.text.secondary}
              />
            )}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Addresses"
            left={props => (
              <List.Icon
                {...props}
                icon="map-marker"
                color={colors.primary.main}
              />
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={colors.text.secondary}
              />
            )}
            onPress={() => {}}
          />
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>
            Preferences
          </Text>
          <List.Item
            title="Language"
            description="English (US)"
            left={props => (
              <List.Icon
                {...props}
                icon="translate"
                color={colors.primary.main}
              />
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={colors.text.secondary}
              />
            )}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Notifications"
            left={props => (
              <List.Icon
                {...props}
                icon="bell"
                color={colors.primary.main}
              />
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={colors.text.secondary}
              />
            )}
            onPress={() => {}}
          />
        </Surface>
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
  profileSection: {
    marginBottom: spacing.lg,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.primary,
    padding: spacing.lg,
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  editButton: {
    marginLeft: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...textStyles.titleLarge,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
  },
  section: {
    marginBottom: spacing.lg,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.primary,
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
    ...textStyles.titleMedium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
}); 