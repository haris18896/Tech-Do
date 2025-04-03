import { firestore } from '../../config/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Task } from '../../utils/constants';
import { showToast } from '../../utils/utils';

// Create a new task
export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await firestore()
      .collection('tasks')
      .add({
        ...taskData,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    showToast({
      type: 'success',
      title: 'Success',
      message: 'Task created successfully',
    });

    return docRef.id;
  } catch (error: any) {
    showToast({
      type: 'error',
      title: 'Error',
      message: error.message || 'Failed to create task',
    });
    throw error;
  }
};

// Get tasks by user ID and category
export const getTasksByCategory = async (userId: string, category?: 'daily' | 'weekly' | 'monthly'): Promise<Task[]> => {
  try {
    let query = firestore().collection('tasks').where('userId', '==', userId);

    if (category) {
      query = query.where('category', '==', category);
    }

    query = query.orderBy('createdAt', 'desc');

    const querySnapshot = await query.get();

    return querySnapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description || '',
        completed: data.completed,
        createdAt: data.createdAt?.toMillis() || Date.now(),
        updatedAt: data.updatedAt?.toMillis() || Date.now(),
        dueDate: data.dueDate?.toMillis(),
        priority: data.priority,
        category: data.category,
        userId: data.userId,
      } as Task;
    });
  } catch (error: any) {
    console.log('error : ', JSON.stringify(error));
    showToast({
      type: 'error',
      title: 'Error',
      message: error.message || 'Failed to fetch tasks',
    });
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  try {
    await firestore()
      .collection('tasks')
      .doc(taskId)
      .update({
        ...updates,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    showToast({
      type: 'success',
      title: 'Success',
      message: 'Task updated successfully',
    });
  } catch (error: any) {
    showToast({
      type: 'error',
      title: 'Error',
      message: error.message || 'Failed to update task',
    });
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await firestore()
      .collection('tasks')
      .doc(taskId)
      .delete();

    showToast({
      type: 'success',
      title: 'Success',
      message: 'Task deleted successfully',
    });
  } catch (error: any) {
    showToast({
      type: 'error',
      title: 'Error',
      message: error.message || 'Failed to delete task',
    });
    throw error;
  }
};

// Toggle task completion status
export const toggleTaskComplete = async (taskId: string, completed: boolean): Promise<void> => {
  try {
    await firestore()
      .collection('tasks')
      .doc(taskId)
      .update({
        completed,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    showToast({
      type: 'success',
      title: 'Success',
      message: `Task marked as ${completed ? 'completed' : 'incomplete'}`,
    });
  } catch (error: any) {
    showToast({
      type: 'error',
      title: 'Error',
      message: error.message || 'Failed to update task status',
    });
    throw error;
  }
};
