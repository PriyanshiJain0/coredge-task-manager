import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Task } from "../utils/interfaces";

interface TaskList {
  tasks: Task[];
  selected: Task | null;
}

// Define the initial state using that type
const initialState: TaskList = {
  tasks: [],
  selected: null,
};

export const taskReducer = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, { payload }) => {
      const task = { ...payload, id: `task_${state.tasks.length + 1}` };
      const taskslist = [...state.tasks, task];
      state = { ...state, tasks: taskslist, selected: null };
      return state;
    },
    removeTask: (state, { payload }) => {
      const updatedTaskList = state.tasks.filter(
        (task) => task.id !== payload.id
      );

      return { ...state, tasks: updatedTaskList };
    },
    updateTask: (state, { payload }) => {
      const updatedTaskList = state.tasks.map((task) =>
        task.id === payload.id ? payload : task
      );

      return { ...state, tasks: updatedTaskList, selected: null };
    },
    setSelected: (state, { payload }) => {
      state = { ...state, selected: payload };
      return state;
    },
    clearSelected: (state) => {
      state = { ...state, selected: null };
      return state;
    },
  },
});

export const {
  createTask,
  removeTask,
  updateTask,
  clearSelected,
  setSelected,
} = taskReducer.actions;

// Other code such as selectors can use the imported `RootState` type
export const getTasks = (state: RootState) => state.taskReducer.tasks;
export const getSelectedTask = (state: RootState) => state.taskReducer.selected;

export default taskReducer.reducer;
