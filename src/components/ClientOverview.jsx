import React, { useState, useEffect } from 'react';
import ClientDashboard from './ClientDashboard';
import GreetingDash from './GreetingDash';
import { useNavigate } from 'react-router-dom';

function ClientOverview() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    if (currentUser) {
      setUser(currentUser);
    }

    else {
      navigate('/create-account');
    }
  }, [navigate]);

  if (!user) {
     return null;
  }

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