import { configureStore } from '@reduxjs/toolkit';
import OrderReducer from './OrderSlice';
import MenuReducer from './MenuSlice';

const store = configureStore({
  reducer: {
    orders: OrderReducer,
    menuItems: MenuReducer,
  },
});

export default store;
