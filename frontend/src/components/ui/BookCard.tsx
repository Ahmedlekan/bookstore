import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addToCart } from '../../store/cart/cartSlice';
import { BookProps } from '../../../../backend/src/types/types';

interface BookCardProps {
  book: BookProps;
  onQuickView: (book: BookProps) => void; // Function to handle Quick View
}

const BookCard: React.FC<BookCardProps> = ({ book, onQuickView }) => {

  const dispatch = useDispatch()

  // Access cart from Redux state
  const cart = useSelector((state) => state.cart);

  const handleToCart = (product)=>{
    dispatch(addToCart(product))
    console.log('Total cart items:', cart.length);
  }
    
  return (
    <div className="relative bg-white">
      {/* Book Image */}
      <div className="relative group w-full h-fit overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover transition-transform
          duration-300 group-hover:scale-105"
        />

      {/* Hover Actions (limited to image only) */}

      <div className="absolute inset-0 bg-black
        bg-opacity-50 opacity-0 group-hover:opacity-100 flex 
        items-center justify-center space-x-4 transition-opacity
        duration-300"
      >
        
        {/* Favorites Button */}
        <div className="relative group/item">
          <button 
            className="p-2 bg-white rounded-full shadow-lg
            hover:bg-gray-100 transition-colors"
            onClick={() => alert('Added to Favorites')}
          >
            ❤️
          </button>
          <span className="absolute bottom-full mb-2 left-1/2
            transform -translate-x-1/2 text-sm bg-black 
            text-white px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 
            transition-opacity duration-200 whitespace-nowrap pointer-events-none"
          >
            Add to Favorites
          </span>
        </div>

        {/* Cart Button */}
        <div className="relative group/item">
          <button 
            className="p-2 bg-white rounded-full shadow-lg 
            hover:bg-gray-100 transition-colors"
            onClick={() => alert('Added to Cart')}
          >
            🛒
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 
            transform -translate-x-1/2 text-sm bg-black text-white 
            px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 
            transition-opacity duration-200 whitespace-nowrap
            pointer-events-none"
          >
            Add to Cart
          </span>
        </div>

        {/* Quick Buy Button */}
        <div className="relative group/item">
          <button 
            className="p-2 bg-white rounded-full shadow-lg 
            hover:bg-gray-100 transition-colors"
            onClick={() => alert('Quick Buy')}
          >
            ⚡
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 transform 
            -translate-x-1/2 text-sm bg-black text-white px-2 py-1 
            rounded opacity-0 group-hover/item:opacity-100 transition-opacity
            duration-200 whitespace-nowrap pointer-events-none"
          >
            Compare
          </span>
        </div>

        {/* Quick View Button */}
        <div className="relative group/item">
          <button 
            className="p-2 bg-white rounded-full shadow-lg 
            hover:bg-gray-100 transition-colors"
            onClick={() => onQuickView(book)}
          >
            👁
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 transform 
            -translate-x-1/2 text-sm bg-black text-white px-2 py-1 
            rounded opacity-0 group-hover/item:opacity-100 transition-opacity 
            duration-200 whitespace-nowrap pointer-events-none"
          >
            Quick View
          </span>
        </div>
      </div>
  </div>

  <div className="p-4">
    <h3 className="text-lg font-semibold truncate">{book.title}</h3>
    <p className="text-gray-600 truncate">{book.author}</p>
    <div className='flex gap-5 items-center mt-2'>
        <span className="text-lg font-semibold 
            text-gray-700"
        >
            ${book.newPrice}
        </span>
        <span className="text-sm line-through 
            text-gray-400"
        >
            ${book.oldPrice}
        </span>
    </div>
    
    <button className=' bg-black text-white' onClick={()=> handleToCart(book)}>add to cart</button>
  </div>
</div>
  );
};

export default BookCard;