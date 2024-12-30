import { useState } from "react"
import PriceFilter from "../../components/ui/PriceFilter"
import SearhCartFilter from "../../components/ui/SearhCartFilter"
import * as generalApiClient from "../../apiClient/general"
import Loading from "../../components/ui/Loading"
import { useQuery } from "@tanstack/react-query"
import Pagination from "../../components/ui/Pagination"
import { BookType } from "../../../../backend/src/types/types"
import BookCard from "../../components/ui/BookCard"
import Modal from "../../components/ui/Modal"

const BooksStore = () => {
    const [page, setPage] = useState<number>(1)
    const [sortOption, setSortOption] = useState<string>("");
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

    const searchParams = {
        page: page.toString(),
        categories: selectedCategories, // Pass categories here
        maxPrice: selectedPrice?.toString(),
        sortOption
    }

    console.log("Search Params:", searchParams); // Debugging

    const {data: book, isLoading, isError} = useQuery({
    queryKey:["searchBooks", searchParams],
    queryFn: ()=> generalApiClient.searchBooks(searchParams)
    })

          // adding and removing the type and unchecked type
    const categoryTypesChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const categoryType = event.target.value

        setSelectedCategories((prevTypes) =>
            event.target.checked
            ? [...prevTypes, categoryType]
            : prevTypes.filter((type)=> type !== categoryType)
        )
    }

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedPrice(undefined);
        setSortOption("");
        setPage(1);
    };

    if (isLoading){
        return <Loading />
    }
    if (isError || !book) return <p>No Books Found</p>;


  return (
    <div className="container px-4 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        
        {/* filter */}
        <div className="rounded-lg border border-slate-300 p-5 h-fit md:sticky top-10">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                    Filter By:
                </h3>
                <SearhCartFilter
                    selectedCategories={selectedCategories}
                    onChange={categoryTypesChange}
                />
                
                <PriceFilter
                    selectedPrice={selectedPrice}
                    onChange={(value?:number)=> setSelectedPrice(value)}
                />
            </div>
        </div>

        <div className="flex flex-col gap-5">
            
            <div className="flex justify-between items-center">

                <button onClick={handleResetFilters}>Reset Filters</button>

                <select
                        className="p-2 border rounded-md"
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="priceAsc">Price (low to high)</option>
                        <option value="priceDesc">Price (high to low)</option>
                </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {book.data.map((book: BookType) => (
                    <BookCard key={book._id} book={book} onQuickView={setSelectedBook} />
                ))}
            </div>

            <div>
                <Pagination
                    page={book?.pagination.page || 1}
                    pages={book?.pagination.pages || 1}
                    onPageChange={(page)=> setPage(page)}
                />
            </div>

        </div>


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

export default BooksStore