import Navbar from "./Navbar"
import NavbarTop from "./NavbarTop"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="">
        <NavbarTop />
        <Navbar />
        
        <div>
          <Outlet />
        </div>
        
        <Footer />
    </div>
  )
}

export default Layout