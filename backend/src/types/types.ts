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
    password: string;
    role: 'user' | 'admin';
  }

  export type BookFilterResponse = {
    data: BookType[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };