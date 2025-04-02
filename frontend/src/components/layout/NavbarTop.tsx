import { FaTwitter, FaFacebook, FaPinterest, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/useCart";

const NavbarTop = () => {
  const { favoriteItems } = useCartContext();

  return (
    <div className="bg-deepbrown text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Shipping Info */}
        <div className="font-medium mb-2 md:mb-0 text-center md:text-left">
          🚚 FREE SHIPPING WORLDWIDE
        </div>

        {/* Right Section - Contact, Favorites, Social */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Contact Us */}
          <a 
            href="tel:4389944503" 
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            aria-label="Call us at 438 9944 503"
          >
            <FiPhone className="text-base" />
            <span>438 9944 503</span>
          </a>

          {/* Favorites */}
          <Link 
            to="/favorites" 
            className="relative flex items-center gap-1 hover:opacity-80 transition-opacity"
            aria-label="View favorites"
          >
            <AiOutlineHeart className="text-lg" />
            {favoriteItems?.length > 0 && (
              <span className="absolute -top-2 -right-2 font-bold text-xs h-5 w-5 flex items-center justify-center bg-black rounded-full">
                {favoriteItems.length > 9 ? "9+" : favoriteItems.length}
              </span>
            )}
            <span className="hidden md:inline">Favorites</span>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="hover:opacity-75 transition-opacity"
              aria-label="Follow us on Twitter"
            >
              <FaTwitter className="text-lg" />
            </a>
            <a 
              href="#" 
              className="hover:opacity-75 transition-opacity"
              aria-label="Follow us on Facebook"
            >
              <FaFacebook className="text-lg" />
            </a>
            <a 
              href="#" 
              className="hover:opacity-75 transition-opacity"
              aria-label="Follow us on Pinterest"
            >
              <FaPinterest className="text-lg" />
            </a>
            <a 
              href="#" 
              className="hover:opacity-75 transition-opacity"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a 
              href="#" 
              className="hover:opacity-75 transition-opacity"
              aria-label="Follow us on LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;