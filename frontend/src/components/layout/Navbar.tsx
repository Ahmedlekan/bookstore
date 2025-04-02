import { FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import { motion} from 'framer-motion';
import { Sheet } from "../ui/Sheet";
import { useState, useRef, useEffect } from "react";
import book1 from "../../assets/book1.jpg"
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/avatar.png"
import { menuItems } from "../../constants/data";
import { navigation } from "../../constants/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authClient from "../../apiClient/auth"
import { useAppContext } from "../../context/useAppContext";
import { useCartContext } from "../../context/useCart";
import Button from "../ui/Button";
import CartWrapper from "../ui/CartWrapper";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const  [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const {showToast, setUser, isLoggedIn} = useAppContext()
    const {cartItems} = useCartContext()
    const queryClient = useQueryClient()
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: authClient.signOut,
      onSuccess: async ()=>{
          await queryClient.invalidateQueries({queryKey: ["validateToken"]});
          setUser(null)
          showToast({ message: "Signed Out!", type: "SUCCESS" });
      },
      onError: (error: Error) => {
          showToast({ message: error.message, type: "ERROR" });
        },
  })

  const handleClick = ()=>{
      mutation.mutate()
  }

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
        setShowSearch(false);
    }
  };





  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex
        items-center justify-between"
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-deepbrown w-6 h-6"></div>
          <div>
            <Link to="/" className="text-xl font-bold text-black
              font-display cursor-pointer">
                Diplo
            </Link>
            <p className="text-xs text-gray-500 font-display">Bookstore</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8
          text-sm font-medium text-gray-800"
          >
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.label)} 
              onMouseLeave={handleMouseLeave}
            >
              <Link to={item.link || "#"} className="flex items-center text-lg font-display
                font-semibold space-x-1"
              >
                {item.label} 
                {item.subItems || item.isMegaMenu ? <span className="text-xl">&#9662;</span> : null}
              </Link>
              
              {/* Dropdown/Mega Menu */}
              
              {(item.subItems || item.isMegaMenu) && activeMenu === item.label && (
                <div className={`absolute left-0  bg-white shadow-lg mt-2 py-4
                  ${item.isMegaMenu ? 'flex flex-wrap justify-center' : 'block'}
                `}>
                  {item.isMegaMenu ? (
                    <div className="container top-[85px] fixed right-0 left-0 bg-white
                      shadow-lg mt-2 py-4 px-4 grid grid-cols-4 gap-4"
                  >
                      {item.categories?.map((category, catIndex) => (
                        <div key={catIndex}>
                          <h3 className="font-bold text-gray-800 pl-4 mb-4 font-display">
                              {category.title}
                          </h3>
                          <ul className="space-y-5 text-start">
                            {category.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link to={subItem.link} className="text-gray-600
                                  hover:underline font-body hover:bg-gray-100 px-4 py-2">
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div>
                        <img
                          src={book1}
                          alt="Category"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  ) : (
                    item.subItems?.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex} 
                        to={subItem.link} 
                        className="block text-nowrap px-4 py-2 
                          hover:bg-gray-100 text-gray-600 font-body hover:underline"
                      >
                        {subItem.label}
                      </Link>
                    ))
                  )}
                </div>
              )}

            </li>
          ))}
        </ul>

        {/* Icons and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            
          <div className="relative">
        {showSearch ? (
            <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 200 }}
                exit={{ opacity: 0, width: 0 }}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white
                shadow-md rounded-full overflow-hidden flex items-center"
            >
                <input
                    type="text"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books..."
                    className="w-full px-4 py-2 outline-none"
                />
                <button 
                    type="button"
                    onClick={() => {
                        setShowSearch(false);
                        setSearchQuery("");
                    }}
                    className="px-2 text-gray-500 hover:text-gray-700"
                >
                    <FiX className="w-4 h-4" />
                </button>
            </motion.form>
        ) : (
            <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-700 hover:text-deepbrown transition-colors"
                aria-label="Search"
            >
                <FiSearch className="w-5 h-5" />
            </button>
        )}
    </div>
            
            {/* rigth side */}
            <div className="relative flex items-center md:space-x-3 space-x-2">
              <div >
                  {
                    isLoggedIn ? <>
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <img src={ Avatar} alt=""
                          className={`size-7 rounded-full ${isLoggedIn ? 'ring-2 ring-blue-500' : ''}`}
                        />
                    </button>

                    {/* show dropdowns */}
                    
                    {
                      isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 
                          bg-white shadow-lg rounded-md z-40"
                        >
                          <ul className="py-2">
                              {
                                navigation.map((item) => (
                                    <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                        <Link to={item.href} className="block px-4 py-2 
                                          text-sm hover:bg-gray-100"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                              }
                              <li>
                                  <button
                                    onClick={handleClick}
                                    className="block w-full text-left px-4 py-2 
                                      text-sm hover:bg-gray-100"
                                  >
                                        Logout
                                  </button>
                              </li>
                          </ul>
                        </div>
                      )
                    }
                    </> : <></>
                  }
              </div>


              <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <Button onClick={() => setOpenCartSheet(true)} size="icon" 
                  className="relative"
                >
                  <FiShoppingBag className="w-6 h-6" />
                  <span className="absolute top-[-5px] right-[2px] 
                    font-bold text-sm"
                  >
                    {cartItems?.length || 0}
                  </span>
                  <span className="sr-only">User cart</span>
                </Button>
                
                <CartWrapper setOpenCartSheet={setOpenCartSheet}
                  cartItems={cartItems && cartItems.length > 0 ? cartItems : []}
                />
              </Sheet>

              {
                !isLoggedIn ? (
                  <Link to="/signin"
                className="relative p-2 text-gray-400 cursor-pointer 
                  hover:bg-gray-100 hover:text-gray-600 
                  focus:bg-gray-100 focus:text-gray-600 rounded-full"
              >
                <svg 
                  aria-hidden="true" 
                  fill="none"
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    strokeWidth="2" 
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                  />
                </svg>
              </Link>
                ) : ('')
              }

            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-800 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b">
              <button 
                className="w-full text-left px-4 py-3 flex justify-between items-center"
                onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
              >
                {item.label}
                {(item.subItems || item.isMegaMenu) && (
                  <span>{activeMenu === item.label ? '▲' : '▼'}</span>
                )}
              </button>
              {activeMenu === item.label && (
                <div className="px-4 pb-3">
                  {item.subItems?.map((subItem, subIndex) => (
                    <a 
                      key={subIndex} 
                      href={subItem.link} 
                      className="block py-2"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
  </nav>
  )
}

export default Navbar

