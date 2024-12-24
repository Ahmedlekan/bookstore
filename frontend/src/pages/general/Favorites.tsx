import { BookType } from "../../../../backend/src/types/types";
import { useCartContext } from "../../context/useCart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const {favoriteItems, toggleFavorite, addToCartHandler} = useCartContext()
    const navigate = useNavigate()

    const handleBuyItNow = async (book: BookType) => {
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
        return <p className="text-center">Your favorites list is empty.</p>;
    }

  return (
    <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6
                font-display">
                Your Favorites
            </h2>
            
            <div className="space-y-4 font-body">
                {favoriteItems.map((book) => (
                    <div key={book._id} className="flex items-start 
                        bg-white shadow-md rounded-lg p-4"
                    >
                        <Link to={`/book/${book._id}`} className="flex-shrink-0">
                            <img
                                src={book.imageUrls[0]}
                                alt={book.title}
                                className="h-42 w-32 object-cover rounded-md"
                            />
                        </Link>

                        <div className="ml-4 flex-grow flex flex-col gap-4">
                            <Link to={`/product/${book._id}`} className="block font-semibold 
                                text-lg hover:underline"
                            >
                                {book.title}
                            </Link>
                            <p className="text-gray-600">Condition: Pre-owned</p>
                            <p className="text-sm text-gray-500">Author: {book.author}</p>
                            <p className="text-sm text-gray-500">Category: {book.categories}</p>
                            <p className="text-gray-700 mt-2">
                                Price: <span className="font-semibold">${book.newPrice.toFixed(2)}</span>
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-10 ml-4">
                            <button
                                onClick={() => toggleFavorite(book)}
                                className="text-deepbrown font-semibold text-sm
                                    underline hover:text-red-600 mb-2"
                            >
                                Remove
                            </button>
                            <button className="bg-black text-white py-2 
                                px-4 rounded-md shadow hover:bg-black/80 mb-2"
                                onClick={() => handleBuyItNow(book)}
                            >
                                Buy It Now
                            </button>
                            <button className="border border-gray-300 py-2 
                                px-4 rounded-md shadow hover:bg-gray-100 mb-2"
                                onClick={()=> handleAddToCart(book)}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Favorites