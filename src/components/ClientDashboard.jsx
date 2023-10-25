import React from 'react';
import BankCard from './BankCard';
import BalanceOverview from './BalanceOverview';

function ClientDashboard() {
  return (
    <section className='client-dashboard'>
      <div className='panel1'>
        <BalanceOverview />
        <BankCard />
      </div>
    </section>
  )
}

export default ClientDashboard
