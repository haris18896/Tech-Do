import React, { useState, useEffect, useCallback } from 'react';
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
import { getTasksByCategory } from '../../@core/auth/TaskService';
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

  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState({
    daily: { total: 0, completed: 0 },
    weekly: { total: 0, completed: 0 },
    monthly: { total: 0, completed: 0 },
  });

  const fetchTasks = useCallback(async () => {
    if (!user) {return;}

    setIsLoading(true);
    try {
      const dailyTasks = await getTasksByCategory(user.uid, 'daily');
      setTasks(dailyTasks);

      const daily = await getTasksByCategory(user.uid, 'daily');
      const weekly = await getTasksByCategory(user.uid, 'weekly');
      const monthly = await getTasksByCategory(user.uid, 'monthly');

      setCounts({
        daily: {
          total: daily.length,
          completed: daily.filter(task => task.completed).length,
        },
        weekly: {
          total: weekly.length,
          completed: weekly.filter(task => task.completed).length,
        },
        monthly: {
          total: monthly.length,
          completed: monthly.filter(task => task.completed).length,
        },
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [user, fetchTasks]);

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
            completed={item.completed}
            onDelete={(id) => handleDeleteTask(id, tasks, setTasks, fetchTasks)}
            onToggleComplete={(id, completed) =>
              handleToggleComplete(id, completed, tasks, setTasks, fetchTasks)}
          />
        )}
        keyExtractor={(item: Task) => item.id}
        ListEmptyComponent={() => renderEmptyState(palette, 'No Tasks Yet', 'Tap the + button to add your first task')}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchTasks}
        refreshing={isLoading}
      />

      <FloatingActionButton onPress={navigateToNewTask}>
        <Icon name="plus" size={themeUtils.WP(8)} color={palette.common.white} />
      </FloatingActionButton>
    </Layout>
  );
};

export default Dashboard;
