import React from 'react';

function BalanceOverview() {
  return (
    <div className='balance-overview'>
      <div className='account-details'>
        <h1>SAVINGS ACCOUNT</h1>
        <h2>000123456789</h2>
      </div>
      
      <div className='account-balance'>
        <h3><span>PHP</span> 10,000.25</h3>
        <span>AVAILABLE BALANCE</span>
      </div>

    </div>
  )
}

export default BalanceOverview
