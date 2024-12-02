import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending' | 'overdue';
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskComplete,
  setFilter,
  setSearchQuery,
} = taskSlice.actions;

export default taskSlice.reducer;