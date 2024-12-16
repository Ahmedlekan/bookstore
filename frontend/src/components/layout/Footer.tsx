
import { FaFacebook, FaPinterest, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Book Shop */}
          <div>
            <h2 className="text-xl font-bold mb-4 font-display text-deepbrown">DIPLO SHOP</h2>
            <address className="not-italic text-sm space-y-4 font-body">
              <p>1203 Town Center</p>
              <p>Drive FL 33458 USA</p>
              <p>+0000 123 456 789</p>
              <a href="mailto:info@example.com" className="hover:underline">
                info@example.com
              </a>
            </address>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-display">Help</h3>
            <ul className="space-y-2 font-body">
              <li>
                <a href="#" className="hover:underline">
                  Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Information
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-display">Support</h3>
            <ul className="space-y-2 font-body">
              <li>
                <a href="#" className="hover:underline">
                  Search Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Advanced Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Helps & FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Store Location
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Orders & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-display">Information</h3>
            <ul className="space-y-2 font-body">
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Refund & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Deliveries
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row
            items-center justify-between space-y-4 md:space-y-0"
        >
          <p className="text-sm text-center md:text-left font-body">
            All Right Reserved © 2024, Ahmed Lekan
          </p>
          <div className="flex space-x-4">
            <FaFacebook className="hover:text-gray-500 cursor-pointer" />
            <FaPinterest className="hover:text-gray-500 cursor-pointer" />
            <FaInstagram className="hover:text-gray-500 cursor-pointer" />
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer