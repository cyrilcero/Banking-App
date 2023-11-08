import React, { useEffect, useState } from "react";

function CashInAdmin() {
  const userAccounts = JSON.parse(localStorage.getItem("UserAccounts")) || [];
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
  const initialBalance = currentUser.accountBalance || 0;

  const [balance, setBalance] = useState(initialBalance);
  const [cashToAdd, setCashToAdd] = useState(null);

  const addCash = () => {
    if (cashToAdd > 0) {
      const newBalance = balance + cashToAdd;

      const transaction = {
        userId: currentUser.accountID,
        date: Date.now(),
        amount: cashToAdd,
      };

      const cashInHistory =
        JSON.parse(localStorage.getItem("CashInHistory")) || [];
      cashInHistory.push(transaction);
      localStorage.setItem("CashInHistory", JSON.stringify(cashInHistory));

      currentUser.accountBalance = newBalance;

      const updatedUserAccounts = userAccounts.map((account) => {
        if (account.accountID === currentUser.accountID && !account.isAdmin) {
          return { ...account, accountBalance: newBalance };
        }
        return account;
      });

      localStorage.setItem("UserAccounts", JSON.stringify(updatedUserAccounts));
      localStorage.setItem("CurrentUser", JSON.stringify(currentUser));

      setBalance(newBalance);
      setCashToAdd(null);
    }
  };

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;

    const selectedUser = userAccounts.find(
      (account) => account.accountID === selectedUserId
    );

    setBalance(selectedUser.accountBalance);
  };

  useEffect(() => {
    console.log(balance);
  }, [balance]);

  return (
    <div>
      <select onChange={handleUserChange}>
        {userAccounts.map((account, index) => (
          <option
            key={index}
            value={account.isAdmin === false && account.accountID}
          >
            {account.isAdmin === false && account.firstName}
          </option>
        ))}
      </select>
      <p>Current Balance: {balance}</p>
      <input
        type="number"
        value={cashToAdd || ""}
        onChange={(e) => setCashToAdd(Number(e.target.value))}
      />
      <button onClick={addCash}>Add</button>
    </div>
  );
}

export default CashInAdmin;
