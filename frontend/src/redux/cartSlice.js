import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: 'Cash on Delivery',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // Very basic add to cart logic (doesn't handle customizations properly yet)
      const existItem = state.cartItems.find((x) => x.name === item.name && x.size === item.size);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.name === existItem.name && x.size === existItem.size ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeFromCart: (state, action) => {
      // payload should uniquely identify item (e.g. combination of name and size)
      state.cartItems = state.cartItems.filter(
        (x) => !(x.name === action.payload.name && x.size === action.payload.size)
      );
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
