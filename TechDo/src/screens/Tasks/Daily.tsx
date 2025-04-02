import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Utils
import { dailyTasks, Task } from '../../utils/constants';
import { theme as themeUtils } from '../../@core/infrustructure/theme';
import { useAppTheme } from '../../@core/infrustructure/theme/useAppTheme';

// ** Custom Components
import TaskCard from '../../components/TaskCard';

// ** Styled Components
import {
  TasksList,
  SectionHeader,
  SectionTitle,
  TaskCount,
  EmptyStateContainer,
  EmptyStateTitle,
  EmptyStateSubtitle,
} from '../../styles/screens/Dashboard';

const Daily: React.FC = () => {
  const { palette } = useAppTheme();
  const [tasks, setTasks] = useState<Task[]>(dailyTasks);

  // Handle task completion toggle
  const handleToggleComplete = (id: string, completed: boolean) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed, updatedAt: new Date().getTime() } : task
    );
    setTasks(updatedTasks);
  };

  // Handle task deletion
  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
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
        No Daily Tasks Yet
      </EmptyStateTitle>
      <EmptyStateSubtitle>
        Tap the + button to add a daily task
      </EmptyStateSubtitle>
    </EmptyStateContainer>
  );

  // Calculate task completion stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <View style={{ flex: 1, backgroundColor: palette.background.paper, paddingTop: themeUtils.WP(4) }}>
      <SectionHeader>
        <SectionTitle>
          Daily Tasks
        </SectionTitle>
        <TaskCount>
          {completedTasks}/{totalTasks} completed
        </TaskCount>
      </SectionHeader>

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
    </View>
  );
};

export default Daily;
