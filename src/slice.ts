import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksState } from "./types";

const initialState: TasksState = {
  taskId: 0,
  currentTask: 0,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    reduceTaskId: (state, action: PayloadAction<number>) => {
      state.taskId = action.payload;
    },
    reduceCurrentTask: (state, action: PayloadAction<number>) => {
      state.currentTask = action.payload;
    }
  }
});

export const { reduceTaskId, reduceCurrentTask } = tasksSlice.actions;
export default tasksSlice.reducer;