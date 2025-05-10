import React from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Text, Surface, List, Switch, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, elevation, textStyles } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types/navigation';
import { AppHeader } from '../components/AppHeader';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Settings" showBackButton onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>
            Preferences
          </Text>
          <List.Item
            title="Notifications"
            description="Receive notifications about your bookings"
            left={props => (
              <List.Icon
                {...props}
                icon="bell"
                color={colors.primary.main}
              />
            )}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={colors.primary.main}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Dark Mode"
            description="Switch between light and dark theme"
            left={props => (
              <List.Icon
                {...props}
                icon="theme-light-dark"
                color={colors.primary.main}
              />
            )}
            right={() => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                color={colors.primary.main}
              />
            )}
          />
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>
            Account
          </Text>
          <List.Item
            title="Sign Out"
            left={props => (
              <List.Icon
                {...props}
                icon="logout"
                color={colors.error.main}
              />
            )}
            onPress={signOut}
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
    color: colors.text.primary,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: '500' as const,
  },
}); 