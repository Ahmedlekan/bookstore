import { useState } from 'react';
import CategoryFilter from '../ui/CategoryFilter';
import BookCard from '../ui/BookCard';
import Modal from '../ui/Modal';
import { books } from '../../constants/data';
import { BookProps } from "../../../../backend/src/types/types"

const NewArrivals = () => {

    const [category, setCategory] = useState<string>('All'); // State to track selected category
  const [selectedBook, setSelectedBook] = useState<BookProps| null>(null); // State to track the book for "Quick View"

  // Function to handle category selection
  const handleCategoryClick = (newCategory: string) => {
    setCategory(newCategory);
  };

  // Filter books based on the selected category
  const filteredBooks = category === 'All' 
    ? books 
    : books.filter(book => book.categories.includes(category));


  return (
    <div className=" bg-gray-50 min-h-screen pt-10 md:pt-20 pb-10 px-5">
      {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center
            font-display pb-6">
                New Arrivals
        </h1>

      {/* Category Filter */}
        <CategoryFilter 
            categories={['All', 'Cook Book', 'History', 'Fantasy', 'Romance']} 
            onCategoryClick={handleCategoryClick} 
            activeCategory={category}
        />

      {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2
            lg:grid-cols-4 gap-6 mt-6"
        >
            {filteredBooks.map(book => (
            <BookCard 
                key={book.id} 
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