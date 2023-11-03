import React from 'react';
import { getLocalStorage } from '../utils/localStorage';
import { calcSpentPerUser } from '../utils/helpers';

function BalanceOverview() {
  const user = getLocalStorage('CurrentUser');
  const totalExpenses = calcSpentPerUser(user.email);
  const remainingBalance = user.accountBalance - totalExpenses; 
  const accountID = user.accountID;
    
  return (
    <div className='balance-overview'>
      <div className='account-details'>
        <h1>SAVINGS ACCOUNT</h1>
        <h2 className='account-id'>{accountID}</h2>
      </div>
      
      <div className='account-balance'>
        <h3 className='current-balance'><span>PHP </span>{remainingBalance}</h3>
        <span>AVAILABLE BALANCE</span>
      </div>
    </div>
  )
}

export default BalanceOverview
