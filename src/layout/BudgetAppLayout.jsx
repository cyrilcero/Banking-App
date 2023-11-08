import React from 'react';
import { Outlet } from 'react-router-dom';

function BudgetAppLayout() {
  return (
    <>
        <Outlet />
    </>
  )
}

export default BudgetAppLayout
