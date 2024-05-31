import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Pages/Routes/Routes'
import UserAuth from './Pages/Firebase/UserAuth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuth>
      <RouterProvider router={Routes} />
    </UserAuth>

  </React.StrictMode>,
)
