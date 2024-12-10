import { configureStore } from "@reduxjs/toolkit";
import counerReduser from './slice';

const store = configureStore({
  reducer: {
    counter: counerReduser
  }
})

export default store;