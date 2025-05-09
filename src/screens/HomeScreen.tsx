import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, useTheme, Appbar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlanCard } from '../components/PlanCard';
import { cleaningPlans, CleaningPlan } from '../types/plans';
import { colors } from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();

  const handlePlanSelect = (plan: CleaningPlan) => {
    navigation.navigate('Booking', { plan });
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content
          title="Brillito"
          subtitle={`Welcome, ${user?.name}`}
          titleStyle={styles.headerTitle}
        />
        <IconButton
          icon="account"
          iconColor={colors.background}
          size={24}
          onPress={() => navigation.navigate('Profile')}
        />
        <IconButton
          icon="logout"
          iconColor={colors.background}
          size={24}
          onPress={handleLogout}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <View style={styles.hero}>
          <Text variant="headlineMedium" style={styles.heroTitle}>
            Choose Your Cleaning Plan
          </Text>
          <Text variant="bodyLarge" style={styles.heroSubtitle}>
            Professional cleaning services for your home or office
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {cleaningPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={handlePlanSelect}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    elevation: 0,
  },
  headerTitle: {
    color: colors.background,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    padding: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  heroTitle: {
    color: colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: colors.background,
    textAlign: 'center',
    opacity: 0.9,
  },
  plansContainer: {
    paddingVertical: 16,
  },
}); 