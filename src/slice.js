import {createSlice} from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    taskId: 0,
    currentTask: 0,
  },
  reducers: {
    reduceTaskId: (state, action) => {
      state.taskId = action.payload;
    },
    reduceCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    }
  }
})

export const { reduceTaskId, reduceCurrentTask} = tasksSlice.actions;
export default tasksSlice.reducer;