import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../theme/theme';
import { HomeServices } from '../components/HomeServices';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>¡Bienvenido a Brillito!</Text>
          <Text style={styles.subtitle}>Tu hogar, nuestra pasión</Text>
        </View>

        <HomeServices navigation={navigation} />

        {/* Add more sections here */}
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
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary.main,
  },
  welcomeText: {
    ...textStyles.headlineLarge,
    color: colors.primary.contrast,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...textStyles.bodyLarge,
    color: colors.primary.contrast,
    opacity: 0.9,
  },
}); 