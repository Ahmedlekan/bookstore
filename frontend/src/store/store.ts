import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../store/cart/cartSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
})