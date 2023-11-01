import React from 'react';
import Navbar from '../components/AdminNavbar';
import { Outlet } from 'react-router-dom';

function BudgetAppLayout() {
  return (
    <div className='dashboard-container'>
        <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default BudgetAppLayout
