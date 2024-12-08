import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import * as generalApiClient from "../apiClient/general"
import { useQuery } from '@tanstack/react-query';
import { CartItemItemsProps } from '../../../backend/src/types/types';
import { BookType } from '../../../backend/src/types/types';
import { useAppContext } from './useAppContext';
import { addToCart, updateCartQuantity, deleteCartItem } from '../apiClient/general';

interface CartContextType {
    cartItems: CartItemItemsProps[];
    addToCartHandler: (product: BookType) => Promise<void>;
    updateQuantityHandler: (bookId: string, quantity: number) => Promise<void>;
    deleteCartItemHandler: (bookId: string) => Promise<void>;
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

    const addToCartHandler = async (book: BookType) => {
        try {
            // Add book to the cart
            await addToCart(book._id);
            
            // Update cartItems state
            setCartItems((prevItems) => {
                const existingItem = prevItems.find(item => item.bookId === book._id);
    
                if (existingItem) {
                    return prevItems.map(item =>
                        item.bookId === book._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    // Ensure the new item matches the CartItem type exactly
                    const newItem: CartItemItemsProps = {
                        bookId: book._id,
                        title: book.title,
                        image: [book.imageUrls[0]], // Assuming it's the first image
                        newPrice: book.newPrice,
                        oldPrice: book.oldPrice,
                        quantity: 1
                    };
                    return [...prevItems, newItem];
                }
            });

            showToast({ message: "Book added to cart", type: "SUCCESS" });
            } catch (error) {
                console.error(error); 
                showToast({ message: "Failed to add a book to cart", type: "ERROR" });
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
                message: `Failed to update quantity: ${(error as Error).message}`, 
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
            showToast({ message: "Failed to remove a book from cart", type: "ERROR" });
        }
    };

    return (
        <CartContext.Provider 
            value={{ 
                cartItems, 
                addToCartHandler, 
                updateQuantityHandler, 
                deleteCartItemHandler ,
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
