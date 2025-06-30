import { BookType } from "../../../backend/src/types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

// add a book 
export const addBook = async(bookFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/admin/create-book`, {
        credentials:"include",
        method: "POST",
        body: bookFormData
    })
    if(!response.ok){
        throw new Error("Error adding book");
    }
    return response.json()
}

//fetch all books
export const allBooks = async(): Promise<BookType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/admin`, {
        credentials: "include"
    })
    if(!response.ok){
        console.log("Error fetchinh Products")
    }
    return response.json()
}

//fetch a book by Id
export const fetchBookById = async(bookId: string): Promise<BookType>=>{
    const response = await fetch(`${API_BASE_URL}/api/admin/${bookId}`, {
        credentials: "include"
    })
    if(!response.ok){
        console.log("Error fetchinh Products")
    }
    return response.json()
}

// for updating a book
export const updateBookById = async(bookFormData: FormData)=>{
    const bookId = bookFormData.get("bookId")
    if(!bookId){
        throw new Error("Book ID is required");
    }
    const response = await fetch(`${API_BASE_URL}/api/admin/${bookId}`, {
        method:"PUT",
        body: bookFormData,
        credentials:"include"
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the book.");
    }
    return response;
}

//for deleting a book
export const deleteBook = async(bookId: string)=>{
    const response = await fetch(`${API_BASE_URL}/api/admin/${bookId}`, {
        method: "DELETE",
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Book not deleted");
    }
    return response.json()
}