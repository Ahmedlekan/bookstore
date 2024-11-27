import NewsCard from "../ui/NewsCard";
import { newsData } from "../../constants/data";


const Blogs = () => {
  return (
    <section className=" bg-gray-50 md:pt-20 pb-10 px-5">
      <h2 className="text-center text-2xl md:text-3xl
        font-bold text-gray-800 pb-6 font-display">
        LATEST NEWS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsData.map((news, index) => (
          <NewsCard key={index} {...news} />
        ))}
      </div>
    </section>
  )
}

export default Blogs