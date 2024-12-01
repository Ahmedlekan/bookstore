import Navbar from "./Navbar"
import NavbarTop from "./NavbarTop"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="container mx-auto">
        <NavbarTop />
        <Navbar />
        
        <div className=" flex-grow container mx-auto pt-4 pb-20">
          <Outlet />
        </div>
        
        <Footer />
    </div>
  )
}

export default Layout