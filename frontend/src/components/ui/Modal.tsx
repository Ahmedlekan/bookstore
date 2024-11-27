import React from 'react';

interface Book {
  image: string;
  title: string;
  author: string;
  category?: string;
  description?: string;
  price?: string;
}

interface ModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ book, isOpen, onClose }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50
      z-50 flex items-center justify-center">
      <div className="bg-white w-full h-[90%] max-w-4xl
        rounded-lg shadow-lg overflow-hidden"
      >

        {/* Modal Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="flex-shrink-0 w-full lg:w-1/2 
            h-64 lg:h-auto overflow-hidden"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="p-6 flex flex-col space-y-4 relative">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black transition
              absolute top-0 right-5 text-2xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold font-display">{book.title}</h3>
            <p className="text-sm text-gray-500 font-body">
              By <span className="font-medium">{book.author}</span>
            </p>
            <p className="text-gray-700 font-body">{book.description}</p>

            <div className=' flex gap-4 border-b border-gray-300 pb-6'>
              
              <div className=' flex gap-3'>
                <button className=' bg-gray-300 px-4 rounded-md font-semibold'>1</button>
                <div className='flex flex-col gap-2'>
                  <button className='bg-gray-300 px-2 rounded-md font-semibold'>+</button>
                  <button className='bg-gray-300 px-2 rounded-md font-semibold'>-</button>
                </div>
                <button className=' bg-black text-white px-4 rounded-md font-body'>Add To Cart</button>
              </div>
            </div>

            <div className='flex flex-col gap-2 
              text-gray-500 font-body border-b border-gray-300 pb-6'
            >
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17h6a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0
                    002 2h1m10 0a2 2 0 002-2h3.5a1.5 1.5 0 001.5-1.5V11a2 2 0 
                    00-2-2h-3l-2-3h-3.5M6 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 
                    0 100 4 2 2 0 000-4z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Usually dispatched in 2 to 3 days
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c4.418 0 8 1.791 8 4v4c0 4.418-3.582 8-8 
                    8s-8-3.582-8-8V7c0-2.209 3.582-4 8-4zm0 7v2m0 
                    0v2m0-2h1m-1 0H11"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Safe & Secure Checkout
                </span>
              </div>
            </div>

            <div className='text-gray-500 font-body'>
              <p>SKU: BKS14957</p>
              <h2>Category: {book.category}</h2>
              <p>Tag: </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;