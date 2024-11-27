export type BookCategory = "Fantasy" | "History" | "Cook Book" | "Romance";

export interface BookType {  
  title: string;
  author: string;
  publisher: string;
  price: string; // Price as a formatted string (e.g., "$19.99")
  description: string;
  sku: string;
  categories: BookCategory[];
  imageUrls: string[]; // URL or path to the image
  oldPrice?: number; // Optional: Previous price for discounted items
  newPrice?: number; // Optional: Current price for discounted items
  trending?: boolean; // Optional: Flag to mark as trending
}

export interface UserType {
    username: string;
    password: string;
    role: 'user' | 'admin';
  }