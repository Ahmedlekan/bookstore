import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import * as generalApiClient from "../apiClient/general"
import { useQuery } from '@tanstack/react-query';
import { CartItemItemsProps } from '../../../backend/src/types/types';
import { BookType } from '../../../backend/src/types/types';
import { useAppContext } from './useAppContext';
import { addToCart, updateCartQuantity, deleteCartItem } from '../apiClient/general';

interface CartContextType {
    cartItems: CartItemItemsProps[];
    addToCartHandler: (product: BookType, redirectToCheckout?: boolean) => Promise<boolean>;
    updateQuantityHandler: (bookId: string, quantity: number) => Promise<void>;
    deleteCartItemHandler: (bookId: string) => Promise<void>;

    favoriteItems: BookType[];
    toggleFavorite: (product: BookType) => void;
    isFavorite: (productId: string) => boolean
}

// Define props for CartProvider
interface CartProviderProps {
    children: ReactNode;
}

// Create CartContext with default null value
const CartContext = createContext<CartContextType | null>(null);

// CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItemItemsProps[]>([]);
    const [favoriteItems, setFavoriteItems] = useState<BookType[]>([]);
    const { showToast } = useAppContext();

    // Fetch initial cart items
    const { data: fetchedCartItems } = useQuery({
        queryKey:["fetchCartItems"],
        queryFn: generalApiClient.fetchCartItems,
        staleTime: 1000 * 60 * 5, // cache data for 5 minutes
    });

    useEffect(() => {
        if (fetchedCartItems) {
            setCartItems(fetchedCartItems);
        }
    }, [fetchedCartItems]);

    const addToCartHandler = async (book: BookType, redirectToCheckout = false): Promise<boolean> => {
        try {

            // Check if the book is already in the cart
            const existingItem = cartItems.find(item => item.bookId === book._id);

            if (existingItem) {
                showToast({ message: "Book already in cart", type: "ERROR" });
                return false
            }
            
            // Add book to the cart
            await addToCart(book._id);

            // Update cartItems state
            const newItem: CartItemItemsProps = {
                bookId: book._id,
                title: book.title,
                image: [book.imageUrls[0]], // Assuming it's the first image
                newPrice: book.newPrice,
                oldPrice: book.oldPrice,
                quantity: 1
            };

            setCartItems((prevItems) => [...prevItems, newItem]);
            showToast({ message: "Book added to cart", type: "SUCCESS" });

            if (redirectToCheckout) {
                window.location.href = "/checkout";
            }

            return true

            } catch (error) {
                console.error(error); 
                showToast({ message: "Failed to add a book to cart", type: "ERROR" });

                return false
            }
        };

    const updateQuantityHandler = async (bookId: string, quantity: number) => {
        try {
            await updateCartQuantity(bookId, quantity);
            setCartItems((prevItems) => prevItems.map(item =>
                item.bookId === bookId ? { ...item, quantity } : item
            ));
            showToast({ message: "Quantity updated", type: "SUCCESS" });
        } catch (error) {
            console.error( error);
            showToast({ 
                message: `${(error as Error).message}`, 
                type: "ERROR" 
            });
        }
    };

    const deleteCartItemHandler = async (bookId: string) => {
        try {
            await deleteCartItem(bookId);
            setCartItems((prevItems) => prevItems.filter(item => item.bookId !== bookId));
            showToast({ message: "Book removed from cart", type: "SUCCESS" });
        } catch (error) {
            console.error(error);
            showToast({ 
                message: `${(error as Error).message}`, type: "ERROR" });
        }
    };


    // Load favorite items from localStorage on initial load
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteItems');
        if (savedFavorites) {
            setFavoriteItems(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleFavorite = (book: BookType) => {
        setFavoriteItems((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some(item => item._id === book._id);
            const updatedFavorites = isAlreadyFavorite
                ? prevFavorites.filter(item => item._id !== book._id)
                : [...prevFavorites, book];

                localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));

            return updatedFavorites
        });
    };

    const isFavorite = (bookId: string) => favoriteItems.some(item => item._id === bookId);

    return (
        <CartContext.Provider 
            value={{ 
                cartItems, 
                addToCartHandler, 
                updateQuantityHandler, 
                deleteCartItemHandler,
                toggleFavorite,
                isFavorite,
                favoriteItems, 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for consuming CartContext
export const useCartContext = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};
