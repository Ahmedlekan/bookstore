import React, {createContext, useContext, useState, useEffect} from 'react'
import Toast from '../components/ui/Toast'
import { UserType } from '../../../backend/src/types/types'
import { useQuery } from '@tanstack/react-query'
import * as authApiClient from "../apiClient/auth"
import * as userApiClient from "../apiClient/user"


type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContextProps = {
    showToast: (toastMessage: ToastMessage)=> void 
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    isLoggedIn: boolean
    isLoading: boolean
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({children}:{children: React.ReactNode}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)
    const [user, setUser] = useState<UserType | null>(null);

    const {isError} = useQuery({
        queryKey: ["validateToken"],
        queryFn: authApiClient.validateToken
    })

    const {data: currentUser, isLoading, isSuccess} = useQuery({
      queryKey:["currentUser"],
      queryFn: userApiClient.fetchCurrentUser,
    })

    useEffect(() => {
        if (isSuccess && currentUser) {
          setUser(currentUser);
        } else if (isError) {
          console.log("Error fetching currentUser");
        }
    }, [currentUser, isSuccess, isError]);


  return (
    <AppContext.Provider value={{
        showToast: (toastMessage) => setToast(toastMessage),
        user,
        setUser,
        isLoggedIn: !isError,
        isLoading,
    }}>
        {toast && (
            <Toast message={toast.message} type={toast.type} onClose={ () => setToast(undefined)} />
        )}
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=>{
    const context = useContext(AppContext)
    
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}