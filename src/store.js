import { configureStore } from "@reduxjs/toolkit";
import tasksReduser from './slice';

const store = configureStore({
  reducer: {
    tasks: tasksReduser
  }
})

export default store;