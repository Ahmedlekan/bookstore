import { BookType } from '../../../../backend/src/types/types';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/useCart';

interface BookCardProps {
  book: BookType;
  onQuickView: (book: BookType) => void; // Function to handle Quick View
}

const BookCard = ({ book, onQuickView }: BookCardProps) => {

  const { addToCartHandler} = useCartContext();

    
  return (
    <div className="relative bg-white">
      {/* Book Image */}
      <div className="relative group w-full h-fit overflow-hidden">

        <Link to={`/book/${book?._id}`} className='block'>
          <img
            src={book.imageUrls?.[0] || ""}
            alt={book.title}
            className="w-full h-96 object-cover transition-transform
            duration-300 group-hover:scale-105 cursor-pointer"
          />
        </Link>

        {/* Hover Actions (limited to image only) */}

        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 
          group-hover:opacity-100 hidden md:flex items-center justify-center 
          space-x-4 transition-opacity duration-300 pointer-events-none"
        >
          
          {/* Favorites Button */}
          <div className="relative group/item">
            <button 
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 
              transition-colors z-10 pointer-events-auto"
              onClick={() => alert('Added to Favorites')}
            >
              ❤️
            </button>
            <span className="absolute bottom-full mb-2 left-1/2
              transform -translate-x-1/2 text-sm bg-black font-body 
              text-white px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 
              transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            >
              Add to Favorites
            </span>
          </div>

          {/* Cart Button */}
          <div className="relative group/item">
            <button 
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 
              transition-colors z-10 pointer-events-auto"
              onClick={()=>addToCartHandler(book)}
            >
              🛒
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 
              transform -translate-x-1/2 text-sm bg-black text-white 
              px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 
              transition-opacity duration-200 whitespace-nowrap
              pointer-events-none font-body"
            >
              Add to Cart
            </span>
          </div>

          {/* Quick Buy Button */}
          <div className="relative group/item">
            <button 
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 
              transition-colors z-10 pointer-events-auto"
              onClick={() => alert('Quick Buy')}
            >
              ⚡
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform 
              -translate-x-1/2 text-sm bg-black text-white px-2 py-1 
              rounded opacity-0 group-hover/item:opacity-100 transition-opacity
              duration-200 whitespace-nowrap pointer-events-none font-body"
            >
              Compare
            </span>
          </div>

          {/* Quick View Button */}
          <div className="relative group/item">
            <button 
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 
              transition-colors z-10 pointer-events-auto"
              onClick={() => onQuickView(book)}
            >
              👁
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform 
              -translate-x-1/2 text-sm bg-black text-white px-2 py-1 
              rounded opacity-0 group-hover/item:opacity-100 transition-opacity 
              duration-200 whitespace-nowrap pointer-events-none font-body"
            >
              Quick View
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate font-display">{book.title}</h3>
        <p className="text-gray-600 truncate font-body">{book.author}</p>
        <div className='flex gap-5 items-center mt-2 font-body'>
            <span className="text-lg font-bold 
                text-deepbrown"
            >
                ${book.newPrice}
            </span>
            <span className="text-sm line-through 
                text-gray-400"
            >
                ${book.oldPrice}
            </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;