import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Signup } from './components/Signup.jsx';
import Navbar from './components/NavBar.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <div>Hello</div>,
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path:"/dashboard",
    element: <Navbar/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
