import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Logo } from './Logo';
import { colors, textStyles } from '../theme';

export const CustomHeader = ({ navigation, route, options, back }: NativeStackHeaderProps) => {
  const showBackButton = back !== undefined;
  const showLogo = !showBackButton;

  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.headerLeft}>
        {showBackButton ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : showLogo && (
          <View style={styles.logoContainer}>
            <Logo size="small" showText={true} />
          </View>
        )}
      </View>

      {!showLogo && (
        <Appbar.Content 
          title={options.title || route.name}
          titleStyle={[
            textStyles.titleLarge,
            { color: colors.text.primary }
          ]}
        />
      )}

      <View style={styles.headerRight}>
        {route.name === 'Home' && (
          <Appbar.Action 
            icon="bell-outline" 
            onPress={() => navigation.navigate('Notifications')}
            style={styles.headerAction}
          />
        )}
        <Appbar.Action 
          icon="account" 
          onPress={() => navigation.navigate('Profile')}
          style={styles.headerAction}
        />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginLeft: 16,
  },
  headerAction: {
    marginHorizontal: 4,
  },
}); 