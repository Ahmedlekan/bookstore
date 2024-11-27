import { FiSearch, FiShoppingBag, FiLogIn } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import book1 from "../../assets/book1.jpg"
import { Link } from "react-router-dom";
import Avatar from "../../assets/avatar.png"

interface MenuItem {
    label: string;
    link?: string;
    subItems?: SubMenuItem[];
    isMegaMenu?: boolean;
    categories?: MegaMenuCategory[];
  }
  
  interface SubMenuItem {
    label: string;
    link: string;
  }
  
  interface MegaMenuCategory {
    title: string;
    items: SubMenuItem[];
  }

const menuItems: MenuItem[] = [
    {
      label: 'HOME',
      subItems: [
        { label: 'Home 1', link: '#' },
        { label: 'Home 2', link: '#' },
        { label: 'Home 3', link: '#' }
      ]
    },
    {
      label: 'MEGA MENU',
      isMegaMenu: true,
      categories: [
        {
          title: 'TEXT BOOKS',
          items: [
            { label: 'Business', link: '#' },
            { label: 'Encyclodepedias', link: '#' },
            { label: 'Lifestyle', link: '#' },
            { label: 'Foods & Cookery', link: '#' },
            { label: 'Fantasy', link: '#' }
          ]
        },
        {
          title: 'KINDLE BOOKS',
          items: [
            { label: 'Architecture', link: '#' },
            { label: 'Biography', link: '#' },
            { label: 'Music', link: '#' },
            { label: 'Wildlife', link: '#' },
            { label: 'Cooking', link: '#' }
          ]
        },
        {
          title: 'PAGES',
          items: [
            { label: 'About Us', link: '#' },
            { label: 'Contact Us', link: '#' },
            { label: 'Privacy Policy', link: '#' },
            { label: 'Return & Refunds Policy', link: '#' },
            { label: 'Terms & Condition', link: '#' }
          ]
        }
      ]
    },
    {
      label: 'SHOP',
      subItems: [
        { label: 'Simple product', link: '#' },
        { label: 'Read PDF Book Demo', link: '#' },
        { label: 'External Product', link: '#' },
        { label: 'Free Download Books', link: '#' },
        { label: 'Bundles Books', link: '#' }
      ]
    },
    {
      label: 'PAGES',
      subItems: [
        { label: 'About Ud', link: '#' },
        { label: 'Author Profile Page', link: '#' },
        { label: 'Publisher Profile Page', link: '#' },
        { label: 'All Authors Page', link: '#' },
        { label: 'All Book Publishers', link: '#' }
      ]
    },
    {
      label: 'CONTACT US',
      link: '#'
    }
  ];

  const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Check Out", href:"/checkout"},
]


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const  [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState(false)
    const [token, setToken] = useState(false)

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
            onMouseEnter={() => setActiveMenu(item.label)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center text-lg font-display
                font-semibold space-x-1"
            >
              {item.label} 
              {item.subItems || item.isMegaMenu ? <span className="text-xl">&#9662;</span> : null}
            </button>
            
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
                              <a href={subItem.link} className="text-gray-600
                                hover:underline font-body hover:bg-gray-100 px-4 py-2">
                                {subItem.label}
                              </a>
                              <div className=""></div>
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
                    <a 
                      key={subIndex} 
                      href={subItem.link} 
                      className="block text-nowrap px-4 py-2 
                        hover:bg-gray-100 text-gray-600 font-body hover:underline"
                    >
                      {subItem.label}
                    </a>
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
            <FiShoppingBag className="text-xl text-gray-800" />
            <span className="absolute -top-2 -right-1 bg-deepbrown
              text-white text-xs rounded-full px-1"
            >
              0
            </span>
          </div>
          <button className="hidden md:block p-1 bg-gray-800 text-white rounded-full">
            <FiSearch />
          </button>
          
          {/* rigth side */}
          <div className="relative flex items-center md:space-x-3 space-x-2">
            <div >
                {
                  currentUser ? <>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <img src={ Avatar} alt=""
                        className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
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
                                  onClick={()=>{}}
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
                  </> : token ?  (
                    <Link to="/dashboard"
                      className='border-b-2 border-primary'>
                      Dashboard
                    </Link>
                  ) : (
                      <Link to="/signin">
                        <HiOutlineUser className="size-6"/>
                      </Link>
                  )
                }
            </div>
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