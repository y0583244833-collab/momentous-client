import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router, RouterProvider } from 'react-router'
import routes from "../src/routes/routes.tsx"
import AppThemeProvider from './theme/AppThemeProvider.tsx'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes}></RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </AppThemeProvider>
  </StrictMode>,
)
