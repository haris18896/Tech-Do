/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';
import {useAppTheme} from '../../@core/infrustructure/theme/useAppTheme';

// ** Custom Components
import SideMenu from './sideMenu';

// ** Screens
import Profile from '../../screens/Profile';
import Daily from '../../screens/Tasks/Daily';
import Weekly from '../../screens/Tasks/Weekly';
import Dashboard from '../../screens/Dashboard';
import Monthly from '../../screens/Tasks/Monthly';
import TaskForm from '../../screens/Tasks/TaskForm';
import TaskTabs from '../../screens/Tasks/TaskTabs';

// Define the param list for our drawer navigator
type DrawerParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Monthly: undefined;
  Weekly: undefined;
  Daily: undefined;
  TaskTabs: undefined;
  TaskForm: {taskId?: string}; // Optional taskId for edit mode
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export function MyDrawer(): React.ReactElement {
  // ** Theme
  const {palette} = useAppTheme();

  return (
    <Drawer.Navigator
      backBehavior={'history'}
      initialRouteName={'Dashboard'}
      drawerContent={(props: DrawerContentComponentProps) => (
        <SideMenu {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: palette?.background?.paper,
          paddingVertical: AppTheme?.WP(5),
          width: AppTheme?.scrWidth / 1.3,
        },
      }}>
      <Drawer.Screen name={'Dashboard'} component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="TaskTabs" component={TaskTabs} />
      <Drawer.Screen name="Monthly" component={Monthly} />
      <Drawer.Screen name="Weekly" component={Weekly} />
      <Drawer.Screen name="Daily" component={Daily} />
      <Drawer.Screen name="TaskForm" component={TaskForm} />
    </Drawer.Navigator>
  );
}
