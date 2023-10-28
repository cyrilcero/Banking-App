import React from 'react'
import Navbar from "../components/NavBar";
import { Outlet } from 'react-router';

function Dashboard() {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Dashboard