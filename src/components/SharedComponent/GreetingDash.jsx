import React from 'react';

function GreetingDash() {
  const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
  const firstName = currentUser.firstName;

  return (
    <div className='greeting-dash'>
      <h1>
        Hello, <span>{firstName}</span>!
      </h1>
    </div>
  )
}

export default GreetingDash
