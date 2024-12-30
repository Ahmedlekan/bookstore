// import mongoose from "mongoose";

export type BookCategory = "Fantasy" | "History" | "Cook Book" | "Romance";

export interface BookType {
  _id: string;
  userId: string
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

export type UserType = {
  name: string;
  email: string;
  password?: string;
  googleId?: string; // Google ID for users signing in with Google
  profilePicture?: string; // URL to the user's profile picture
  createdAt: Date;
  updatedAt: Date;
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
  userId: string
  items: CartItem[]; 
}


