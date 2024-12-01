import { useState } from 'react';
import CategoryFilter from '../ui/CategoryFilter';
import BookCard from '../ui/BookCard';
import Modal from '../ui/Modal';

import { useQuery } from '@tanstack/react-query';
import * as generalApiclient from "../../apiClient/general"
import Loading from '../ui/Loading';
import { BookType } from '../../../../backend/src/types/types';

const NewArrivals = () => {

  const [category, setCategory] = useState<string>('All'); // State to track selected category
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null); // State to track the book for "Quick View"

  const {data: books = [], isLoading, isError} = useQuery({
    queryKey: ["fetchAllBooks"],
    queryFn: generalApiclient.fetchAllBooks
  })

  if (isLoading) {
    return <Loading />;
  }
  
  if (isError) {
    return <div>Error fetching books</div>;
  }

  // Step 1: Filter only trending books
  const trendingBooks = books.filter(book => book.trending);

  // Step 2: Extract unique categories from trending books
  const uniqueCategories = [
    'All',
    ...new Set(trendingBooks.flatMap(book => book.categories)),
  ];

  // Step 3: Group trending books by categories
  const groupedBooks = trendingBooks.reduce((acc, book) => {
    book.categories.forEach(category => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(book);
    });
    return acc;
  }, {} as Record<string, BookType[]>);

  // Step 4: Filter books to display based on the active category
  const filteredBooks =
    category === 'All'
      ? trendingBooks
      : groupedBooks[category] || []; // Default to empty if no books for the category

  // Step 5: Handle category filter click
  const handleCategoryClick = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <div className=" bg-gray-50 min-h-screen pt-10 md:pt-20 pb-10 px-5">
      {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center
            font-display pb-6">
                New Arrivals
        </h1>

      {/* Category Filter */}
        <CategoryFilter 
            categories={uniqueCategories} 
            onCategoryClick={handleCategoryClick} 
            activeCategory={category}
        />

      {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2
            lg:grid-cols-4 gap-6 mt-6"
        >
            {filteredBooks?.map(book => (
            <BookCard 
                key={book._id} 
                book={book} 
                onQuickView={setSelectedBook} 
            />
            ))}
        </div>

      {/* Quick View Modal */}
      {selectedBook && (
        <Modal
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={() => setSelectedBook(null)}
        />
      )}

    </div>
  )
}



export default NewArrivals