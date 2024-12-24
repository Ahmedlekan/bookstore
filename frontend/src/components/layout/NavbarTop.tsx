import { FaTwitter, FaFacebook, FaPinterest, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/useCart";

const NavbarTop = () => {
  
  const {favoriteItems} = useCartContext()

  return (
    <div className="bg-deepbrown text-white text-sm flex flex-col md:flex-row 
    justify-between items-center py-3 px-4 font-body space-y-4 md:space-y-0">
    
    {/* Left Section */}
    <div className="font-medium text-center md:text-left">
        FREE SHIPPING WORLDWIDE
    </div>

    {/* Right Section */}
    <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
        {/* Contact Us */}
        <button className="flex items-center space-x-1 hover:opacity-80">
            <FiPhone className="text-base"/>
            <span>438 9944 503</span>
        </button>

        {/* Favorites */}
        <Link to="/favorites">
            <div className="flex justify-center items-center gap-1 relative">
                <AiOutlineHeart className="text-lg" />
                <span className="absolute top-[-8px] right-[2px] 
                    font-bold text-xs px-2 bg-black rounded-full">
                    {favoriteItems?.length || 0}
                </span>
                <div className="flex flex-col items-center">
                    <p>Favorite</p>
                </div>
            </div>
        </Link>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:opacity-75">
                <FaTwitter className="text-lg" />
            </a>
            <a href="#" className="hover:opacity-75">
                <FaFacebook className="text-lg" />
            </a>
            <a href="#" className="hover:opacity-75">
                <FaPinterest className="text-lg" />
            </a>
            <a href="#" className="hover:opacity-75">
                <FaInstagram className="text-lg" />
            </a>
            <a href="#" className="hover:opacity-75">
                <FaLinkedin className="text-lg" />
            </a>
        </div>
    </div>
</div>
  )
}

export default NavbarTop