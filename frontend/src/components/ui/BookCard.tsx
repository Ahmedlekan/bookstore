import { BookType } from '../../../../backend/src/types/types';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/useCart';
import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';

interface BookCardProps {
  book: BookType;
  onQuickView: (book: BookType) => void;
}

const BookCard = ({ book, onQuickView }: BookCardProps) => {
  const { addToCartHandler, isFavorite, toggleFavorite } = useCartContext();
  const { showToast } = useAppContext();
  
  const [isAnimating, setIsAnimating] = useState<{
    [key: string]: boolean;
  }>({
    addToCart: false,
    addToFavorites: false,
    compare: false,
    quickView: false,
  });

  const handleActionWithAnimation = (action: keyof typeof isAnimating, callback: () => void) => {
    setIsAnimating((prev) => ({ ...prev, [action]: true }));
    setTimeout(() => {
      setIsAnimating((prev) => ({ ...prev, [action]: false }));
      callback();
    }, 700);
  };

  const handleFavorites = () => {
    if (isFavorite(book._id)) {
      toggleFavorite(book);
      showToast({ message: "Removed from Favorites", type: "ERROR" });
    } else {
      toggleFavorite(book);
      showToast({ message: "Added to Favorites", type: "SUCCESS" });
    }
  };
    
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg
    transition-shadow duration-300">
      {/* Book Image */}
      <div className="relative group w-full aspect-[2/3] overflow-hidden">
        <Link to={`/book/${book?._id}`} className="block h-full">
          <img
            src={book.imageUrls?.[0] || ""}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300
            group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100
        flex items-center justify-center gap-2 md:gap-4 transition-opacity duration-300
        pointer-events-none p-2">
          {/* Mobile visible actions */}
          <div className="md:hidden flex items-center justify-center gap-2">
            <button
              className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-100
              transition-colors z-10 pointer-events-auto"
              onClick={() => handleActionWithAnimation("addToFavorites", handleFavorites)}
              aria-label={isFavorite(book._id) ? "Remove from favorites" : "Add to favorites"}
            >
              {isAnimating.addToFavorites ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-gray-400
                rounded-full animate-spin"></div>
              ) : (
                isFavorite(book._id) ? "❤️" : "🤍"
              )}
            </button>
            
            <button
              className="p-1.5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors
              z-10 pointer-events-auto"
              onClick={() => handleActionWithAnimation("addToCart", () => addToCartHandler(book))}
              aria-label="Add to cart"
            >
              {isAnimating.addToCart ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full
                animate-spin"></div>
              ) : (
                "🛒"
              )}
            </button>
          </div>

          {/* Desktop hover actions */}
          <div className="hidden md:flex items-center justify-center gap-4">
            {/* Favorites Button */}
            <div className="relative group/item">
              <button
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100
                transition-colors z-10 pointer-events-auto"
                onClick={() => handleActionWithAnimation("addToFavorites", handleFavorites)}
                aria-label={isFavorite(book._id) ? "Remove from favorites" : "Add to favorites"}
              >
                {isAnimating.addToFavorites ? (
                  <div className="w-6 h-6 border-2 border-t-transparent border-gray-400 rounded-full
                  animate-spin"></div>
                ) : (
                  isFavorite(book._id) ? "❤️" : "🤍"
                )}
              </button>
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
              text-sm bg-black text-white px-2 py-1 rounded opacity-0 group-hover/item:opacity-100
              transition-opacity duration-200 whitespace-nowrap pointer-events-none font-body">
                {isFavorite(book._id) ? "Remove Favorite" : "Add Favorite"}
              </span>
            </div>

            {/* Cart Button */}
            <div className="relative group/item">
              <button
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors
                z-10 pointer-events-auto"
                onClick={() => handleActionWithAnimation("addToCart", () => addToCartHandler(book))}
                aria-label="Add to cart"
              >
                {isAnimating.addToCart ? (
                  <div className="w-6 h-6 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
                ) : (
                  "🛒"
                )}
              </button>
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-sm 
              bg-black text-white px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 
              transition-opacity duration-200 whitespace-nowrap pointer-events-none font-body">
                Add to Cart
              </span>
            </div>

            {/* Quick View Button */}
            <div className="relative group/item">
              <button
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors
                z-10 pointer-events-auto"
                onClick={() => handleActionWithAnimation("quickView", () => onQuickView(book))}
                aria-label="Quick view"
              >
                {isAnimating.quickView ? (
                  <div className="w-6 h-6 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
                ) : (
                  "👁"
                )}
              </button>
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-sm 
              bg-black text-white px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 
              transition-opacity duration-200 whitespace-nowrap pointer-events-none font-body">
                Quick View
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-3 md:p-4">
        <Link to={`/book/${book?._id}`}>
          <h3 className="text-base md:text-lg font-semibold truncate font-display hover:text-primary
          transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm md:text-base text-gray-600 truncate font-body">{book.author}</p>
        <div className="flex gap-3 items-center mt-1 md:mt-2 font-body">
          <span className="text-base md:text-lg font-bold text-deepbrown">
            ${book.newPrice}
          </span>
          {book.oldPrice && (
            <span className="text-xs md:text-sm line-through text-gray-400">
              ${book.oldPrice}
            </span>
          )}
        </div>
        
        {/* Mobile quick actions */}
        <div className="mt-2 flex gap-2 md:hidden">
          <button
            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
            onClick={() => onQuickView(book)}
          >
            Quick View
          </button>
          <button
            className="text-xs bg-primary text-white hover:bg-primary-dark px-2 py-1
            rounded transition-colors"
            onClick={() => addToCartHandler(book)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;