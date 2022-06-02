import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import projectsReducer from '../features/Projects/projectsSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer
  },
  devTools: !(process.env.NODE_ENV === 'production')
});
