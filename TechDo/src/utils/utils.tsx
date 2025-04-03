import { JSX } from 'react';
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

// Type guard to check if an object is empty
export const isObjEmpty = (obj: Record<string, any>): boolean =>
  Object.keys(obj).length === 0;

// Define toast options interface
interface ToastOptions {
  title?: string;
  message?: string | any;
  type?: 'success' | 'error' | 'info' | 'warning';
}

// Show a toast message
export const showToast = ({
  title = 'Title',
  message = 'Message',
  type = 'success',
}: ToastOptions): void => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    topOffset: Platform.OS === 'ios' ? AppTheme.WP(15) : AppTheme.WP(10),
    // @ts-ignore - React Native Toast Message does support customText
    customText: {
      text1: {
        fontSize: AppTheme.WP(5),
        fontFamily: AppTheme.fonts.semiBold,
        fontWeight: AppTheme.fontWeights.semiBold,
      },
      text2: {
        fontSize: AppTheme.WP(3.5),
        fontFamily: AppTheme.fonts?.medium,
        fontWeight: AppTheme.fontWeights.medium,
      },
    },
  });
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
  refreshCallback?: () => void
): Promise<void> => {
  try {
    // Update in Firestore
    await toggleTaskComplete(id, completed);

    // Update locally until refresh happens
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed, updatedAt: new Date().getTime() } : task
    );
    setTasks(updatedTasks);

    // Call refresh if provided
    if (refreshCallback) {
      refreshCallback();
    }
  } catch (error) {
    console.error('Error toggling task completion:', error);
  }
};

/**
 * Handle task deletion in any task component
 * @param id Task ID to delete
 * @param tasks Current tasks array
 * @param setTasks Function to update task state
 * @param refreshCallback Optional callback for refreshing task data
 */
export const handleDeleteTask = async (
  id: string,
  tasks: Task[],
  setTasks: (tasks: Task[]) => void,
  refreshCallback?: () => void
): Promise<void> => {
  try {
    // Delete from Firestore
    await deleteTask(id);

    // Update locally until refresh happens
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // Call refresh if provided
    if (refreshCallback) {
      refreshCallback();
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

/**
 * Render the empty state component with customizable messages
 * @param palette The theme palette for styling
 * @param title The title to display in the empty state
 * @param subtitle The subtitle to display in the empty state
 */
export const renderEmptyState = (
  palette: any,
  title: string = 'No Tasks Yet',
  subtitle: string = 'Tap the + button to add your first task'
): JSX.Element => (
  <EmptyStateContainer>
    <Icon
      name="checkbox-blank-circle-outline"
      size={AppTheme.WP(20)}
      color={palette.grey[300]}
    />
    <EmptyStateTitle>{title}</EmptyStateTitle>
    <EmptyStateSubtitle>{subtitle}</EmptyStateSubtitle>
  </EmptyStateContainer>
);

/**
 * Render a loading spinner component
 * @param palette The theme palette for styling
 */
export const renderLoadingSpinner = (palette: any): JSX.Element => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: palette.background.paper }}>
    <ActivityIndicator size="large" color={palette.primary.main} />
  </View>
);

