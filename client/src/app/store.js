import { configureStore } from '@reduxjs/toolkit';
import userDetailStore from '../features/userDetail/userSlice';

export default configureStore({
  reducer: {
    userDetail: userDetailStore,
  },
});
