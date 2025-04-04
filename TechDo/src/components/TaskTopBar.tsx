import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../@core/infrustructure/theme';
import {useAppTheme} from '../@core/infrustructure/theme/useAppTheme';

interface Route {
  key: string;
  name: string;
}

interface TabOptions {
  tabBarLabel?: string;
  title?: string;
  tabBarIcon?: (props: {color: string; size: number}) => React.ReactNode;
  tabBarAccessibilityLabel?: string;
  tabBarTestID?: string;
}

interface TaskTopBarProps {
  state: {
    routes: Route[];
    index: number;
  };
  descriptors: {
    [key: string]: {
      options: TabOptions;
    };
  };
  navigation: {
    emit: (event: {type: string; target: string}) => any;
    navigate: (name: string) => void;
  };
}

interface StyleProps {
  isFocused: boolean;
  palette: any;
}

function TaskTopBar({state, descriptors, navigation}: TaskTopBarProps) {
  const {palette} = useAppTheme();

  return (
    <View style={styles.topBarWrapper}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        // Get icon from options
        const icon = options.tabBarIcon
          ? options.tabBarIcon({
              color: isFocused
                ? palette.secondary.main
                : palette.text.secondary,
              size: AppTheme.WP(5),
            })
          : null;

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
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.topButton}>
            <View style={styles.buttonContentContainer}>
              {icon}
              <View style={getButtonLabelViewStyle({isFocused, palette})}>
                <Text style={getButtonLabelStyle({isFocused, palette})}>
                  {label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const getButtonLabelViewStyle = ({
  isFocused,
  palette,
}: StyleProps): ViewStyle => ({
  paddingVertical: AppTheme.WP(1),
  borderBottomWidth: AppTheme.WP(0.6),
  borderBottomColor: isFocused ? palette.secondary.main : 'transparent',
});

const getButtonLabelStyle = ({isFocused, palette}: StyleProps): TextStyle => ({
  color: isFocused ? palette.secondary.main : palette.text.secondary,
  fontSize: AppTheme.WP(3.5),
  fontWeight: 'bold',
});

const styles = StyleSheet.create({
  topBarWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
});

export default TaskTopBar;
