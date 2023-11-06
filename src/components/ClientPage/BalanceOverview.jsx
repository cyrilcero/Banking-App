import React from 'react';

function BalanceOverview() {
  const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
  const accountID = currentUser.accountID;
  const accountBal = Number(currentUser.accountBalance).toLocaleString(
    "en-US", { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
    });
  
    
  return (
    <div className='balance-overview'>
      <div className='account-details'>
        <h1>SAVINGS ACCOUNT</h1>
        <h2 className='account-id'>{accountID}</h2>
      </div>
      
      <div className='account-balance'>
        <h3 className='current-balance'><span>PHP </span>{accountBal}</h3>
        <span>AVAILABLE BALANCE</span>
      </div>
    </div>
  )
}

export default BalanceOverview
