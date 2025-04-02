import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../@core/infrustructure/theme/useAppTheme';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme as themeUtils } from '../@core/infrustructure/theme';

interface TaskCardProps {
  id: string;
  title: string;
  completed: boolean;
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
  const { palette } = useAppTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: palette.background.paper }]}>
          <View style={styles.modalHeader}>
            <Icon name="alert-circle-outline" size={themeUtils.WP(8)} color={palette.error.main} />
            <Text style={[styles.modalTitle, { color: palette.text.title }]}>Delete Task</Text>
          </View>

          <Text style={[styles.modalMessage, { color: palette.text.body }]}>
            Are you sure you want to delete "{taskTitle}"?
          </Text>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: palette.background.default }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: palette.text.body }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: palette.error.main }]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, { color: palette.common.white }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  completed,
  onDelete,
  onToggleComplete,
}) => {
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const { palette } = useAppTheme();
  const navigation = useNavigation();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

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
    // Navigate to edit task screen
    // @ts-ignore
    navigation.navigate('EditTask', { taskId: id });
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    onDelete(id);
  };

  return (
    <>
      <Animated.View
        style={[
          styles.cardContainer,
          {
            backgroundColor: palette.background.card,
            borderLeftColor: completed ? palette.success.main : palette.primary.main,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.completionCircle}
          onPress={handlePress}
        >
          <View
            style={[
              styles.checkCircle,
              {
                backgroundColor: completed ? palette.success.main : 'transparent',
                borderColor: completed ? palette.success.main : palette.grey[400],
              },
            ]}
          >
            {completed && (
              <Icon name="check" size={themeUtils.WP(4)} color={palette.common.white} />
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.taskContent}>
          <Text
            style={[
              styles.taskTitle,
              {
                color: palette.text.title,
                textDecorationLine: completed ? 'line-through' : 'none',
                opacity: completed ? 0.7 : 1,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.taskStatus,
              {
                color: completed ? palette.success.main : palette.primary.main,
              },
            ]}
          >
            {completed ? 'Completed' : 'In Progress'}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleEdit}
          >
            <Icon name="pencil-outline" size={themeUtils.WP(5)} color={palette.secondary.main} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Icon name="delete-outline" size={themeUtils.WP(5)} color={palette.error.main} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
        taskTitle={title}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: themeUtils.WP(4),
    marginHorizontal: themeUtils.WP(4),
    marginVertical: themeUtils.WP(2),
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  completionCircle: {
    paddingRight: themeUtils.WP(3),
  },
  checkCircle: {
    width: themeUtils.WP(6),
    height: themeUtils.WP(6),
    borderRadius: themeUtils.WP(3),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
    paddingHorizontal: themeUtils.WP(2),
  },
  taskTitle: {
    fontSize: themeUtils.WP(4),
    fontWeight: '600',
    marginBottom: themeUtils.WP(1),
  },
  taskStatus: {
    fontSize: themeUtils.WP(3),
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: themeUtils.WP(2),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 12,
    padding: themeUtils.WP(5),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: themeUtils.WP(4),
  },
  modalTitle: {
    fontSize: themeUtils.WP(4.5),
    fontWeight: 'bold',
    marginTop: themeUtils.WP(2),
  },
  modalMessage: {
    fontSize: themeUtils.WP(4),
    textAlign: 'center',
    marginBottom: themeUtils.WP(6),
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: themeUtils.WP(3),
    paddingHorizontal: themeUtils.WP(5),
    borderRadius: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: themeUtils.WP(3.5),
    fontWeight: '600',
  },
});

export default TaskCard;
