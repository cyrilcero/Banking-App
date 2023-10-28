import React from 'react'
import GreetingDash from '../components/GreetingDash';
import ClientDashboard from '../components/ClientDashboard';

function CashIn() {
  return (
    <section className='cash-in'>
      <GreetingDash />
      <ClientDashboard/>
      <div className="panel2-cashin">
        <div className="transactions-cashin">CASH IN TRANSACTIONS</div>
      </div>
      
    </section>
  )
}

export default CashIn
