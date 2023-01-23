import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import productReducer from "./reducers/products";
import cartReducer from "./reducers/cart";

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
