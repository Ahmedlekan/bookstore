import mongoose from "mongoose"
import { CartType } from "../types/types";


const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});


const Cart = mongoose.model<CartType>("Cart", CartSchema);

export default Cart
