import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';

// ** Third Party Packages
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppTheme } from '../../@core/infrustructure/theme/useAppTheme';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Utils
import { theme as themeUtils } from '../../@core/infrustructure/theme';
import { dailyTasks, getTaskCounts, Task } from '../../utils/constants';

// ** Custom Components
import { BarHeader } from '../../@core/components';
import { Layout } from '../../@core/layout';


// Import our custom components
import {
  TaskCount,
  TasksList,
  SectionTitle,
  SectionHeader,
  EmptyStateTitle,
  EmptyStateSubtitle,
  EmptyStateContainer,
  FloatingActionButton,
} from '../../styles/screens/Dashboard';
import TaskCard from '../../components/TaskCard';
import ProgressSummary from '../../components/ProgressSummary';

const Dashboard: React.FC = () => {
  const { palette } = useAppTheme();
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>(dailyTasks);

  // Get task counts for progress calculations
  const counts = getTaskCounts();

  // Handle task completion toggle
  const handleToggleComplete = (id: string, completed: boolean) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed, updatedAt: new Date().getTime() } : task
    );
    setTasks(updatedTasks);

    // In a real app, you would update this in your database
    // For now, we're just updating the state
  };

  // Handle task deletion
  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // In a real app, you would delete this from your database
    // For now, we're just updating the state
  };

  // Navigate to add new task screen
  const navigateToNewTask = () => {
    // @ts-ignore
    navigation.navigate('NewTask');
  };

  // Render empty state when no tasks are available
  const renderEmptyState = () => (
    <EmptyStateContainer>
      <Icon
        name="checkbox-blank-circle-outline"
        size={themeUtils.WP(20)}
        color={palette.grey[300]}
      />
      <EmptyStateTitle>
        No Tasks Yet
      </EmptyStateTitle>
      <EmptyStateSubtitle>
        Tap the + button to add your first task
      </EmptyStateSubtitle>
    </EmptyStateContainer>
  );

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
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
        keyExtractor={(item: Task) => item.id}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button for adding new tasks */}
      <FloatingActionButton onPress={navigateToNewTask}>
        <Icon name="plus" size={themeUtils.WP(8)} color={palette.common.white} />
      </FloatingActionButton>
    </Layout>
  );
};

export default Dashboard;
