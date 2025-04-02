import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// ** Screens
import Dashboard from '../../screens/Dashboard';
import AllGoals from '../../screens/Dashboard/AllGoals';

// Define the param list for this stack
export type AppStackParamList = {
  Dashboard: undefined;
  AllGoals: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AllGoals" component={AllGoals} />
    </Stack.Navigator>
  );
};

export {AppStack};
