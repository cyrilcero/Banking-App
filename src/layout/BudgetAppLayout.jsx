import React from 'react';
import { Outlet } from 'react-router-dom';

function BudgetAppLayout() {
  return (
    <main className='dashboard-container budget-app-layout'>
        <Outlet />
    </main>
  )
}

export default BudgetAppLayout
