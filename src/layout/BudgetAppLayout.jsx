import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function BudgetAppLayout() {
  return (
    <main className='dashboard-container budget-app-layout'>
        <Navbar />
        <Outlet />
    </main>
  )
}

export default BudgetAppLayout
