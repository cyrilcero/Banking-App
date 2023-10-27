import React from 'react';
import ClientDashboard from './ClientDashboard';
import GreetingDash from './GreetingDash';

function Transfer() {
  return (
    <section className='transfer'>
      <GreetingDash/>
      <ClientDashboard/>
      <div className="panel2-transfer">
        <div className="transfer-history">THIS IS FOR TRANSFER HISTORY</div>
      </div>
    </section>
  )
}

export default Transfer
