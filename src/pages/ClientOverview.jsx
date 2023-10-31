import React, { useState, useEffect } from 'react';
import ClientDashboard from '../components/ClientDashboard';
import GreetingDash from '../components/GreetingDash';
import { useNavigate } from 'react-router-dom';


function AllTransaction({ amount }) {
  return (
    <ul className="transaction-list">
      <li>Cash In</li>
      <li>+{amount}</li>
    </ul>
  );
}


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
      <div className="transactions-widget">All transaction</div>
     </div>
    </section>
  )
}

export default ClientOverview