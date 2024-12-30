import { BookFilterResponse }  from "../../../backend/src/types/types"
import { BookType } from "../../../backend/src/types/types";
import { CartItemItemsProps } from "../../../backend/src/types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

export type SearchParams = {
    categories?: string[]
    page?: string;
    maxPrice?: string;
    sortOption?: string;
};

export const searchBooks = async (searchParams: SearchParams): Promise<BookFilterResponse> => {
    const queryParams = new URLSearchParams();

    if (searchParams.page) queryParams.append("page", searchParams.page);
    if (searchParams.sortOption) queryParams.append("sortOption", searchParams.sortOption);
    if (searchParams.maxPrice) queryParams.append("maxPrice", searchParams.maxPrice);

    // Only add categories if the array is not empty
    if (searchParams.categories?.length) {
        searchParams.categories.forEach((category) => queryParams.append("categories", category));
    }

    console.log("Query Params:", queryParams.toString()); // Debugging

    const response = await fetch(`${API_BASE_URL}/api/general/search?${queryParams}`);
    if (!response.ok) {
        throw new Error("Error fetching books");
    }

    return response.json();
};

export const fetchAllBooks = async (): Promise<BookType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/general/general-books`, {
        credentials: "include",
    })

    const data = await response.json();
    return data;
}

// add book to the cart
export const addToCart = async (bookId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/general/add-to-cart`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({bookId, quantity: 1}),
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
    
      const data =  await response.json();

      return data
}

// fetch cart Items
export const fetchCartItems = async () => {
    const response = await fetch(`${API_BASE_URL}/api/general/fetch-cart-items`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cart items");
    }

    const data = await response.json();

    // Ensure items are returned correctly
    return data.items || []; // Return an empty array if no items are found
};


// for creating payment intent
export const createPaymentIntent = async (cartItems: CartItemItemsProps[]) => {
    const response = await fetch(`${API_BASE_URL}/api/stripe/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),  // Send cart items to the backend
    });

    if (!response.ok) throw new Error("Error fetching payment intent");

    const { url } = await response.json();
    console.log("Stripe session URL:", url); 
    return url;
};

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

// update book quantity
export const updateCartQuantity = async (bookId: string, quantity: number) => {
    
    console.log("Payload sent to updateCartQuantity:", { bookId, quantity });

    const response = await fetch(`${API_BASE_URL}/api/general/update-cart-quantity`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, quantity }),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to update cart quantity");
    }

    return response.json();
};

// delete an item from the cart
export const deleteCartItem = async (bookId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/general/delete-cart-item`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({bookId }),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to delete cart item");
    }

    return response.json();
};


