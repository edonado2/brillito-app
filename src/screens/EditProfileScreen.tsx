import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types/navigation';
import { AppHeader } from '../components/AppHeader';
import { colors, spacing, borderRadius, elevation, textStyles } from '../theme/theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title="Editar Perfil" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[textStyles.headlineMedium, styles.title]}>
            Editar Perfil
          </Text>
          <Text style={[textStyles.bodyLarge, styles.subtitle]}>
            Actualiza tu información personal
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