import React from 'react';
import { StatusBar, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import { BarHeader } from '../../@core/components';
import { Layout } from '../../@core/layout';
import { SafeArea } from '../../styles/infrustucture';

// ** Task Screens
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';

// ** Theme and Utils
import { useAppTheme } from '../../@core/infrustructure/theme/useAppTheme';
import { theme as themeUtils } from '../../@core/infrustructure/theme';

// ** Styled Components
import { FloatingActionButton } from '../../styles/screens/Dashboard';

const Tab = createMaterialTopTabNavigator();

const TaskTabs: React.FC = () => {
  const { palette } = useAppTheme();
  const navigation = useNavigation();

  // Navigate to task form screen for new task
  const navigateToNewTask = () => {
    navigation.navigate('TaskForm');
  };

  return (
    <Layout>
      <SafeArea>
        <StatusBar
          backgroundColor={palette.primary.main}
          barStyle="light-content"
        />

        <BarHeader
          showChat={{ badge: false, chat: false }}
          showNotification={{ notification: false, badge: false }}
          onPressBar={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: palette.secondary.main,
              tabBarInactiveTintColor: palette.text.secondary,
              tabBarStyle: {
                backgroundColor: palette.background.paper,
                elevation: 0,
                shadowOpacity: 0,
              },
              tabBarIndicatorStyle: {
                backgroundColor: palette.secondary.main,
                height: 3,
              },
              tabBarLabelStyle: {
                fontWeight: 'bold',
                fontSize: themeUtils.WP(3.5),
                textTransform: 'none',
              },
            }}
          >
            <Tab.Screen
              name="Daily"
              component={Daily}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="calendar-today" color={color} size={themeUtils.WP(5)} />
                ),
              }}
            />
            <Tab.Screen
              name="Weekly"
              component={Weekly}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="calendar-week" color={color} size={themeUtils.WP(5)} />
                ),
              }}
            />
            <Tab.Screen
              name="Monthly"
              component={Monthly}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="calendar-month" color={color} size={themeUtils.WP(5)} />
                ),
              }}
            />
          </Tab.Navigator>
        </View>

        <FloatingActionButton onPress={navigateToNewTask}>
          <Icon name="plus" size={themeUtils.WP(8)} color={palette.common.white} />
        </FloatingActionButton>
      </SafeArea>
    </Layout>
  );
};

export default TaskTabs;
