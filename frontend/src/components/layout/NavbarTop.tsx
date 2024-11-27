import { FaTwitter, FaFacebook, FaPinterest, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";

const NavbarTop = () => {
  return (
    <div className="bg-deepbrown text-white text-sm flex
      justify-between items-center py-2 px-4">
      {/* Left Section */}
      <div className="font-medium">
        FREE SHIPPING WORLDWIDE
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Contact Us */}
        <button className="flex items-center space-x-1 hover:opacity-80">
          <FiPhone className="text-lg" />
          <span>CONTACT US</span>
        </button>

        {/* Wishlist */}
        <button className="flex items-center space-x-1 hover:opacity-80">
          <AiOutlineHeart className="text-lg" />
          <span>WISHLIST</span>
        </button>

        {/* Social Icons */}
        <div className="flex space-x-4">
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