import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
import ClientOverview from './pages/ClientOverview.jsx'
import LogInPage from './pages/LoginPage.jsx'
import AdminDash from './pages/AdminDash.jsx'
import Signup from './pages/Signup.jsx'
import Navbar from './components/NavBar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ClientDashboard from './components/ClientDashboard.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
const currentUser = JSON.parse(localStorage.getItem('CurrentUser') || '{}');
const accountID = currentUser.accountID;



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    index: true
  },
  {
    path: "/overview/:id",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <ClientDashboard />,
        loader: ({params}) => params.id,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDash />
  },
  {
    path: "/test",
    element: <ClientDashboard />
  },
  {
    path: "/create-account",
    element: <Signup />
  },
  {
    path: "/login",
    element: <LogInPage />
  },
  
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
