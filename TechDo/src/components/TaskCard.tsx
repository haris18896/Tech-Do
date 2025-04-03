import React from 'react';
import { Modal, Animated } from 'react-native';

// ** Third Party Packages
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../@core/infrustructure/theme/useAppTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Utils
import { theme as themeUtils } from '../@core/infrustructure/theme';

// ** Custom Components
import {
  TaskTitle,
  TaskStatus,
  ModalTitle,
  ButtonText,
  ModalHeader,
  ModalButton,
  CheckCircle,
  ModalOverlay,
  TaskContent,
  ModalActions,
  ActionButton,
  ModalMessage,
  CardContainer,
  ModalContainer,
  CompletionCircle,
  ActionsContainer,
  PriorityBadge,
  PriorityText,
  TaskInfoRow,
} from '../styles/components/TaskCard';

interface TaskCardProps {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

const DeleteConfirmModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onConfirm,
  taskTitle,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContainer>
          <ModalHeader>
            <Icon name="alert-circle-outline" size={themeUtils.WP(8)} color="#EA5455" />
            <ModalTitle>Delete Task</ModalTitle>
          </ModalHeader>

          <ModalMessage>
            Are you sure you want to delete "{taskTitle}"?
          </ModalMessage>

          <ModalActions>
            <ModalButton onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </ModalButton>

            <ModalButton variant="danger" onPress={onConfirm}>
              <ButtonText variant="danger">Delete</ButtonText>
            </ModalButton>
          </ModalActions>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
};

// Helper function to get priority icon and color
const getPriorityInfo = (priority: 'low' | 'medium' | 'high', palette: any) => {
  switch (priority) {
    case 'high':
      return {
        icon: 'flag',
        color: palette.error.main,
        label: 'High',
      };
    case 'medium':
      return {
        icon: 'flag',
        color: palette.warning.main,
        label: 'Medium',
      };
    case 'low':
      return {
        icon: 'flag',
        color: palette.success.main,
        label: 'Low',
      };
    default:
      return {
        icon: 'flag-outline',
        color: palette.text.secondary,
        label: 'None',
      };
  }
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  completed,
  priority,
  onDelete,
  onToggleComplete,
}) => {
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const { palette } = useAppTheme();
  // @ts-ignore
  const navigation = useNavigation();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  // Get priority details based on the priority level
  const priorityInfo = getPriorityInfo(priority, palette);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggleComplete(id, !completed);
  };

  const handleEdit = () => {
    // Navigate to task form with the taskId parameter for edit mode
    console.log('Navigating to edit task with ID:', id);
    navigation.navigate('TaskForm', { taskId: id });
  };

  console.log('Navigating to edit task with ID:', id);

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    onDelete(id);
  };

  return (
    <>
      <CardContainer
        style={{ transform: [{ scale: scaleAnim }] }}
        completed={completed}
        priority={priority}
      >
        <CompletionCircle onPress={handlePress}>
          <CheckCircle completed={completed}>
            {completed && (
              <Icon name="check" size={themeUtils.WP(4)} color="#FFF" />
            )}
          </CheckCircle>
        </CompletionCircle>

        <TaskContent>
          <TaskTitle completed={completed}>
            {title}
          </TaskTitle>

          <TaskInfoRow>
            <TaskStatus completed={completed}>
              {completed ? 'Completed' : 'In Progress'}
            </TaskStatus>

            <PriorityBadge color={priorityInfo.color}>
              <Icon name={priorityInfo.icon} size={themeUtils.WP(3)} color={priorityInfo.color} />
              <PriorityText color={priorityInfo.color}>{priorityInfo.label}</PriorityText>
            </PriorityBadge>
          </TaskInfoRow>
        </TaskContent>

        <ActionsContainer>
          <ActionButton onPress={handleEdit}>
            <Icon name="pencil-outline" size={themeUtils.WP(5)} color={palette.secondary.main} />
          </ActionButton>

          <ActionButton onPress={() => setDeleteModalVisible(true)}>
            <Icon name="delete-outline" size={themeUtils.WP(5)} color={palette.error.main} />
          </ActionButton>
        </ActionsContainer>
      </CardContainer>

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
        taskTitle={title}
      />
    </>
  );
};

export default TaskCard;
