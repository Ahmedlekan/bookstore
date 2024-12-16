import * as adminApiClient from "../../apiClient/admin"
import { useQuery } from "@tanstack/react-query"
import Loading from "../../components/ui/Loading"
import AdminBookCard from "../../components/admin/AdminBookCard"
import { BookType } from "../../../../backend/src/types/types"


const Books = () => {

  const {data: allBooks, isLoading, isError} = useQuery<BookType[]>({
    queryKey: ["fetchAllProducts"],
    queryFn: adminApiClient.allBooks
  })

if(isLoading){
    return (
        <Loading />
    )
}

if(isError){
  return <div> No Products Found</div>
}

  return (
    <div>
        <div className="">
          {allBooks?.map((book: BookType) => (
            <AdminBookCard
              data={book} 
              key={book._id} 
            />
          ))}
        </div>
    </div>
  )
}

export default Books