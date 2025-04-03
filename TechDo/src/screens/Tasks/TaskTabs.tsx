/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../@core/infrustructure/context/AuthContext';
import { Task } from '../../utils/constants';
import { getTasksByCategory } from '../../@core/auth/TaskService';
import { renderLoadingSpinner } from '../../utils/utils';

// ** Styled Components
import { FloatingActionButton } from '../../styles/screens/Dashboard';

const Tab = createMaterialTopTabNavigator();

// Create context to share tasks between tabs
export const TaskContext = React.createContext<{
  dailyTasks: Task[];
  weeklyTasks: Task[];
  monthlyTasks: Task[];
  refreshTasks: () => void;
  isLoading: boolean;
}>({
  dailyTasks: [],
  weeklyTasks: [],
  monthlyTasks: [],
  refreshTasks: () => {},
  isLoading: false,
});

const TaskTabs: React.FC = () => {
  const { palette } = useAppTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  // Tasks state
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([]);
  const [monthlyTasks, setMonthlyTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch tasks from Firebase
  const fetchTasks = async () => {
    if (!user) {return;}

    setIsLoading(true);
    try {
      // Fetch tasks for each category
      const daily = await getTasksByCategory(user.uid, 'daily');
      const weekly = await getTasksByCategory(user.uid, 'weekly');
      const monthly = await getTasksByCategory(user.uid, 'monthly');

      setDailyTasks(daily);
      setWeeklyTasks(weekly);
      setMonthlyTasks(monthly);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch tasks on component mount and user change
  useEffect(() => {
    fetchTasks();
  }, [user]);

  // Navigate to task form screen for new task
  const navigateToNewTask = () => {
    navigation.navigate('TaskForm');
  };

  // Show loading indicator during initial load
  if (isLoading && !dailyTasks.length && !weeklyTasks.length && !monthlyTasks.length) {
    return (
      <Layout>
        <StatusBar
          backgroundColor={palette.primary.main}
          barStyle="light-content"
        />
        <BarHeader
          showChat={{ badge: false, chat: false }}
          showNotification={{ notification: false, badge: false }}
          onPressBar={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        {renderLoadingSpinner(palette)}
      </Layout>
    );
  }

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

        <TaskContext.Provider value={{
          dailyTasks,
          weeklyTasks,
          monthlyTasks,
          refreshTasks: fetchTasks,
          isLoading,
        }}>
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
        </TaskContext.Provider>

        <FloatingActionButton onPress={navigateToNewTask}>
          <Icon name="plus" size={themeUtils.WP(8)} color={palette.common.white} />
        </FloatingActionButton>
      </SafeArea>
    </Layout>
  );
};

export default TaskTabs;
