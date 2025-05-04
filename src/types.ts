import { store } from './store';

export interface Task {
  id: number;
  title: string;
  about: string;
}

export type TasksMap = Map<number, Task>;

export interface DeletePopupState {
  isVisible: boolean;
  isConfirm: boolean;
}

export interface TasksState {
  taskId: number;
  currentTask: number;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;