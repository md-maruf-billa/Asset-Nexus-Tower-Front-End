import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes'
import UserAuth from './Pages/Firebase/UserAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <UserAuth>
          <RouterProvider router={Routes} />
        </UserAuth>
      </QueryClientProvider>
    </HelmetProvider>

  </React.StrictMode>,
)
