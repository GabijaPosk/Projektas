import { createSlice } from '@reduxjs/toolkit';

const OrderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    visibleUsers: [], 
  },
  reducers: {
    confirmOrderAction: (state, action) => {
      const index = state.orders.findIndex((order) => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...action.payload };
      }
    },
    cancelOrderAction: (state, action) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
    
    setVisibleUsers: (state, action) => {
      state.visibleUsers = action.payload;
    },
  },
});

export const { confirmOrderAction, cancelOrderAction, setVisibleUsers } = OrderSlice.actions;
export default OrderSlice.reducer;