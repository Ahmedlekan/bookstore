import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import {useState} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CommonForm from '../../common/form';
import { useAppContext } from '../../context/useAppContext';
import * as adminApiclient from "../../apiClient/admin"


const AdminHeader = () => {
    const {showToast} = useAppContext()
    const navigate = useNavigate()
    const queryClient =  useQueryClient()
    const [openCreateBooksDialog, setOpenCreateBooksDialog] = useState<boolean>(false);

    const {mutate, isPending} = useMutation({
        mutationFn: adminApiclient.addBook,
        onSuccess: async()=>{ 
            queryClient.invalidateQueries()
            showToast({ message: "Book Saved!", type: "SUCCESS" });
        },
        onError: (error)=>{
            showToast({ message: error.message, type: "ERROR" });
        }
    })

    const handleSave = (bookFormData: FormData)=>{
        mutate(bookFormData)
    }
    
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate("/")
    }

  return (
    <div className='flex-grow text-gray-800'>
        <div className="flex items-center h-20
            px-6 sm:px-10 bg-white font-body"
        >      
            <div className="block sm:hidden relative flex-shrink-0 p-2
                mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 
                focus:bg-gray-100 focus:text-gray-800 rounded-full"
            >
                <span className="sr-only">Menu</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" className="h-6 w-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"
                    />
                </svg>
            </div>

            <div className="relative w-full max-w-md sm:-ml-2">
                <svg aria-hidden="true" viewBox="0 0 20 20"
                    fill="currentColor"
                    className="absolute h-6 w-6 mt-2.5
                    ml-2 text-gray-400"
                >
                    <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 
                        000-8zM2 8a6 6 0 1110.89 
                        3.476l4.817 4.817a1 1 0 
                        01-1.414 1.414l-4.816-4.816A6 
                        6 0 012 8z" clipRule="evenodd"
                    />
                </svg>
                <input type="text" role="search"
                    placeholder="Search..."
                    className="py-2 pl-10 pr-4 w-full border-4
                    border-transparent placeholder-gray-400 
                    focus:bg-gray-50 rounded-lg"
                />
            </div>
            
            <div className="flex flex-shrink-0 items-center ml-auto">
            
                <div className="inline-flex items-center
                    p-2 hover:bg-gray-100 focus:bg-gray-100
                    rounded-lg"
                >
                    <span className="sr-only">User Menu</span>
                    <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                    <span className="font-semibold">Grace Simmons</span>
                    <span className="text-sm text-gray-600">Lecturer</span>
                    </div>
                    <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/women/68.jpg"
                        alt="user profile photo"
                        className="h-full w-full object-cover"
                    />
                    </span>
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="hidden sm:block h-6 w-6 text-gray-300">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg> 
                </div>

                <div className="border-l pl-3 ml-3 space-x-1">
                    <div className="relative p-2 text-gray-400 
                        hover:bg-gray-100 hover:text-gray-600 
                        focus:bg-gray-100 focus:text-gray-600 
                        rounded-full"
                    >
                        <span className="sr-only">Notifications</span>
                        <span className="absolute top-0 right-0 h-2 w-2
                            mt-1 mr-2 bg-red-500 rounded-full"></span>
                        <span className="absolute top-0 right-0 h-2 w-2 mt-1
                            mr-2 bg-red-500 rounded-full animate-ping"></span>
                        <svg aria-hidden="true" fill="none" 
                            viewBox="0 0 24 24" stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 
                                2.032 0 0118 14.158V11a6.002 6.002 0 
                                00-4-5.659V5a2 2 0 10-4 0v.341C7.67 
                                6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 
                                1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                    </div>

                    <div
                        onClick={handleLogout}
                        className="relative p-2 text-gray-400 
                            hover:bg-gray-100 hover:text-gray-600 
                            focus:bg-gray-100 focus:text-gray-600 rounded-full"
                        >
                        <span className="sr-only">Log out</span>
                        <svg aria-hidden="true" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 
                                4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 
                                3 0 013 3v1"
                            />
                        </svg>
                    </div>
                    
                </div>
            </div>
        </div>

        <main className="p-6 sm:p-10 space-y-6 ">
            <div className="flex flex-col space-y-6
                md:space-y-0 md:flex-row justify-between"
            >
            
                <div className="mr-6 font-body">
                    <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                    <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
                </div>
                
                <div className="flex flex-col md:flex-row
                    items-start justify-end -mb-3"
                >
                    <Link to="#"
                        className="inline-flex px-5 py-3 font-body 
                        text-black hover:text-black/80 
                        focus:text-black/80 hover:bg-deepbrown/10 
                        border border-black rounded-md mb-3"
                    >
                        <svg aria-hidden="true" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" 
                            className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 
                            2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                        </svg>
                        Manage Books
                    </Link>

                    <button className="inline-flex px-5 py-3 text-white 
                        bg-black hover:bg-black/80 font-body 
                         rounded-md ml-6 mb-3"
                        onClick={()=>setOpenCreateBooksDialog(true)}
                    >
                        <svg aria-hidden="true" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" 
                        className="flex-shrink-0 h-6 w-6 text-white
                        -ml-1 mr-2">
                            <path strokeLinecap="round"
                                strokeLinejoin="round" strokeWidth="2" 
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Add New Book
                    </button>

                </div>
            </div>
            
            <Outlet/>
        </main>

        {/**upload product component */}
        {
          openCreateBooksDialog && (
            <CommonForm 
              isLoading={isPending} 
              onSave={handleSave} 
              onClose={()=>setOpenCreateBooksDialog(false)}/>
          )
        }
    </div>
  )
}

export default AdminHeader
