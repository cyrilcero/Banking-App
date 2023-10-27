// useAccounts.jsx -- Custom Hook for Local Storage Key: UserAccounts

import { useState, useEffect } from 'react';


export default function useAccounts() {

  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem('UserAccounts'); 

    return storedAccounts ? JSON.parse(storedAccounts) : [];
  });

  useEffect(() => {
     localStorage.setItem('UserAccounts', JSON.stringify(accounts));
  }, [accounts]);

  const getAccountID = (loggedInEmail) => {
    const userAccount = accounts.find(account => account.email === loggedInEmail);
    
    console.log('loggedInEmail:', loggedInEmail);
    console.log('userAccount:', userAccount);
    return userAccount ? userAccount.accountID : null;
  };
 

  return { accounts, setAccounts, getAccountID };

}

// Usage
// import useAccounts from './useAccounts';
// const [accounts, setAccounts] = useAccounts();