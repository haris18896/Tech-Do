import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// ** Screens
import Dashboard from '../../screens/Dashboard';
import Profile from '../../screens/Profile';
import Monthly from '../../screens/Tasks/Monthly';
import Weekly from '../../screens/Tasks/Weekly';
import Daily from '../../screens/Tasks/Daily';

// Define the param list for this stack
export type AppStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Monthly: undefined;
  Weekly: undefined;
  Daily: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Profile">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Monthly" component={Monthly} />
      <Stack.Screen name="Weekly" component={Weekly} />
      <Stack.Screen name="Daily" component={Daily} />
    </Stack.Navigator>
  );
};

export {AppStack};
