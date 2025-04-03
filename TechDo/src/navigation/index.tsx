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

export type RootStackParamList = {
  Splash: undefined;
  App: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  // ** Theme
  const {theme} = useTheme();

  const MyCustomTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: AppTheme?.DefaultPalette(theme || 'light')?.primary?.main,
    },
  };

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
