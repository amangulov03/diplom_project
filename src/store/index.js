// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import livestockReducer from './livestockSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    livestock: livestockReducer,
  },
});

export default store;
