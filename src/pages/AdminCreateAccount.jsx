import React from 'react';
import SignUpForm from '../components/SignUpForm';
import AdminNavBar from '../components/AdminNavbar';
import GreetingDash from '../components/GreetingDash';

function AdminCreateAccount() {
  return (
    <>
      <section className='admindash'>
        <div className='admin-navbar'>
          <AdminNavBar />
        </div>

        <div className="admindash-content">
          <GreetingDash />
          <SignUpForm />

          <div className="panel-admindash">
            
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminCreateAccount
