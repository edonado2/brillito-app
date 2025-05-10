import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { colors } from '../theme/theme';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightAction,
}) => {
  const theme = useTheme();

  return (
    <Appbar.Header
      style={styles.header}
      statusBarHeight={0}
    >
      <View style={styles.headerLeft}>
        {showBackButton && (
          <Appbar.BackAction
            onPress={onBackPress}
            color={colors.text.primary}
          />
        )}
      </View>

      <Appbar.Content
        title={title}
        titleStyle={[
          styles.title,
          { color: colors.text.primary }
        ]}
      />

      <View style={styles.headerRight}>
        {rightAction && (
          <Appbar.Action
            icon={rightAction.icon}
            onPress={rightAction.onPress}
            color={colors.text.primary}
          />
        )}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 16,
    height: 64,
    elevation: 0,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
}); 