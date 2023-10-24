import React from 'react';
import BankCard from './BankCard';
import GreetingDash from './GreetingDash';
import BalanceOverview from './BalanceOverview';

function ClientDashboard() {
  return (
    <section className='client-dashboard'>
      <GreetingDash />
      <div className='panels-line1'>
        <BalanceOverview />
        <BankCard />
      </div>
    </section>
  )
}

export default ClientDashboard
