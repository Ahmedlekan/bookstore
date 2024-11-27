import mongoose from "mongoose"
import { BookType } from "../types/types";

const bookSchema = new mongoose.Schema<BookType>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, required: true },
    categories: {
      type: [String], 
      enum: ["Fantasy", "History", "Cook Book", "Romance"],
      required: true,
    },
    imageUrls: { type: [String], required: true },
    oldPrice: { type: Number, required: false },
    newPrice: { type: Number, required: false },
    trending: { type: Boolean, required: false },
  },
  { timestamps: true } 
);

  const Book = mongoose.model('Book', bookSchema);

  export default Book;