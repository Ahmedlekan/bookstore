import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { AppContextProvider } from './context/useAppContext.tsx'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: 0
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </Provider>,
)
