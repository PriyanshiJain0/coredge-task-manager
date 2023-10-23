import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/tasksSlice";
export const store = configureStore({
  reducer: {
    userReducer,
    taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
