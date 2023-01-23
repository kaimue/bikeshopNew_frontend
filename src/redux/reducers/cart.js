import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
  },
  reducers: {
    setCart: (state, action) => {
      const copy = state.cartProducts.slice();
      copy.push(action.payload);
      state.cartProducts = copy;
    },
    setCartDeleted: (state, action) => {
      const deleted = state.cartProducts.filter((product) => {
        return product._id !== action.payload;
      });
      console.log(deleted);
      state.cartProducts = deleted;
    },
  },
});

export const { setCart, setCartDeleted } = cartSlice.actions;

export default cartSlice.reducer;
