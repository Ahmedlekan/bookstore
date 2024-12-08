// import mongoose from "mongoose";

export type BookCategory = "Fantasy" | "History" | "Cook Book" | "Romance";

export interface BookType {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  description: string;
  categories: BookCategory[];
  imageUrls: string[];
  oldPrice?: number; 
  newPrice: number;
  trending?: boolean;
}

export interface UserType {
    username: string;
    email: string;
    password: string;
}

export type BookFilterResponse = {
  data: BookType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type CartItemItemsProps = {
  bookId: string
  title: string
  author?: string;
  oldPrice?: number; 
  newPrice: number;
  image: string[];
  quantity: number
};
 
export type CartItem = {
  bookId: BookType 
  quantity: number
};

export type CartType = {
  items: CartItem[]; 
}


