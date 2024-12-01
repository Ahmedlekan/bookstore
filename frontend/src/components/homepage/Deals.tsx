import BookCard from "../ui/BookCard"
import { useState } from "react"
import Modal from "../ui/Modal"
import { BookType } from "../../../../backend/src/types/types"
import { useQuery } from "@tanstack/react-query"
import * as generalApiclient from "../../apiClient/general"
import Loading from "../ui/Loading"

const Deals = () => {
    const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

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

    const booksSlice = books.slice(0, 4)


  return (
    <div className=" bg-gray-50 min-h-screen pt-10 md:pt-20 pb-10 px-5">

        <h2 className="text-2xl md:text-3xl font-bold
            font-display text-center pb-6"
        >
                DAILY DEALS
        </h2>
        
        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2
            lg:grid-cols-4 gap-6"
        >
            {booksSlice.map(book => (
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

export default Deals