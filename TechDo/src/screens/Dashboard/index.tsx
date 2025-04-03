import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StatusBar, View } from 'react-native';

// ** Third Party Packages
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppTheme } from '../../@core/infrustructure/theme/useAppTheme';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Utils
import { theme as themeUtils } from '../../@core/infrustructure/theme';
import { Task } from '../../utils/constants';
import { useAuth } from '../../@core/infrustructure/context/AuthContext';
import { subscribeToTasks } from '../../@core/auth/TaskService';
import { handleToggleComplete, handleDeleteTask, renderEmptyState, renderLoadingSpinner } from '../../utils/utils';

// ** Custom Components
import { BarHeader } from '../../@core/components';
import { Layout } from '../../@core/layout';

// Import our custom components
import {
  TaskCount,
  TasksList,
  SectionTitle,
  SectionHeader,
  FloatingActionButton,
} from '../../styles/screens/Dashboard';
import TaskCard from '../../components/TaskCard';
import ProgressSummary from '../../components/ProgressSummary';

const Dashboard: React.FC = () => {
  const { palette } = useAppTheme();
  const { user } = useAuth();
  const isMounted = useRef(true);

  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState({
    daily: { total: 0, completed: 0 },
    weekly: { total: 0, completed: 0 },
    monthly: { total: 0, completed: 0 },
  });

  // Refs to store unsubscribe functions
  const unsubscribersRef = useRef<(() => void)[]>([]);

  // Set up real-time listeners for tasks
  useEffect(() => {
    if (!user) {return;}

    setIsLoading(true);

    // Set up listeners for all task categories
    const dailyUnsubscribe = subscribeToTasks(user.uid, 'daily', (dailyTasks) => {
      if (isMounted.current) {
        setTasks(dailyTasks); // Daily tasks are shown on dashboard

        // Update counts for daily tasks
        setCounts(prevCounts => ({
          ...prevCounts,
          daily: {
            total: dailyTasks.length,
            completed: dailyTasks.filter(task => task.completed).length,
          },
        }));
      }
    });

    const weeklyUnsubscribe = subscribeToTasks(user.uid, 'weekly', (weeklyTasks) => {
      if (isMounted.current) {
        // Update counts for weekly tasks
        setCounts(prevCounts => ({
          ...prevCounts,
          weekly: {
            total: weeklyTasks.length,
            completed: weeklyTasks.filter(task => task.completed).length,
          },
        }));
      }
    });

    const monthlyUnsubscribe = subscribeToTasks(user.uid, 'monthly', (monthlyTasks) => {
      if (isMounted.current) {
        // Update counts for monthly tasks
        setCounts(prevCounts => ({
          ...prevCounts,
          monthly: {
            total: monthlyTasks.length,
            completed: monthlyTasks.filter(task => task.completed).length,
          },
        }));
      }
    });

    // Store unsubscribe functions
    unsubscribersRef.current = [dailyUnsubscribe, weeklyUnsubscribe, monthlyUnsubscribe];

    // All listeners are set up, we can turn off the loading state
    setIsLoading(false);

    // Cleanup function to unsubscribe from listeners when component unmounts
    return () => {
      isMounted.current = false;
      unsubscribersRef.current.forEach(unsubscribe => unsubscribe());
    };
  }, [user]);

  const refreshTasks = useCallback(() => {
    if (unsubscribersRef.current.length === 0 && user) {
      setIsLoading(true);
      const dailyUnsubscribe = subscribeToTasks(user.uid, 'daily', (dailyTasks) => {
        setTasks(dailyTasks);
        setCounts(prevCounts => ({
          ...prevCounts,
          daily: {
            total: dailyTasks.length,
            completed: dailyTasks.filter(task => task.completed).length,
          },
        }));
      });

      const weeklyUnsubscribe = subscribeToTasks(user.uid, 'weekly', (weeklyTasks) => {
        setCounts(prevCounts => ({
          ...prevCounts,
          weekly: {
            total: weeklyTasks.length,
            completed: weeklyTasks.filter(task => task.completed).length,
          },
        }));
      });

      const monthlyUnsubscribe = subscribeToTasks(user.uid, 'monthly', (monthlyTasks) => {
        setCounts(prevCounts => ({
          ...prevCounts,
          monthly: {
            total: monthlyTasks.length,
            completed: monthlyTasks.filter(task => task.completed).length,
          },
        }));
      });

      unsubscribersRef.current = [dailyUnsubscribe, weeklyUnsubscribe, monthlyUnsubscribe];
      setIsLoading(false);
    }
  }, [user]);

  const navigateToNewTask = () => {
    navigation.navigate('TaskForm');
  };

  // Render a loading state while fetching tasks
  if (isLoading && tasks.length === 0) {
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
      <StatusBar
        backgroundColor={palette.primary.main}
        barStyle="light-content"
      />

      <BarHeader
        showChat={{ badge: false, chat: false }}
        showNotification={{ notification: false, badge: false }}
        onPressBar={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <View style={{marginTop: themeUtils?.WP(4)}}>
        <ProgressSummary
          dailyTotal={counts.daily.total}
          dailyCompleted={counts.daily.completed}
          weeklyTotal={counts.weekly.total}
          weeklyCompleted={counts.weekly.completed}
          monthlyTotal={counts.monthly.total}
          monthlyCompleted={counts.monthly.completed}
        />
      </View>

      <SectionHeader>
        <SectionTitle>
          Daily Tasks
        </SectionTitle>
        <TaskCount>
          {counts.daily.completed}/{counts.daily.total} completed
        </TaskCount>
      </SectionHeader>

      {/* Tasks List */}
      <TasksList<Task>
        data={tasks}
        renderItem={({ item }: { item: Task }) => (
          <TaskCard
            id={item.id}
            title={item.title}
            category={item.category}
            completed={item.completed}
            priority={item.priority}
            onDelete={(id) => handleDeleteTask(id, tasks, setTasks, refreshTasks)}
            onToggleComplete={(id, completed) =>
              handleToggleComplete(id, completed, tasks, setTasks, refreshTasks)}
          />
        )}
        keyExtractor={(item: Task) => item.id}
        ListEmptyComponent={() => renderEmptyState(palette, 'No Tasks Yet', 'Tap the + button to add your first task')}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshTasks}
        refreshing={isLoading}
      />

      <FloatingActionButton onPress={navigateToNewTask}>
        <Icon name="plus" size={themeUtils.WP(8)} color={palette.common.white} />
      </FloatingActionButton>
    </Layout>
  );
};

export default Dashboard;
