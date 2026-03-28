import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import App from './App.tsx'
import { AuthProvider } from '@/contexts/AuthContext'
import { OrderCartProvider } from '@/contexts/OrderCartContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OrderCartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </OrderCartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
