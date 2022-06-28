import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import projectsReducer from '../features/Projects/projectsSlice';
import linksSlice from '../features/Links/linksSlice';
import followerSlice from '../features/followers/followerSlice';
import searchSlice from '../features/SearchPage/searchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    links: linksSlice,
    followers: followerSlice,
    search: searchSlice
  },
  devTools: !(process.env.NODE_ENV === 'production')
});
