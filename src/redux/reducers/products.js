import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    totalPages: Number,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setProducts, setTotalPages } = productSlice.actions;

export default productSlice.reducer;
