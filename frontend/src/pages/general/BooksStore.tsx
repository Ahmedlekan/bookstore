

const BooksStore = () => {
  return (
    <div className="container px-4 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        
        {/* filter */}
        <div className="rounded-lg border border-slate-300 p-5 h-fit md:sticky top-10">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                    Filter By:
                </h3>
                
                <div>Category</div>

                <>Price</>
            </div>
        </div>

        <div className="flex flex-col gap-5">
            
            <div className="flex justify-between items-center">

                <button onClick={()=>{}}>Reset Filters</button>

                <span className='text-xl font-bold'>
                    {/* {product.pagination.total} Products found */}
                </span>

                <select 
                    className="p-2 border rounded-md"
                    value=""
                    onChange={()=>{}}
                >
                    <option value="">Sort By</option>
                    <option value="priceAsc">
                        Price (low to high)
                    </option>
                    <option value="priceDesc">
                        Price (high to low)
                    </option>
                </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {/* {product.data.map((product: ProductsType) => (
                    <ProductCard key={product._id} product={product}/>
                ))} */}
                <div>Book Card</div>
            </div>

            <div>
            {/* <Pagination
                page={product?.pagination.page || 1}
                pages={product?.pagination.pages || 1}
                onPageChange={(page)=> setPage(page)}
            /> */}
            </div>

        </div>

    </div>
  )
}

export default BooksStore