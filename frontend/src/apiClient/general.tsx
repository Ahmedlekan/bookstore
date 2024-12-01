import { BookFilterResponse }  from "../../../backend/src/types/types"
import { BookType } from "../../../backend/src/types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

export type SearchParams = {
    category?: string[]
    page?: string;
    maxPrice?: string;
    sortOption?: string;
};

export const searchBookss = async (searchParams : SearchParams) : Promise<BookFilterResponse> =>{
    // create new url params object
    const queryParams = new URLSearchParams()

    // Only append if values exist
    if (searchParams.page) queryParams.append("page", searchParams.page);
    if (searchParams.sortOption) queryParams.append("sortOption", searchParams.sortOption);
    if (searchParams.maxPrice) queryParams.append("maxPrice", searchParams.maxPrice);

    searchParams.category?.forEach((cat)=> queryParams.append("category", cat))
    
    const response = await fetch(`${API_BASE_URL}/api/general/search?${queryParams}`)

    if (!response.ok){
        throw new Error("Error fetching books")
    }

    return response.json()
}

export const fetchAllBooks = async (): Promise<BookType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/general/general-books`, {
        credentials: "include",
    })

    const data = await response.json();
    return data;
}

export const fetchBookById = async(bookId: string): Promise<BookType>=>{
    const response = await fetch(`${API_BASE_URL}/api/general/${bookId}`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Failed to fetch book");
    }

    const data = await response.json();

    return data;
}