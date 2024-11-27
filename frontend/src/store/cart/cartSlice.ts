import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    cartItems: []
  }
  
  const initialState: CounterState = {
    cartItems: [],
  }

  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const existingItem = state.cartItems.find((item)=> item._id === action.payload._id)
            if(!existingItem){
                state.cartItems.push(action.payload)
                alert("item added to the cart")
            } else{
                alert("item already exist")
            }
        }
    },
  })

  export const {addToCart} = cartSlice.actions
  export default cartSlice.reducer
  