import React, { useEffect, useState } from 'react';

export const CashInAdmin = () => {
  const userAccounts = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  const currentUser = JSON.parse(localStorage.getItem('CurrentUser')) || {};
  const initialBalance = currentUser.accountBalance || 0;

  const [balance, setBalance] = useState(initialBalance);
  const [cashToAdd, setCashToAdd] = useState(null);

  const addCash = () => {
    if (cashToAdd > 0) {
      const newBalance = balance + cashToAdd;

      const transaction = {
        userId: currentUser.id,
        date: new Date().toISOString(),
        amount: cashToAdd,
      };

      const cashInHistory = JSON.parse(localStorage.getItem('CashInHistory')) || [];
      cashInHistory.push(transaction);
      localStorage.setItem('CashInHistory', JSON.stringify(cashInHistory));

      currentUser.accountBalance = newBalance;

      const updatedUserAccounts = userAccounts.map(account => {
        if (account.id === currentUser.id && !account.isAdmin) {
          return { ...account, accountBalance: newBalance };
        }
        return account;
      });

      localStorage.setItem('UserAccounts', JSON.stringify(updatedUserAccounts));
      localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
      
      setBalance(newBalance);
      setCashToAdd(null);
    }
  };

  useEffect(() => {
    console.log(balance);
  }, [balance]);

  return (
    <div>
      <select>
        {userAccounts.map((account, index) => (
          <option key={index} value={account.firstName}>
            {account.firstName}
          </option>
        ))}
      </select>
      <p>Current Balance: {balance}</p>
      <input
        type="number"
        value={cashToAdd || ''}
        onChange={(e) => setCashToAdd(Number(e.target.value))}
      />
      <button onClick={addCash}>Add</button>
    </div>
  );  
};
