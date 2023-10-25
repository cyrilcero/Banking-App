import React from 'react';

function BalanceOverview() {
  
  return (
    <div className='balance-overview'>
      <div className='account-details'>
        <h1>SAVINGS ACCOUNT</h1>
        <h2>000123456789</h2>
        {/* <h2>{accountID}</h2> // to be dynamic*/}
      </div>
      
      <div className='account-balance'>
        <h3><span>PHP</span> 10,000.23</h3>
        {/* <h3><span>PHP</span> {initialBalance.toFixed(2)}</h3> // to be dynamic */}
        <span>AVAILABLE BALANCE</span>
      </div>
    </div>
  )
}

export default BalanceOverview
