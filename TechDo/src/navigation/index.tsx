import React from 'react';

// ** Custom Styles
import {theme as AppTheme} from '../@core/infrustructure/theme';

// ** navigators
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// ** stacks
import {AuthStack} from './stacks/AuthStack';
import {AppStack} from './stacks/AppStack';

// ** Custom Components
import Splash from '../screens/Splash';
import {setTopLevelNavigator} from './utils';
import {useTheme} from '../@core/infrustructure/context/ThemeContext';

// Define root stack parameter list
export type RootStackParamList = {
  Splash: undefined;
  App: undefined;
  Auth: undefined;
};

// Create the properly typed navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Main navigation stack component
 */
const MainStack: React.FC = () => {
  // ** Theme
  const {theme} = useTheme();

  // Create a custom theme with proper TypeScript typing
  const MyCustomTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: AppTheme?.DefaultPalette(theme || 'light')?.primary?.main,
    },
  };

  // Screen options with proper typing
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: 'fade',
  };

  return (
    <NavigationContainer ref={setTopLevelNavigator} theme={MyCustomTheme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="App" component={AppStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
