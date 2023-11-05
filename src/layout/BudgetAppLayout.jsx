import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';

function BudgetAppLayout() {
  return (
    <main className='dashboard-container budget-app-layout'>
        <Navbar />
        <Outlet />
    </main>
  )
}

export default BudgetAppLayout
