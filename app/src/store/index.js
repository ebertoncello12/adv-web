import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './user/UserReducer';

export default configureStore({
  reducer: {
    user: UserReducer,
  },
});
