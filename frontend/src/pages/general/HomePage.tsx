import Banner from "../../components/homepage/Banner"
import Features from "../../components/homepage/Features"
import NewArrivals from "../../components/homepage/NewArrivals"
import BookFestival from "../../components/homepage/BookFestival"
import Deals from "../../components/homepage/Deals"
import Blogs from "../../components/homepage/Blogs"
import NewsLetter from "../../components/homepage/NewsLetter"


const HomePage = () => {
  return (
    <>
        <Banner />
        <Features />
        <NewArrivals />
        <BookFestival />
        <Deals />
        <Blogs />
        <NewsLetter />
    </>
  )
}

export default HomePage