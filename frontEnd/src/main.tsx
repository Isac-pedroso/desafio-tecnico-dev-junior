import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './route.tsx'
import "./theme/theme.css";
import { LoadingProvider } from './providers/LoadingProvider/index.tsx'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoadingProvider>
          <AppRoutes />
        </LoadingProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
