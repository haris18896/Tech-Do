import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// ** Utils
import { theme as AppTheme } from '../@core/infrustructure/theme';
import { useAppTheme } from '../@core/infrustructure/theme/useAppTheme';

function TaskTopBar({ state, descriptors, navigation }) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.topBarWrapper}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        // Get icon from options
        const icon = options.tabBarIcon ? 
          options.tabBarIcon({ 
            color: isFocused ? palette.secondary.main : palette.text.secondary,
            size: AppTheme.WP(5)
          }) : null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.topButton}>
            <View style={styles.buttonContentContainer}>
              {icon}
              <View style={styles.buttonLabelView(isFocused, palette)}>
                <Text style={styles.buttonLabel(isFocused, palette)}>{label}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  topBarWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: AppTheme.WP(2),
  },
  buttonLabelView: (isFocused, palette) => ({
    paddingVertical: AppTheme.WP(1),
    borderBottomWidth: AppTheme.WP(0.6),
    borderBottomColor: isFocused
      ? palette.secondary.main
      : 'transparent',
  }),
  buttonLabel: (isFocused, palette) => ({
    color: isFocused
      ? palette.secondary.main
      : palette.text.secondary,
    fontSize: AppTheme.WP(3.5),
    fontWeight: 'bold',
  }),
});

export default TaskTopBar; 