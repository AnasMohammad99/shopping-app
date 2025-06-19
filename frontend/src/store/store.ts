import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

// Persist cart to localStorage on every change
store.subscribe(() => {
  const { items, total } = store.getState().cart;
  localStorage.setItem("cart", JSON.stringify({ items, total }));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
