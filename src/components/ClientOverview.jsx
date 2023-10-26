import React from 'react';
import ClientDashboard from './ClientDashboard';
import GreetingDash from './GreetingDash';

function ClientOverview() {

  return (
    <section className='client-overview'>
      <GreetingDash/>
      <ClientDashboard/>

      <div className="panel2-overview">
      <div className='expenses-widget'>for expenses</div>
      <div className="transactions-widget">for transactions</div>
     </div>
    </section>
  )
}

export default ClientOverview