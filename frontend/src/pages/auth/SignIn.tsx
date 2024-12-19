import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAppContext } from '../../context/useAppContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { LoginFormDataprops } from '../../apiClient/auth';
import * as authApiClient from "../../apiClient/auth"


const SignIn = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<LoginFormDataprops>()
    const queryClient = useQueryClient()
    const {showToast, signInWithGoogle} = useAppContext()
    const navigate = useNavigate()
    // const location = useLocation();

    // const from = location.state?.from?.pathname || "/";

    const mutation = useMutation({
        mutationFn: authApiClient.signIn,
        onSuccess: async ()=> {
            showToast({ message: "Login Successful", type: "SUCCESS" })
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
            navigate("/")
        },
        onError: (error: Error)=> {
            showToast({ message: error.message, type: "ERROR"})
        }
    })

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)

    //     // Redirect to the intended page after login
    // navigate(from, { replace: true });
    })

    const handleGoogleSignIn = async() => {
        try {
            await signInWithGoogle();
            showToast({message:"Login Success!", type: "SUCCESS"})
            navigate("/")
        } catch (error) {
            showToast({ message: "Failed to sign in with Google", type: "ERROR" })
            console.error(error)
        }
    }
    
  return (
    <div className='h-[100vh] flex justify-center
        items-center'
    >
        <div className='w-full max-w-sm mx-auto bg-white
            shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
            <h2 className='text-xl font-semibold mb-4 font-body'>
                Please Login
            </h2>

            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <h2 className="text-3xl font-bold font-body">Create an Account</h2>

                <label className="text-gray-700 text-sm font-bold">
                    Email
                    <input
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("email", {required:"This field is required"})}
                    />
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold">
                    Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("password", {required:"This field is required", minLength:{
                            value: 6,
                            message: "Password must be atleast 6 characters"
                        }})}
                    />
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>

                <div>
                    <button className='bg-black hover:bg-black/80 font-body
                    text-white font-bold py-2 px-8 rounded focus:outline-none'>
                        Sign In 
                    </button>
                </div>

            </form>
            
            <p className='align-baseline font-medium mt-4 text-sm font-body'>
                Haven't an account? Please&nbsp;
                <Link to="/register" className='text-deepbrown hover:text-red-400 font-body'>
                    Register
                </Link>
            </p>

            {/* google sign in */}
            <div className='mt-4'>
                <button 
                    onClick={handleGoogleSignIn}
                    className='w-full flex flex-wrap gap-1 items-center
                    justify-center bg-gray-400 font-body hover:bg-gray-600 
                    text-white font-bold py-2 px-4 rounded 
                    focus:outline-none'
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

export default SignIn