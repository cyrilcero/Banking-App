import React from 'react';
import { getLocalStorage, setLocalstorage } from '../utils/localStorage';
import { calcSpentPerUser } from '../utils/helpers';

function BalanceOverview() {
  const allAccounts = getLocalStorage('UserAccounts');
  const user = getLocalStorage('CurrentUser');
  const totalExpenses = calcSpentPerUser(user.email);
  const remainingBalance = user.accountBalance - totalExpenses; 

  const updatedAllAccounts = allAccounts.map(account => {
    if (account.email === user.email) {
      account.accountBalance = remainingBalance;
    }
    return account;
  });
  
  setLocalstorage('UserAccounts', updatedAllAccounts);

  user.accountBalance = remainingBalance;
  setLocalstorage('CurrentUser', user); 
    
  return (
    <div className='balance-overview'>
      <div className='account-details'>
        <h1>SAVINGS ACCOUNT</h1>
        <h2 className='account-id'>{user.accountID}</h2>
      </div>
      
      <div className='account-balance'>
        <h3 className='current-balance'><span>PHP </span>{user.accountBalance}</h3>
        <span>AVAILABLE BALANCE</span>
      </div>
    </div>
  )
}

export default BalanceOverview
