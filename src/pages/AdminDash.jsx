import React, { useState } from 'react';
import GreetingDash from '../components/GreetingDash';

function AdminDash() {
  return (
    <section className='admin-dash'>
      <GreetingDash />
      <div className="panel2-admin-dash"></div>
    </section>
  )
}

export default AdminDash
