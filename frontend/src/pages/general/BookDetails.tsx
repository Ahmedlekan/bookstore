import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as generalApiClient from "../../apiClient/general"
import Loading from "../../components/ui/Loading";

const BookDetails = () => {

  const {bookId} = useParams<{ bookId: string }>()
  
  // Set the first image as the active image initially
const [activeImage, setActiveImage] = useState<string | null>(null);

  const {data : book, isLoading, isError} = useQuery({
      queryKey:["fetchBoookById", bookId],
      queryFn: ()=> generalApiClient.fetchBookById(bookId || ""),
      enabled: !!bookId,
  })

  console.log(book)

  // Handle loading state
  if (isLoading) {
      return <Loading />;
  }

  if (isError) return <div className="text-center text-red-500">Error loading book details.</div>;

  if (!book) return <div className="text-center text-gray-500">Book not found.</div>;

  // Set the first image as the active image if not already set
if (!activeImage && book.imageUrls && book.imageUrls.length > 0) {
  setActiveImage(book.imageUrls[0]);
}


  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Book Image */}
        
        <div className="flex-1">
          <img
            src={book.imageUrls?.[0] || ""}
            alt={book.title}
            className="w-full h-auto max-h-[700px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right: Book Details */}
        <div className="flex-1 flex flex-col gap-2">

          <h1 className="text-2xl md:text-4xl font-bold mb-4 font-display">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold font-body">Author:</span> {book.author}
          </p>
          <p className="text-lg text-gray-600 mb-2 font-display">
            <span className="font-semibold">Publisher:</span> {book.publisher}
          </p>
          <p className="text-lg text-gray-600 mb-4 font-display">
            <span className="font-semibold">Category:</span> {book.categories.join(", ")}
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-4 mb-6 font-display">
            <p className="text-2xl font-semibold text-deepbrown">
              ${book.newPrice.toFixed(2)}
            </p>
            {book.oldPrice && (
              <p className="text-lg line-through text-gray-500">${book.oldPrice.toFixed(2)}</p>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-8 font-display">{book.description}</p>

          {/* Buttons */}
          <div className="flex gap-4 font-body">
            <button
              className="bg-black text-white px-6 py-2
                rounded-lg hover:bg-black/80 transition"
              onClick={() => alert("Added to Cart")}
            >
              Add to Cart 🛒
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              onClick={() => alert("Added to Favorites")}
            >
              Add to Favorites ❤️
            </button>
          </div>

          <div className='flex flex-col gap-2 mt-2
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
            <h2>Category: {book.categories}</h2>
            <p>Tag: </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookDetails