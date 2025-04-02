import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppTheme } from '../../@core/infrustructure/theme/useAppTheme';
import { theme as themeUtils } from '../../@core/infrustructure/theme';
import { dailyTasks, getTaskCounts, Task } from '../../utils/constants';
import { BarHeader } from '../../@core/components';
import { Layout } from '../../@core/layout';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import our custom components
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
    <View style={styles.emptyStateContainer}>
      <Icon
        name="checkbox-blank-circle-outline"
        size={themeUtils.WP(20)}
        color={palette.grey[300]}
      />
      <Text style={[styles.emptyStateTitle, { color: palette.text.title }]}>
        No Tasks Yet
      </Text>
      <Text style={[styles.emptyStateSubtitle, { color: palette.text.body }]}>
        Tap the + button to add your first task
      </Text>
    </View>
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

      {/* Progress Summary Section */}
      <ProgressSummary
        dailyTotal={counts.daily.total}
        dailyCompleted={counts.daily.completed}
        weeklyTotal={counts.weekly.total}
        weeklyCompleted={counts.weekly.completed}
        monthlyTotal={counts.monthly.total}
        monthlyCompleted={counts.monthly.completed}
      />

      {/* Daily Tasks Section */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: palette.text.title }]}>
          Daily Tasks
        </Text>
        <Text style={[styles.taskCount, { color: palette.text.body }]}>
          {counts.daily.completed}/{counts.daily.total} completed
        </Text>
      </View>

      {/* Tasks List */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskCard
            id={item.id}
            title={item.title}
            completed={item.completed}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button for adding new tasks */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: palette.primary.main }]}
        onPress={navigateToNewTask}
      >
        <Icon name="plus" size={themeUtils.WP(8)} color={palette.common.white} />
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: themeUtils.WP(4),
    marginBottom: themeUtils.WP(2),
  },
  sectionTitle: {
    fontSize: themeUtils.WP(5),
    fontWeight: 'bold',
  },
  taskCount: {
    fontSize: themeUtils.WP(3.5),
  },
  listContainer: {
    paddingBottom: themeUtils.WP(20), // Extra padding at the bottom for FAB
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: themeUtils.WP(6),
    right: themeUtils.WP(6),
    width: themeUtils.WP(14),
    height: themeUtils.WP(14),
    borderRadius: themeUtils.WP(7),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: themeUtils.WP(20),
  },
  emptyStateTitle: {
    fontSize: themeUtils.WP(5),
    fontWeight: 'bold',
    marginTop: themeUtils.WP(4),
    marginBottom: themeUtils.WP(2),
  },
  emptyStateSubtitle: {
    fontSize: themeUtils.WP(3.5),
    textAlign: 'center',
    paddingHorizontal: themeUtils.WP(10),
  },
});

export default Dashboard;
