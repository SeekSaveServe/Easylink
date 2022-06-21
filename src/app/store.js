import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import projectsReducer from '../features/Projects/projectsSlice';
import linksSlice from '../features/Links/linksSlice';
import followerSlice from '../features/followers/followerSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    links: linksSlice,
    followers: followerSlice
  },
  devTools: !(process.env.NODE_ENV === 'production')
});
