import { BookType } from "../../../../backend/src/types/types";
import { useCartContext } from "../../context/useCart";
import { useAppContext } from "../../context/useAppContext";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiChevronRight } from "react-icons/fi";
import { BsLightningCharge } from "react-icons/bs";
import { motion} from 'framer-motion';

const Favorites = () => {
    const {isLoggedIn} = useAppContext()
    const { favoriteItems, toggleFavorite, addToCartHandler, } = useCartContext();
    const navigate = useNavigate();

    const handleBuyItNow = async (book: BookType) => {        
        if(!isLoggedIn){
            // Store intended path for redirect after login
            sessionStorage.setItem('redirectAfterLogin', '/checkout');
            navigate('/signin');
            return;
        }
        const success = await addToCartHandler(book, true);
        if (success) {
            toggleFavorite(book);
            navigate("/checkout");
        }
    };

    const handleAddToCart = async (book: BookType) => {
        const success = await addToCartHandler(book);
        if (success) {
            toggleFavorite(book);
        }
    };

    if (favoriteItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <FiHeart className="mx-auto text-4xl text-gray-300 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Favorites List is Empty</h2>
                    <p className="text-gray-600 mb-6">You haven't added any books to your favorites yet.</p>
                    <motion.a 
                        href="/books-store" 
                        className="inline-flex items-center px-6 py-3 text-white
                        rounded-md bg-black hover:bg-rose-400 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Browse Books <FiChevronRight className="ml-2" />
                    </motion.a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 font-display">
                    Your Favorites ({favoriteItems.length})
                </h2>
                <Link 
                    to="/books-store" 
                    className="text-sm text-deepbrown hover:underline flex items-center"
                >
                    Continue Shopping <FiChevronRight className="ml-1" />
                </Link>
            </div>
            
            <div className="space-y-4 font-body">
                {favoriteItems.map((book) => (
                    <div 
                        key={book._id} 
                        className="flex flex-col sm:flex-row items-start bg-white shadow-sm
                        rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <Link 
                            to={`/book/${book._id}`} 
                            className="flex-shrink-0 w-full sm:w-32 mb-4 sm:mb-0"
                        >
                            <img
                                src={book.imageUrls[0]}
                                alt={book.title}
                                className="h-48 w-full sm:h-36 sm:w-32 object-cover rounded-md"
                                loading="lazy"
                            />
                        </Link>

                        <div className="ml-0 sm:ml-4 flex-grow flex flex-col gap-2 w-full">
                            <div className="flex justify-between items-start">
                                <Link 
                                    to={`/book/${book._id}`} 
                                    className="block font-semibold text-lg hover:underline text-gray-900"
                                >
                                    {book.title}
                                </Link>
                                <button
                                    onClick={() => toggleFavorite(book)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    aria-label="Remove from favorites"
                                >
                                    <FiHeart className="text-xl" />
                                </button>
                            </div>
                            
                            <p className="text-gray-600 text-sm">by {book.author}</p>
                            <p className="text-sm text-gray-500 capitalize">{book.categories?.join(", ")}</p>
                            
                            <div className="mt-2 flex items-center">
                                <span className="text-lg font-bold text-deepbrown">
                                    ${book.newPrice.toFixed(2)}
                                </span>
                                {book.oldPrice && (
                                    <span className="text-sm line-through text-gray-400 ml-2">
                                        ${book.oldPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 w-full sm:w-auto flex flex-col sm:flex-row gap-3
                           sm:gap-4 ml-0 sm:ml-4">
                            <button 
                                onClick={() => handleBuyItNow(book)}
                                className="flex items-center justify-center gap-2 bg-black text-white py-2 px-4
                                rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base disabled:opacity-50"
                            >
                                <BsLightningCharge /> Buy It Now
                            </button>
                            
                            <button 
                                onClick={() => handleAddToCart(book)}
                                className="flex items-center justify-center gap-2 border border-gray-300 py-2
                                px-4 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base"
                            >
                                <FiShoppingCart /> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;