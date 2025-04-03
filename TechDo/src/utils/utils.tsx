import {JSX} from 'react';
import {Platform, View, ActivityIndicator} from 'react-native';
import {Task} from './constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {toggleTaskComplete, deleteTask} from '../@core/auth/TaskService';
import {theme as AppTheme} from '../@core/infrustructure/theme';
import {
  EmptyStateContainer,
  EmptyStateTitle,
  EmptyStateSubtitle,
} from '../styles/screens/Dashboard';

// ** Third Party Packages
import Toast from 'react-native-toast-message';

export const isTablet = AppTheme?.scrWidth > 500;

// ** Show Toast method to show toast messages
export const showToast = ({
  type,
  title,
  message,
}: {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'bottom',
    visibilityTime: 2000,
    autoHide: true,
  });
};

// Check for empty objects
export const isObjEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

export const renderLoadingSpinner = (palette: Record<string, any>) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.background.paper,
      }}>
      <ActivityIndicator size="large" color={palette.primary.main} />
    </View>
  );
};

export const renderEmptyState = (
  palette: Record<string, any>,
  title: string,
  subtitle: string,
) => {
  return (
    <EmptyStateContainer>
      <Icon
        name="clipboard-text-outline"
        size={50}
        color={palette.text.secondary}
      />
      <EmptyStateTitle>{title}</EmptyStateTitle>
      <EmptyStateSubtitle>{subtitle}</EmptyStateSubtitle>
    </EmptyStateContainer>
  );
};

/**
 * Handle task completion toggle in any task component
 * @param id Task ID
 * @param completed New completion status
 * @param tasks Current tasks array
 * @param setTasks Function to update task state
 * @param refreshCallback Optional callback for refreshing task data
 */
export const handleToggleComplete = async (
  id: string,
  completed: boolean,
  tasks: Task[],
  setTasks: (tasks: Task[]) => void,
  refreshCallback?: () => void,
): Promise<void> => {
  try {
    // Optimistically update UI first for better user experience
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? {...task, completed, updatedAt: new Date().getTime()}
        : task,
    );
    setTasks(updatedTasks);

    // Then update in Firestore (won't need to refresh with real-time listeners)
    await toggleTaskComplete(id, completed);
  } catch (error) {
    console.error('Error toggling task completion:', error);

    // Revert UI on error
    const originalTasks = tasks.map(task =>
      task.id === id ? {...task, completed: !completed} : task,
    );
    setTasks(originalTasks);

    // Show error toast
    showToast({
      type: 'error',
      title: 'Error',
      message: 'Failed to update task. Please try again.',
    });
  }
};

/**
 * Handle task deletion in any task component
 * @param id Task ID
 * @param tasks Current tasks array
 * @param setTasks Function to update task state
 * @param refreshCallback Optional callback for refreshing task data
 */
export const handleDeleteTask = async (
  id: string,
  tasks: Task[],
  setTasks: (tasks: Task[]) => void,
  refreshCallback?: () => void,
): Promise<void> => {
  try {
    // Optimistically update UI first for better user experience
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // Then delete from Firestore
    await deleteTask(id);
  } catch (error) {
    console.error('Error deleting task:', error);

    // If error, revert the UI change and show error
    if (refreshCallback) {
      refreshCallback();
    }

    // Show error toast
    showToast({
      type: 'error',
      title: 'Error',
      message: 'Failed to delete task. Please try again.',
    });
  }
};

export const lightenColor = (hex: string, percent: number): string => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Lighten each color channel
  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
