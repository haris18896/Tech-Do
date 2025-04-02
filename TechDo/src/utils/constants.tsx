// Firebase-friendly timestamp (milliseconds since epoch)
const now = new Date().getTime();
const yesterday = now - 86400000;
const twoDaysAgo = now - 172800000;
const nextWeek = now + 604800000;

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
  priority: 'low' | 'medium' | 'high';
  category: 'daily' | 'weekly' | 'monthly';
  userId: string; // For future Firebase integration
}

// Mock user ID for future Firebase integration
const MOCK_USER_ID = 'user123';

export const dailyTasks: Task[] = [
  {
    id: 'd1',
    title: 'Morning Exercise',
    description: 'Complete 30 minutes of cardio workout',
    completed: false,
    createdAt: yesterday,
    updatedAt: yesterday,
    dueDate: now + 3600000, // 1 hour from now
    priority: 'high',
    category: 'daily',
    userId: MOCK_USER_ID,
  },
  {
    id: 'd2',
    title: 'Read 30 pages of a book',
    description: 'Continue reading "Atomic Habits"',
    completed: false,
    createdAt: twoDaysAgo,
    updatedAt: yesterday,
    dueDate: now + 7200000, // 2 hours from now
    priority: 'medium',
    category: 'daily',
    userId: MOCK_USER_ID,
  },
  {
    id: 'd3',
    title: 'Prepare breakfast',
    description: 'Make a healthy breakfast with eggs and avocado',
    completed: true,
    createdAt: yesterday,
    updatedAt: now,
    dueDate: now - 3600000, // 1 hour ago
    priority: 'medium',
    category: 'daily',
    userId: MOCK_USER_ID,
  },
  {
    id: 'd4',
    title: 'Check emails',
    description: 'Respond to important emails and clear inbox',
    completed: false,
    createdAt: now - 7200000,
    updatedAt: now - 7200000,
    dueDate: now + 10800000, // 3 hours from now
    priority: 'low',
    category: 'daily',
    userId: MOCK_USER_ID,
  },
  {
    id: 'd5',
    title: 'Team meeting',
    description: 'Daily standup with the development team',
    completed: true,
    createdAt: yesterday,
    updatedAt: now - 14400000,
    dueDate: now - 10800000, // 3 hours ago
    priority: 'high',
    category: 'daily',
    userId: MOCK_USER_ID,
  },
];

export const weeklyTasks: Task[] = [
  {
    id: 'w1',
    title: 'Grocery Shopping',
    description: 'Buy vegetables, fruits, and other essentials',
    completed: false,
    createdAt: twoDaysAgo,
    updatedAt: twoDaysAgo,
    dueDate: now + 259200000, // 3 days from now
    priority: 'medium',
    category: 'weekly',
    userId: MOCK_USER_ID,
  },
  {
    id: 'w2',
    title: 'Clean the house',
    description: 'Vacuum, dust, and clean the bathroom',
    completed: true,
    createdAt: twoDaysAgo,
    updatedAt: yesterday,
    dueDate: yesterday,
    priority: 'low',
    category: 'weekly',
    userId: MOCK_USER_ID,
  },
  {
    id: 'w3',
    title: 'Attend a workshop',
    description: 'Web development workshop on Saturday',
    completed: false,
    createdAt: twoDaysAgo,
    updatedAt: twoDaysAgo,
    dueDate: now + 432000000, // 5 days from now
    priority: 'high',
    category: 'weekly',
    userId: MOCK_USER_ID,
  },
];

export const monthlyTasks: Task[] = [
  {
    id: 'm1',
    title: 'Pay bills',
    description: 'Pay electricity, water, and internet bills',
    completed: false,
    createdAt: yesterday,
    updatedAt: yesterday,
    dueDate: now + 864000000, // 10 days from now
    priority: 'high',
    category: 'monthly',
    userId: MOCK_USER_ID,
  },
  {
    id: 'm2',
    title: 'Visit family',
    description: 'Weekend trip to parents\' house',
    completed: true,
    createdAt: twoDaysAgo,
    updatedAt: yesterday,
    dueDate: yesterday,
    priority: 'medium',
    category: 'monthly',
    userId: MOCK_USER_ID,
  },
  {
    id: 'm3',
    title: 'Plan a trip',
    description: 'Research destinations and book accommodations',
    completed: false,
    createdAt: twoDaysAgo,
    updatedAt: twoDaysAgo,
    dueDate: nextWeek,
    priority: 'low',
    category: 'monthly',
    userId: MOCK_USER_ID,
  },
];

// Get counts for progress calculations
export const getTaskCounts = () => {
  return {
    daily: {
      total: dailyTasks.length,
      completed: dailyTasks.filter(task => task.completed).length,
    },
    weekly: {
      total: weeklyTasks.length,
      completed: weeklyTasks.filter(task => task.completed).length,
    },
    monthly: {
      total: monthlyTasks.length,
      completed: monthlyTasks.filter(task => task.completed).length,
    },
  };
};
