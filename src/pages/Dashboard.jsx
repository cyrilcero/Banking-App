import React from 'react'
import Navbar from "../components/NavBar";
import { Outlet } from 'react-router';

function Dashboard() {
  return (
    <div className='dashboard-container'>
        <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard