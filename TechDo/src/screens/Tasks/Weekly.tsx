import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';

// ** Utils
import { Task } from '../../utils/constants';
import { theme as themeUtils } from '../../@core/infrustructure/theme';
import { useAppTheme } from '../../@core/infrustructure/theme/useAppTheme';
import { TaskContext } from './TaskTabs';
import { handleToggleComplete, handleDeleteTask, renderEmptyState, renderLoadingSpinner } from '../../utils/utils';

// ** Custom Components
import TaskCard from '../../components/TaskCard';

// ** Styled Components
import {
  TasksList,
  SectionHeader,
  SectionTitle,
  TaskCount,
} from '../../styles/screens/Dashboard';

const Weekly: React.FC = () => {
  const { palette } = useAppTheme();
  const { weeklyTasks, refreshTasks, isLoading } = useContext(TaskContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Update local tasks state when weeklyTasks from context changes
  useEffect(() => {
    setTasks(weeklyTasks);
  }, [weeklyTasks]);

  // Calculate task completion stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  // Render a loading state when tasks are being fetched
  if (isLoading && tasks.length === 0) {
    return renderLoadingSpinner(palette);
  }

  return (
    <View style={{ flex: 1, backgroundColor: palette.background.paper, paddingTop: themeUtils.WP(4) }}>
      <SectionHeader>
        <SectionTitle>
          Weekly Tasks
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
            onDelete={(id) => handleDeleteTask(id, tasks, setTasks, refreshTasks)}
            onToggleComplete={(id, completed) =>
              handleToggleComplete(id, completed, tasks, setTasks, refreshTasks)}
          />
        )}
        keyExtractor={(item: Task) => item.id}
        ListEmptyComponent={() => renderEmptyState(palette, 'No Weekly Tasks Yet', 'Tap the + button to add a weekly task')}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Weekly;
