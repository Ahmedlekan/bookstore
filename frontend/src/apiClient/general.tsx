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

    if (searchParams.categories?.length) {
        searchParams.categories.forEach((category) => queryParams.append("categories", category));
    }

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
    return await response.json();
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
      return  await response.json();
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
    return data.items || [];
};

// for creating payment intent
export const createPaymentIntent = async (cartItems: CartItemItemsProps[]) => {
    const response = await fetch(`${API_BASE_URL}/api/stripe/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
    });
    if (!response.ok) throw new Error("Error fetching payment intent");
    const { url } = await response.json();
    return url;
};

export const fetchBookById = async(bookId: string): Promise<BookType>=>{
    const response = await fetch(`${API_BASE_URL}/api/general/${bookId}`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Failed to fetch book");
    }
    return await response.json();
}

// update book quantity
export const updateCartQuantity = async (bookId: string, quantity: number) => {

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


