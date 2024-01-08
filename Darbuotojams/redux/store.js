import { configureStore } from '@reduxjs/toolkit';
import OrderReducer from './OrderSlice';

const store = configureStore({
  reducer: {
    orders: OrderReducer,
  },
});

export default store;