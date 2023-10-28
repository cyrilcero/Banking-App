import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ClientOverview from './components/ClientOverview.jsx'
import LogInPage from './pages/LoginPage.jsx'
import AdminDash from './components/AdminDash.jsx'
import Signup from './pages/Signup.jsx'
import Navbar from './components/NavBar.jsx'
import Dashboard from './components/Dashboard.jsx'
import ClientDashboard from './components/ClientDashboard.jsx'
import Home from './pages/Home.jsx'
import Loans from './pages/Loans.jsx'
import Cards from './pages/Cards.jsx'
import Insurance from './pages/Insurance.jsx'
import Investments from './pages/Investments.jsx'
import PromAndRe from './pages/PromAndRe.jsx'
import App from './App.jsx'
import AdminPage from './components/AdminPage.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
const currentUser = JSON.parse(localStorage.getItem('CurrentUser') || '{}');
const accountID = currentUser.accountID;



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "loans",
        element: <Loans />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "insurance",
        element: <Insurance />,
      },
      {
        path: "investments",
        element: <Investments />,
      },
      {
        path: "promos-rewards",
        element: <PromAndRe />,
      },
    ],
  },
  {
    path: "/overview/:id",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <ClientOverview />,
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
