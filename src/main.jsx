import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import LoggedIn from './components/LoggedIn.jsx'
import AdminPage from './components/AdminPage.jsx'

const userID = JSON.parse(localStorage.getItem("CurrentUser"))


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    index: true
  },
  {
    path: `/overview/${userID.accountID}`,
    element: <LoggedIn />
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
