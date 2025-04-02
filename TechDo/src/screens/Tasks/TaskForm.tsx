import React, { useState, useEffect } from 'react';
import { ScrollView, View, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import { Layout } from '../../@core/layout';
import { BarHeader } from '../../@core/components';
import { useAppTheme } from '../../@core/infrustructure/theme/useAppTheme';
import { theme as themeUtils } from '../../@core/infrustructure/theme';

// ** Utils
import { dailyTasks, weeklyTasks, monthlyTasks, Task } from '../../utils/constants';

// ** Styled Components
import {
  Container,
  Title,
  InputContainer,
  InputLabel,
  TextInput,
  TextArea,
  DateContainer,
  DateText,
  OptionContainer,
  OptionButton,
  OptionText,
  ActionContainer,
  SubmitButton,
  DeleteButton,
  ButtonText,
  StatusBar,
  StatusIndicator,
  StatusText,
  ModalContent,
  ModalButton,
  ModalButtonText,
  ModalOverlay,
  CalendarRow,
  DayButton,
  DayText,
  MonthYearSelector,
  MonthYearText,
  ArrowButton,
  ModalHeader,
  ModalTitle,
  ModalMessage,
  ModalActions,
} from '../../styles/screens/TaskForm';
import { SafeArea } from '../../styles/infrustucture';

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const { palette } = useAppTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <Icon name="alert-circle-outline" size={themeUtils.WP(8)} color={palette.error.main} />
            <ModalTitle>Delete Task</ModalTitle>
          </ModalHeader>

          <ModalMessage>
            Are you sure you want to delete this task?
          </ModalMessage>

          <ModalActions>
            <SubmitButton style={{ backgroundColor: palette.grey[500] }} onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </SubmitButton>

            <DeleteButton onPress={onConfirm}>
              <ButtonText>Delete</ButtonText>
            </DeleteButton>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

const TaskForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { palette } = useAppTheme();

  // Get taskId from route params
  const taskId = route.params?.taskId;

  console.log('taskId from route params: ', taskId);

  // Determine if we're in edit mode
  const isEditMode = !!taskId;

  // Task state
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [completed, setCompleted] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskNotFound, setTaskNotFound] = useState(false);

  // Find the task if in edit mode
  useEffect(() => {
    if (isEditMode) {
        console.log('check if its running....');
      const allTasks = [...dailyTasks, ...weeklyTasks, ...monthlyTasks];
      const foundTask = allTasks.find(t => t.id === taskId);

      if (foundTask) {
        setTask(foundTask);
        setTitle(foundTask.title);
        setDescription(foundTask.description || '');
        setDueDate(foundTask.dueDate ? new Date(foundTask.dueDate) : new Date());
        setCalendarDate(foundTask.dueDate ? new Date(foundTask.dueDate) : new Date());
        setPriority(foundTask.priority);
        setCategory(foundTask.category);
        setCompleted(foundTask.completed);
      } else {
        setTaskNotFound(true);
      }
    }
  }, [isEditMode, taskId]);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Priority colors
  const priorityColors = {
    low: palette.success.main,
    medium: palette.warning.main,
    high: palette.error.main,
  };

  // Category colors
  const categoryColors = {
    daily: palette.primary.main,
    weekly: palette.secondary.main,
    monthly: palette.info.main,
  };

  // Generate days for custom calendar
  const generateCalendarDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get day of week for first day (0 = Sunday)
    const firstDayOfWeek = firstDay.getDay();

    // Days in the current month
    const daysInMonth = lastDay.getDate();

    // Days from previous month to show
    const daysBefore = firstDayOfWeek;

    // Array to hold all calendar days
    const days = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = prevMonthLastDay - daysBefore + 1; i <= prevMonthLastDay; i++) {
      days.push({ day: i, current: false, date: new Date(year, month - 1, i) });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, current: true, date: new Date(year, month, i) });
    }

    // Add days from next month to complete the calendar grid (6 rows x 7 columns = 42)
    const totalDaysNeeded = 42;
    const daysAfter = totalDaysNeeded - days.length;
    for (let i = 1; i <= daysAfter; i++) {
      days.push({ day: i, current: false, date: new Date(year, month + 1, i) });
    }

    return days;
  };

  // Move to previous month
  const prevMonth = () => {
    const prev = new Date(calendarDate);
    prev.setMonth(prev.getMonth() - 1);
    setCalendarDate(prev);
  };

  // Move to next month
  const nextMonth = () => {
    const next = new Date(calendarDate);
    next.setMonth(next.getMonth() + 1);
    setCalendarDate(next);
  };

  // Select a day from the calendar
  const selectDay = (date: Date) => {
    setDueDate(date);
    setShowDatePicker(false);
  };

  // Toggle task completion status (only in edit mode)
  const toggleComplete = () => {
    setCompleted(!completed);
  };

  // Custom calendar component
  const renderCustomCalendar = () => {
    const days = generateCalendarDays();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <Modal
        transparent
        visible={showDatePicker}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <MonthYearSelector>
              <ArrowButton onPress={prevMonth}>
                <Icon name="chevron-left" size={themeUtils.WP(6)} color={palette.primary.main} />
              </ArrowButton>

              <MonthYearText>
                {calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </MonthYearText>

              <ArrowButton onPress={nextMonth}>
                <Icon name="chevron-right" size={themeUtils.WP(6)} color={palette.primary.main} />
              </ArrowButton>
            </MonthYearSelector>

            <CalendarRow>
              {dayNames.map(day => (
                <DayButton key={day} disabled>
                  <DayText>{day}</DayText>
                </DayButton>
              ))}
            </CalendarRow>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {days.map((day, index) => {
                const isSelected = day.current &&
                  day.date.getDate() === dueDate.getDate() &&
                  day.date.getMonth() === dueDate.getMonth() &&
                  day.date.getFullYear() === dueDate.getFullYear();

                return (
                  <DayButton
                    key={index}
                    selected={isSelected}
                    onPress={() => selectDay(day.date)}
                  >
                    <DayText
                      selected={isSelected}
                      muted={!day.current}
                    >
                      {day.day}
                    </DayText>
                  </DayButton>
                );
              })}
            </View>

            <ModalButton onPress={() => setShowDatePicker(false)}>
              <ModalButtonText>Done</ModalButtonText>
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );
  };

  // Handle task save (either create or update)
  const handleSaveTask = () => {
    if (isEditMode && !task) {
      return;
    }

    const taskData = {
      id: isEditMode ? taskId : `task-${new Date().getTime()}`,
      title,
      description,
      completed: isEditMode ? completed : false,
      createdAt: isEditMode ? task!.createdAt : new Date().getTime(),
      updatedAt: new Date().getTime(),
      dueDate: dueDate.getTime(),
      priority,
      category,
      userId: 'user123', // Replace with actual user ID in a real app
    };

    console.log(`${isEditMode ? 'Updating' : 'Creating'} task:`, taskData);

    // Navigate back to dashboard
    navigation.goBack();
  };

  // Handle task deletion (only in edit mode)
  const handleDeleteTask = () => {
    // In a real app, you would delete this from your database
    console.log('Deleting task with ID:', taskId);

    // Navigate back to dashboard
    navigation.goBack();
  };

  // Show task not found message if in edit mode and task wasn't found
  if (isEditMode && taskNotFound) {
    return (
      <Layout>
        <BarHeader
          showChat={{ badge: false, chat: false }}
          showNotification={{ notification: false, badge: false }}
          onBack={() => navigation.goBack()}
        />
        <Container>
          <Title>Task not found</Title>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
        <SafeArea>


      <BarHeader
        showChat={{ badge: false, chat: false }}
        showNotification={{ notification: false, badge: false }}
        onBack={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Title>{isEditMode ? 'Edit Task' : 'Create New Task'}</Title>

          {/* Status bar - Only shown in edit mode */}
          {isEditMode && (
            <StatusBar>
              <StatusIndicator completed={completed} />
              <StatusText completed={completed}>
                {completed ? 'Completed' : 'In Progress'}
              </StatusText>

              <OptionButton
                style={{ marginLeft: 'auto' }}
                selected={completed}
                color={completed ? palette.success.main : palette.grey[400]}
                onPress={toggleComplete}
              >
                <OptionText selected={completed}>
                  {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                </OptionText>
              </OptionButton>
            </StatusBar>
          )}

          <InputContainer>
            <InputLabel>Task Title</InputLabel>
            <TextInput
              placeholder="Enter task title"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={palette.text.secondary}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>Description</InputLabel>
            <TextArea
              placeholder="Enter task description..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor={palette.text.secondary}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>Due Date</InputLabel>
            <DateContainer onPress={() => setShowDatePicker(true)}>
              <DateText>{formatDate(dueDate)}</DateText>
              <Icon name="calendar" size={themeUtils.WP(5)} color={palette.primary.main} />
            </DateContainer>
            {renderCustomCalendar()}
          </InputContainer>

          <InputContainer>
            <InputLabel>Priority</InputLabel>
            <OptionContainer>
              <OptionButton
                selected={priority === 'low'}
                color={priorityColors.low}
                onPress={() => setPriority('low')}
              >
                <OptionText selected={priority === 'low'}>Low</OptionText>
              </OptionButton>

              <OptionButton
                selected={priority === 'medium'}
                color={priorityColors.medium}
                onPress={() => setPriority('medium')}
              >
                <OptionText selected={priority === 'medium'}>Medium</OptionText>
              </OptionButton>

              <OptionButton
                selected={priority === 'high'}
                color={priorityColors.high}
                onPress={() => setPriority('high')}
              >
                <OptionText selected={priority === 'high'}>High</OptionText>
              </OptionButton>
            </OptionContainer>
          </InputContainer>

          <InputContainer>
            <InputLabel>Category</InputLabel>
            <OptionContainer>
              <OptionButton
                selected={category === 'daily'}
                color={categoryColors.daily}
                onPress={() => setCategory('daily')}
              >
                <OptionText selected={category === 'daily'}>Daily</OptionText>
              </OptionButton>

              <OptionButton
                selected={category === 'weekly'}
                color={categoryColors.weekly}
                onPress={() => setCategory('weekly')}
              >
                <OptionText selected={category === 'weekly'}>Weekly</OptionText>
              </OptionButton>

              <OptionButton
                selected={category === 'monthly'}
                color={categoryColors.monthly}
                onPress={() => setCategory('monthly')}
              >
                <OptionText selected={category === 'monthly'}>Monthly</OptionText>
              </OptionButton>
            </OptionContainer>
          </InputContainer>

        </Container>
      </ScrollView>

      <ActionContainer>
            <SubmitButton onPress={handleSaveTask}>
              <Icon
                name={isEditMode ? 'content-save' : 'check'}
                size={themeUtils.WP(5)}
                color={palette.common.white}
              />
              <ButtonText>
                {isEditMode ? 'Save Changes' : 'Create Task'}
              </ButtonText>
            </SubmitButton>

            {/* Delete button - Only shown in edit mode */}
            {isEditMode && (
              <DeleteButton onPress={() => setDeleteModalVisible(true)}>
                <Icon name="delete" size={themeUtils.WP(5)} color={palette.common.white} />
              </DeleteButton>
            )}
          </ActionContainer>

      {/* Delete confirmation modal - Only used in edit mode */}
      {isEditMode && (
        <DeleteConfirmModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteTask}
        />
      )}
      </SafeArea>
    </Layout>
  );
};

export default TaskForm;
