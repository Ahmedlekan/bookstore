import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppContextProvider } from './context/useAppContext.tsx'
import { CartProvider } from './context/useCart.tsx'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: 0
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </AppContextProvider>
  </QueryClientProvider>
)
