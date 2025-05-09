import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme, IconButton, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CleaningPlan } from '../types/plans';
import { colors } from '../theme/theme';

interface PlanCardProps {
  plan: CleaningPlan;
  onSelect: (plan: CleaningPlan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={() => onSelect(plan)}>
      <Surface style={[styles.container, plan.recommended && styles.recommended]}>
        {plan.recommended && (
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        )}
        
        <View style={styles.header}>
          <MaterialCommunityIcons
            name={plan.icon as any}
            size={32}
            color={theme.colors.primary}
          />
          <Text variant="titleLarge" style={styles.title}>
            {plan.title}
          </Text>
        </View>

        <Text variant="bodyMedium" style={styles.description}>
          {plan.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text variant="headlineMedium" style={styles.price}>
            ${plan.price}
          </Text>
          <Text variant="bodySmall" style={styles.duration}>
            / {plan.duration}
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color={theme.colors.secondary}
              />
              <Text variant="bodyMedium" style={styles.featureText}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <IconButton
          icon="arrow-right-circle"
          mode="contained"
          size={32}
          iconColor={theme.colors.primary}
          style={styles.selectButton}
          onPress={() => onSelect(plan)}
        />
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  recommended: {
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
  description: {
    color: colors.text,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  duration: {
    color: colors.placeholder,
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    color: colors.text,
  },
  selectButton: {
    alignSelf: 'flex-end',
  },
}); 