import {useState} from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"



const Register = () => {
    const [message, setMessage] = useState("");
    const {register,formState: { errors }} = useForm()

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center
        items-center py-10 '
    >
        <div className='w-full max-w-sm mx-auto bg-white
            shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
            <h2 className='text-xl font-semibold mb-4 font-body'>
                Please Register
            </h2>

            <form onSubmit={()=>{}}>
                
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm
                        font-bold mb-2 font-body' htmlFor="email"
                    >
                        Email
                    </label>
                    <input 
                        {...register("email", { required: true })} 
                        type="email" name="email" id="email" placeholder='Email Address'
                        className='shadow appearance-none border rounded
                        w-full py-2 px-3 leading-tight focus:outline-none
                        focus:shadow font-body'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm
                        font-bold mb-2 font-body' htmlFor="password"
                    >
                        Password
                    </label>
                    <input 
                        {...register("password", { required: true })} 
                        type="password" name="password" id="password" placeholder='Password'
                        className='shadow appearance-none border rounded
                        w-full py-2 px-3 leading-tight focus:outline-none
                        focus:shadow font-body'
                    />
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                }
                <div>
                    <button className='bg-black hover:bg-black/80 font-body
                        text-white font-bold py-2 px-8 rounded
                        focus:outline-none'
                    >
                        Register
                    </button>
                </div>
            </form>
            
            <p className='align-baseline font-medium mt-4 text-sm font-body'>
                Have an account? Please&nbsp;
                <Link to="/signin" className='text-deepbrown 
                    hover:text-red-400 font-body'>
                    Login
                </Link>
            </p>

            {/* google sign in */}
            <div className='mt-4'>
                <button 
                    onClick={()=>{}}
                    className='w-full flex flex-wrap gap-1 items-center
                        justify-center bg-gray-400 font-body hover:bg-gray-600 
                        text-white font-bold py-2 px-4 rounded focus:outline-none'
                    >
                    <FaGoogle  className='mr-2'/>
                    Sign in with Google
                </button>
            </div>

            <p className='mt-5 text-center text-gray-500
                text-xs font-body'>
                ©2025 Book Store. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Register